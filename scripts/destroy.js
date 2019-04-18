const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

shell.exec("npx lerna bootstrap");

["frontend", "backend", "users"].forEach(service => {
  let result = shell.exec(
    `npx lerna --scope=@dsconstruction/${service} exec "yarn destroy --stage ${stage}"`
  );
  if (result.code !== 0) {
    throw 1;
  }
});

shell.cd("packages/photos");
const result = shell.exec(`npx serverless remove --stage ${stage} --verbose`);
if (result.code !== 0) {
  throw 1;
}
shell.cd("../..");
