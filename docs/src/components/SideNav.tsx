import React from "react";
import { styled } from "linaria/react";

import { useNavigationTree } from "@docs/data/nav";
import { Option } from "@lib/option";
import NavLabel from "@docs/components/NavLabel";
import SideNavTree from "@docs/components/SideNavTree";
import SideNavSelector from "./SideNavSelector";

const Styled = {
  SideNav: styled.nav``,
  SideNavHeader: styled.h3``,
};

type SideNavProps = {
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

  // TODO inject id to selector
  return navRootOption.match({
    None: () => (
      <Styled.SideNav style={style} className={className}>
        <SideNavSelector value="" items={navTree} />
        <Styled.SideNavHeader>Unknown</Styled.SideNavHeader>
      </Styled.SideNav>
    ),
    Some: (navRoot) => {
      return (
        <Styled.SideNav>
          <Styled.SideNavHeader>
        <SideNavSelector value="" items={navTree} />
            <NavLabel text={navRoot.label} badge={navRoot.badge} />
            <SideNavTree items={navRoot.children} />
          </Styled.SideNavHeader>
        </Styled.SideNav>
      );
    },
  });
};

export default SideNav;

const a = `
@import "../../scss/colors";
@import "../../scss/util";
@import "../../scss/media";

%base {
    border-bottom: none;
    text-decoration: none;
    @include transitions("color");
}

%top-level {
    padding-right: 1rem;
    padding-left: 1.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    min-height: 2.5rem;

    @include respond-below(lg) {
        padding-right: 2rem;
        padding-top: 0.5rem;
        padding-bottom: 0.55rem;
        min-height: 0;
    }
}

$dark-heavy-primary: lighten($-primary, 5%);
$dark-very-heavy-primary: lighten($-primary, 10%);
$light-heavy-primary: darken($-primary, 10%);
$light-very-heavy-primary: darken($-primary, 20%);

%heavy-primary-bg {
    @include dark { background-color: $dark-heavy-primary; }
    @include light { background-color: $light-heavy-primary; }
}

%heavy-primary-fg {
    @include dark { color: $dark-heavy-primary !important; }
    @include light { color: $light-heavy-primary !important; }
}

%very-heavy-primary-fg {
    @include dark { color: $dark-very-heavy-primary; }
    @include light { color: $light-very-heavy-primary; }
}

.side-nav {
    $this: &;

    h5 {
        @include light-semi-fade-fg;
        @include dark-semi-fade-fg;

        padding-left: 1.75rem;
        padding-right: 1.5rem;
        padding-top: 2.25rem;
        padding-bottom: 1rem;

        font-size: 0.95rem;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 0px;
    }

    @include respond-below(lg) {
        h5 {
            font-size: 0.85rem;
            padding-right: 0.5rem;
            padding-top: 1.75rem;
            padding-bottom: 0.75rem;
        }

        font-size: 0.9rem;
    }

    ul {
        list-style: none;
        padding-left: 0;
    }

    &--link {
        @extend %base;
        @extend %top-level;
        @include transitions("color, background-color");
        @include dark-fg;
        @include light-fg;

        text-transform: capitalize;
        display: block;
        position: relative;

        &::before,
        &::after {
            content: " ";
            left: calc(0.625rem);
            top: 1.3em;
            height: 8px;
            position: absolute;
            width: 8px;
            transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

            @include respond-below(lg) {
                top: 1.05em;
            }
        }

        &::before {
            transform: scale(0.1);
            border-radius: 100%;
        }

        &::after {
            @extend %heavy-primary-bg;

            opacity: 0;
            transform: translateX(-92px);
            width: 0px;
            border-radius: 4px;
        }

        &:hover {
            @extend %very-heavy-primary-fg;

            background-color: rgba($-primary, 0.1);

            &::before {
                @extend %heavy-primary-bg;

                transform: scale(1);
            }
        }

        &.active-link {
            &::after {
                opacity: 1;
                width: 100px;
            }
        }

        &.active-link,
        &.partially-active-link {
            @extend %heavy-primary-fg;
            font-weight: bold;
        }
    }

    &--expander {
        @extend %button-blank;
        @include transitions("background-color");
        @include dark-fade-fg;
        @include light-fade-fg;

        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 48px;
        font-size: 0.55rem;

        &:hover {
            background-color: rgba($-primary, 0.1);
        }

        svg {
            @include transitions("transform");
            transform: translateX(2px);
        }

        &.open svg {
            transform: rotate(90deg) translateY(-2px);
        }
    }

    .side-nav--expander-outer {
        position: relative;
    }

    & > ul > li {
        &.partially-active {
            background-color: rgba($-primary, 0.08);
        }

        &.is-last {
            @include dark-border(rgba($-light, 0.1), $side: bottom);
            @include light-border(rgba($-dark, 0.15), $side: bottom);
        }

        & > div > a.with-children {
            @include dark-semi-fade-fg;
            @include light-semi-fade-fg;
            @include dark-border(rgba($-light, 0.1), $side: top);
            @include light-border(rgba($-dark, 0.15), $side: top);

            text-transform: uppercase;
            letter-spacing: 0.075em;
        }

        ul li ul li {
            a {
                padding-left: 3.75rem;

                &::before,
                &::after {
                    left: calc(2.625rem);
                }
            }

            ul li {
                a {
                    padding-left: 6rem;

                    &::before,
                    &::after {
                        left: calc(4.875rem);
                    }
                }

                ul li {
                    a {
                        padding-left: 6rem;
                    }
                }
            }
        }
    }
}
`;
