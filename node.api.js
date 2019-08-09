const { GenerateSW } = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

export default () => ({
  webpack: config => {
    // Service Worker
    config.plugins.push(
      new GenerateSW({
        runtimeCaching: [
          {
            urlPattern: /img/,
            handler: "CacheFirst"
          },
          {
            urlPattern: new RegExp(
              "^https://fonts.(?:googleapis|gstatic).com/(.*)"
            ),
            handler: "CacheFirst"
          },
          {
            urlPattern: /.*/,
            handler: "NetworkFirst"
          }
        ]
      })
    );

    // Bundle analyzer
    const args = process.argv.slice(3);
    if (args.includes("--webpack-stats")) {
      console.log("Building webpack statistics file > stats.json");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "disabled",
          generateStatsFile: true
        })
      );
    }

    // Inline SVG loader
    config.module.rules[0].oneOf.unshift({
      test: /\.inline\.svg$/,
      loader: "svg-inline-loader"
    });

    return config;
  }
});
