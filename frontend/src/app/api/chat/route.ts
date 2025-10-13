// /app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context } = body || {};

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: 'Missing "message" in request body' }, { status: 400 });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      console.error("OPENAI_API_KEY not set");
      return NextResponse.json({ error: "Server misconfiguration: missing API key" }, { status: 500 });
    }

    // Compose prompt/context. We include a system message and the user question.
    const systemMessage = `You are a helpful, careful AI assistant that provides general health information, lifestyle tips, and clarifications about medicines. 
    You MUST NOT provide medical diagnoses or a prescription. Always recommend consulting a qualified healthcare professional for medical decisions. Keep answers concise and friendly.`;

    // If page has a health tip context, attach it to user message to ground the answer
    const userContent = context
      ? `Context (health tip):\n${context}\n\nUser question:\n${message}`
      : message;

    const payload = {
      model: "gpt-3.5-turbo", // change if you have access to another model
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userContent }
      ],
      temperature: 0.2,
      max_tokens: 600
    };

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    // forward OpenAI error if any
    if (!openaiRes.ok) {
      const text = await openaiRes.text();
      console.error("OpenAI error", openaiRes.status, text);
      return NextResponse.json({ error: "OpenAI API error" }, { status: 500 });
    }

    const data = await openaiRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
