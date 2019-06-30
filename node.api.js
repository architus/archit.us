const { GenerateSW } = require("workbox-webpack-plugin");

export default pluginOptions => ({
  webpack: config => {
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

    return config;
  }
});
