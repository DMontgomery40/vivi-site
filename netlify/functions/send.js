import { verifyToken, encrypt } from "./_shared/secure.js";
import { getStore } from "@netlify/blobs";

/**
 * Appends an encrypted message to the main chat thread.
 */
export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const cookie = req.headers.get("cookie") || "";
  const token = (cookie.match(/nv_session=([^;]+)/) || [])[1];
  const payload = verifyToken(token);
  if (!payload) return new Response("Unauthorized", { status: 401 });

  let body = {};
  try { body = await req.json(); } catch {}
  const text = (body?.text || "").toString().trim();

  if (!text) return new Response("Bad Request", { status: 400 });
  if (text.length > 2000) return new Response("Payload Too Large", { status: 413 });

  const store = getStore({ name: "comms", siteID: context.site.id, token: context.token });
  let doc = { version: 1, messages: [] };
  const existing = await store.get("chat");
  if (existing) { try { doc = JSON.parse(existing); } catch {} }

  const now = Date.now();
  doc.messages.push({ from: payload.id, at: now, enc: encrypt(text) });

  await store.setJSON("chat", doc);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
};
