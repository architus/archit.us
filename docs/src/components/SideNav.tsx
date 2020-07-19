import { styled } from "linaria/react";
import React, { useCallback } from "react";

import { color } from "@architus/facade/theme/color";
import { down, up } from "@architus/facade/theme/media";
import { scrollBarAuto } from "@architus/facade/theme/mixins";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";
import NavLabel from "@docs/components/NavLabel";
import { navigate } from "@docs/components/Router";
import SideNavSelector from "@docs/components/SideNavSelector";
import SideNavTree from "@docs/components/SideNavTree";
import { useNavigationTree } from "@docs/data/navigation-tree";
import { sitePadding } from "@docs/layout";

const rightPadding = gap.nano;
const Styled = {
  SideNav: styled.nav`
    ${scrollBarAuto()};
    overflow-y: auto;
    height: 100%;
  `,
  SideNavHeader: styled.h3<{ withBadge: boolean }>`
    color: ${color("textFade")};

    padding-left: ${sitePadding};
    padding-right: ${rightPadding};
    padding-top: ${gap.milli};
    padding-bottom: 1rem;

    font-size: 0.95rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0px;

    /* Correct position of header with badge */
    position: relative;
    top: ${(props): string => (props.withBadge ? "-5px" : "0")};

    ${down("md")} {
      display: none;
    }
  `,
  SideNavSelector: styled(SideNavSelector)`
    margin-top: ${gap.atto};
    margin-bottom: ${gap.micro};
    padding-left: ${sitePadding};
    padding-right: ${rightPadding};
    cursor: pointer;

    ${up("md")} {
      display: none;
    }
  `,
};

export type SideNavProps = {
  activeNavRoot?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Navigation content displayed in the left navigation drawer at all times
 * throughout the site
 */
const SideNav: React.FC<SideNavProps> = ({
  activeNavRoot,
  className,
  style,
}) => {
  const navTree = useNavigationTree();
  const navRootIdOption = Option.from(activeNavRoot)
    // fall back to the first navigation tree if none given
    .orElse(() => Option.from(navTree.keys().next().value));
  const navRootOption = navRootIdOption.flatMapNil((id) => navTree.get(id));
  const onChangePages = useCallback((path: string): void => {
    navigate(path);
  }, []);

  return Option.merge(navRootIdOption, navRootOption).match({
    None: () => (
      <Styled.SideNav style={style} className={className}>
        {navRootIdOption
          .map((id) => (
            // eslint-disable-next-line react/jsx-key
            <Styled.SideNavSelector
              onChange={onChangePages}
              value={id}
              items={navTree}
            />
          ))
          .orUndefined()}
        <Styled.SideNavHeader withBadge={false}>Unknown</Styled.SideNavHeader>
      </Styled.SideNav>
    ),
    Some: ([id, navRoot]) => {
      return (
        <Styled.SideNav>
          <Styled.SideNavSelector
            onChange={onChangePages}
            value={id}
            items={navTree}
          />
          <Styled.SideNavHeader withBadge={isDefined(navRoot.badge)}>
            <NavLabel text={navRoot.label} badge={navRoot.badge} />
          </Styled.SideNavHeader>
          <SideNavTree items={navRoot.children} />
        </Styled.SideNav>
      );
    },
  });
};

export default SideNav;
