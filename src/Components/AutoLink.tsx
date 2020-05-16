import React from "react";
import styled from "@xstyled/emotion";
import {
  compose,
  marginRight,
  marginLeft,
  createSystemComponent,
} from "@xstyled/system";
import { Link, Icon } from "Components";
import { LinkProps } from "Components/Router";
import { isDefined, isExternal } from "Utility";
import { Space } from "Theme/tokens";

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

const AutoLink: React.FC<AutoLinkProps> = ({
  children,
  to,
  left = false,
  external = null,
  space = "nano",
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

AutoLink.displayName = "AutoLink";

export default AutoLink;
