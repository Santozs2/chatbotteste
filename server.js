import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { handleMessage, resetSession } from "./bot.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// Recebe uma mensagem do usuário e devolve as respostas do bot.
app.post("/api/message", (req, res) => {
  const { userId, text } = req.body;
  if (!userId || typeof text !== "string") {
    return res.status(400).json({ error: "userId e text são obrigatórios." });
  }
  const replies = handleMessage(userId, text);
  res.json({ replies });
});

// Reinicia a sessão de um usuário.
app.post("/api/reset", (req, res) => {
  const { userId } = req.body;
  if (userId) resetSession(userId);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`\n✅ Simulador de chatbot WhatsApp rodando!`);
  console.log(`   Abra: http://localhost:${PORT}\n`);
});
