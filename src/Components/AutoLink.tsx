import React from "react";
import { Link, Icon } from "Components";
import { LinkProps } from "Components/Router";
import { isDefined, isExternal } from "Utility";

type AutoLinkProps = {
  to: string;
  external?: boolean | null;
  left?: boolean;
} & Partial<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>;

const AutoLink: React.FC<AutoLinkProps> = ({
  children,
  to,
  left = false,
  external = null,
  ...rest
}) => {
  const derivedExternal = isDefined(external) ? external : isExternal(to);
  return derivedExternal ? (
    <a href={to} {...rest}>
      {left && <Icon className="mr-3" name="external-link-alt" />}
      {children}
      {!left && <Icon className="ml-3" name="external-link-alt" />}
    </a>
  ) : (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

AutoLink.displayName = "AutoLink";

export default AutoLink;
