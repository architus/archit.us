import React from "react";
import styled from "@xstyled/emotion";
import {
  compose,
  marginRight,
  marginLeft,
  createSystemComponent,
} from "@xstyled/system";
import Icon from "Components/Icon";
import { Link, LinkProps } from "Components/Router";
import { isDefined, isExternal } from "Utility";
import { Space } from "Theme";

const lrMargin = compose(marginLeft, marginRight);
const MarginIcon = createSystemComponent(React, Icon, lrMargin);

const Styled = {
  ExternalIcon: styled(MarginIcon)`
    ${lrMargin}
  `,
};

type AutoLinkProps = {
  to: string;
  external?: boolean | null;
  left?: boolean;
  space?: Space;
} & Partial<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>;

/**
 * Link component that automatically determines if the given link href is external or not,
 * conditionally rendering a Router link or a standard HTML anchor element (including
 * a small external icon if the url is external)
 */
const AutoLink: React.FC<AutoLinkProps> = ({
  children,
  to,
  left = false,
  external = null,
  space = "pico",
  ...rest
}) => {
  const derivedExternal = isDefined(external) ? external : isExternal(to);
  return derivedExternal ? (
    <a href={to} {...rest}>
      {left && <Styled.ExternalIcon mr={space} name="external-link-alt" />}
      {children}
      {!left && <Styled.ExternalIcon ml={space} name="external-link-alt" />}
    </a>
  ) : (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default AutoLink;
