import crypto from "node:crypto";

// Secret used for HMAC and AES-GCM. Prefer Netlify env COMM_KEY; fallback to built-in default.
const fallback = "kAZsAG3VzQKMtpVhdiyRZlUpCde472-Sl8LT9imZcGs=";
const RAW_SECRET = (globalThis.Netlify?.env?.get?.("COMM_KEY")) || process.env.COMM_KEY || fallback;

// Derive 32-byte key from the secret string
const KEY = crypto.createHash("sha256").update(String(RAW_SECRET)).digest();

function b64u(buf) { return Buffer.from(buf).toString("base64url"); }
function fromB64u(s) { return Buffer.from(s, "base64url"); }

export function issueToken(payload) {
  const header = b64u(Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT-lite" })));
  const body = b64u(Buffer.from(JSON.stringify(payload)));
  const sig = crypto.createHmac("sha256", KEY).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token) {
  if(!token || typeof token !== "string" || token.split(".").length !== 3) return null;
  const [h,b,sig] = token.split(".");
  const check = crypto.createHmac("sha256", KEY).update(`${h}.${b}`).digest("base64url");
  if (crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(check))) {
    try { return JSON.parse(fromB64u(b).toString("utf8")); } catch { return null; }
  }
  return null;
}

export function encrypt(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(String(plain), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return b64u(Buffer.concat([iv, tag, enc])); // iv(12) | tag(16) | enc
}

export function decrypt(packed) {
  const buf = fromB64u(packed);
  const iv = buf.subarray(0,12);
  const tag = buf.subarray(12,28);
  const enc = buf.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return dec.toString("utf8");
}
