const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

shell.exec(`npx serverless client remove --stage ${stage} --no-confirm`);
shell.exec(`npx serverless remove --verbose --stage ${stage}`);
