import { after } from "next/server";
import { getBot } from "@/lib/bot";

export async function POST(
  request: Request,
  context: { params: Promise<{ platform: string }> }
) {
  const bot = getBot();

  type Platform = keyof typeof bot.webhooks;
  const { platform } = await context.params;

  const handler = bot.webhooks[platform as Platform];
  if (!handler) {
    return new Response(`Unknown platform: ${platform}`, { status: 404 });
  }

  return handler(request, {
    waitUntil: (task) => after(() => task),
  });
}
