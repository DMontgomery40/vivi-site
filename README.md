# Secure Communication System

Encrypted messaging system disguised as an e-commerce returns portal.

## Demo Video

**File**: `shoes-site.mov` (235 MB) - stored locally only
**Location**: `/Users/davidmontgomery/faxbot_folder/vivi-site/shoes-site.mov`
**Date**: November 10, 2025

Full walkthrough demonstration showing:
- Entry through vivified.dev/shoes shopping site
- Hidden access via "Air Jordan 1 'Gordon 92'" product
- Login with Order # and ZIP code
- Encrypted messaging interface
- ZIP verification for message details
- Discord notifications to support team

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
