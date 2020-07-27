import classNames from "classnames";
import React from "react";

import {
  addMissingUnit,
  multiplyDimension,
  isEmptyOrNil,
  isNil,
  attach,
  formatDimension,
  parseDimension,
} from "@app/utility";
import "./style.scss";
import { RawDimension, StyleObject, Nil } from "@app/utility/types";

type BaseSkeletonProps = {
  width: RawDimension;
  height?: RawDimension;
  light?: boolean;
};

type SkeletonProps = {
  circle?: boolean;
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & BaseSkeletonProps &
  Partial<React.HTMLAttributes<HTMLSpanElement>>;

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  circle = false,
  block = false,
  light = false,
  height = "1.2em",
  className = "",
  style = {},
  ...rest
}) => (
  <span
    className={classNames(
      "skeleton",
      { inline: !block, light, circle },
      className
    )}
    style={{
      width: formatDimension(addMissingUnit(width)),
      height: formatDimension(
        circle ? addMissingUnit(width) : addMissingUnit(height)
      ),
      ...style,
    }}
    {...rest}
  />
);

// ? ==============
// ? Sub-components
// ? ==============

function shouldUseSkeleton(
  control: string | Nil,
  displayBlank: boolean
): boolean {
  return displayBlank ? isNil(control) : isEmptyOrNil(control);
}

type ContentRestProps = Omit<
  Partial<
    React.HTMLAttributes<HTMLSpanElement> &
      React.HTMLAttributes<HTMLParagraphElement>
  >,
  "inline" | "children"
>;

type RenderContentProps = {
  inline: boolean;
  children: React.ReactNode;
} & ContentRestProps;

const RenderContent: React.FC<RenderContentProps> = ({
  inline,
  children,
  ...rest
}) =>
  inline ? <span {...rest}>{children}</span> : <p {...rest}>{children}</p>;

type TextProps = {
  text: string;
  style?: React.CSSProperties;
  inline?: boolean;
  size?: RawDimension;
  width?: RawDimension;
  light?: boolean;
  displayBlank?: boolean;
} & ContentRestProps;

/**
 * Single-line skeleton
 */
const Text: React.FC<TextProps> = ({
  text,
  style = {},
  inline = false,
  size = "1.2em",
  width = "5em",
  light = false,
  displayBlank = false,
  ...rest
}) =>
  shouldUseSkeleton(text, displayBlank) ? (
    <Skeleton
      style={style}
      height={multiplyDimension(addMissingUnit(size), 1.1)}
      width={width}
      light={light}
      circle={false}
      block={!inline}
      {...rest}
    />
  ) : (
    <RenderContent
      style={{
        fontSize: formatDimension(addMissingUnit(size)),
        ...style,
      }}
      inline={inline}
      {...rest}
    >
      {text}
    </RenderContent>
  );

type CustomProps = {
  value: string | Nil;
  children: React.ReactNode;
  circle?: boolean;
  block?: boolean;
  displayBlank?: boolean;
} & BaseSkeletonProps &
  ContentRestProps;

// Custom skeleton container controlled by the 'value' prop
const Custom: React.FC<CustomProps> = ({
  value,
  width,
  children,
  circle = false,
  block = false,
  light = false,
  height = "1.2em",
  displayBlank = false,
  ...rest
}) =>
  shouldUseSkeleton(value, displayBlank) ? (
    <Skeleton
      circle={circle}
      block={block}
      light={light}
      width={width}
      height={height}
      {...rest}
    />
  ) : (
    <RenderContent inline={!block} {...rest}>
      {children}
    </RenderContent>
  );

const lineAmount = 100;

type MultilineProps = {
  text: string | Nil;
  children?: React.ReactNode | Nil;
  style?: React.CSSProperties;
  inline?: boolean;
  size?: RawDimension;
  light?: boolean;
  amount?: number;
  displayBlank?: boolean;
} & ContentRestProps;

/**
 * Skeleton text that spans multiple lines
 */
const Multiline: React.FC<MultilineProps> = ({
  text,
  children = null,
  style = {},
  inline = false,
  size = "1.2em",
  light = false,
  amount = 150,
  displayBlank = false,
  ...rest
}) => {
  if (shouldUseSkeleton(text, displayBlank)) {
    const lines = Math.floor(amount / lineAmount);
    const remainder = Math.floor(amount % lineAmount);
    const lineElements: React.ReactNode[] = [];
    const lineSpacing = parseDimension(size)
      .map((d) => formatDimension(multiplyDimension(d, 0.25)))
      .getOrElse("0.3em");
    const lineHeight = parseDimension(size)
      .map((d) => multiplyDimension(d, 1.1))
      .getOrElse("1.32em");
    for (let i = 0; i < lines; ++i) {
      lineElements.push(
        <Skeleton
          style={{ ...style, marginBottom: lineSpacing }}
          height={lineHeight}
          width="100%"
          light={light}
          block={!inline}
          key={i}
          {...rest}
        />
      );
    }
    if (remainder > 0) {
      lineElements.push(
        <Skeleton
          style={{ ...style, marginBottom: lineSpacing }}
          height={lineHeight}
          width={`${remainder}%`}
          light={light}
          block={!inline}
          key={-1}
          {...rest}
        />
      );
    }
    return <>{lineElements}</>;
  }

  return !isNil(children) ? (
    <>{children}</>
  ) : (
    <RenderContent
      style={{
        fontSize: parseDimension(size).map(formatDimension).getOrElse("1.2em"),
        ...style,
      }}
      inline={inline}
      {...rest}
    >
      {text}
    </RenderContent>
  );
};

/**
 * Skeleton that automatically switches colors according to the theme
 */
const Auto: React.FC<SkeletonProps> = ({ className = "", ...rest }) => (
  <Skeleton className={classNames("skeleton-auto", className)} {...rest} />
);

export default attach(Skeleton, { Text, Custom, Multiline, Auto });
