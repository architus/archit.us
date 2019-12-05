// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (config, storybook = false) => {
  // Inline SVG loader
  (storybook ? config.module.rules : config.module.rules[0].oneOf).unshift({
    test: /\.inline\.svg$/,
    loader: "svg-inline-loader"
  });

  // Raw text loader
  config.module.rules.push({
    test: /\.txt$/,
    loader: "raw-loader"
  });

  return config;
};
