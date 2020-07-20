/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-param-reassign */
import chalk from "chalk";
import fs from "fs-extra";
import nodePath from "path";
import { GenerateSW } from "workbox-webpack-plugin";

import transform from "./src/build/webpack.transform";

/**
 * Generates the manifest JSON string
 * @param state - current CLI state
 */
function generateManifest(state) {
  const {
    config: { siteRoot, basePath },
  } = state;

  const name = process.env.SITE_NAME ?? "Architus";
  const withBasePath = (path) => {
    const derivedBase =
      basePath == null || basePath.trim() === "" ? "" : `/${basePath}`;
    return `${derivedBase}${path}`;
  };

  return JSON.stringify({
    name,
    short_name: name,
    description:
      "General purpose Discord bot supporting advanced role management, custom emotes for non-nitro users, configurable response commands, and more.",
    homepage_url: siteRoot,
    start_url: `/${basePath ?? ""}`,
    background_color: "#496D8F",
    theme_color: "#6496C4",
    display: "standalone",
    icons: [
      {
        src: withBasePath("/android-chrome-192x192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: withBasePath("/android-chrome-256x256.png"),
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: withBasePath("/android-chrome-512x512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });
}

export default () => ({
  // Render the manifest file during build
  afterExport: async (state) => {
    const {
      config: {
        paths: { DIST },
      },
    } = state;

    const filename = "manifest.json";
    console.log(`Generating ${filename}...`);
    const manifestContents = generateManifest(state);
    await fs.writeFile(nodePath.join(DIST, filename), manifestContents);
    console.log(chalk.green(`[\u2713] ${filename} generated`));
  },
  // Transform the webpack config
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
              "https://fonts.(?:googleapis|gstatic).com/(.*)"
            ),
            handler: "CacheFirst",
          },
          {
            urlPattern: /\/.*(css|js|woff2)/,
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

    // Packtracker CI uploading
    if (args.includes("--pt-enable")) {
      const PacktrackerPlugin = require("@packtracker/webpack-plugin");
      console.log("Uploading packtracker stats during CI");
      config.plugins.push(
        new PacktrackerPlugin({
          project_token: process.env.PT_PROJECT_TOKEN,
          upload: true,
          fail_build: true,
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
