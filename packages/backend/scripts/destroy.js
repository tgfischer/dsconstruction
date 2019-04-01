const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

shell.exec(`npx serverless remove --verbose --stage ${stage}`);
shell.exec(`aws dynamodb delete-table --table-name DSCServices${stage}`);
