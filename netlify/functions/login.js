import { issueToken } from "./_shared/secure.js";

/**
 * Minimal, plausible "returns" login.
 * Accepts only two credential pairs disguised as Order # + ZIP.
 * On success, sets a HttpOnly cookie limited to /shoes and returns JSON {{ ok:true }}.
 */
const USERS = [
  { order: "ORD-274913", zip: "80112", id: "erica" },
  { order: "ORD-745620", zip: "80203", id: "morgan" }
];

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  let body = {};
  try { body = await req.json(); } catch { /* ignore */ }

  const { order, zip } = body || {};
  const match = USERS.find(u => u.order === String(order) && u.zip === String(zip));
  if (!match) {
    // Decoy response
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Token payload includes id and issued-at (ms). Expires in ~1 hour by client policy.
  const token = issueToken({ id: match.id, iat: Date.now() });

  // HttpOnly session cookie - Path=/ required for Netlify functions access
  const headers = new Headers({
    "Content-Type": "application/json",
    "Set-Cookie": `nv_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
