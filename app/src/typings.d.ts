/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */

declare module "gatsby-plugin-dark-mode" {
  // eslint-disable-next-line import/order
  import React from "react";

  export const ThemeToggler: React.FC<{
    children: (args: {
      theme: string;
      toggleTheme: (newTheme: string) => void;
    }) => React.ReactNode;
  }>;
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

declare module "unist-util-find" {
  import React from "react";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { Node } from "unist";

  const find: (node: Node, pattern: string) => Node | undefined;
  export default find;
}

declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}

declare module "@xstyled/emotion" {
  import _styled, {
    CreateStyled,
    StyledComponent,
    CreateStyledComponentBase,
  } from "@emotion/styled";
  import React from "react";

  import { Theme, Space, ColorKey, WithBreakpointArgs } from "@app/theme";

  import { Interpolation } from "@emotion/css";

  export function css(
    template: TemplateStringsArray,
    ...args: Array<Interpolation>
  ): string;
  export function css(...args: Array<Interpolation>): string;

  export const useTheme: () => Theme;
  export const useDown: (breakpoint: Breakpoint) => boolean;
  export const useUp: (breakpoint: Breakpoint) => boolean;
  export const up: (
    breakpoint: string,
    css: string
  ) => (props: unknown) => string[];
  export const down: (
    breakpoint: string,
    css: string
  ) => (props: unknown) => string[];
  export const ThemeProvider: React.ComponentType<{ theme: object }>;
  export const ColorModeProvider: React.ComponentType<{}>;
  export const useColorMode: () => [string, (newMode: str) => void];
  export const getColorModeInitScriptElement: () => React.ReactNode;

  export interface SpaceProps {
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
  }

  type BoxPropsBase = SpaceProps & {
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
    backgroundColor?: ColorKey;
    backgroundImage?: number | string;
    backgroundSize?: number | string;
    backgroundPosition?: number | string;
    backgroundRepeat?: number | string;
    opacity?: number | string;
    overflow?: number | string;
    transition?: number | string;
    border?: number | string;
    borderTop?: number | string;
    borderTopColor?: ColorKey;
    borderRight?: number | string;
    borderRightColor?: ColorKey;
    borderBottom?: number | string;
    borderBottomColor?: ColorKey;
    borderLeft?: number | string;
    borderLeftColor?: ColorKey;
    borderColor?: ColorKey;
    borderWidth?: number | string;
    borderStyle?: number | string;
    borderRadius?: number | string;
    fontFamily?: number | string;
    fontSize?: number | string;
    lineHeight?: number | string;
    fontWeight?: number | string;
    letterSpacing?: number | string;
    color?: ColorKey;
    textTransform?: number | string;
    row?: boolean;
    col?: number | string;
  };

  type BoxPropsInner = WithBreakpointArgs<BoxPropsBase> & {
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: { __html: string };
    className?: string;
    style?: React.CSSProperties;
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
