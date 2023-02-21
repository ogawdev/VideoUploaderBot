const { Scenes, Markup } = require("telegraf");
const scene = new Scenes.BaseScene("menu");

scene.enter((ctx) => {
  ctx.reply(
    ctx.i18n.t("menu"),
    Markup.keyboard([
      [ctx.i18n.t("download")],
      [ctx.i18n.t("contact"), ctx.i18n.t("settings")],
    ]).resize()
  );

  scene.hears(ctx.i18n.t("download"),async (ctx) => {
    ctx.scene.enter("download")
  });
});

module.exports = scene;
