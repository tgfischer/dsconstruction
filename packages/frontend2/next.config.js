require("dotenv").config();

const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const DotEnv = require("dotenv-webpack");
const path = require("path");

module.exports = withSass(
  withCSS({
    webpack: config => {
      config.plugins = config.plugins || [];
      config.plugins = [
        ...config.plugins,
        new DotEnv({
          path: path.join(__dirname, ".env"),
          system: true
        })
      ];
      config.module.rules.push({
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      });
      return config;
    }
  })
);
