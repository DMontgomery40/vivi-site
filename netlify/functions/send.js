import { verifyToken, encrypt } from "./_shared/secure.js";
import { getStore } from "@netlify/blobs";

/**
 * Generates a tracking summary
 */
function generateTrackingSummary() {
  const num = String(Math.floor(100000000000 + Math.random() * 900000000000));
  const location = ["DEN", "COS", "GJT", "AUR", "FTC"][Math.floor(Math.random() * 5)];
  const formats = [
    `Tracking update ${num}`,
    `Order status ${num.slice(0,4)}-${num.slice(4,8)}-${num.slice(8,12)}`,
    `RMA #${num}`,
    `Warehouse scan ${location} ${num.slice(0,6)}`
  ];
  return formats[Math.floor(Math.random() * formats.length)];
}

/**
 * Appends an encrypted message to the main thread.
 * Stores both detailed and summary formats.
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
  const summary = (body?.summary || "").toString().trim() || generateTrackingSummary();

  if (!text) return new Response("Bad Request", { status: 400 });
  if (text.length > 2000) return new Response("Payload Too Large", { status: 413 });

  const store = getStore("comms");
  let doc = { version: 1, messages: [] };
  const existing = await store.get("chat");
  if (existing) { try { doc = JSON.parse(existing); } catch {} }

  const now = Date.now();
  doc.messages.push({
    from: payload.id,
    at: now,
    enc: encrypt(text),
    fakeEnc: encrypt(summary)
  });

  await store.setJSON("chat", doc);

  // Send Discord notification when Morgan or Dev sends a message
  if ((payload.id === "morgan" || payload.id === "dev") && process.env.DISCORD_WEBHOOK_URL) {
    try {
      // Generic notification - no identifying info
      const notification = {
        content: "🔔 Return status updated",
        embeds: [{
          color: 0x667eea,
          fields: [{
            name: "Status",
            value: "Customer inquiry received",
            inline: true
          }, {
            name: "Time",
            value: new Date().toLocaleString('en-US', { timeZone: 'America/Denver' }),
            inline: true
          }]
        }]
      };

      // Fire and forget - don't wait for response
      fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      }).catch(() => {}); // Silently fail if webhook fails
    } catch (e) {
      // Never let notification failure break messaging
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
};
