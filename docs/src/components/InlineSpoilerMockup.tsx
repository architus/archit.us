import { styled } from "linaria/react";
import React from "react";
import { FaEyeSlash } from "react-icons/fa";

import { color } from "@architus/facade/theme/color";

const Styled = {
  SpoilerMockup: styled.span`
    display: inline;
    background-color: ${color("bg-10")};
    border-radius: 4px;
    padding: 4px 8px;
  `,
  SpoilerIcon: styled(FaEyeSlash)`
    margin-right: 4px;
    opacity: 0.5;
    transform: translateY(3px);
  `,
};

export type CompositeBrandProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Simple, non-functional "spoiler" component that is a mockup
 * of what will be shown in the logs dashboard
 */
export default function InlineSpoilerMarkup({
  children,
  className,
  style,
}: CompositeBrandProps): React.ReactElement {
  return (
    <Styled.SpoilerMockup className={className} style={style}>
      <Styled.SpoilerIcon />
      {children}
    </Styled.SpoilerMockup>
  );
}
