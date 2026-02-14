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

## Default lobby redirect

- The root route (`/`) redirects directly to `/rooms/<roomName>`.
- By default `<roomName>` is `lobby`.
- You can override it with `NEXT_PUBLIC_DEFAULT_ROOM` (for example `team-standup`).
- The custom token join flow remains available at `/custom`.

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
- `Caddyfile`: Reverse proxy configuration for `https://meet.local` -> `meet:3000` and `https://livekit.local` -> `host.docker.internal:7880`.
- `.env.example`: Environment variable template (without secrets).

### Start

1. Create your runtime environment file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and set values for your environment (`NEXT_PUBLIC_LIVEKIT_URL`, `LIVEKIT_URL`, and optional API credentials).
3. Build and start the stack:
   ```bash
   docker compose up -d --build
   ```
4. Open `https://meet.local:8445` for the Meet UI.
5. Point your LiveKit URLs to `wss://livekit.local:8445` when testing through the same Caddy entrypoint.

### Caddy TLS mode

- **LAN / lab mode (default):** `tls internal` issues an internal CA certificate for `meet.local` and `livekit.local`.
- **Linux host access:** `docker-compose.yml` maps `host.docker.internal` to `host-gateway` for the Caddy container so `livekit.local` can reach LiveKit on the host.
- **Public domain mode:** replace the hostnames in `Caddyfile` with your real domains and remove `tls internal`. Caddy will then request Let's Encrypt certificates automatically.

### LiveKit connectivity

- Compose does **not** start a LiveKit server.
- Configure `NEXT_PUBLIC_LIVEKIT_URL` and `LIVEKIT_URL` to match your deployment (for this Caddy setup: `wss://livekit.local:8445`).
- If `host.docker.internal` is unavailable in your Docker setup, replace it in `Caddyfile` with a reachable host IP (for example `172.17.0.1` on many Linux systems).

### Security notes

- Do not commit `.env` files with real credentials.
- Use external secret management for production where possible.
- Keep `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` empty unless server-side token minting is required.
