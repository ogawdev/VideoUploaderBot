const { log } = require("console");
const { Scenes, Markup } = require("telegraf");
const scene = new Scenes.BaseScene("download");

scene.enter((ctx) => {
  ctx.reply(
    ctx.i18n.t("upload_section")
    // Markup.keyboard([
    //   [ctx.i18n.t("download")],
    //   [ctx.i18n.t("contact"), ctx.i18n.t("settings")],
    // ]).resize()
  );

  scene.on("text", async (ctx) => {
    function getLinkType(link) {
      const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\//;
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
      const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\//;

      if (youtubeRegex.test(link)) {
        return "youtube";
      } else if (tiktokRegex.test(link)) {
        return "tiktok";
      } else if (instagramRegex.test(link)) {
        return "instagram";
      } else {
        return false;
      }
    }

    console.log(getLinkType(ctx.message.text));

    if (getLinkType(ctx.message.text) == "youtube") {
      const fs = require("fs");
      const ytdl = require("ytdl-core");
      const info = await ytdl.getInfo("https://youtu.be/Rhoi48THJpY");
      const formats = info.formats.filter(
        (format) =>
          format.hasVideo &&
          format.hasAudio &&
          format.mimeType.includes("video/mp4")
      );

      let qualityList = [];
      let keyboard = Markup.inlineKeyboard([]);
      formats.forEach((format, index) => {
        const quality = format.qualityLabel || format.resolution;
        qualityList.push({ quality, quality });
        keyboard.push(Markup.callbackButton(quality, quality));
      });
      log(keyboard)
      log(qualityList);
      ctx.reply("Video sifatini tanlang", Markup.inlineKeyboard(qualityList));

      // let result = await ytdl.getInfo("Rhoi48THJpY", (err, info) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }

      //   console.log("Video title:", info.title);
      //   console.log("Video formats:");

      //   info.formats.forEach((format, index) => {
      //     const quality = format.qualityLabel || format.resolution;
      //     console.log(
      //       `${index + 1}: ${format.mimeType} - ${quality} - ${
      //         format.contentLength
      //       } bytes`
      //     );
      //   });
      // });
      // // console.log(result);
      // //   let format = ytdl.chooseFormat(info.formats, { quality: "134" });
      // //   console.log(format);
      // // let stream = ytdl(ctx.message.text, {
      // //   quality: "137",
      // // });
      // // ctx.replyWithVideo({ source: stream });
      // //   .pipe(fs.createWriteStream("video.mp4"));
    }
  });
});

module.exports = scene;
