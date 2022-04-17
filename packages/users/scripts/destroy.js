const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

shell.exec(`npx --no-install serverless remove --verbose --stage ${stage} --colors`);
