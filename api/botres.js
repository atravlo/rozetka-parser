import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: false });

const chatId = "68539189";
const text = "Привет! Сообщение с сервера через node-telegram-bot-api";

bot.sendMessage(chatId, text)
  .then(() => console.log("Сообщение отправлено"))
  .catch(console.error);