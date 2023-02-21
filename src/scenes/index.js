const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
  require("./menu"),
  require("./download"),
  require("./youtube"),
]);

module.exports = stage;
