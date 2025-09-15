import fetch from "node-fetch";
import fs from 'fs';
import path from 'path';
export const config = { api: { bodyParser: true } };


const filePath = path.join(process.cwd(), '', 'config.json');
const raw = fs.readFileSync(filePath, 'utf-8');
const configJson = JSON.parse(raw);

export default async function handler(req, res) {
  console.log(configJson.tokenBot)
  if (req.method === "POST") {
    console.log("Получен POST от Telegram:", req.body);
    try {
      const update = req.body;

      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

        let reply = text === "/start" ? "Привет Александр! Великий мастер гипноза. Я буду служить тебе верой и правдой" : `Ты написал: ${text}`;

        await fetch(`https://api.telegram.org/bot${configJson.tokenBot}/sendMessage`, {
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

  res.status(200).send("Bot is running");
}
