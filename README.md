<a href="https://livekit.io/">
  <img src="./.github/assets/livekit-mark.png" alt="LiveKit logo" width="100" height="100">
</a>

# LiveKit Meet

<p>
  <a href="https://meet.livekit.io"><strong>Try the demo</strong></a>
  •
  <a href="https://github.com/livekit/components-js">LiveKit Components</a>
  •
  <a href="https://docs.livekit.io/">LiveKit Docs</a>
  •
  <a href="https://livekit.io/cloud">LiveKit Cloud</a>
  •
  <a href="https://blog.livekit.io/">Blog</a>
</p>

<br>

LiveKit Meet is an open source video conferencing app built on [LiveKit Components](https://github.com/livekit/components-js), [LiveKit Cloud](https://cloud.livekit.io/), and Next.js. It's been completely redesigned from the ground up using our new components library.

![LiveKit Meet screenshot](./.github/assets/livekit-meet.jpg)

## Tech Stack

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- App is built with [@livekit/components-react](https://github.com/livekit/components-js/) library.

## Demo

Give it a try at https://meet.livekit.io.

## Dev Setup

Steps to get a local dev setup up and running:

1. Run `pnpm install` to install all dependencies.
2. Copy `.env.example` in the project root and rename it to `.env.local`.
3. Update the missing environment variables in the newly created `.env.local` file.
4. Run `pnpm dev` to start the development server and visit [http://localhost:3000](http://localhost:3000) to see the result.
5. Start development 🎉


## Production-like Docker deployment

This repository includes a production-like Docker Compose setup for running Meet behind a Caddy reverse proxy.

### Files

- `Dockerfile`: Multi-stage production build (`node:20-alpine`) for the Next.js app.
- `docker-compose.yml`: Runs `meet` and `caddy` services on an isolated bridge network. The `meet` service starts explicitly with `next start -p 3000`.
- `Caddyfile`: Reverse proxy configuration from HTTPS to `meet:3000`.
- `.env.example`: Environment variable template (without secrets).

### Start

1. Create your runtime environment file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and set values for your environment (`CADDY_HOST`, `NEXT_PUBLIC_LIVEKIT_URL`, `LIVEKIT_URL`, and optional API credentials).
3. Build and start the stack:
   ```bash
   docker compose up -d --build
   ```
4. Open `https://<HOST>` (for local host testing with the default Caddyfile, use `https://localhost`).

### Caddy TLS mode

- **LAN / lab mode (default):** `tls internal` issues an internal CA certificate.
- **Public domain mode:** set `CADDY_HOST` to your domain and remove `tls internal` from `Caddyfile`. Caddy will then request Let's Encrypt certificates automatically.

### LiveKit connectivity

- Compose does **not** start a LiveKit server.
- Configure `NEXT_PUBLIC_LIVEKIT_URL` and `LIVEKIT_URL` to an external LiveKit endpoint (`ws://livekit:7880`, `wss://your-livekit-domain`, or an external IP/hostname).

### Security notes

- Do not commit `.env` files with real credentials.
- Use external secret management for production where possible.
- Keep `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` empty unless server-side token minting is required.
