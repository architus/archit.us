import { styled } from "linaria/react";
import React from "react";

import { withBasePath } from "@app/api";
import { useSessionStatus } from "@app/store/slices/session";
import HeaderLink from "@architus/facade/components/HeaderLink";
import { down } from "@architus/facade/theme/media";

const Styled = {
  Links: styled.ul`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    /* Hide the navbar links on small screen sizes */
    ${down("sm")} {
      display: none;
    }
  `,
};

const LoggedInLinks: React.FC = () => (
  <HeaderLink active={false} path={withBasePath("/app")}>
    Dashboard
  </HeaderLink>
);
const LoggedOutLinks: React.FC = () => null;
const CommonLinks: React.FC = () => null;

type HeaderLinksProps = {
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.HTMLAttributes<HTMLUListElement>>;

const HeaderLinks: React.FC<HeaderLinksProps> = ({
  className,
  style,
  ...rest
}) => (
  <Styled.Links className={className} style={style} {...rest}>
    <CommonLinks />
    {useSessionStatus().isSigningIn ? <LoggedInLinks /> : <LoggedOutLinks />}
  </Styled.Links>
);

export default HeaderLinks;
