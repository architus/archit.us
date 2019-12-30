import { GenerateSW } from "workbox-webpack-plugin";
import transform from "./src/Build/webpack.transform";

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
      // eslint-disable-next-line import/no-extraneous-dependencies
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      console.log("Building webpack statistics file > stats.json");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "disabled",
          generateStatsFile: true
        })
      );
    }

    // Run common webpack transformer
    return transform(config);
  }
});
