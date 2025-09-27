1) Operator Lane (gRPC): proto + server + client

This uses a simple Gateway service (OperatorGateway.Call) that carries:

target_service (e.g., "UserService", "EmailService")

operation (e.g., "GetUserInfo", "SendEmail")

payload (opaque bytes — typically protobuf payload of the target op)

For the demo, the gateway handles two fake ops:

UserService.GetUserInfo → returns a JSON doc with name/email

EmailService.SendEmail → “sends” and returns an accepted=true JSON

Under the hood you’ll later route to real plugins via service registry. This gives you the wire format + stubs now.

# ===== Operator Lane (gRPC) =====
python3 -m pip install --upgrade pip grpcio grpcio-tools protobuf && \
mkdir -p vivified/core/operator && \
cat > vivified/core/operator/operator.proto <<'PROTO'
syntax = "proto3";
package vivified.operator;

message CallRequest {
  string trace_id = 1;
  string target_service = 2; // e.g. "UserService"
  string operation = 3;      // e.g. "GetUserInfo"
  bytes  payload = 4;        // opaque payload (usually protobuf or JSON)
}

message CallResponse {
  bool   ok = 1;
  string error = 2;
  bytes  payload = 3;        // response body
}

service OperatorGateway {
  rpc Call (CallRequest) returns (CallResponse);
}
PROTO


Generate Python stubs + implement gateway server and a tiny client:

python3 -m grpc_tools.protoc \
  -Ivivified/core/operator \
  --python_out=vivified/core/operator \
  --grpc_python_out=vivified/core/operator \
  vivified/core/operator/operator.proto && \
cat > vivified/core/operator/gateway_server.py <<'PY'
import json
import logging
import time
from concurrent import futures

import grpc
from . import operator_pb2, operator_pb2_grpc

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

# In real life you would dispatch by registry -> target plugin address -> gRPC/HTTP request.
# Here we stub two "services" inline for demo.

def handle_user_service(operation: str, payload: bytes) -> (bool, bytes, str):
    if operation == "GetUserInfo":
        req = json.loads(payload.decode("utf-8") or "{}")
        user_id = req.get("user_id","unknown")
        # pretend DB fetch
        resp = {"user_id": user_id, "name":"Alice Example", "email":"alice@example.com"}
        return True, json.dumps(resp).encode("utf-8"), ""
    return False, b"", f"Unknown operation for UserService: {operation}"

def handle_email_service(operation: str, payload: bytes) -> (bool, bytes, str):
    if operation == "SendEmail":
        req = json.loads(payload.decode("utf-8") or "{}")
        logging.info("Sending email: to=%s subject=%s", req.get("to"), req.get("subject"))
        time.sleep(0.01)  # simulate a tiny bit of work
        resp = {"accepted": True, "message_id":"demo-123"}
        return True, json.dumps(resp).encode("utf-8"), ""
    return False, b"", f"Unknown operation for EmailService: {operation}"

class OperatorGateway(operator_pb2_grpc.OperatorGatewayServicer):
    def Call(self, request, context):
        target = request.target_service
        op = request.operation
        logging.info("Operator.Call trace=%s target=%s op=%s size=%d",
                     request.trace_id, target, op, len(request.payload or b""))
        if target == "UserService":
            ok, payload, err = handle_user_service(op, request.payload)
        elif target == "EmailService":
            ok, payload, err = handle_email_service(op, request.payload)
        else:
            ok, payload, err = False, b"", f"Unknown target service: {target}"
        return operator_pb2.CallResponse(ok=ok, error=err, payload=payload)

def serve(port: int = 50051):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=16),
                         options=[
                           ('grpc.so_reuseport', 1),
                           ('grpc.keepalive_time_ms', 20000),
                           ('grpc.keepalive_timeout_ms', 10000),
                         ])
    operator_pb2_grpc.add_OperatorGatewayServicer_to_server(OperatorGateway(), server)
    server.add_insecure_port(f"[::]:{port}")
    logging.info("OperatorGateway listening on :%d", port)
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
PY


Client (two calls):

cat > vivified/core/operator/gateway_client.py <<'PY'
import json
import uuid
import grpc
from . import operator_pb2, operator_pb2_grpc

def call(channel, target_service, operation, payload_dict):
    stub = operator_pb2_grpc.OperatorGatewayStub(channel)
    req = operator_pb2.CallRequest(
        trace_id=str(uuid.uuid4()),
        target_service=target_service,
        operation=operation,
        payload=json.dumps(payload_dict).encode("utf-8")
    )
    resp = stub.Call(req, timeout=2.0)
    return resp

if __name__ == "__main__":
    with grpc.insecure_channel("127.0.0.1:50051") as ch:
        r1 = call(ch, "UserService", "GetUserInfo", {"user_id": "u-001"})
        print("UserService.GetUserInfo ok:", r1.ok, "err:", r1.error, "payload:", r1.payload.decode())

        r2 = call(ch, "EmailService", "SendEmail", {"to":"alice@example.com","subject":"Hello","body":"Hi David!"})
        print("EmailService.SendEmail ok:", r2.ok, "err:", r2.error, "payload:", r2.payload.decode())
PY


Run server + client:

# Terminal A
python3 vivified/core/operator/gateway_server.py

# Terminal B
python3 vivified/core/operator/gateway_client.py

2) NATS JetStream demo (publish/subscribe Envelope)

We’ll run NATS in Docker, then do a Python pub/sub using the same Envelope proto you compiled earlier.

# ===== NATS JetStream =====
docker run -d --name nats -p 4222:4222 -p 8222:8222 nats:2.10 -js && \
python3 -m pip install nats-py protobuf && \
cat > vivified/nats_pub.py <<'PY'
import asyncio, uuid
from nats.aio.client import Client as NATS
from vivified.core.proto import envelope_pb2
from google.protobuf.any_pb2 import Any
from google.protobuf.timestamp_pb2 import Timestamp

SUBJECT = "events.CanonicalMessage.v2"

def build_envelope() -> envelope_pb2.Envelope:
    cm = envelope_pb2.CanonicalMessage()
    cm.id = str(uuid.uuid4())
    cm.sender.type = "email"; cm.sender.value = "alice@example.com"
    cm.recipient.type = "phone"; cm.recipient.value = "+15551230000"
    cm.content.type = "text"; cm.content.format = "text/plain"; cm.content.data = b"Hello from NATS!"
    env = envelope_pb2.Envelope()
    env.trace_id = str(uuid.uuid4()); env.event_id = str(uuid.uuid4())
    env.canonical_type = "CanonicalMessage"
    env.canonical_major = 2; env.canonical_minor = 0; env.canonical_patch = 0
    env.idempotency_key = cm.id
    ts = Timestamp(); ts.GetCurrentTime(); env.created_at.CopyFrom(ts)
    any_msg = Any(); any_msg.Pack(cm); env.payload.CopyFrom(any_msg)
    return env

async def main():
    nc = NATS()
    await nc.connect(servers=["nats://127.0.0.1:4222"])
    env = build_envelope()
    data = env.SerializeToString()
    ack = await nc.publish(SUBJECT, payload=data)
    print("Published", SUBJECT, "bytes=", len(data))
    await nc.drain()

if __name__ == "__main__":
    asyncio.run(main())
PY && \
cat > vivified/nats_sub.py <<'PY'
import asyncio
from nats.aio.client import Client as NATS
from vivified.core.proto import envelope_pb2
from google.protobuf.any_pb2 import Any

SUBJECT = "events.CanonicalMessage.v2"

async def handler(msg):
    data = msg.data
    env = envelope_pb2.Envelope()
    env.ParseFromString(data)
    print(f"[SUB] subject={msg.subject} event_id={env.event_id} type={env.canonical_type} major={env.canonical_major}")
    if env.payload and env.canonical_type == "CanonicalMessage":
        cm = envelope_pb2.CanonicalMessage()
        env.payload.Unpack(cm)
        print("     -> From:", cm.sender.value, "To:", cm.recipient.value, "Len:", len(cm.content.data or b""))

async def main():
    nc = NATS()
    await nc.connect(servers=["nats://127.0.0.1:4222"])
    sid = await nc.subscribe(SUBJECT, cb=handler)
    print("Subscribed to", SUBJECT, "sid=", sid)
    # keep alive
    while True:
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(main())
PY


Run subscriber then publisher:

# Terminal A
python3 vivified/nats_sub.py

# Terminal B
python3 vivified/nats_pub.py


You should see the subscriber print the envelope + unpacked CanonicalMessage.

3) Schema Registry API (FastAPI)

Implements:

POST /schemas → insert schema row (draft/active/etc.)

POST /schemas/activate → run the activate_schema(name, major, minor, patch) function from your DDL

GET /schemas/{name} → list versions

GET /schemas/{name}/active/{major} → get current active for a major

Uses psycopg2 for brevity. Set your DB env vars once.

# ===== Schema Registry API (FastAPI) =====
python3 -m pip install fastapi uvicorn psycopg2-binary pydantic && \
mkdir -p vivified/core/api && \
cat > vivified/core/api/schema_api.py <<'PY'
import os
import base64
import json
from typing import Optional, List
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

DB_DSN = os.environ.get("VIVIFIED_DB_DSN", "dbname=vivified user=postgres host=127.0.0.1")

app = FastAPI(title="Vivified Schema Registry API")

class SchemaUpsert(BaseModel):
    name: str
    major: int
    minor: int = 0
    patch: int = 0
    status: str = Field("draft", pattern="^(draft|active|deprecated|blocked)$")
    syntax: str = Field("proto3", pattern="^(proto3|json)$")
    proto_b64: Optional[str] = None      # optional raw .proto, base64
    json_schema: Optional[dict] = None
    description: str = ""

class ActivateRequest(BaseModel):
    name: str
    major: int
    minor: int
    patch: int

def _conn():
    return psycopg2.connect(dsn=DB_DSN)

@app.post("/schemas")
def upsert_schema(payload: SchemaUpsert):
    proto_bytes = base64.b64decode(payload.proto_b64) if payload.proto_b64 else None
    with _conn() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            INSERT INTO canonical_schemas(name, major, minor, patch, status, syntax, proto_bytes, json_schema, description)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
            ON CONFLICT (name,major,minor,patch)
            DO UPDATE SET status=excluded.status, syntax=excluded.syntax, proto_bytes=excluded.proto_bytes,
                          json_schema=excluded.json_schema, description=excluded.description
            RETURNING id, name, major, minor, patch, status, syntax, description, created_at
        """, (payload.name, payload.major, payload.minor, payload.patch, payload.status, payload.syntax,
              psycopg2.Binary(proto_bytes) if proto_bytes else None,
              json.dumps(payload.json_schema) if payload.json_schema else None,
              payload.description))
        row = cur.fetchone()
        return row

@app.post("/schemas/activate")
def activate(req: ActivateRequest):
    with _conn() as conn, conn.cursor() as cur:
        cur.execute("SELECT activate_schema(%s,%s,%s,%s)", (req.name, req.major, req.minor, req.patch))
        conn.commit()
        return {"ok": True}

@app.get("/schemas/{name}")
def list_versions(name: str):
    with _conn() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT name, major, minor, patch, status, syntax, description, created_at
              FROM canonical_schemas
             WHERE name = %s
             ORDER BY major DESC, minor DESC, patch DESC
        """, (name,))
        rows = cur.fetchall()
        return rows

@app.get("/schemas/{name}/active/{major}")
def get_active(name: str, major: int):
    with _conn() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT name, major, minor, patch, status, syntax, description, created_at
              FROM canonical_schemas
             WHERE name = %s AND major = %s AND status='active'
             ORDER BY minor DESC, patch DESC
             LIMIT 1
        """, (name, major))
        row = cur.fetchone()
        if not row:
            raise HTTPException(404, "No active schema for that major")
        return row
PY


Run the API (set DSN if not default):

export VIVIFIED_DB_DSN="dbname=vivified user=postgres host=127.0.0.1" && \
uvicorn vivified.core.api.schema_api:app --reload --port 8088


Quick tests (insert a draft, activate it, list):

# Insert v2.0.0 draft CanonicalMessage
curl -s -X POST http://127.0.0.1:8088/schemas \
  -H 'content-type: application/json' \
  -d '{"name":"CanonicalMessage","major":2,"minor":0,"patch":0,"status":"draft","syntax":"proto3","description":"v2 base"}' \
  | jq .

# Activate v2.0.0
curl -s -X POST http://127.0.0.1:8088/schemas/activate \
  -H 'content-type: application/json' \
  -d '{"name":"CanonicalMessage","major":2,"minor":0,"patch":0}' \
  | jq .

# Get active for v2
curl -s http://127.0.0.1:8088/schemas/CanonicalMessage/active/2 | jq .

# List all CanonicalMessage versions
curl -s http://127.0.0.1:8088/schemas/CanonicalMessage | jq .

What you’ve got now

Operator Lane: a working gRPC gateway contract + server/client stubs you can extend into real plugin routing (swap the stub handlers with service-registry dispatch).

NATS JetStream: a bus demo using the earlier Envelope proto — publish/subscribe verified.

Schema Registry API: real endpoints to insert schemas, activate a major/minor/patch, and query active versions — aligned with the DDL (one-active-per-major rule enforced by activate_schema()).

If you want the gRPC operator payloads to be typed instead of opaque bytes next, I can drop:

a users.proto (GetUserInfoRequest/Response)

an email.proto (SendEmailRequest/Response)

and update the gateway to unpack/route based on target_service+operation into concrete types (zero-copy where possible).