const { GenerateSW } = require("workbox-webpack-plugin");

export default () => ({
  webpack: (config, { defaultLoaders }) => {
    // Service Worker
    config.plugins.push(
      new GenerateSW({
        runtimeCaching: [
          {
            urlPattern: /img/,
            handler: "cacheFirst"
          },
          {
            urlPattern: new RegExp(
              "^https://fonts.(?:googleapis|gstatic).com/(.*)"
            ),
            handler: "cacheFirst"
          },
          {
            urlPattern: /.*/,
            handler: "networkFirst"
          }
        ]
      })
    );

    // Inline SVG loader
    config.module.rules[0].oneOf.unshift({
      test: /\.inline\.svg$/,
      loader: "svg-inline-loader"
    });

    return config;
  }
});
