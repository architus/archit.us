// Loaded by /gatsby-config.js
import { themeColor, themeBgColor, msTileColor } from "@design/theme/color";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();
const title = process.env.SITE_NAME ?? "Architus Docs";
const description = `General purpose Discord bot supporting advanced role management, custom emotes for non-nitro users, configurable response commands, and more.`;

export const pathPrefix = process.env.SITE_BASE_PATH ?? "/";

export const siteMetadata = {
  title,
  headerTitle: `Documentation`,
  version: "Rolling release",
  description,
  author: `architus`,
  siteUrl: process.env.SITE_ROOT ?? "https://docs.archit.us",
  themeColor,
  msTileColor,
  github: {
    owner: "architus",
    name: "archit.us",
    docsRoot: "docs/content/",
    branch: process.env.GITHUB_BRANCH ?? "master",
  },
  socials: {
    github: `https://github.com/architus`,
    discord: `https://discord.gg/svrRrSe`,
  },
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
        href: "https://archit.us/",
        text: "Main site",
      },
      {
        href: "https://develop.archit.us/",
        text: "Main site (canary)",
      },
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
        "@lib": path.resolve(__dirname, "../lib/src"),
        "@docs": path.resolve(__dirname, "../docs/src"),
        "@design": path.resolve(__dirname, "../design/src"),
      },
      extensions: [],
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
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: title,
      // eslint-disable-next-line @typescript-eslint/camelcase
      short_name: title,
      description,
      // eslint-disable-next-line @typescript-eslint/camelcase
      homepage_url: "https://docs.archit.us",
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_url: pathPrefix,
      // eslint-disable-next-line @typescript-eslint/camelcase
      background_color: themeBgColor,
      // eslint-disable-next-line @typescript-eslint/camelcase
      theme_color: themeColor,
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
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `content`,
      path: `${__dirname}/content`,
    },
  },
  ...(process.env.GITHUB_TOKEN == null
    ? []
    : [
        {
          resolve: "gatsby-source-graphql",
          options: {
            typeName: "GitHub",
            fieldName: "github",
            url: "https://api.github.com/graphql",
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
            fetchOptions: {},
          },
        },
      ]),
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.md`],
      gatsbyRemarkPlugins: [
        `gatsby-remark-smartypants`,
        `gatsby-remark-slug`,
        `gatsby-remark-copy-linked-files`,
        {
          resolve: "gatsby-remark-embed-snippet",
          options: {
            directory: `${__dirname}/content/`,
          },
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
            aliases: {},
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 1500,
            withWebp: true,
            backgroundColor: themeBgColor,
            linkImagesToOriginal: true,
          },
        },
      ],
      // ! remove plugins when https://github.com/gatsbyjs/gatsby/issues/16242 gets merged
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1500,
            withWebp: true,
            backgroundColor: themeBgColor,
            linkImagesToOriginal: true,
          },
        },
      ],
    },
  },
];
