import React from "react";
import classNames from "classnames";
import {
  addMissingUnit,
  multiplyDimension,
  isEmptyOrNil,
  isNil,
  attach,
  formatDimension,
  parseDimension,
} from "Utility";
import "./style.scss";
import { RawDimension, StyleObject, Nil } from "Utility/types";

type BasePlaceholderProps = {
  width: RawDimension;
  height?: RawDimension;
  light?: boolean;
};

type PlaceholderProps = {
  circle?: boolean;
  block?: boolean;
  className?: string;
  style?: StyleObject;
} & BasePlaceholderProps &
  Partial<React.HTMLAttributes<HTMLSpanElement>>;

const Placeholder: React.FC<PlaceholderProps> = ({
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
      "placeholder",
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

function shouldUsePlaceholder(
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
  style?: StyleObject;
  inline?: boolean;
  size?: RawDimension;
  width?: RawDimension;
  light?: boolean;
  displayBlank?: boolean;
} & ContentRestProps;

/**
 * Single-line placeholder
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
  shouldUsePlaceholder(text, displayBlank) ? (
    <Placeholder
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
} & BasePlaceholderProps &
  ContentRestProps;

// Custom placeholder container controlled by the 'value' prop
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
  shouldUsePlaceholder(value, displayBlank) ? (
    <Placeholder
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
  style?: StyleObject;
  inline?: boolean;
  size?: RawDimension;
  light?: boolean;
  amount?: number;
  displayBlank?: boolean;
} & ContentRestProps;

/**
 * Placeholder text that spans multiple lines
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
  if (shouldUsePlaceholder(text, displayBlank)) {
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
        <Placeholder
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
        <Placeholder
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
 * Placeholder that automatically switches colors according to the theme
 */
const Auto: React.FC<PlaceholderProps> = ({ className = "", ...rest }) => (
  <Placeholder
    className={classNames("placeholder-auto", className)}
    {...rest}
  />
);

export default attach(Placeholder, { Text, Custom, Multiline, Auto });
