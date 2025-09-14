import TelegramBot from "node-telegram-bot-api";

// Бот-токен от @BotFather
const TOKEN = process.env.TELEGRAM_TOKEN;

// Создаём "виртуального" бота без polling
const bot = new TelegramBot(TOKEN);

// Хэндлер для webhook (Vercel вызывает эту функцию)
export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    // Обработка текстовых сообщений
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Пример реакции
      if (text === "/start") {
        await bot.sendMessage(chatId, "Привет 👋 Я бот на Vercel!");
      } else {
        await bot.sendMessage(chatId, `Ты написал: ${text}`);
      }
    }

    return res.status(200).send("ok");
  }

  res.status(200).send("Bot is running 🚀");
}
