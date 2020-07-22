import { Box, useUp } from "@xstyled/emotion";
import React from "react";
import { Navbar } from "react-bootstrap";

import Link from "@app/components/AutoLink";
import BuildMarker, { BuildMarkerPropsBase } from "@app/components/BuildMarker";
import Links from "@app/components/Header/Links";
import SessionControl from "@app/components/Header/SessionControl";
import { LinkProps } from "@app/components/Router";
import { Breakpoint } from "@app/theme";
import { attach, withBasePath } from "@app/utility";
import Logo from "@architus/facade/components/Logo";
import "./style.scss";

type HeaderProps = {
  children?: React.ReactNode;
  noContainer?: boolean;
  noLinks?: boolean;
  sticky?: boolean;
} & Omit<Partial<React.ComponentProps<typeof Navbar>>, "sticky">;

/**
 * Primary header component, including links and the session control dropdown. Additional
 * children can be passed in via the `children` prop.
 */
const Header: React.FC<HeaderProps> = ({
  children,
  noContainer = false,
  noLinks = false,
  sticky = true,
  ...rest
}) => (
  <Navbar
    expand="md"
    variant="dark"
    collapseOnSelect
    sticky={sticky ? "top" : undefined}
    {...rest}
  >
    <div className={noContainer ? "container-fluid" : "container"}>
      <Brand />
      {noLinks ? null : <Links className="mr-auto" />}
      <div className="header-children">
        {children}
        <SessionControl />
      </div>
    </div>
  </Navbar>
);

// ? ==============
// ? Sub-components
// ? ==============

type BrandProps = Partial<LinkProps> & BuildMarkerPropsBase;

/**
 * Shows a clickable architus logo that goes to the home page, as well as a build tag
 * used for displaying the CI/local build status (hidden on production)
 */
const Brand: React.FC<BrandProps> = ({ top, className, style, ...props }) => (
  <Box
    display="flex"
    alignItems="center"
    mr="micro"
    // Pass style props to the outer component
    className={className}
    style={style}
  >
    <Link {...props} className="nav-link brand" to={withBasePath("/")}>
      {/* Use just the logotype on very small screen sizes */}
      {useUp(Breakpoint.VS) || typeof window === "undefined" ? (
        <Logo.Combined />
      ) : (
        <Logo.Symbol />
      )}
    </Link>
    {/* Hide the build marker in the header on small screen sizes */}
    <BuildMarker top={top} display={{ xs: "none", lg: "inline-block" }} />
  </Box>
);

export default attach(Header, { Brand });
