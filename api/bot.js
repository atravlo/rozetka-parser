import fetch from "node-fetch";

const TOKEN = process.env.TELEGRAM_TOKEN;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      let reply = "";

      if (text === "/start") {
        reply = "Привет 👋 Я бот на Vercel!";
      } else {
        reply = `Ты написал: ${text}`;
      }

      // Отправляем сообщение через Telegram API
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: reply }),
      });
    }

    return res.status(200).send("ok");
  }

  res.status(200).send("Bot is running 🚀");
}
