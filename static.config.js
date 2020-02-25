/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import path from "path";
import fs from "fs";
import SoureMapSupport from "source-map-support";

const TypeScript = require("ts-node");

// Bootstrap TypeScript
SoureMapSupport.install();
TypeScript.register({
  files: true,
  isolatedModules: false,
  compilerOptions: {
    module: "commonjs",
    target: "es2019"
  }
});

const { API_BASE } = require("./src/Utility/api.node");

const noFlashPath = path.resolve(__dirname, "./src/Build/no-flash.js");
const noFlashScript = fs.readFileSync(noFlashPath);
const config = {
  entry: path.join(__dirname, "src", "index.tsx"),
  getRoutes: async () => {
    // Load usage count from API
    let guildCount = 0;
    let userCount = 0;
    try {
      const result = await axios.get(`${API_BASE}/guild-count`);
      guildCount = result.data.guildCount;
      userCount = result.data.userCount;
    } catch (e) {
      console.log("An error ocurred while fetching usage count");
      console.log(e.toString());
    }

    return [
      {
        path: "/",
        template: "src/Pages/Index",
        getData: async () => ({
          guildCount,
          userCount
        })
      },
      {
        path: "login",
        template: "src/Pages/Login"
      },
      {
        path: "404",
        template: "src/Pages/NotFound"
      },
      {
        path: "app",
        template: "src/Dynamic/AppRoot"
      }
    ];
  },

  plugins: [
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
    require.resolve("react-static-plugin-sass"),
    require.resolve("react-static-plugin-emotion")
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
          __html: noFlashScript
        }}
      />
    </Html>
  )
};

if (process.env.PRODUCTION_URL) {
  config.siteRoot = process.env.PRODUCTION_URL;
}

// Configure typescript based on args
const args = process.argv.slice(3);
let typeCheck = true;
if (args.includes("--no-type-check")) {
  typeCheck = false;
}
config.plugins.push([
  require.resolve("react-static-plugin-typescript"),
  { typeCheck }
]);

export default config;
