import fetch from "node-fetch";

const TOKEN = process.env.TELEGRAM_TOKEN; // токен бота
const chatId = 68539189;               // куда отправлять
const text = "Привет! Это сообщение с сервера";

await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: chatId, text }),
});
