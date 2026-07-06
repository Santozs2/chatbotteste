// Motor do chatbot - lógica de respostas.
// Cada sessão mantém estado próprio (para fluxos com etapas).

const sessions = new Map();

function getSession(userId) {
  if (!sessions.has(userId)) {
    sessions.set(userId, { step: "menu", data: {} });
  }
  return sessions.get(userId);
}

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Menu principal apresentado ao usuário.
const MENU = [
  "👋 Olá! Sou o *Bot de Teste*. Escolha uma opção:",
  "",
  "1️⃣ - Horário de atendimento",
  "2️⃣ - Falar com um atendente",
  "3️⃣ - Fazer um pedido",
  "4️⃣ - Encerrar conversa",
  "",
  "Digite o número da opção."
].join("\n");

// Processa uma mensagem recebida e devolve uma lista de respostas do bot.
export function handleMessage(userId, rawText) {
  const session = getSession(userId);
  const text = normalize(rawText);

  // Comandos globais disponíveis em qualquer etapa.
  if (["menu", "inicio", "voltar", "oi", "ola"].includes(text)) {
    session.step = "menu";
    session.data = {};
    return [MENU];
  }

  switch (session.step) {
    case "menu":
      return handleMenu(session, text);
    case "pedido_nome":
      session.data.nome = rawText.trim();
      session.step = "pedido_item";
      return ["Qual produto você deseja pedir?"];
    case "pedido_item":
      session.data.item = rawText.trim();
      session.step = "pedido_confirma";
      return [
        `Confirme seu pedido:\n\n👤 Nome: ${session.data.nome}\n📦 Item: ${session.data.item}\n\nDigite *sim* para confirmar ou *não* para cancelar.`
      ];
    case "pedido_confirma":
      if (["sim", "s", "confirmar"].includes(text)) {
        const resumo = `✅ Pedido confirmado!\n\n👤 ${session.data.nome}\n📦 ${session.data.item}\n\nObrigado! Digite *menu* para voltar.`;
        session.step = "menu";
        session.data = {};
        return [resumo];
      }
      if (["nao", "n", "cancelar"].includes(text)) {
        session.step = "menu";
        session.data = {};
        return ["❌ Pedido cancelado. Digite *menu* para recomeçar."];
      }
      return ["Não entendi. Digite *sim* para confirmar ou *não* para cancelar."];
    default:
      session.step = "menu";
      return [MENU];
  }
}

function handleMenu(session, text) {
  switch (text) {
    case "1":
      return [
        "🕐 *Horário de atendimento*\nSegunda a sexta: 09h às 18h\nSábado: 09h às 13h\n\nDigite *menu* para voltar."
      ];
    case "2":
      return [
        "💬 Encaminhando você para um atendente humano...\n(Isto é um teste, nenhum atendente real será chamado.)\n\nDigite *menu* para voltar."
      ];
    case "3":
      session.step = "pedido_nome";
      return ["📝 Vamos fazer seu pedido!\n\nPrimeiro, qual é o seu nome?"];
    case "4":
      session.step = "menu";
      session.data = {};
      return ["👋 Conversa encerrada. Até logo! Digite qualquer coisa para recomeçar."];
    default:
      return [
        "Opção inválida. 🤔\n\n" + MENU
      ];
  }
}

export function resetSession(userId) {
  sessions.delete(userId);
}
