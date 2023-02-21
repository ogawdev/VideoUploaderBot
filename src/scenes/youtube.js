const { Scenes, Markup } = require("telegraf");
const scene = new Scenes.BaseScene("youtube");
const ytdl = require("ytdl-core");
const fs = require("fs");
scene.enter(async (ctx) => {
  const info = await ytdl.getInfo(ctx.message.text);

  const formats = info.formats.filter(
    (format) =>
      format.hasVideo &&
      format.hasAudio 
      &&
      format.contentLength &&
      format.contentLength <= 100000000 
    //   && format.mimeType.includes("video/mp4")
  );

  let qualityList = [];

  formats.forEach((format, index) => {
    const quality = format.qualityLabel || format.resolution;
    qualityList.push(quality);
  });

  console.log(qualityList);

  ctx.reply(
    ctx.i18n.t("upload_section")
    // Markup.keyboard([
    //   [ctx.i18n.t("download")],
    //   [ctx.i18n.t("contact"), ctx.i18n.t("settings")],
    // ]).resize()
  );

  scene.on("text", async (ctx) => {});
});

module.exports = scene;
