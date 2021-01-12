const fs = require("fs");
const path = require("path");

const PUBLIC = "/public";

module.exports = (dirPath = "./public") => async (ctx, next) => {
  if (ctx.url.startsWith(PUBLIC)) {
    const url = path.resolve(__dirname, dirPath);
    const fileBaseName = path.basename(url);
    const filePath = `${url}${ctx.url.replace(PUBLIC, "")}`;

    try {
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        const dir = fs.readdirSync(filePath);
        const html = [`<div style="padding-left: 24px;">`];
        dir.forEach((fileName) => {
          if (fileName.indexOf(".") > -1) {
            html.push(
              `<p><a style="color:black" href="${ctx.url}/${fileName}">${fileName}</a></p>`
            );
          } else {
            // 文件
            html.push(
              `<p><a href="${ctx.url}/${fileName}">${fileName}</a></p>`
            );
          }
        });

        html.push("</div>");
        ctx.body = html.join("");
      } else {
        const content = fs.readFileSync(filePath);
        ctx.body = content;
      }
    } catch (e) {
      ctx.body = "404 Not Found";
    }
  }
};
