import {
  Chat,
  Card,
  CardText as Text,
  Actions,
  Button,
  Divider,
} from "chat";
import { createSlackAdapter } from "@chat-adapter/slack";
import { createRedisState } from "@chat-adapter/state-redis";
import { createMemoryState } from "@chat-adapter/state-memory";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const useMemory = !process.env.REDIS_URL;

let _bot: Chat | null = null;

export function getBot(): Chat {
  if (!_bot) {
    _bot = new Chat({
      userName: "mybot",
      adapters: {
        slack: createSlackAdapter(),
      },
      state: useMemory ? createMemoryState() : createRedisState(),
    });

    _bot.onNewMention(async (thread) => {
      await thread.subscribe();

      const card = Card({
        title: "Hello!",
        children: [
          Text(
            "I'm now listening to this thread. Ask me anything or try a button:"
          ),
          Divider(),
          Actions([
            Button({ id: "ask-ai", label: "Ask AI", style: "primary" }),
            Button({ id: "info", label: "Show Info" }),
          ]),
        ],
      });

      await thread.post(card);
    });

    _bot.onSubscribedMessage(async (thread, message) => {
      await thread.startTyping();

      const { text } = await generateText({
        model: google("gemini-2.0-flash"),
        system:
          "You are a helpful assistant in a Slack workspace. Answer concisely in the same language the user writes in.",
        prompt: message.text,
      });

      await thread.post(text);
    });

    _bot.onAction("ask-ai", async (event) => {
      await event.thread.post(
        `Hi ${event.user.fullName}! Just type your question in this thread and I'll answer with AI.`
      );
    });

    _bot.onAction("info", async (event) => {
      await event.thread.post(
        [
          `Platform: ${event.thread.adapter.name}`,
          `Built with: Chat SDK + AI SDK + Next.js`,
          `Model: Gemini 2.0 Flash (free)`,
        ].join("\n")
      );
    });
  }

  return _bot;
}
