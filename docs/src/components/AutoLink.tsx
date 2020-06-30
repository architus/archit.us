import React from "react";
import { styled } from "linaria/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "gatsby";

import { isDefined, isExternal } from "@lib/utility";
import { SpacingKey, gap } from "@design/theme";
import { css, cx } from "linaria";

const hideUnderlineClass = css`
  border-bottom: none !important;
`;

const Styled = {
  ExternalIcon: styled.span<{ mr?: SpacingKey; ml?: SpacingKey }>`
    margin-right: ${(p): string => (isDefined(p.mr) ? gap(p.mr) : "0")};
    margin-left: ${(p): string => (isDefined(p.ml) ? gap(p.ml) : "0")};
    font-size: 80%;
  `,
};

type AutoLinkProps = {
  href: string;
  external?: boolean | null;
  left?: boolean;
  space?: SpacingKey;
  newTab?: boolean;
  noIcon?: boolean;
  noUnderline?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & Partial<
  React.ComponentProps<typeof Link> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

/**
 * Link component that automatically determines if the given link href is external or not,
 * conditionally rendering a Router link or a standard HTML anchor element (including
 * a small external icon if the url is external)
 */
const AutoLink: React.FC<AutoLinkProps> = ({
  children,
  href,
  external = null,
  left = false,
  space = "pico",
  newTab = true,
  noIcon = false,
  noUnderline = false,
  className,
  style,
  ref,
  ...rest
}) => {
  const imageChild = isImageChild(children);
  const hideIcon = noIcon || imageChild;
  const hideUnderline = noUnderline || imageChild;
  const classNames = cx(
    className,
    hideUnderline ? hideUnderlineClass : undefined
  );

  if (isDefined(external) ? external : isExternal(href)) {
    const props = { ...rest };
    if (newTab) {
      Object.assign(props, { target: "_blank", rel: "noreferrer noopener" });
    }
    return (
      <a href={href} className={classNames} style={style} {...props}>
        {left && !hideIcon && (
          <Styled.ExternalIcon mr={space}>
            <FaExternalLinkAlt />
          </Styled.ExternalIcon>
        )}
        {children}
        {!left && !hideIcon && (
          <Styled.ExternalIcon ml={space}>
            <FaExternalLinkAlt />
          </Styled.ExternalIcon>
        )}
      </a>
    );
  }

  return (
    <Link to={href} className={classNames} style={style} {...rest}>
      {children}
    </Link>
  );
};

export default AutoLink;

// ? ================
// ? Helper functions
// ? ================

function isImageChild(children: React.ReactNode): boolean {
  if (isDefined(children) && typeof children === "object") {
    if ((children as { type?: string })?.type === "img") return true;

    type MdxElement = { props?: Record<string, unknown> };
    if ((children as MdxElement)?.props?.originalType === "img") return true;
  }

  return false;
}
