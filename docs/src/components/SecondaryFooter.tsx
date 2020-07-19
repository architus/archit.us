import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";
import { FaGithub, FaHeart, FaReact, FaAlgolia } from "react-icons/fa";

import AutoLink from "@architus/facade/components/AutoLink";
import { FooterContent } from "@architus/facade/components/Footer";
import Tooltip from "@architus/facade/components/Tooltip";
import GatsbyIcon from "@architus/facade/icons/gatsby.svg";
import GraphQlIcon from "@architus/facade/icons/graphql.svg";
import LinariaIcon from "@architus/facade/icons/linaria.svg";
import TypeScriptIcon from "@architus/facade/icons/typescript.svg";
import {
  color,
  dynamicColor,
  ColorMode,
  mode,
  staticColor,
} from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  SecondaryFooter: styled.footer`
    padding: ${gap.nano} 0;
    background-color: ${color("bg-20")};
    box-shadow: ${shadow("innerTop")};
    color: ${dynamicColor("text", ColorMode.Dark)};
    ${mode(ColorMode.Light)} {
      background-color: ${dynamicColor("bg+10", ColorMode.Dark)};
    }

    ${down("md")} {
      padding: ${gap.nano} 0;
    }
  `,
  SecondaryContent: styled(FooterContent)`
    text-align: center;
  `,
  TechnologyList: styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: center;

    padding: ${gap.atto} ${gap.pico};
  `,
  TechnologyLink: styled(AutoLink)`
    font-size: 1.3rem;
    color: ${color("light")};
    padding: ${gap.femto};
    border-radius: 4px;
    border: none !important;

    &:hover {
      background-color: ${transparentize(0.95, staticColor("light"))};
    }

    & > svg {
      vertical-align: -4px;
    }
  `,
  HeartIcon: styled(FaHeart)`
    color: rgb(255, 100, 100);
    vertical-align: -2px;
    margin: 0 2px;
    display: inline-block;
  `,
};

export type SecondaryFooterProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Secondary site footer displayed at the bottom of the page,
 * showing list of core technologies
 */
const SecondaryFooter: React.FC<SecondaryFooterProps> = ({
  className,
  style,
}) => {
  return (
    <>
      <Styled.SecondaryFooter className={className} style={style}>
        <Styled.SecondaryContent>
          Built with <Styled.HeartIcon /> using <TechnologyList />
        </Styled.SecondaryContent>
      </Styled.SecondaryFooter>
    </>
  );
};

export default SecondaryFooter;

// ? ==============
// ? Sub-components
// ? ==============

const TechnologyList: React.FC = () => (
  <Styled.TechnologyList>
    <Technology
      icon={FaGithub}
      link="https://github.com/architus/archit.us"
      tooltip="GitHub"
    />
    <Technology icon={FaReact} link="https://reactjs.org/" tooltip="React" />
    <Technology
      icon={GatsbyIcon}
      link="https://www.gatsbyjs.org/"
      tooltip="Gatsby"
    />
    <Technology
      icon={LinariaIcon}
      link="https://linaria.now.sh/"
      tooltip="Linaria"
    />
    <Technology
      icon={GraphQlIcon}
      link="https://graphql.org/"
      tooltip="GraphQL"
    />
    <Technology
      icon={FaAlgolia}
      link="https://www.algolia.com/"
      tooltip="Algolia"
    />
    <Technology
      icon={TypeScriptIcon}
      link="http://typescriptlang.org/"
      tooltip="TypeScript"
    />
  </Styled.TechnologyList>
);

type TechnologyProps = {
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
  link: string;
  tooltip: string;
};
const Technology: React.FC<TechnologyProps> = ({
  icon: Icon,
  link,
  tooltip,
}) => (
  <Tooltip placement="top" tooltip={tooltip}>
    <Styled.TechnologyLink href={link} noIcon>
      <Icon />
    </Styled.TechnologyLink>
  </Tooltip>
);
