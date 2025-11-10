/**
 * Test Discord webhook - verify it's working
 * Access at: /.netlify/functions/test-discord
 */
export default async (req, context) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return new Response("No webhook URL configured", { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🔔 **TEST MESSAGE** - Discord webhook is working!\nTime: ${new Date().toISOString()}`
      })
    });

    if (!response.ok) {
      return new Response(`Discord returned: ${response.status}`, { status: 500 });
    }

    return new Response("Discord notification sent!", { status: 200 });
  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
};