/* eslint-disable import/no-extraneous-dependencies */

// Creates a wrapper on the Gatsby preset
// that allows it to support corejs 3 in tests

function transformGatsbyPreset(presetFunction) {
  const config = presetFunction();
  config.presets = config.presets.map((preset) => {
    if (typeof preset === "object" && Array.isArray(preset)) {
      const [name, options] = preset;
      if (String(name).includes("@babel/preset-env")) {
        return [name, { ...options, corejs: 3 }];
      }
    }
    return preset;
  });
  return config;
}

const gatsbyPreset = transformGatsbyPreset(require("babel-preset-gatsby"));

module.exports = () => gatsbyPreset;
