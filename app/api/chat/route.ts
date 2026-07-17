import { google } from "@ai-sdk/google";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import {
  type JSONSchema7,
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";

export async function POST(req: Request) {
  const {
    messages,
    system,
    tools,
  }: {
    messages: UIMessage[];
    system?: string;
    tools?: Record<string, { description?: string; parameters: JSONSchema7 }>;
  } = await req.json();

 const result = streamText({
  // Change "gemini-2.5-flash" to "gemini-3.5-flash"
  model: google("gemini-3.5-flash"), 
  messages: await convertToModelMessages(messages),
  system: "Your system prompt here",
});

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}