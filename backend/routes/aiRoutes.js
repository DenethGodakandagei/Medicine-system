// routes/aiRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/askAI", async (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res
      .status(400)
      .json({ success: false, message: "Message is required" });
  }

  // Define your models: try GPT-4 first, then fallback to GPT-3.5
  const models = ["gpt-4o-mini", "gpt-3.5-turbo"];

  let reply = "";
  let lastError = null;

  for (const model of models) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: model,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI health assistant. Answer questions about health tips, medicines, and general medical guidance. Do not give personal medical diagnosis or prescriptions.",
            },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      reply = response.data.choices[0].message.content;
      return res.json({ success: true, reply });
    } catch (error) {
      lastError = error.response?.data || error.message;

      // If insufficient quota, try next model
      if (
        error.response?.data?.code === "insufficient_quota" &&
        model === "gpt-4o-mini"
      ) {
        console.warn(
          "GPT-4 quota exceeded. Falling back to GPT-3.5..."
        );
        continue;
      } else {
        // Any other error, break loop
        break;
      }
    }
  }

  console.error("OpenAI API Error:", lastError);
  return res
    .status(500)
    .json({ success: false, message: "Failed to get AI response", error: lastError });
});

export default router;
