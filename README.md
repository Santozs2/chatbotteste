# 🤖 Simulador de Chatbot WhatsApp

Um simulador interativo de chatbot do WhatsApp para testes e desenvolvimento. Com interface visual realista que imita a aparência do WhatsApp, permite testar fluxos de conversação completos.

## ✨ Funcionalidades

- 📱 **Interface realista** - Simulação visual do WhatsApp Web
- 💬 **Gerenciamento de sessões** - Cada usuário mantém seu próprio estado
- 📝 **Fluxo de pedidos** - Sistema completo de pedidos com confirmação
- 🕐 **Informações** - Menu com horário de atendimento
- 🔄 **Reset de conversa** - Botão para reiniciar a sessão
- ⚡ **API REST** - Endpoints para integração

## 🚀 Como usar

### Pré-requisitos
- Node.js 16+ instalado

### Instalação

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd testeWhatsapp

# Instalar dependências
npm install
```

### Executar

```bash
# Modo produção
npm start

# Modo desenvolvimento (com hot reload)
npm run dev
```

Acesse `http://localhost:3000` no navegador.

## 📚 Estrutura do Projeto

```
testeWhatsapp/
├── server.js          # Servidor Express e rotas da API
├── bot.js             # Lógica do chatbot e gerenciamento de sessões
├── package.json       # Dependências do projeto
└── public/
    └── index.html     # Interface frontend
```

## 🔌 API Endpoints

### POST `/api/message`
Envia uma mensagem e recebe respostas do bot.

**Request:**
```json
{
  "userId": "user-123",
  "text": "1"
}
```

**Response:**
```json
{
  "replies": [
    "🕐 *Horário de atendimento*...",
    "Digite *menu* para voltar."
  ]
}
```

### POST `/api/reset`
Reinicia a sessão do usuário.

**Request:**
```json
{
  "userId": "user-123"
}
```

**Response:**
```json
{
  "ok": true
}
```

## 🎮 Fluxos Disponíveis

### Menu Principal
- **1** - Horário de atendimento (seg-sex: 9h-18h, sábado: 9h-13h)
- **2** - Falar com atendente (simulado)
- **3** - Fazer pedido (nome → produto → confirmação)
- **4** - Encerrar conversa

### Comandos Globais
Disponíveis em qualquer momento:
- `menu` ou `inicio` - Volta ao menu principal
- `oi` ou `ola` - Reinicia a conversa

## 💡 Exemplos de Uso

### Fluxo de Pedido
```
Usuário: 3
Bot: 📝 Vamos fazer seu pedido! Primeiro, qual é o seu nome?

Usuário: João Silva
Bot: Qual produto você deseja pedir?

Usuário: Pizza Margherita
Bot: Confirme seu pedido: João Silva | Pizza Margherita
     Digite *sim* para confirmar ou *não* para cancelar.

Usuário: sim
Bot: ✅ Pedido confirmado!
```

## 🛠️ Tecnologias

- **Backend**: Node.js, Express.js 4.19
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Padrão**: ES Modules

## 📝 Notas Técnicas

- As mensagens são normalizadas (trim, lowercase, sem acentos) para melhor reconhecimento
- Cada sessão é mantida em memória (não persiste entre reinicializações)
- O bot suporta emojis em respostas formatadas com Markdown (*negrito*)
- Interface responsiva para mobile e desktop

## 🚀 Desenvolvimentos Futuros

- [ ] Persistência de dados em banco de dados
- [ ] Integração com WhatsApp API real
- [ ] Dashboard de estatísticas
- [ ] Sistema de templates de respostas
- [ ] Autenticação e multi-usuários
- [ ] Logs de conversas

## 📄 Licença

MIT

## 👤 Autor

Desenvolvido por Luis Antonio

---

Para suporte ou dúvidas, abra uma issue no repositório.
