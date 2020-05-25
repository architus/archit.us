import React from "react";
import { Root, Routes } from "react-static";
import { ThemeProvider, ColorModeProvider, css } from "@xstyled/emotion";
import { Global } from "@emotion/core";
import Store from "Store";
import { Router } from "Components/Router";
import { Provider } from "react-redux";
import { SEO } from "Components/Layout";
import NotificationPane from "Components/NotificationPane";
import AppRoot from "Dynamic/AppRoot";
import NotFound from "Pages/NotFound";
import { withBasePath } from "Utility";
import theme from "Theme";
import "scss/main.scss";

// Base path for the renner font
const basePath = withBasePath("/font/renner/");
const fontName = "Renner*";
const fontDisplay = "swap";

/**
 * Builds the font face (and correspondign italics font face) for the given weight for
 * the Renner font
 * @param weightText - Weight text included on the font face file
 * @param weight - Actual CSS weight
 */
function rennerFontFace(weightText: string, weight: number): string {
  return `
    @font-face {
        font-family: "${fontName}";
        font-display: ${fontDisplay};
        src: url("${basePath}renner-${weightText}-webfont.woff2")
                format("woff2"),
            url("${basePath}renner-${weightText}-webfont.woff")
                format("woff");
        font-weight: ${weight};
        font-style: normal;
    }
    @font-face {
        font-family: "${fontName}";
        font-display: ${fontDisplay};
        src: url("${basePath}renner-${weightText}italic-webfont.woff2")
                format("woff2"),
            url("${basePath}renner-${weightText}italic-webfont.woff")
                format("woff");
        font-weight: ${weight};
        font-style: italic;
    }
  `;
}

/**
 * Represents the root component of the application, mounted directly to the `root` div
 */
const App: React.FunctionComponent<{}> = () => (
  <Root>
    <SEO />
    <Global
      styles={css`
        ${rennerFontFace("light", 300)}
        ${rennerFontFace("book", 400)}
        ${rennerFontFace("medium", 500)}
        ${rennerFontFace("bold", 700)}
      `}
    />
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Provider store={Store}>
          <NotificationPane />
          <main>
            <React.Suspense fallback={<NotFound />}>
              <Router>
                <AppRoot path="/app/*" />
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </main>
        </Provider>
      </ColorModeProvider>
    </ThemeProvider>
  </Root>
);

export default App;
