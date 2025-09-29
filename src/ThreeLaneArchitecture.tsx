import { ArrowLeft, Network, MessageSquare, Shield, Zap, Database, Code, Clock, CheckCircle, GitBranch, Server } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThreeLaneArchitecture() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-night to-deep" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>

      {/* Navigation */}
      <header className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky to-ocean border border-sky/30 grid place-items-center shadow-lg shadow-sky/25">
            <Network className="h-5 w-5 text-white" />
          </div>
          <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
            Vivified
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex items-center justify-center">
              <div className="text-6xl drop-shadow-2xl filter brightness-110">🛣️</div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8">
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Three-Lane
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
                Communication
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              The communication model we ship and the targets we’re building toward.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent text-center">
                Why Three Lanes?
              </h2>
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 text-xs text-slate-300 mr-3"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> Shipped</span>
                <span className="inline-flex items-center gap-2 text-xs text-slate-300 mr-3"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span> Preview</span>
                <span className="inline-flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span> Planned</span>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Most "plugin systems" fail in production because they treat all communication the same way. 
                  Vivified recognizes that plugins need different types of communication with different performance, 
                  security, and reliability characteristics.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  The three-lane model provides purpose-built channels: <strong className="text-sky">Canonical</strong> for 
                  interoperability, <strong className="text-pink">Operator</strong> for performance, and <strong className="text-purple">Proxy</strong> for 
                  security. Each lane has specific protocols, SLOs, and governance rules.
                </p>
              </div>
            </div>

            {/* Performance SLOs */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent text-center">
                Performance SLO Targets
              </h3>
              <p className="text-center text-slate-400 text-sm mb-6">Targets are design goals; not all transports are enabled in current builds.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-sky font-bold p-4">Lane</th>
                      <th className="text-pink font-bold p-4">Target p50</th>
                      <th className="text-purple font-bold p-4">Target p95</th>
                      <th className="text-slate-300 font-bold p-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="p-4 font-medium text-sky">Operator (gRPC)</td>
                      <td className="p-4">&lt;5 ms in-cluster</td>
                      <td className="p-4">&lt;20 ms</td>
                      <td className="p-4 text-sm">Single hop via Core GW, no JSON; pooled channels</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-4 font-medium text-pink">Canonical (Bus)</td>
                      <td className="p-4">&lt;15 ms publish→deliver</td>
                      <td className="p-4">&lt;60 ms</td>
                      <td className="p-4 text-sm">NATS/JetStream, batching, consumer groups</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-purple">Proxy (Guarded)</td>
                      <td className="p-4">External API + 10–20 ms</td>
                      <td className="p-4">External + 50 ms</td>
                      <td className="p-4 text-sm">Only for ad-hoc; keep off hot paths</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-sky/10 to-ocean/10 border border-sky/30 rounded-2xl">
                <p className="text-slate-200 font-medium text-center">
                  Error budgets: 99.9% within p99, with Grafana alerts from day-1
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Canonical Lane */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <div className="flex items-center gap-4 mb-8">
                <MessageSquare className="h-12 w-12 text-sky" />
                <div>
                  <h2 className="text-4xl font-bold text-sky mb-2">Canonical Lane</h2>
                  <p className="text-slate-300">Universal data models for plugin interoperability <span className="ml-2 inline-block align-middle w-2 h-2 rounded-full bg-emerald-400" title="Shipped" /></p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-pink mb-4">Schema Registry & Versioning</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>PostgreSQL table + in-memory LRU cache</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <GitBranch className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>Semantic versioning with compatibility rules</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>Status: draft | active | deprecated | blocked</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Code className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>Protobuf + JSON mirror for debug/dev tools</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-pink mb-4">Wire Format (reference)</h3>
                  <div className="bg-slate-900/70 rounded-2xl p-4">
                    <pre className="text-slate-300 text-sm">
{`Envelope {
  string trace_id
  string event_id
  string canonical_type   // e.g., "User.v2"
  bytes  payload          // protobuf any
  map<string,string> traits
  map<string,string> headers
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-sky mb-4">Zero-Breakage Migrations</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-pink mb-2">Dual-Write, Dual-Read</h4>
                    <p className="text-slate-300 text-sm">
                      On major bump User.v2 → v3, producers publish both for N days; 
                      consumers accept both. Core enforces window and reports laggards.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-pink mb-2">Deprecation Bot</h4>
                    <p className="text-slate-300 text-sm">
                      Core emits daily "compat" report listing consumers still on old versions; 
                      Admin UI shows "X still on v2". Blocklist switch after grace period.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messaging Example */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Canonical Lane – Messaging Example
              </h3>
              <p className="text-slate-400 text-sm mb-4">Example uses NATS JetStream for illustration. Current builds ship canonical models + audit/policy gates; transport options may vary by deployment.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-sky mb-4">Publisher Example</h4>
                  <div className="bg-slate-900/70 rounded-2xl p-4">
                    <pre className="text-slate-300 text-xs overflow-x-auto">
{`# Python NATS publisher
import asyncio, uuid
from nats.aio.client import Client as NATS
from vivified.core.proto import envelope_pb2

async def publish_canonical():
    nc = NATS()
    await nc.connect(servers=["nats://127.0.0.1:4222"])
    
    env = envelope_pb2.Envelope()
    env.trace_id = str(uuid.uuid4())
    env.canonical_type = "CanonicalMessage"
    env.canonical_major = 2
    
    data = env.SerializeToString()
    ack = await nc.publish("events.CanonicalMessage.v2", data)
    await nc.drain()`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-pink mb-4">Performance Features</h4>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Queue groups for scale-out consumers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Framing & batching: coalesce small messages</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Backpressure: consumer lag → slow publishers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>At-least-once with idempotency keys</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operator Lane */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-pink/10 to-magenta/10 border border-pink/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <div className="flex items-center gap-4 mb-8">
                <Network className="h-12 w-12 text-pink" />
                <div>
                  <h2 className="text-4xl font-bold text-pink mb-2">Operator Lane</h2>
                  <p className="text-slate-300">Low-latency RPC via Core gateway <span className="ml-2 inline-block align-middle w-2 h-2 rounded-full bg-yellow-400" title="Preview" /></p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-sky mb-4">Gateway Protocol (design)</h3>
                  <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                    <pre className="text-slate-300 text-sm">
{`message CallRequest {
  string trace_id = 1;
  string target_service = 2; // "UserService"
  string operation = 3;      // "GetUserInfo"
  bytes  payload = 4;        // protobuf payload
}

message CallResponse {
  bool   ok = 1;
  string error = 2;
  bytes  payload = 3;
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-sky mb-4">Performance Optimizations</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Client-side connection pooling, keep-alive</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Auth path caching: TTL 60s + event invalidation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Fast-path policy: precompiled decision DAG</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-pink flex-shrink-0" />
                      <span>Zero-copy payload pass-through</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-pink mb-4">Reliability Features</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-sky mb-2">Circuit Breakers (planned)</h4>
                    <p className="text-slate-300 text-sm">
                      Fail-fast when plugins are down. Hedged requests for P99 tail latency.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sky mb-2">Plugin SLAs (planned)</h4>
                    <p className="text-slate-300 text-sm">
                      Plugins must respond &lt;3ms p50 in-cluster or get down-ranked.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sky mb-2">Load Balancing (planned)</h4>
                    <p className="text-slate-300 text-sm">
                      pick_first within cluster, service discovery integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Example */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Gateway Implementation
              </h3>
              <div className="bg-slate-900/70 rounded-2xl p-6">
                <pre className="text-slate-300 text-sm overflow-x-auto">
{`# Python gRPC gateway server
class OperatorGateway(operator_pb2_grpc.OperatorGatewayServicer):
    def Call(self, request, context):
        target = request.target_service
        op = request.operation
        
        # Route to plugin via service registry
        if target == "UserService":
            ok, payload, err = handle_user_service(op, request.payload)
        elif target == "EmailService":
            ok, payload, err = handle_email_service(op, request.payload)
        else:
            ok, payload, err = False, b"", f"Unknown service: {target}"
            
        return operator_pb2.CallResponse(ok=ok, error=err, payload=payload)

# Client usage
stub = operator_pb2_grpc.OperatorGatewayStub(channel)
resp = stub.Call(operator_pb2.CallRequest(
    trace_id=str(uuid.uuid4()),
    target_service="UserService",
    operation="GetUserInfo",
    payload=json.dumps({"user_id": "u-001"}).encode()
), timeout=2.0)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Proxy Lane */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-purple/10 to-deep/10 border border-purple/30 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <Shield className="h-12 w-12 text-purple" />
                <div>
                  <h2 className="text-4xl font-bold text-purple mb-2">Proxy Lane</h2>
                  <p className="text-slate-300">Heavily guarded gateway for external API calls</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-sky mb-4">Security Controls</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>mTLS Core↔external communication</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>Domain allowlist per plugin</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>Rate limits per route</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>Response shaping: strip headers/body fields by policy</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-sky mb-4">Performance Features</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>Connection pools per domain</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>HTTP/2 where supported</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>No JSON transform in Core</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-purple flex-shrink-0" />
                      <span>Disabled by default, admin approval required</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-purple mb-4">Use Cases & Restrictions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-sky mb-2">When to Use</h4>
                    <ul className="text-slate-300 text-sm space-y-2">
                      <li>• Third-party API integration</li>
                      <li>• Beta plugins without formal contracts</li>
                      <li>• Ad-hoc external service calls</li>
                      <li>• Community-contributed plugins</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sky mb-2">Restrictions</h4>
                    <ul className="text-slate-300 text-sm space-y-2">
                      <li>• Only plugins with specific traits allowed</li>
                      <li>• Whitelisted domains only</li>
                      <li>• Full request/response logging</li>
                      <li>• Keep off hot paths (high latency)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Observability & Monitoring */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent text-center">
                Production Observability
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-sky mb-4">Metrics (Prometheus)</h3>
                  <div className="bg-slate-900/70 rounded-2xl p-4">
                    <pre className="text-slate-300 text-xs">
{`gw_rpc_latency_ms{op,caller,target}
bus_publish_latency_ms{topic}
bus_consume_latency_ms{topic}
policy_decision_cache_hit_ratio
proxy_upstream_latency_ms{domain}
transform_time_ms{from,to}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-sky mb-4">Load Testing</h3>
                  <div className="bg-slate-900/70 rounded-2xl p-4">
                    <pre className="text-slate-300 text-xs">
{`# Operator lane RPC
vegeta attack -targets=bench.json | vegeta report

# NATS bus fan-out  
nats bench pub events.User.v2 --msgs 100000

# Proxy load testing
vegeta attack -rate=500 -targets=targets.txt`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky mb-2">OpenTelemetry</div>
                  <p className="text-slate-300 text-sm">End-to-end tracing across all lanes with trace_id propagation</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink mb-2">Structured Logs</div>
                  <p className="text-slate-300 text-sm">Sample at p95 miss, redact PII by default, correlation IDs</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple mb-2">Performance Gates</div>
                  <p className="text-slate-300 text-sm">CI micro-benchmarks, fail PR if p95 drifts &gt;15%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Why This Changes Everything
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                  Most plugin systems are either too slow (everything goes through a generic message queue) 
                  or too insecure (direct plugin-to-plugin calls bypass governance). 
                </p>
                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                  Vivified's three-lane model gives you the best of both worlds: <strong className="text-sky">sub-5ms</strong> operator 
                  calls for performance-critical paths, <strong className="text-pink">reliable event streams</strong> for loose coupling, 
                  and <strong className="text-purple">secure proxies</strong> for everything else.
                </p>
                <p className="text-slate-200 text-lg leading-relaxed">
                  This isn't just theory—it's production-tested architecture with specific SLOs, 
                  load testing scripts, and monitoring dashboards. The kind of infrastructure that 
                  normally takes enterprise teams years to build.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
