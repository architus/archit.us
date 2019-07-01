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
    },
    {
      path: "app",
      template: "src/dynamic/AppRoot"
    }
  ],

  plugins: [
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
    require.resolve("react-static-plugin-sass")
  ],

  siteRoot:
    process.env.PRODUCTION_URL ||
    process.env.DEPLOY_PRIME_URL ||
    "http://localhost:3000"
};
