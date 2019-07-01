export default Object.assign(
  {},
  {
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
    ]
  },
  process.env.PRODUCTION_URL ? { siteRoot: process.env.PRODUCTION_URL } : {}
);
