# My Slack Bot - Chat SDK

AI-powered Slack bot built with [Chat SDK](https://chat-sdk.dev/), Next.js, and [AI SDK](https://sdk.vercel.ai/).

**All free** — uses Google Gemini (free tier), in-memory state, and Vercel Hobby plan.

## Features

- **AI Chat** — Responds to messages using Gemini 2.0 Flash via AI SDK
- **Interactive UI** — Cards with buttons rendered natively in Slack
- **Thread Subscriptions** — Multi-turn conversations with context
- **Serverless** — Deploys to Vercel with zero infrastructure

## Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Framework | Next.js (App Router) | Free |
| Bot SDK | [Chat SDK](https://chat-sdk.dev/) | Free |
| AI | [AI SDK](https://sdk.vercel.ai/) + Google Gemini 2.0 Flash | Free |
| State | In-memory (dev) / Redis via Upstash (prod) | Free |
| Tunnel | ngrok | Free |
| Deploy | Vercel Hobby | Free |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From an app manifest**
3. Paste the manifest from `slack-app-manifest.yml`
4. Install to your workspace

### 3. Get a Google AI API Key (free)

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click **Create API Key**
3. Copy the key

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

- `SLACK_BOT_TOKEN` — Bot User OAuth Token (`xoxb-...`)
- `SLACK_SIGNING_SECRET` — App Signing Secret
- `GOOGLE_GENERATIVE_AI_API_KEY` — Google AI API key

Redis is optional — if `REDIS_URL` is not set, in-memory state is used automatically.

### 5. Run locally

```bash
pnpm dev
```

### 6. Expose with a tunnel

```bash
ngrok http 3000
```

Update the Slack Event Subscriptions URL to `https://<your-tunnel>.ngrok.io/api/webhooks/slack`.

### 7. Test

1. Invite the bot to a channel: `/invite @My Bot`
2. @mention the bot — it replies with an interactive card
3. Reply in the thread — AI generates a response

## Project Structure

```
my-slack-bot/
├── app/
│   ├── api/webhooks/[platform]/route.ts   # Webhook handler
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── bot.tsx                            # Chat SDK bot definition
├── slack-app-manifest.yml                 # Slack app manifest
├── .env.example
└── package.json
```

## References

- [Chat SDK Documentation](https://chat-sdk.dev/docs)
- [Slack Bot Guide](https://chat-sdk.dev/docs/guides/slack-nextjs)
- [AI SDK Documentation](https://sdk.vercel.ai/)
- [Google AI Studio](https://aistudio.google.com/)
