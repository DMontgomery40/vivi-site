import { verifyToken } from "./_shared/secure.js";
import { getStore } from "@netlify/blobs";

/**
 * Clears all messages. Only authorized users (Morgan, dev) can clear.
 */
export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const cookie = req.headers.get("cookie") || "";
  const token = (cookie.match(/nv_session=([^;]+)/) || [])[1];
  const payload = verifyToken(token);

  if (!payload) return new Response("Unauthorized", { status: 401 });

  // Check if user has clear permission
  if (!payload.canClear) {
    return new Response("Forbidden", { status: 403 });
  }

  const store = getStore("comms");

  // Clear all messages by resetting to empty
  await store.setJSON("chat", { version: 1, messages: [] });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
};
