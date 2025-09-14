import express from "express";

const app = express();

// API маршрут
app.get("/api/hello", (req, res) => {
  res.json({ message: "Привет из Express на Vercel 👋" });
});

// Экспорт для Vercel
export default app;
