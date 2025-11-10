# Discord Notification Setup (For Erica ONLY)

## Quick Setup (2 minutes)

### 1. Create Discord Server
- Open Discord
- Click "+" to add a server
- Choose "Create My Own"
- Name it something generic like "Shopping Updates" or "Store Status"
- Skip all the setup questions

### 2. Create Webhook
- Right-click on the #general channel
- Click "Edit Channel"
- Go to "Integrations" → "Webhooks"
- Click "New Webhook"
- Name it "Store Bot" or similar (generic name)
- Copy the Webhook URL (looks like: https://discord.com/api/webhooks/...)

### 3. Add to Netlify
- Go to Netlify dashboard
- Site settings → Environment variables
- Add new variable:
  - Key: `DISCORD_WEBHOOK_URL`
  - Value: [paste the webhook URL]
- Save and redeploy

### 4. Test
- Have Morgan send a test message
- You should get a Discord notification saying "Return status updated"

## What You'll See
When Morgan sends a message, you'll get:
```
🔔 Return status updated
Status: Customer inquiry received
Time: [timestamp]
```

## Safety Notes
- Notification is GENERIC - no names, no real content
- Only triggers when MORGAN sends (not when you reply)
- If Discord fails, messaging still works
- Delete Discord messages after reading if paranoid
- Can mute channel but keep notifications on

## To Disable
Just remove the `DISCORD_WEBHOOK_URL` from Netlify environment variables

## NEVER:
- Name the Discord server anything identifying
- Share the webhook URL with anyone
- Leave Discord open on a shared computer