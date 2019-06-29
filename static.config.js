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

  siteRoot: 'https://aut-bot.com'
};
