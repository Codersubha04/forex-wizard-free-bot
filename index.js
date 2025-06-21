require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_API;
const bot = new TelegramBot(token, { polling: true });

// ✅ /start – Welcome message + educational value
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const welcomeMessage = `👋 *Welcome to Forex Wizard Academy, ${firstName}!*

🎓 Learn how institutional traders approach the market.

Get free access to:
• Beginner-friendly trading course
• Smart Money Concept (SMC) tips
• Daily market structure breakdowns
• Risk & psychology guidance

Use the menu or commands below to begin.`;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📖 Free Lessons", callback_data: "lesson1" }],
        [{ text: "📈 Daily Tip", callback_data: "tip" }],
        [{ text: "🔗 Join Free Channel", url: "https://t.me/fxtradingwizard" }]
      ]
    }
  });

  // Show reply keyboard for more options
  setTimeout(() => {
    bot.sendMessage(chatId, "👇 Choose an option:", {
      reply_markup: {
        keyboard: [
          ['Join Community', 'Telegram Support'],
          ['Website Support', 'Privacy Policy']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    });
  }, 1200);
});

// ✅ Handle button replies via keyboard
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (text === '/start') return;

  if (text === 'Join Community') {
    return bot.sendMessage(chatId, `📢 *Join Our Free Telegram Channel:*\n\nDaily education & SMC-based market updates.\n\n_Not financial advice._`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Join Channel", url: "https://t.me/fxtradingwizard" }]
        ]
      }
    });
  }

  if (text === 'Telegram Support') {
    return bot.sendMessage(chatId, `💬 *Need Help?*\n\nTalk to our support team on Telegram.`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "💬 Contact Support", url: "https://t.me/forexwizardadmin" }]
        ]
      }
    });
  }

  if (text === 'Website Support') {
    return bot.sendMessage(chatId, `🌐 *Visit Our Website:*\n\nFull trading course, resources, and support.`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌍 forextradingwizard.com", url: "https://forextradingwizard.com" }]
        ]
      }
    });
  }

  if (text === 'Privacy Policy') {
    return bot.sendMessage(chatId, `🔒 *Privacy Policy:*\n\nWe do not collect personal data. For full policy, visit:\nhttps://forextradingwizard.com/telegram-privacy-policy/`, {
      parse_mode: "Markdown",
      disable_web_page_preview: true
    });
  }

  return bot.sendMessage(chatId, "📌 Please use the menu buttons to navigate. This bot is for educational purposes only.");
});

// ✅ Educational commands
bot.onText(/\/tip/, (msg) => {
  bot.sendMessage(msg.chat.id, `📈 *Daily Trading Tip:*\n\nAlways identify liquidity zones before placing trades. Smart Money often hunts stop-losses first.\n\n_Education only._`, { parse_mode: "Markdown" });
});

bot.onText(/\/lesson1/, (msg) => {
  bot.sendMessage(msg.chat.id, `📖 *Lesson 1: Market Structure Basics*\n\nStructure = how price moves.\n• Higher Highs (HH)\n• Higher Lows (HL)\nUnderstanding structure helps forecast future moves.\n\n_More in the full course._`, { parse_mode: "Markdown" });
});

bot.onText(/\/disclaimer/, (msg) => {
  bot.sendMessage(msg.chat.id, `⚠️ *Disclaimer:*\n\nThis bot is for educational purposes only. We do not provide financial advice, signals, or investment guidance. Trading involves risk.`, { parse_mode: "Markdown" });
});

bot.on('callback_query', (callback) => {
  const chatId = callback.message.chat.id;
  const data = callback.data;

  if (data === 'lesson1') {
    bot.sendMessage(chatId, `📖 *Lesson 1: Market Structure Basics*\n\nStructure = how price moves.\n• Higher Highs (HH)\n• Higher Lows (HL)\n\nUse this to predict trends.`, { parse_mode: "Markdown" });
  }

  if (data === 'tip') {
    bot.sendMessage(chatId, `📈 *Daily Tip:*\n\nPatience beats overtrading. Let price come to your level, not the other way around.`, { parse_mode: "Markdown" });
  }
});
