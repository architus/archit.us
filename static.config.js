export default {
  getRoutes: async () => [
    {
      path: "/",
      template: "src/pages/Index"
    },
    {
      path: "login",
      template: "src/pages/Login"
    },
    {
      path: "404",
      template: "src/pages/NotFound"
    }
  ],

  plugins: [
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
    require.resolve("react-static-plugin-sass")
  ],

  siteRoot: process.env.DEPLOY_PRIME_URL || "http://localhost:3000",

  webpack: config => {
    const moduleRules = config.module.rules[0].oneOf;

    moduleRules.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve("svg-react-loader"),
          query: {}
        }
      ]
    });

    return config;
  }
};
