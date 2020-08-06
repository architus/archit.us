import PacktrackerPlugin from "@packtracker/webpack-plugin";
import { GatsbyNode, SourceNodesArgs } from "gatsby";

import { pathPrefix } from "./gatsby-config";
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

// Make any modifications to the webpack config as necessary
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = async ({
  actions,
  getConfig,
  stage,
}): Promise<void> => {
  const { replaceWebpackConfig } = actions;
  const newConfig = getConfig();

  newConfig.module.rules = modifyLinariaRule(newConfig.module.rules);
  newConfig.plugins = injectPathPrefixDefinition(newConfig.plugins);

  if (process.env.ENABLE_PACKTRACKER === "1") {
    newConfig.plugins = addPacktrackerPlugin(newConfig.plugins);
  }

  if (stage === "build-javascript") {
    newConfig.plugins = modifyCssExtractPlugin(newConfig.plugins);
  }

  replaceWebpackConfig(newConfig);
};

// Incomplete type
type Plugin = {
  constructor: { name: string };
  options: Record<string, unknown>;
  definitions: Record<string, string>;
};

/**
 * Adds a new packtracker Webpack plugin to track regressions in bundle size
 * See https://docs.packtracker.io/uploading-your-webpack-stats/webpack-plugin
 * @param plugins - Base plugins from the webpack config
 */
function addPacktrackerPlugin(plugins: Plugin[]): Plugin[] {
  return [
    ...plugins,
    new PacktrackerPlugin({
      // eslint-disable-next-line @typescript-eslint/camelcase
      project_token: process.env.PACKTRACKER_TOKEN ?? "",
      upload: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      fail_build: true,
    }) as Plugin,
  ];
}

/**
 * Fixes CSS ordering rules
 * (not needed since css classes are hashed/won't collide)
 * The only area where this isn't the case is global styles,
 * but we should avoid those as much as possible
 * From https://spectrum.chat/gatsby-js/general/having-issue-related-to-chunk-commons-mini-css-extract-plugin~0ee9c456-a37e-472a-a1a0-cc36f8ae6033?m=MTU3MjYyNDQ5OTAyNQ==
 * @param plugins - Base plugins from the webpack config
 */
function modifyCssExtractPlugin(plugins: Plugin[]): Plugin[] {
  return plugins.map((plugin) => {
    if (plugin.constructor.name === "MiniCssExtractPlugin") {
      // eslint-disable-next-line no-param-reassign
      plugin.options.ignoreOrder = true;
    }
    return plugin;
  });
}

/**
 * Injects the path prefix so its available at runtime.
 * For some reason, the normal Gatsby behavior doesn't work so
 * we need to inject it manually
 * @param plugins - Base plugins from the webpack config
 */
function injectPathPrefixDefinition(plugins: Plugin[]): Plugin[] {
  return plugins.map((plugin) => {
    if (plugin.constructor.name === "DefinePlugin") {
      const envVar = `INJECTED_PATH_PREFIX`;
      // eslint-disable-next-line no-param-reassign
      plugin.definitions[`process.env.${envVar}`] = `"${pathPrefix}"`;
    }
    return plugin;
  });
}

// Incomplete type
type Rule = { use?: Array<{ loader: string; options?: object }> };

/**
 * Modifies the linaria webpack rule(s) to add aliases needed
 * for the build to succeed, such as aliasing Socket.IO
 * while evaluating CSS rules
 * @param rules - Base rules from the webpack config
 */
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
