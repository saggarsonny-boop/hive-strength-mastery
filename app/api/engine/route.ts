import { NextRequest, NextResponse } from "next/server";
import { PROMPTS } from "@/lib/engine/strengthMasteryConfig";
import type { EngineIntentId } from "@/lib/engine/strengthMasteryConfig";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { intentId, payload } = body;

  const template = PROMPTS[intentId as EngineIntentId];
  if (!template) {
    return NextResponse.json({ intent: "error", content: { message: "Unknown intent" } }, { status: 400 });
  }

  const userMessage = template.userTemplate(payload);
  const systemMessage = `${template.system}\n\n${template.developer}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: systemMessage,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await response.json();
  
  if (!data.content || !data.content[0]) {
    return NextResponse.json({ intent: "error", content: { message: "No response from AI" } });
  }

  const raw = data.content[0].text;

  try {
    const parsed = JSON.parse(raw.trim());
    return NextResponse.json({ intent: intentId, content: parsed });
  } catch {
    return NextResponse.json({ intent: "error", content: { message: "Could not parse response" } });
  }
}
