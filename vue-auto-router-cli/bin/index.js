#!/usr/bin/env node

console.log("vue-auto-router");

const program = require("commander");
program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action((name) => {
    console.log(`Initializing ${name}`);
  });

program.parse(program.argv);
