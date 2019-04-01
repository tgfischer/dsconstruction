const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev" } = minimist(process.argv.slice(2));

shell.exec("npx lerna bootstrap");
let result = shell.exec(
  `npx lerna --scope=@dsconstruction/users exec "yarn deploy --stage ${stage}"`
);
if (result.code !== 0) {
  return;
}
result = shell.exec(
  `npx lerna --scope=@dsconstruction/backend exec "yarn deploy --stage ${stage}"`
);
if (result.code !== 0) {
  return;
}
shell.exec(
  `npx lerna --scope=@dsconstruction/frontend exec "yarn deploy --stage ${stage}"`
);
