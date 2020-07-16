import { styled } from "linaria/react";
import { transparentize, lighten } from "polished";
import React from "react";

import {
  color,
  mode,
  ColorMode,
  staticColor,
  dynamicColor,
} from "@architus/facade/theme/color";
import { scrollBarAuto } from "@architus/facade/theme/mixins";
import { shadow } from "@architus/facade/theme/shadow";
import { isDefined } from "@architus/lib/utility";

const Styled = {
  Demo: styled.div`
    box-shadow: ${shadow("z0")};
    border-radius: 0.5rem;
    margin-bottom: 2rem;

    --content-padding: 1.5rem;
    --label-offset-top: 0.5rem;
    --label-offset-bottom: 2rem;
  `,
  DemoSource: styled.div`
    background-color: var(--code-bg);
    border: 1px solid ${color("contrastBorder")};

    border-bottom: none;
    position: relative;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    padding-bottom: var(--label-offset-top);

    div.gatsby-highlight.gatsby-highlight.gatsby-highlight {
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      box-shadow: none !important;
      display: block;
      position: relative;
      overflow-y: visible !important;
      margin: 0 !important;

      pre {
        ${scrollBarAuto(0.125)}
      }
    }

    --height: 1.5rem;
    --width: 90px;
    --offset: 32px;

    &:before {
      position: absolute;
      bottom: calc((-1 * var(--height)) / 2);
      z-index: 2;
      left: var(--offset);
      height: var(--height);
      width: var(--width);
      content: " ";
      border-radius: 8rem;

      ${mode(ColorMode.Light)} {
        border: 1px solid ${transparentize(0.3, staticColor("dark"))};
        background-color: ${color("bg+10")};
      }

      ${mode(ColorMode.Dark)} {
        box-shadow: ${shadow("z0")};
        background-color: ${lighten(
          0.1,
          dynamicColor("bg+20", ColorMode.Dark)
        )};
      }
    }

    &:after {
      color: ${color("textFade")};

      --text-offset-x: 16px;
      --text-offset-y: 0.05rem;

      position: absolute;
      bottom: calc(((-1 * var(--height)) / 2) - var(--text-offset-y));
      z-index: 2;
      left: calc(var(--offset) + var(--text-offset-x));
      height: var(--height);
      width: var(--width);
      content: "Result";
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 0.9rem;
      text-transform: uppercase;
    }
  `,
  DemoResult: styled.div`
    border: 1px solid ${color("contrastBorder")};
    ${mode(ColorMode.Dark)} {
      background-color: ${color("bg+20")};
    }

    ${mode(ColorMode.Light)} {
      background-color: ${color("bg+10")};
      border-top: 1px solid
        ${transparentize(0.5, dynamicColor("contrastBorder", ColorMode.Light))};
    }

    padding: var(--content-padding);
    padding-top: var(--label-offset-bottom);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;

    & > * {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .gatsby-highlight,
    p:last-child {
      margin-bottom: 0 !important;
    }
  `,
};

export type DemoProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Demo component used to show a source/result flow, used extensively
 * on the authoring page
 */
const Demo: React.FC<DemoProps> = ({ className, style, children }) => {
  let demoChildren: React.ReactNode = children;
  if (isDefined(children) && Array.isArray(children) && children.length > 1) {
    const source = children[0];
    const result = children.slice(1);
    let resultChildren = result[0];
    if (result.length > 1) {
      resultChildren = result;
    }
    demoChildren = (
      <>
        <Styled.DemoSource>{source}</Styled.DemoSource>
        <Styled.DemoResult>{resultChildren}</Styled.DemoResult>
      </>
    );
  } else {
    demoChildren = <Styled.DemoResult>{children}</Styled.DemoResult>;
  }

  return (
    <Styled.Demo className={className} style={style}>
      {demoChildren}
    </Styled.Demo>
  );
};

export default Demo;
