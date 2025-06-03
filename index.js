require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Bot token from .env file
const token = process.env.BOT_API;
const bot = new TelegramBot(token, { polling: true });

// Links
const FREE_CHANNEL = "https://t.me/forexwizardfree";
const PAID_CHANNEL = "https://t.me/forexwizardpaid";
const SUPPORT_LINK = "https://t.me/ForexWizardSupport";
const WEBSITE_LINK = "https://forexwizard.com";

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const welcomeMessage = `
👋 *Welcome to Forex Wizard, ${firstName}!*

You're now part of a growing trader community focused on mastering:
📘 *Forex Education*  
📊 *Smart Market Strategies*  
💡 *Trading Psychology*

🚫 No trading signals – *100% Educational Only*

🔰 Step 1: Join our Free Learning Channel
👇👇👇
  `;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: "📘 Join Free Channel", url: FREE_CHANNEL }],
        [{ text: "✅ I Joined Free Channel", callback_data: "joined_free" }],
        [{ text: "📞 Contact Support", url: SUPPORT_LINK }]
      ]
    }
  });
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === "joined_free") {
    const upgradeMessage = `
🎉 *Awesome!* You're ready to take the next step!

💎 *Forex Wizard Premium* includes:
- Advanced strategies & chart breakdowns
- Weekly trade reviews & market outlook
- Priority support & mentorship

🔐 Limited access to serious learners.

👇 Click to join the premium paid group:
    `;

    bot.sendMessage(chatId, upgradeMessage, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Join Paid Channel", url: PAID_CHANNEL }],
          [{ text: "🔙 Back to Menu", callback_data: "menu" }]
        ]
      }
    });

    setTimeout(() => {
      bot.sendMessage(chatId, `
📌 *Reminder:* All content is for educational purposes only.  
We do *not* provide financial or investment advice.

Need help? Contact us: ${SUPPORT_LINK}
      `, { parse_mode: "Markdown" });
    }, 1000);
  }

  if (data === "menu") {
    sendMainMenu(chatId);
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

// Function to show the main menu
function sendMainMenu(chatId) {
  bot.sendMessage(chatId, "📋 *Main Menu:*", {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📘 Join Free Channel", url: FREE_CHANNEL }],
        [{ text: "✅ I Joined Free Channel", callback_data: "joined_free" }],
        [{ text: "🌐 Website", url: WEBSITE_LINK }],
        [{ text: "📞 Support", url: SUPPORT_LINK }],
        [{ text: "ℹ️ About", callback_data: "about" }, { text: "⚠️ Disclaimer", callback_data: "disclaimer" }]
      ]
    }
  });
}

// Handle text commands
bot.onText(/\/help|\/commands/, (msg) => {
  sendMainMenu(msg.chat.id);
});

bot.onText(/\/about/, (msg) => {
  bot.sendMessage(msg.chat.id, `
📘 *About Forex Wizard Bot*

Forex Wizard is a learning platform for traders:
- Market patterns & risk education
- No signals, no financial advice
- Strictly educational use only

Website: ${WEBSITE_LINK}  
Support: support@forexwizard.com
`, { parse_mode: "Markdown" });
});

bot.onText(/\/disclaimer/, (msg) => {
  bot.sendMessage(msg.chat.id, `
⚠️ *Disclaimer*

This bot provides educational content only.
We do not provide financial or investment advice.
Trading involves risk. Always research before making decisions.

Privacy Policy: ${WEBSITE_LINK}/privacy-policy/
`, { parse_mode: "Markdown" });
});

// Handle unknown messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore commands and known interactions
  if (text.startsWith('/')) return;

  bot.sendMessage(chatId, "📌 Please use the menu below to navigate. Use /start to begin.");
});
