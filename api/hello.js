import express from 'express';


const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Node.js on Vercel!');
});

export default app;