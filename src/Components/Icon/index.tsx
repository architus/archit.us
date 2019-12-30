import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";
import { warn } from "Utility";
import { resolveIcon, allIconNames, AnyIconName } from "./loader";

const baseStyle = { display: "inline-block", height: "1em", width: "1em" };

type IconProps = {
  className?: string;
  style?: object;
  name: AnyIconName;
  prefix?: IconPrefix;
  noAutoWidth?: boolean;
};

// Embeds a FontAwesome SVG inline icon into the page, optionally allowing for
// custom icon definitions in ./custom.js
const Icon: React.FC<IconProps> = ({
  className,
  name,
  style,
  noAutoWidth,
  prefix,
  ...rest
}) => {
  if (process.env.NODE_ENV === "development") {
    if (!allIconNames.includes(name)) {
      warn(`Icon name ${name} was not found in the icon resolution map`);
    }
  }

  return (
    <span
      className={className}
      style={noAutoWidth ? style : { ...baseStyle, ...style }}
    >
      <FontAwesomeIcon
        // Cast to bypass library type checking
        icon={resolveIcon(name, prefix) as [IconPrefix, IconName]}
        {...rest}
      />
    </span>
  );
};

export default Icon;

Icon.defaultProps = {
  className: "",
  style: {},
  noAutoWidth: false
};
