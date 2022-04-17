const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

const { code } = shell.exec(
  `npx --no-install serverless deploy --stage ${stage} --verbose`
);

if (code !== 0) {
  return;
}

shell.exec(`npx --no-install serverless client build --stage ${stage}`);
shell.exec(
  `npx --no-install serverless client deploy --stage ${stage} --no-confirm`
);
