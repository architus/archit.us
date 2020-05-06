declare module "*.svg" {
  const cssString: string;
  export default cssString;
}

declare module "*.inline.svg" {
  const content: string;
  export default content;
}

declare module "@xstyled/emotion" {
  import React from "react";
  import _styled, { CreateStyled } from "@emotion/styled";
  import { Theme, Space } from "Theme/tokens";

  export * from "emotion";

  interface Breakpoints {
    xs: void;
    sm: void;
    md: void;
    lg: void;
    xl: void;
  }
  type BreakpointObject<ArgType> = {
    [Key in keyof Breakpoints]?: ArgType;
  };

  export const up: (breakpoint: string, css: string) => string;
  export const down: (breakpoint: string, css: string) => string;
  export const ThemeProvider: React.ComponentType<{ theme: object }>;
  export const ColorModeProvider: React.ComponentType<{}>;
  export const useColorMode: () => [string, (newMode: str) => void];
  interface BoxPropsBase extends JSX.IntrinsicElements {
    // Spacing props
    margin?: Space;
    m?: Space;
    marginTop?: Space;
    mt?: Space;
    marginRight?: Space;
    mr?: Space;
    marginBottom?: Space;
    mb?: Space;
    marginLeft?: Space;
    ml?: Space;
    mx?: Space;
    my?: Space;
    padding?: Space;
    p?: Space;
    paddingTop?: Space;
    pt?: Space;
    paddingRight?: Space;
    pr?: Space;
    paddingBottom?: Space;
    pb?: Space;
    paddingLeft?: Space;
    pl?: Space;
    px?: Space;
    py?: Space;
    space?: Space;
    children?: React.ReactNode;
    display?:
      | "block"
      | "inline-block"
      | "inline"
      | "flex"
      | "grid"
      | "none"
      | "inherit"
      | "initial";
    textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
    height?: string | number;
    alignItems?:
      | "stretch"
      | "center"
      | "flex-start"
      | "flex-end"
      | "baseline"
      | "initial"
      | "inherit";
  }

  export type BoxProps = WithBreakpointArgs<BoxPropsBase>;
  export const Box: CreateStyledComponentIntrinsic<
    "div",
    BoxProps,
    DefaultTheme
  >;

  type DefaultTheme = {};
  const styled: typeof _styled & {
    aBox: CreateStyledComponentIntrinsic<"a", BoxProps, DefaultTheme>;
    abbrBox: CreateStyledComponentIntrinsic<"abbr", BoxProps, DefaultTheme>;
    addressBox: CreateStyledComponentIntrinsic<
      "address",
      BoxProps,
      DefaultTheme
    >;
    areaBox: CreateStyledComponentIntrinsic<"area", BoxProps, DefaultTheme>;
    articleBox: CreateStyledComponentIntrinsic<
      "article",
      BoxProps,
      DefaultTheme
    >;
    asideBox: CreateStyledComponentIntrinsic<"aside", BoxProps, DefaultTheme>;
    audioBox: CreateStyledComponentIntrinsic<"audio", BoxProps, DefaultTheme>;
    bBox: CreateStyledComponentIntrinsic<"b", BoxProps, DefaultTheme>;
    baseBox: CreateStyledComponentIntrinsic<"base", BoxProps, DefaultTheme>;
    bdiBox: CreateStyledComponentIntrinsic<"bdi", BoxProps, DefaultTheme>;
    bdoBox: CreateStyledComponentIntrinsic<"bdo", BoxProps, DefaultTheme>;
    bigBox: CreateStyledComponentIntrinsic<"big", BoxProps, DefaultTheme>;
    blockquoteBox: CreateStyledComponentIntrinsic<
      "blockquote",
      BoxProps,
      DefaultTheme
    >;
    bodyBox: CreateStyledComponentIntrinsic<"body", BoxProps, DefaultTheme>;
    brBox: CreateStyledComponentIntrinsic<"br", BoxProps, DefaultTheme>;
    buttonBox: CreateStyledComponentIntrinsic<"button", BoxProps, DefaultTheme>;
    canvasBox: CreateStyledComponentIntrinsic<"canvas", BoxProps, DefaultTheme>;
    captionBox: CreateStyledComponentIntrinsic<
      "caption",
      BoxProps,
      DefaultTheme
    >;
    citeBox: CreateStyledComponentIntrinsic<"cite", BoxProps, DefaultTheme>;
    codeBox: CreateStyledComponentIntrinsic<"code", BoxProps, DefaultTheme>;
    colBox: CreateStyledComponentIntrinsic<"col", BoxProps, DefaultTheme>;
    colgroupBox: CreateStyledComponentIntrinsic<
      "colgroup",
      BoxProps,
      DefaultTheme
    >;
    dataBox: CreateStyledComponentIntrinsic<"data", BoxProps, DefaultTheme>;
    datalistBox: CreateStyledComponentIntrinsic<
      "datalist",
      BoxProps,
      DefaultTheme
    >;
    ddBox: CreateStyledComponentIntrinsic<"dd", BoxProps, DefaultTheme>;
    delBox: CreateStyledComponentIntrinsic<"del", BoxProps, DefaultTheme>;
    detailsBox: CreateStyledComponentIntrinsic<
      "details",
      BoxProps,
      DefaultTheme
    >;
    dfnBox: CreateStyledComponentIntrinsic<"dfn", BoxProps, DefaultTheme>;
    dialogBox: CreateStyledComponentIntrinsic<"dialog", BoxProps, DefaultTheme>;
    divBox: CreateStyledComponentIntrinsic<"div", BoxProps, DefaultTheme>;
    dlBox: CreateStyledComponentIntrinsic<"dl", BoxProps, DefaultTheme>;
    dtBox: CreateStyledComponentIntrinsic<"dt", BoxProps, DefaultTheme>;
    emBox: CreateStyledComponentIntrinsic<"em", BoxProps, DefaultTheme>;
    embedBox: CreateStyledComponentIntrinsic<"embed", BoxProps, DefaultTheme>;
    fieldsetBox: CreateStyledComponentIntrinsic<
      "fieldset",
      BoxProps,
      DefaultTheme
    >;
    figcaptionBox: CreateStyledComponentIntrinsic<
      "figcaption",
      BoxProps,
      DefaultTheme
    >;
    figureBox: CreateStyledComponentIntrinsic<"figure", BoxProps, DefaultTheme>;
    footerBox: CreateStyledComponentIntrinsic<"footer", BoxProps, DefaultTheme>;
    formBox: CreateStyledComponentIntrinsic<"form", BoxProps, DefaultTheme>;
    h1Box: CreateStyledComponentIntrinsic<"h1", BoxProps, DefaultTheme>;
    h2Box: CreateStyledComponentIntrinsic<"h2", BoxProps, DefaultTheme>;
    h3Box: CreateStyledComponentIntrinsic<"h3", BoxProps, DefaultTheme>;
    h4Box: CreateStyledComponentIntrinsic<"h4", BoxProps, DefaultTheme>;
    h5Box: CreateStyledComponentIntrinsic<"h5", BoxProps, DefaultTheme>;
    h6Box: CreateStyledComponentIntrinsic<"h6", BoxProps, DefaultTheme>;
    headBox: CreateStyledComponentIntrinsic<"head", BoxProps, DefaultTheme>;
    headerBox: CreateStyledComponentIntrinsic<"header", BoxProps, DefaultTheme>;
    hgroupBox: CreateStyledComponentIntrinsic<"hgroup", BoxProps, DefaultTheme>;
    hrBox: CreateStyledComponentIntrinsic<"hr", BoxProps, DefaultTheme>;
    htmlBox: CreateStyledComponentIntrinsic<"html", BoxProps, DefaultTheme>;
    iBox: CreateStyledComponentIntrinsic<"i", BoxProps, DefaultTheme>;
    iframeBox: CreateStyledComponentIntrinsic<"iframe", BoxProps, DefaultTheme>;
    imgBox: CreateStyledComponentIntrinsic<"img", BoxProps, DefaultTheme>;
    inputBox: CreateStyledComponentIntrinsic<"input", BoxProps, DefaultTheme>;
    insBox: CreateStyledComponentIntrinsic<"ins", BoxProps, DefaultTheme>;
    kbdBox: CreateStyledComponentIntrinsic<"kbd", BoxProps, DefaultTheme>;
    keygenBox: CreateStyledComponentIntrinsic<"keygen", BoxProps, DefaultTheme>;
    labelBox: CreateStyledComponentIntrinsic<"label", BoxProps, DefaultTheme>;
    legendBox: CreateStyledComponentIntrinsic<"legend", BoxProps, DefaultTheme>;
    liBox: CreateStyledComponentIntrinsic<"li", BoxProps, DefaultTheme>;
    linkBox: CreateStyledComponentIntrinsic<"link", BoxProps, DefaultTheme>;
    mainBox: CreateStyledComponentIntrinsic<"main", BoxProps, DefaultTheme>;
    mapBox: CreateStyledComponentIntrinsic<"map", BoxProps, DefaultTheme>;
    markBox: CreateStyledComponentIntrinsic<"mark", BoxProps, DefaultTheme>;

    /* This one breaks, it looks like marquee is not supported in JSX.IntrinsicElements */
    // marqueeBox: CreateStyledComponentIntrinsic<'marquee', BoxProps, DefaultTheme>

    menuBox: CreateStyledComponentIntrinsic<"menu", BoxProps, DefaultTheme>;
    menuitemBox: CreateStyledComponentIntrinsic<
      "menuitem",
      BoxProps,
      DefaultTheme
    >;
    metaBox: CreateStyledComponentIntrinsic<"meta", BoxProps, DefaultTheme>;
    meterBox: CreateStyledComponentIntrinsic<"meter", BoxProps, DefaultTheme>;
    navBox: CreateStyledComponentIntrinsic<"nav", BoxProps, DefaultTheme>;
    noscriptBox: CreateStyledComponentIntrinsic<
      "noscript",
      BoxProps,
      DefaultTheme
    >;
    objectBox: CreateStyledComponentIntrinsic<"object", BoxProps, DefaultTheme>;
    olBox: CreateStyledComponentIntrinsic<"ol", BoxProps, DefaultTheme>;
    optgroupBox: CreateStyledComponentIntrinsic<
      "optgroup",
      BoxProps,
      DefaultTheme
    >;
    optionBox: CreateStyledComponentIntrinsic<"option", BoxProps, DefaultTheme>;
    outputBox: CreateStyledComponentIntrinsic<"output", BoxProps, DefaultTheme>;
    pBox: CreateStyledComponentIntrinsic<"p", BoxProps, DefaultTheme>;
    paramBox: CreateStyledComponentIntrinsic<"param", BoxProps, DefaultTheme>;
    pictureBox: CreateStyledComponentIntrinsic<
      "picture",
      BoxProps,
      DefaultTheme
    >;
    preBox: CreateStyledComponentIntrinsic<"pre", BoxProps, DefaultTheme>;
    progressBox: CreateStyledComponentIntrinsic<
      "progress",
      BoxProps,
      DefaultTheme
    >;
    qBox: CreateStyledComponentIntrinsic<"q", BoxProps, DefaultTheme>;
    rpBox: CreateStyledComponentIntrinsic<"rp", BoxProps, DefaultTheme>;
    rtBox: CreateStyledComponentIntrinsic<"rt", BoxProps, DefaultTheme>;
    rubyBox: CreateStyledComponentIntrinsic<"ruby", BoxProps, DefaultTheme>;
    sBox: CreateStyledComponentIntrinsic<"s", BoxProps, DefaultTheme>;
    sampBox: CreateStyledComponentIntrinsic<"samp", BoxProps, DefaultTheme>;
    scriptBox: CreateStyledComponentIntrinsic<"script", BoxProps, DefaultTheme>;
    sectionBox: CreateStyledComponentIntrinsic<
      "section",
      BoxProps,
      DefaultTheme
    >;
    selectBox: CreateStyledComponentIntrinsic<"select", BoxProps, DefaultTheme>;
    smallBox: CreateStyledComponentIntrinsic<"small", BoxProps, DefaultTheme>;
    sourceBox: CreateStyledComponentIntrinsic<"source", BoxProps, DefaultTheme>;
    spanBox: CreateStyledComponentIntrinsic<"span", BoxProps, DefaultTheme>;
    strongBox: CreateStyledComponentIntrinsic<"strong", BoxProps, DefaultTheme>;
    styleBox: CreateStyledComponentIntrinsic<"style", BoxProps, DefaultTheme>;
    subBox: CreateStyledComponentIntrinsic<"sub", BoxProps, DefaultTheme>;
    summaryBox: CreateStyledComponentIntrinsic<
      "summary",
      BoxProps,
      DefaultTheme
    >;
    supBox: CreateStyledComponentIntrinsic<"sup", BoxProps, DefaultTheme>;
    tableBox: CreateStyledComponentIntrinsic<"table", BoxProps, DefaultTheme>;
    tbodyBox: CreateStyledComponentIntrinsic<"tbody", BoxProps, DefaultTheme>;
    tdBox: CreateStyledComponentIntrinsic<"td", BoxProps, DefaultTheme>;
    textareaBox: CreateStyledComponentIntrinsic<
      "textarea",
      BoxProps,
      DefaultTheme
    >;
    tfootBox: CreateStyledComponentIntrinsic<"tfoot", BoxProps, DefaultTheme>;
    thBox: CreateStyledComponentIntrinsic<"th", BoxProps, DefaultTheme>;
    theadBox: CreateStyledComponentIntrinsic<"thead", BoxProps, DefaultTheme>;
    timeBox: CreateStyledComponentIntrinsic<"time", BoxProps, DefaultTheme>;
    titleBox: CreateStyledComponentIntrinsic<"title", BoxProps, DefaultTheme>;
    trBox: CreateStyledComponentIntrinsic<"tr", BoxProps, DefaultTheme>;
    trackBox: CreateStyledComponentIntrinsic<"track", BoxProps, DefaultTheme>;
    uBox: CreateStyledComponentIntrinsic<"u", BoxProps, DefaultTheme>;
    ulBox: CreateStyledComponentIntrinsic<"ul", BoxProps, DefaultTheme>;
    varBox: CreateStyledComponentIntrinsic<"var", BoxProps, DefaultTheme>;
    videoBox: CreateStyledComponentIntrinsic<"video", BoxProps, DefaultTheme>;
    wbrBox: CreateStyledComponentIntrinsic<"wbr", BoxProps, DefaultTheme>;

    // SVG
    circleBox: CreateStyledComponentIntrinsic<"circle", BoxProps, DefaultTheme>;
    clipPathBox: CreateStyledComponentIntrinsic<
      "clipPath",
      BoxProps,
      DefaultTheme
    >;
    defsBox: CreateStyledComponentIntrinsic<"defs", BoxProps, DefaultTheme>;
    ellipseBox: CreateStyledComponentIntrinsic<
      "ellipse",
      BoxProps,
      DefaultTheme
    >;
    foreignObjectBox: CreateStyledComponentIntrinsic<
      "foreignObject",
      DefaultTheme,
      BoxProps
    >;
    gBox: CreateStyledComponentIntrinsic<"g", BoxProps, DefaultTheme>;
    imageBox: CreateStyledComponentIntrinsic<"image", BoxProps, DefaultTheme>;
    lineBox: CreateStyledComponentIntrinsic<"line", BoxProps, DefaultTheme>;
    linearGradientBox: CreateStyledComponentIntrinsic<
      "linearGradient",
      DefaultTheme,
      BoxProps
    >;
    markerBox: CreateStyledComponentIntrinsic<"marker", BoxProps, DefaultTheme>;
    maskBox: CreateStyledComponentIntrinsic<"mask", BoxProps, DefaultTheme>;
    pathBox: CreateStyledComponentIntrinsic<"path", BoxProps, DefaultTheme>;
    patternBox: CreateStyledComponentIntrinsic<
      "pattern",
      BoxProps,
      DefaultTheme
    >;
    polygonBox: CreateStyledComponentIntrinsic<
      "polygon",
      BoxProps,
      DefaultTheme
    >;
    polylineBox: CreateStyledComponentIntrinsic<
      "polyline",
      BoxProps,
      DefaultTheme
    >;
    radialGradientBox: CreateStyledComponentIntrinsic<
      "radialGradient",
      DefaultTheme,
      BoxProps
    >;
    rectBox: CreateStyledComponentIntrinsic<"rect", BoxProps, DefaultTheme>;
    stopBox: CreateStyledComponentIntrinsic<"stop", BoxProps, DefaultTheme>;
    svgBox: CreateStyledComponentIntrinsic<"svg", BoxProps, DefaultTheme>;
    textBox: CreateStyledComponentIntrinsic<"text", BoxProps, DefaultTheme>;
    tspanBox: CreateStyledComponentIntrinsic<"tspan", BoxProps, DefaultTheme>;
  };
  export default styled;
}

declare module "preval.macro" {
  export default function apply(code: string | TemplateStringsArray): string;
}
