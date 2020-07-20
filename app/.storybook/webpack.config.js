const transform = require("../src/Build/webpack.transform");
const path = require("path");

module.exports = async ({ config }) => {
  // SASS loader
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          includePaths: [path.resolve("./store"), path.resolve("./src")]
        }
      }
    ]
  });

  // Run common webpack transformer
  return transform(config, true);
};
