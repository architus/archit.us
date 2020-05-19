declare module "*.svg" {
  const cssString: string;
  export default cssString;
}

declare module "*.inline.svg" {
  const content: string;
  export default content;
}

declare module "shallow-equal" {
  export function shallowEqualArrays<T extends unknown[] = unknown[]>(
    a: T,
    b: T
  ): boolean;
  export function shallowEqualObjects<
    T extends Record<unknown, unknown> = Record<unknown, unknown>
  >(a: T, b: T): boolean;
}

declare module "@xstyled/emotion" {
  import React from "react";
  import _styled, {
    CreateStyled,
    StyledComponent,
    CreateStyledComponentBase,
  } from "@emotion/styled";
  import { Theme, Space, Color, WithBreakpointArgs } from "Theme/tokens";
  import { StyleObject } from "Utility/types";

  export * from "emotion";

  export const useTheme: () => Theme;
  export const up: (breakpoint: string, css: string) => string;
  export const down: (breakpoint: string, css: string) => string;
  export const ThemeProvider: React.ComponentType<{ theme: object }>;
  export const ColorModeProvider: React.ComponentType<{}>;
  export const useColorMode: () => [string, (newMode: str) => void];

  interface BoxPropsBase {
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
    alignItems?:
      | "stretch"
      | "center"
      | "flex-start"
      | "flex-end"
      | "baseline"
      | "initial"
      | "inherit";
    // TODO a lot of these could be typed much more tightly
    alignContent?: number | string;
    justifyContent?: number | string;
    justifyItems?: number | string;
    flexWrap?: number | string;
    flexBasis?: number | string;
    flexDirection?: number | string;
    flex?: number | string;
    justifySelf?: number | string;
    alignSelf?: number | string;
    order?: number | string;
    gridGap?: number | string;
    gridColumnGap?: number | string;
    gridRowGap?: number | string;
    gridColumn?: number | string;
    gridRow?: number | string;
    gridAutoFlow?: number | string;
    gridAutoColumns?: number | string;
    gridAutoRows?: number | string;
    gridTemplateColumns?: number | string;
    gridTemplateRows?: number | string;
    gridTemplateAreas?: number | string;
    gridArea?: number | string;
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    size?: number | string;
    verticalAlign?: number | string;
    position?: number | string;
    zIndex?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    boxShadow?: number | string;
    textShadow?: number | string;
    background?: number | string;
    backgroundColor?: Color;
    backgroundImage?: number | string;
    backgroundSize?: number | string;
    backgroundPosition?: number | string;
    backgroundRepeat?: number | string;
    opacity?: number | string;
    overflow?: number | string;
    transition?: number | string;
    border?: number | string;
    borderTop?: number | string;
    borderTopColor?: Color;
    borderRight?: number | string;
    borderRightColor?: Color;
    borderBottom?: number | string;
    borderBottomColor?: Color;
    borderLeft?: number | string;
    borderLeftColor?: Color;
    borderColor?: Color;
    borderWidth?: number | string;
    borderStyle?: number | string;
    borderRadius?: number | string;
    fontFamily?: number | string;
    fontSize?: number | string;
    lineHeight?: number | string;
    fontWeight?: number | string;
    letterSpacing?: number | string;
    color?: Color;
    textTransform?: number | string;
    row?: boolean;
    col?: number | string;
  }

  type BoxPropsInner = WithBreakpointArgs<BoxPropsBase> & {
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: { __html: string };
    className?: string;
    style?: StyleObject;
  };

  type MakeBoxStyled<
    T extends keyof JSX.IntrinsicElements
  > = CreateStyledComponentBase<
    // Omit the BoxProps keys so that more specific types don't conflict with the expected
    // intrinsic HTML prop types (such as `color`)
    Omit<JSX.IntrinsicElements[T], keyof BoxPropsBase>,
    BoxPropsInner,
    Theme
  >;

  export const Box: StyledComponent<
    JSX.IntrinsicElements["div"],
    BoxPropsInner,
    Theme
  >;
  export type BoxProps = Omit<React.ComponentProps<typeof Box>, "ref"> & {
    ref?: React.Ref<HTMLDivElement>;
  };

  const styled: typeof _styled & {
    aBox: MakeBoxStyled<"a">;
    abbrBox: MakeBoxStyled<"abbr">;
    addressBox: MakeBoxStyled<"address">;
    areaBox: MakeBoxStyled<"area">;
    articleBox: MakeBoxStyled<"article">;
    asideBox: MakeBoxStyled<"aside">;
    audioBox: MakeBoxStyled<"audio">;
    bBox: MakeBoxStyled<"b">;
    baseBox: MakeBoxStyled<"base">;
    bdiBox: MakeBoxStyled<"bdi">;
    bdoBox: MakeBoxStyled<"bdo">;
    bigBox: MakeBoxStyled<"big">;
    blockquoteBox: MakeBoxStyled<"blockquote">;
    bodyBox: MakeBoxStyled<"body">;
    brBox: MakeBoxStyled<"br">;
    buttonBox: MakeBoxStyled<"button">;
    canvasBox: MakeBoxStyled<"canvas">;
    captionBox: MakeBoxStyled<"caption">;
    citeBox: MakeBoxStyled<"cite">;
    codeBox: MakeBoxStyled<"code">;
    colBox: MakeBoxStyled<"col">;
    colgroupBox: MakeBoxStyled<"colgroup">;
    dataBox: MakeBoxStyled<"data">;
    datalistBox: MakeBoxStyled<"datalist">;
    ddBox: MakeBoxStyled<"dd">;
    delBox: MakeBoxStyled<"del">;
    detailsBox: MakeBoxStyled<"details">;
    dfnBox: MakeBoxStyled<"dfn">;
    dialogBox: MakeBoxStyled<"dialog">;
    divBox: MakeBoxStyled<"div">;
    dlBox: MakeBoxStyled<"dl">;
    dtBox: MakeBoxStyled<"dt">;
    emBox: MakeBoxStyled<"em">;
    embedBox: MakeBoxStyled<"embed">;
    fieldsetBox: MakeBoxStyled<"fieldset">;
    figcaptionBox: MakeBoxStyled<"figcaption">;
    figureBox: MakeBoxStyled<"figure">;
    footerBox: MakeBoxStyled<"footer">;
    formBox: MakeBoxStyled<"form">;
    h1Box: MakeBoxStyled<"h1">;
    h2Box: MakeBoxStyled<"h2">;
    h3Box: MakeBoxStyled<"h3">;
    h4Box: MakeBoxStyled<"h4">;
    h5Box: MakeBoxStyled<"h5">;
    h6Box: MakeBoxStyled<"h6">;
    headBox: MakeBoxStyled<"head">;
    headerBox: MakeBoxStyled<"header">;
    hgroupBox: MakeBoxStyled<"hgroup">;
    hrBox: MakeBoxStyled<"hr">;
    htmlBox: MakeBoxStyled<"html">;
    iBox: MakeBoxStyled<"i">;
    iframeBox: MakeBoxStyled<"iframe">;
    imgBox: MakeBoxStyled<"img">;
    inputBox: MakeBoxStyled<"input">;
    insBox: MakeBoxStyled<"ins">;
    kbdBox: MakeBoxStyled<"kbd">;
    keygenBox: MakeBoxStyled<"keygen">;
    labelBox: MakeBoxStyled<"label">;
    legendBox: MakeBoxStyled<"legend">;
    liBox: MakeBoxStyled<"li">;
    linkBox: MakeBoxStyled<"link">;
    mainBox: MakeBoxStyled<"main">;
    mapBox: MakeBoxStyled<"map">;
    markBox: MakeBoxStyled<"mark">;

    menuBox: MakeBoxStyled<"menu">;
    menuitemBox: MakeBoxStyled<"menuitem">;
    metaBox: MakeBoxStyled<"meta">;
    meterBox: MakeBoxStyled<"meter">;
    navBox: MakeBoxStyled<"nav">;
    noscriptBox: MakeBoxStyled<"noscript">;
    objectBox: MakeBoxStyled<"object">;
    olBox: MakeBoxStyled<"ol">;
    optgroupBox: MakeBoxStyled<"optgroup">;
    optionBox: MakeBoxStyled<"option">;
    outputBox: MakeBoxStyled<"output">;
    pBox: MakeBoxStyled<"p">;
    paramBox: MakeBoxStyled<"param">;
    pictureBox: MakeBoxStyled<"picture">;
    preBox: MakeBoxStyled<"pre">;
    progressBox: MakeBoxStyled<"progress">;
    qBox: MakeBoxStyled<"q">;
    rpBox: MakeBoxStyled<"rp">;
    rtBox: MakeBoxStyled<"rt">;
    rubyBox: MakeBoxStyled<"ruby">;
    sBox: MakeBoxStyled<"s">;
    sampBox: MakeBoxStyled<"samp">;
    scriptBox: MakeBoxStyled<"script">;
    sectionBox: MakeBoxStyled<"section">;
    selectBox: MakeBoxStyled<"select">;
    smallBox: MakeBoxStyled<"small">;
    sourceBox: MakeBoxStyled<"source">;
    spanBox: MakeBoxStyled<"span">;
    strongBox: MakeBoxStyled<"strong">;
    styleBox: MakeBoxStyled<"style">;
    subBox: MakeBoxStyled<"sub">;
    summaryBox: MakeBoxStyled<"summary">;
    supBox: MakeBoxStyled<"sup">;
    tableBox: MakeBoxStyled<"table">;
    tbodyBox: MakeBoxStyled<"tbody">;
    tdBox: MakeBoxStyled<"td">;
    textareaBox: MakeBoxStyled<"textarea">;
    tfootBox: MakeBoxStyled<"tfoot">;
    thBox: MakeBoxStyled<"th">;
    theadBox: MakeBoxStyled<"thead">;
    timeBox: MakeBoxStyled<"time">;
    titleBox: MakeBoxStyled<"title">;
    trBox: MakeBoxStyled<"tr">;
    trackBox: MakeBoxStyled<"track">;
    uBox: MakeBoxStyled<"u">;
    ulBox: MakeBoxStyled<"ul">;
    varBox: MakeBoxStyled<"var">;
    videoBox: MakeBoxStyled<"video">;
    wbrBox: MakeBoxStyled<"wbr">;

    // SVG
    circleBox: MakeBoxStyled<"circle">;
    clipPathBox: MakeBoxStyled<"clipPath">;
    defsBox: MakeBoxStyled<"defs">;
    ellipseBox: MakeBoxStyled<"ellipse">;
    foreignObjectBox: MakeBoxStyled<"foreignObject">;
    gBox: MakeBoxStyled<"g">;
    imageBox: MakeBoxStyled<"image">;
    lineBox: MakeBoxStyled<"line">;
    linearGradientBox: MakeBoxStyled<"linearGradient">;
    markerBox: MakeBoxStyled<"marker">;
    maskBox: MakeBoxStyled<"mask">;
    pathBox: MakeBoxStyled<"path">;
    patternBox: MakeBoxStyled<"pattern">;
    polygonBox: MakeBoxStyled<"polygon">;
    polylineBox: MakeBoxStyled<"polyline">;
    radialGradientBox: MakeBoxStyled<"radialGradient">;
    rectBox: MakeBoxStyled<"rect">;
    stopBox: MakeBoxStyled<"stop">;
    svgBox: MakeBoxStyled<"svg">;
    textBox: MakeBoxStyled<"text">;
    tspanBox: MakeBoxStyled<"tspan">;
  };
  export default styled;
}

declare module "preval.macro" {
  export default function apply(code: string | TemplateStringsArray): string;
}
