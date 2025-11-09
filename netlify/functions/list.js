import { verifyToken, decrypt } from "./_shared/secure.js";
import { getStore } from "@netlify/blobs";

/**
 * Returns decrypted messages. Requires a valid nv_session cookie.
 */
export default async (req, context) => {
  const cookie = req.headers.get("cookie") || "";
  const token = (cookie.match(/nv_session=([^;]+)/) || [])[1];
  const payload = verifyToken(token);
  if (!payload) return new Response("Unauthorized", { status: 401 });

  const store = getStore("comms");
  const raw = await store.get("chat");
  let doc = { version: 1, messages: [] };
  if (raw) {
    try { doc = JSON.parse(raw); } catch { /* ignore */ }
  }

  // Decrypt and label which messages are "me"
  const out = (doc.messages || []).map(m => {
    let text = "";
    try { text = decrypt(m.enc); } catch { text = "[unreadable]"; }
    return { text, at: m.at, me: m.from === payload.id };
  });

  return new Response(JSON.stringify({ messages: out }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
};
