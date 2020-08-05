import { GatsbyNode, SourceNodesArgs } from "gatsby";

import { botStatsType, createBotStatsNode } from "@app/build/bot-stats";
import {
  buildMetadataType,
  createBuildMetadataNode,
} from "@app/build/build-metadata";
import { Nil } from "@architus/lib/types";
import { isDefined } from "@architus/lib/utility";

// Define custom graphql schema to enforce rigid type structures,
// and create any custom nodes as needed
export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  args: SourceNodesArgs
): Promise<null> => {
  const { actions, reporter } = args;

  // Re-use activity variable
  let activity = reporter.activityTimer("implementing custom graphql schema");
  activity.start();
  // To add new keys to the frontmatter, see /src/templates/types.ts
  actions.createTypes(`
    ${botStatsType}
    ${buildMetadataType}
`);

  activity.end();
  activity = reporter.activityTimer(`fetching bot usage statistics from API`);
  activity.start();

  await createBotStatsNode(args);

  activity.end();
  activity = reporter.activityTimer(`creating build metadata info`);
  activity.start();

  await createBuildMetadataNode(args);

  activity.end();
  // Some value needed for type
  // See https://github.com/gatsbyjs/gatsby/issues/23296
  return Promise.resolve<null>(null);
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = async ({
  actions,
  getConfig,
  stage,
}): Promise<void> => {
  const { replaceWebpackConfig } = actions;
  const newConfig = getConfig();

  // Patch the webpack config to alias socket.io during linaria evaluation
  newConfig.module.rules = modifyLinariaRule(newConfig.module.rules);

  // Fix CSS ordering rules
  // (not needed since css classes are hashed/won't collide)
  // The only area where this isn't the case is global styles,
  // but we should avoid those as much as possible
  // From https://spectrum.chat/gatsby-js/general/having-issue-related-to-chunk-commons-mini-css-extract-plugin~0ee9c456-a37e-472a-a1a0-cc36f8ae6033?m=MTU3MjYyNDQ5OTAyNQ==
  if (stage === "build-javascript") {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin: { constructor: { name: string } }) =>
        plugin.constructor.name === "MiniCssExtractPlugin"
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }

  replaceWebpackConfig(newConfig);
};

type Rule = { use?: Array<{ loader: string; options?: object }> };

function modifyLinariaRule(rules: Rule[]): Rule[] {
  return rules.map((rule) => {
    // Select the linaria rules
    if (
      isDefined(rule?.use) &&
      rule.use.length > 0 &&
      rule.use[0].loader === "linaria/loader"
    ) {
      return {
        ...rule,
        use: rule.use.map((use) => {
          const { options } = use;
          const linariaOptions = options as
            | {
                babelOptions: { presets: object[]; plugins: object[] };
              }
            | Nil;
          if (isDefined(linariaOptions)) {
            const { babelOptions } = linariaOptions;
            return {
              ...use,
              options: {
                ...linariaOptions,
                babelOptions: {
                  ...babelOptions,
                  plugins: [
                    ...(babelOptions?.plugins ?? []),
                    [
                      "babel-plugin-module-resolver",
                      {
                        root: ["."],
                        alias: {
                          "@architus/facade": "../design/src",
                          "@architus/lib": "../lib/src",
                          "@docs": "../docs/src",
                          "@app": "../app/src",
                          "socket.io-client": "../.shared/socket.io-linaria",
                        },
                      },
                    ],
                  ],
                },
              },
            };
          }

          return use;
        }),
      };
    }

    return rule;
  });
}
