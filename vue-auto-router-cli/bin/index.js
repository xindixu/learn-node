#!/usr/bin/env node

const program = require("commander");
program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));

program
  .command("refresh")
  .description("Refresh pages")
  .action(require("../lib/refresh"));

program.parse(program.argv);
