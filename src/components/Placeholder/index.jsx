import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  addMissingUnit,
  multiplyDimension,
  isEmptyOrNil,
  isNil
} from "../../util";

import "./style.scss";

function Placeholder({
  circle = false,
  block = false,
  light = false,
  width,
  style,
  className,
  height = "1.2em",
  ...rest
}) {
  return (
    <span
      className={classNames(
        "placeholder",
        { inline: !block, light, circle },
        className
      )}
      style={{
        width: addMissingUnit(width),
        height: circle ? addMissingUnit(width) : addMissingUnit(height),
        ...style
      }}
      {...rest}
    />
  );
}

export default Placeholder;

Placeholder.propTypes = {
  circle: PropTypes.bool,
  block: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// ? ==============
// ? Sub-components
// ? ==============

// eslint-disable-next-line react/prop-types
const RenderContent = ({ inline, children, text, ...props }) =>
  inline ? <span {...props}>{text}</span> : <p {...props}>{text}</p>;

// Single-line placeholder
function PlaceholderText({
  text,
  style,
  inline = false,
  size = "1.2em",
  width = "5em",
  light = false,
  ...rest
}) {
  return isEmptyOrNil(text) ? (
    <Placeholder
      style={style}
      height={multiplyDimension(addMissingUnit(size), 1.1)}
      width={width}
      light={light}
      block={!inline}
      {...rest}
    />
  ) : (
    <RenderContent
      style={{
        fontSize: addMissingUnit(size),
        ...style
      }}
      inline={inline}
      text={text}
      {...rest}
    />
  );
}

PlaceholderText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  light: PropTypes.bool,
  inline: PropTypes.bool
};

// Custom placeholder container controlled by the 'value' prop
function PlaceholderCustom({
  value,
  children,
  circle,
  block,
  light,
  width,
  height,
  ...rest
}) {
  return isEmptyOrNil(value) ? (
    <Placeholder
      circle={circle}
      block={block}
      light={light}
      width={width}
      height={height}
      {...rest}
    />
  ) : block ? (
    <div {...rest}>{children}</div>
  ) : (
    <span {...rest}>{children}</span>
  );
}

PlaceholderCustom.propTypes = {
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  circle: PropTypes.bool,
  block: PropTypes.bool,
  light: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// Placeholder text that spans multiple lines
const lineAmount = 100;
function PlaceholderMultiline({
  text,
  style,
  inline = false,
  size = "1.2em",
  light = false,
  amount = 150,
  children,
  ...rest
}) {
  if (isEmptyOrNil(text)) {
    const lines = Math.floor(amount / lineAmount);
    const remainder = Math.floor(amount % lineAmount);
    let lineElements = [];
    for (let i = 0; i < lines; ++i) {
      lineElements.push(
        <Placeholder
          style={{
            ...style,
            marginBottom: multiplyDimension(addMissingUnit(size), 0.25)
          }}
          height={multiplyDimension(addMissingUnit(size), 1.1)}
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
          style={{
            ...style,
            marginBottom: multiplyDimension(addMissingUnit(size), 0.25)
          }}
          height={multiplyDimension(addMissingUnit(size), 1.1)}
          width={`${remainder}%`}
          light={light}
          block={!inline}
          key={-1}
          {...rest}
        />
      );
    }
    return lineElements;
  } else {
    return !isNil(children) ? (
      children
    ) : (
      <RenderContent
        style={{
          fontSize: addMissingUnit(size),
          ...style
        }}
        inline={inline}
        text={text}
        {...rest}
      />
    );
  }
}

PlaceholderMultiline.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  light: PropTypes.bool,
  inline: PropTypes.bool,
  amount: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

// Link sub-components
Placeholder.Text = PlaceholderText;
Placeholder.Custom = PlaceholderCustom;
Placeholder.Multiline = PlaceholderMultiline;
