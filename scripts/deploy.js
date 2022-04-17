const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

shell.exec("npx lerna bootstrap");

shell.cd("packages/photos");
const result = shell.exec(`npx --no-install serverless deploy --stage ${stage} --verbose`);
if (result.code !== 0) {
  throw 1;
}
shell.cd("../..");

["users", "backend", "frontend"].forEach(service => {
  let result = shell.exec(
    `npx lerna run deploy --scope=@dsconstruction/${service} -- -- --stage ${stage}`
  );
  if (result.code !== 0) {
    throw 1;
  }
});
