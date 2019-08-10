module.exports = config => {
  // Inline SVG loader
  config.module.rules[0].oneOf.unshift({
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
