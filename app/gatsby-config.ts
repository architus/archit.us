// Loaded by /gatsby-config.js
import * as dotenv from "dotenv";
import path from "path";

import {
  themeColor,
  themeBgColor,
  msTileColor,
} from "@architus/facade/theme/color";

dotenv.config();
const title = process.env.SITE_NAME ?? "Architus";
const description = `General purpose Discord bot supporting advanced role management, custom emotes for non-nitro users, configurable response commands, and more.`;

export const pathPrefix = process.env.SITE_BASE_PATH ?? "/";

export const siteMetadata = {
  title,
  description,
  author: `architus`,
  version: "v0.2.1",
  siteUrl: process.env.SITE_ROOT ?? "https://archit.us",
  themeColor,
  msTileColor,
  footer: {
    about: `This site contains implementation documentation for the architus ecosystem, including the microservice-based backend application as well as the React-based web dashboard.`,
    links: [
      {
        href: "https://discord.gg/svrRrSe",
        text: "Discord server",
        icon: "discord",
      },
      {
        href: "https://github.com/architus",
        text: "GitHub",
        icon: "github",
      },
      {
        href: "https://docs.archit.us/",
        text: "Documentation",
      },
      ...(process.env.SITE_ROOT !== "https://archit.us"
        ? [
            {
              href: "https://archit.us/",
              text: "Live build",
            },
          ]
        : []),
      ...(process.env.SITE_ROOT !== "https://docs.archit.us"
        ? [
            {
              href: "https://develop.archit.us/",
              text: "Canary build",
            },
          ]
        : []),
      {
        href: "https://status.archit.us/",
        text: "Status",
      },
    ],
  },
};

export const plugins = [
  {
    resolve: `gatsby-plugin-alias-imports`,
    options: {
      alias: {
        // Utility absolute base import
        // Same as ../tsconfig.json
        "@app": path.resolve(__dirname, "../app/src"),
        // Same aliases as /tsconfig.json, used to enable sibling development
        // & hot reloading
        "@architus/lib": path.resolve(__dirname, "../lib/src"),
        "@architus/facade": path.resolve(__dirname, "../design/src"),
      },
      extensions: [],
    },
  },
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [`react-data-grid`],
    },
  },
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /\.svg$/,
      },
    },
  },
  "gatsby-plugin-typescript",
  {
    resolve: `gatsby-plugin-create-client-paths`,
    options: { prefixes: [`/app/*`] },
  },
  {
    resolve: `gatsby-plugin-typegen`,
    options: {
      outputPath: `src/__generated__/gatsby-types.d.ts`,
      emitSchema: {
        "src/__generated__/gatsby-introspection.json": true,
        "src/__generated__/gatsby-schema.graphql": true,
      },
      emitPluginDocuments: {
        "src/__generated__/gatsby-plugin-documents.graphql": true,
      },
    },
  },
  "gatsby-plugin-linaria",
  "gatsby-plugin-dark-mode",
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-remove-serviceworker`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: title,
      description,
      /* eslint-disable @typescript-eslint/camelcase */
      short_name: title,
      homepage_url: "https://archit.us",
      start_url: pathPrefix,
      background_color: themeBgColor,
      theme_color: themeColor,
      /* eslint-enable @typescript-eslint/camelcase */
      display: `minimal-ui`,
      icons: [
        {
          // Path prefixes are automatically added to these paths
          src: "/img/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/img/android-chrome-256x256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "/img/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
];
