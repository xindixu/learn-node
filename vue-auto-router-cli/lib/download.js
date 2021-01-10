const { promisify } = require("util");

module.exports.clone = async function (repo, destination) {
  const download = promisify(require("download-git-repo"));

  const ora = require("ora");
  const process = ora(`Downloading..... ${repo}`);
  process.start();
  await download(repo, destination);
  process.succeed();
};
