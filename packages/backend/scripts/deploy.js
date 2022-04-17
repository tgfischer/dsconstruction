const shell = require("shelljs");
const minimist = require("minimist");

const { stage = "dev", env } = minimist(process.argv.slice(2));

const getEnv = () => {
  if (env) {
    return env;
  }

  switch (stage) {
    case "dev":
      return "--env development";
    case "prod":
      return "--env production";
    default:
      return "";
  }
};

shell.exec(
  `npx --no-install serverless deploy --stage ${stage} --verbose ${getEnv()}`
);
