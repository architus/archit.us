/* eslint-disable no-param-reassign */
import { GenerateSW } from "workbox-webpack-plugin";
import transform from "./src/Build/webpack.transform";

export default () => ({
  webpack: (config) => {
    // Service Worker
    config.plugins.push(
      new GenerateSW({
        runtimeCaching: [
          {
            urlPattern: /img/,
            handler: "CacheFirst",
          },
          {
            urlPattern: new RegExp(
              "^https://fonts.(?:googleapis|gstatic).com/(.*)"
            ),
            handler: "CacheFirst",
          },
          {
            urlPattern: /.*/,
            handler: "NetworkFirst",
          },
        ],
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
          generateStatsFile: true,
        })
      );
    }

    // Add React devtools profiling on non-production site builds
    if (!process.env.PRODUCTION_URL && process.env.NODE_ENV === "production") {
      if (args.includes("--no-profiling")) {
        console.log("Disabling React devtools profiling on this build");
      } else {
        config.resolve.alias["react-dom$"] = "react-dom/profiling";
        config.resolve.alias["scheduler/tracing"] =
          "scheduler/tracing-profiling";
      }
    }

    // Run common webpack transformer
    return transform(config);
  },
});
