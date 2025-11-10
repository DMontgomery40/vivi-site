import { verifyToken } from "./_shared/secure.js";

const USERS = [
  { order: "ORD-274913", zip: "80112", id: "erica" },
  { order: "ORD-745620", zip: "80203", id: "morgan", canClear: true },
  { order: "ORD-999999", zip: "00000", id: "dev", canClear: true }
];

/**
 * Validates a ZIP code against the logged-in user's credentials.
 * Looks like a normal delivery address confirmation endpoint.
 */
export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const cookie = req.headers.get("cookie") || "";
  const token = (cookie.match(/nv_session=([^;]+)/) || [])[1];
  const payload = verifyToken(token);
  if (!payload) return new Response("Unauthorized", { status: 401 });

  let body = {};
  try { body = await req.json(); } catch {}
  const zip = (body?.zip || "").toString().trim();

  if (!zip) return new Response("Bad Request", { status: 400 });

  // Find user and validate ZIP
  const user = USERS.find(u => u.id === payload.id);
  const valid = user && user.zip === zip;

  return new Response(JSON.stringify({ valid }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
};
