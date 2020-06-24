// Loaded by /gatsby-config.js

export const siteMetadata = {
  title: `Architus Docs`,
  description: `Architus docs re-write.`,
  author: `architus`,
};

export const plugins = [
  "gatsby-plugin-typescript",
  "gatsby-plugin-linaria",
  `gatsby-plugin-react-helmet`,
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
      gatsbyRemarkPlugins: [],
      plugins: [],
    },
  },
];
