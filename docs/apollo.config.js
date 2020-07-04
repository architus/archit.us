// Used by Apollo GraphQL extension
// From https://github.com/cometkim/gatsby-plugin-typegen#vscode-extension
module.exports = {
  client: {
    name: "your-project-name",
    tagName: "graphql",
    includes: [
      "./src/**/*.{ts,tsx}",
      "./src/__generated__/gatsby-plugin-documents.graphql",
    ],
    service: {
      name: "GatsbyJS",
      localSchemaFile: "./src/__generated__/gatsby-schema.graphql",
    },
  },
};
