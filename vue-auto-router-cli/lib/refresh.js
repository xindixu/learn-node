const fs = require("fs");
const handlebars = require("handlebars");

module.exports = async () => {
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = handlebars.compile(content)(meta);

      fs.writeFileSync(filePath, result);
      console.log(`${filePath} created!`);
    }
  }

  // get view list
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));

  // Generate router
  compile({ list }, "./src/router.js", "./template/router.js.hbs");
  // Generate nav link
  compile({ list }, "./src/App.vue", "./template/App.vue.hbs");
};
