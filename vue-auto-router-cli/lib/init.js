const { promisify } = require("util");

const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const open = require("open");
const { clone } = require("./download");

const log = (content) => console.log(chalk.green(content));

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    // stream out
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  const data = await figlet("Vue auto router");

  log(data);

  log(`Creating project: ${name}`);
  await clone("github:su37josephxia/vue-template", name);

  // Installing dependencies

  await spawn("yarn", ["install"], { cwd: `./${name}` });
  log("Done!");
  log(`
  To get started:
  ===========================
    cd ${name}
    yarn run serve
  ===========================
  `);

  open("http://localhost:8080");
  await spawn("yarn", ["run", "serve"], { cwd: `./${name}` });
};
