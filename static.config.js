/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";

export default Object.assign(
  {},
  {
    getRoutes: async () => {
      const {
        data: { guild_count, user_count }
      } = await axios.get("https://api.archit.us/guild_count");

      return [
        {
          path: "/",
          template: "src/pages/Index",
          getData: async () => ({
            guild_count,
            user_count
          })
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
      ];
    },

    plugins: [
      require.resolve("react-static-plugin-reach-router"),
      require.resolve("react-static-plugin-sitemap"),
      require.resolve("react-static-plugin-sass")
    ],

    Document: ({ Html, Head, Body, children }) => (
      <Html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body className="dark-mode">{children}</Body>
        <script
          // Dark mode anti-flash script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  // Change these if you use something different in your hook.
  var storageKey = 'darkMode';
  var classNameDark = 'dark-mode';
  var classNameLight = 'light-mode';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();`
          }}
        />
      </Html>
    )
  },
  process.env.PRODUCTION_URL ? { siteRoot: process.env.PRODUCTION_URL } : {}
);
