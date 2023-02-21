const ytdl = require("ytdl-core");
const fs = require("fs");
// (async () => {
//   let info = await ytdl.getInfo("Rhoi48THJpY", (err, info) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//   });

//   //   console.log("Video title:", info);
//   console.log("Video formats:");
//   const mp4Formats = info.formats.filter((format) =>
//     format.mimeType.includes("video/mp4")
//   );
// //   mp4Formats.forEach((format, index) => {
// //     const quality = format.qualityLabel || format.resolution;
// //     console.log(
// //       `${quality}
// //       } bytes`
// //     );
// //   });

//   const formats = info.formats.filter(
//     (format) =>
//       format.hasVideo &&
//       format.hasAudio &&
//       format.contentLength &&
//       format.contentLength <= 100000000 &&
//       format.mimeType.includes("video/mp4")
//   );

//    const format = ytdl.chooseFormat(formats, { quality: "highest" });
//     const stream = ytdl.downloadFromInfo(info, { format: formats[0] });
//   //   stream.pipe(fs.createWriteStream("video.mp4"));
// })();

(async () => {
  const info = await ytdl.getInfo("https://youtu.be/Rhoi48THJpY");
  const formats = info.formats.filter(
    (format) =>
      format.hasVideo &&
      format.hasAudio &&
      format.mimeType.includes("video/mp4")
  );

  let qualityList = [];

  formats.forEach((format, index) => {
    const quality = format.qualityLabel || format.resolution;
    qualityList.push(quality);
  });

  console.log(qualityList);
})();
