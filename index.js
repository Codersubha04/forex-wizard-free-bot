require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_API;
const bot = new TelegramBot(token, { polling: true });

// ✅ /start – Welcome + join button
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const welcomeMessage = `👋 *Welcome to Forex Wizard Academy!*\n\nJoin our *Free Telegram Channel* to access institutional trading education, market insights, and beginner-friendly lessons.\n\n👉 Tap the button below to join now.`;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 Join Free Channel", url: "https://t.me/fxtradingwizard" }]
      ]
    }
  });

  setTimeout(() => {
    bot.sendMessage(chatId, `Hi ${firstName}, how can we assist you today?`, {
      reply_markup: {
        keyboard: [
          ['Join Community', 'Telegram Support'],
          ['Website Support', 'Results']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    });
  }, 1000);
});

// ✅ Handle message replies
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (text === '/start') return;

  // 🔗 Join Community
  if (text === 'Join Community') {
    bot.sendMessage(chatId, `🔗 *Join Our Free Telegram Channel:*\n\nGet access to free lessons, updates, and market education.\n\n_This is not financial advice._`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Join Channel", url: "https://t.me/fxtradingwizard" }]
        ]
      }
    });
    return;
  }

  // 💬 Telegram Support
  if (text === 'Telegram Support') {
    bot.sendMessage(chatId, `💬 *Need Help on Telegram?*\n\nSpeak directly with our support team.`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "💬 Contact on Telegram", url: "https://t.me/fxtradingwizard" }]
        ]
      }
    });
    return;
  }

  // 🌐 Website Support
  if (text === 'Website Support') {
    bot.sendMessage(chatId, `🌐 *Visit Our Website:*\n\nExplore trading programs, strategies, and mentorship.`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌍 Open Website", url: "https://forextradingwizard.com" }]
        ]
      }
    });
    return;
  }

  // 📊 Results
  if (text === 'Results') {
    bot.sendMessage(chatId, `📊 *October 2024 Trading Results:*\n\nCheck out some of our recent trade outcomes.`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "📸 View Results", url: "https://t.me/fxtradingwizard" }]
        ]
      }
    });
    return;
  }

  // ❓ Fallback message
  bot.sendMessage(chatId, "📌 Please use the menu buttons to continue. This bot is for educational purposes only.");
});
