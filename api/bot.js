import fetch from "node-fetch";

export const config = { api: { bodyParser: true } };

const TOKEN = process.env.TELEGRAM_TOKEN;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const update = req.body;

      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

        let reply = text === "/start" ? "Привет Александр! Я буду служить тебе верой и правдой" : `Ты написал: ${text}`;

        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: reply }),
        });
      }

      return res.status(200).send("ok");
    } catch (error) {
      console.error("Ошибка в API бота:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.status(200).send("Bot is running 🚀");
}
