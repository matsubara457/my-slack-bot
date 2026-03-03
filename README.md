# My Slack Bot - Chat SDK

AI-powered Slack bot built with [Chat SDK](https://chat-sdk.dev/), Next.js, and [AI SDK](https://sdk.vercel.ai/).

## Features

- **AI Chat** — Responds to messages using Claude via AI SDK
- **Interactive UI** — Cards with buttons rendered natively in Slack
- **Thread Subscriptions** — Multi-turn conversations with context
- **Serverless** — Deploys to Vercel with zero infrastructure

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Bot SDK | [Chat SDK](https://chat-sdk.dev/) (`chat` + `@chat-adapter/slack`) |
| AI | [AI SDK](https://sdk.vercel.ai/) + Anthropic Claude |
| State | Redis (`@chat-adapter/state-redis`) |
| Deploy | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Redis instance
- Slack workspace (admin access)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From an app manifest**
3. Paste the manifest from `slack-app-manifest.yml`
4. Install to your workspace

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

- `SLACK_BOT_TOKEN` — Bot User OAuth Token (`xoxb-...`)
- `SLACK_SIGNING_SECRET` — App Signing Secret
- `REDIS_URL` — Redis connection string
- `ANTHROPIC_API_KEY` — Anthropic API key

### 4. Run locally

```bash
pnpm dev
```

### 5. Expose with a tunnel

```bash
ngrok http 3000
```

Update the Slack Event Subscriptions URL to `https://<your-tunnel>.ngrok.io/api/webhooks/slack`.

### 6. Test

1. Invite the bot to a channel: `/invite @mybot`
2. @mention the bot — it replies with an interactive card
3. Reply in the thread — AI generates a response

## Deploy to Vercel

```bash
vercel deploy
```

Set environment variables in the Vercel dashboard and update the Slack webhook URL to your production domain.

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
