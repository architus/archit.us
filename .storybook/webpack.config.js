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
          includePaths: [
            path.resolve("./node_modules"),
            path.resolve("./src")
          ]
        }
      }
    ]
  });

  // Inline SVG loader
  config.module.rules.unshift({
    test: /\.inline\.svg$/,
    loader: "svg-inline-loader"
  });

  // Return the altered config
  return config;
};
