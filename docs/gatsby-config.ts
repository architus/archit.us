// Loaded by /gatsby-config.js

export const siteMetadata = {
  title: `Architus Docs`,
  description: `Architus docs re-write.`,
  author: `architus`,
};

export const plugins = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `content`,
      path: `${__dirname}/content`,
    },
  },
];
