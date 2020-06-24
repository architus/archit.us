// See https://gist.github.com/clarkdave/53cc050fa58d9a70418f8a76982dd6c8
//     https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9
//     https://github.com/gatsbyjs/gatsby/issues/1457

// We register the TypeScript evaluator in gatsby-config so we don't need to do
// it in any other .js file. It automatically reads TypeScript config from
// tsconfig.json.
require('ts-node').register();

// Use a TypeScript version of gatsby-config.js.
module.exports = require('./gatsby-config.ts');
