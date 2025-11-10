# Secure Communication System

Encrypted messaging system disguised as an e-commerce returns portal.

## Architecture

- **Frontend**: Static HTML/CSS/JS disguised as shoe store
- **Backend**: Netlify Functions for authentication and message handling
- **Storage**: Netlify Blobs for encrypted messages
- **Encryption**: AES-256-GCM with HMAC verification
- **Notifications**: Discord webhook (server-side only)

## Security Features

- All credentials server-side only (no client exposure)
- HttpOnly session cookies
- Encrypted message storage
- Fake tracking summaries for plausible cover
- ZIP verification for message access
- Emergency exit links to legitimate sites
- No timestamps visible in UI
- Optimistic UI for instant message display

## Files

- `/public/shoes/` - Frontend UI
- `/netlify/functions/` - Backend API
  - `login.js` - Authentication
  - `send.js` - Send encrypted messages
  - `list.js` - Retrieve messages
  - `clear.js` - Delete all messages
  - `verify-zip.js` - Verify ZIP for message access
  - `_shared/secure.js` - Encryption utilities
- `MORGAN_CREDENTIALS.md` - User credentials
- `DISCORD_SETUP.md` - Notification setup
