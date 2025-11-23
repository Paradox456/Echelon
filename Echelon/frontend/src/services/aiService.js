// backend/aiService.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAPI_API_KEY,
});

export async function generateResponse(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("❌ OpenAI Error:", err);
    throw new Error("Failed to generate AI response");
  }
}
