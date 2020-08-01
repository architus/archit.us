import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css, BoxProps } from "@xstyled/emotion";
import classNames from "classnames";
import React from "react";

import { resolveIcon, allIconNames, AnyIconName } from "./loader";
import { warn } from "@app/utility";

const Styled = {
  Icon: styled.spanBox<{ noAutoWidth: boolean }>`
    ${(props: { noAutoWidth: boolean }): string =>
      props.noAutoWidth
        ? ""
        : css`
            display: inline-block;
            height: nano;
            width: nano;
          `}
  `,
};

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
  name: AnyIconName;
  prefix?: IconPrefix;
  noAutoWidth?: boolean;
} & BoxProps;

// Embeds a FontAwesome SVG inline icon into the page, optionally allowing for
// custom icon definitions in ./custom.js
const Icon: React.FC<IconProps> = ({
  className,
  name,
  style,
  noAutoWidth = false,
  prefix,
  ...rest
}) => {
  if (process.env.NODE_ENV === "development") {
    // Perform runtime check in development for icon names
    if (!allIconNames.includes(name)) {
      warn(`Icon name ${name} was not found in the icon resolution map`);
    }
  }

  return (
    <Styled.Icon
      style={style}
      className={classNames(className, "icon")}
      noAutoWidth={noAutoWidth}
      {...rest}
    >
      <FontAwesomeIcon
        // Cast to bypass library type checking
        icon={resolveIcon(name, prefix) as [IconPrefix, IconName]}
      />
    </Styled.Icon>
  );
};

export default Icon;
