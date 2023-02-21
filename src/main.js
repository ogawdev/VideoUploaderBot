require("dotenv").config();

const bot = require("./core/bot");
const session = require("./core/session");
const stage = require("./scenes");
const i18n = require("./utils/i18n");
const startBot = require("./utils/startBot");

bot.use(session);
bot.use(i18n.middleware())
bot.use(stage.middleware());

// Error handling
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start((ctx) => ctx.scene.enter("menu"));

startBot(bot);
