import { styled } from "linaria/react";
import React from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { sitePadding } from "@app/layout";
import AutoLink from "@architus/facade/components/AutoLink";
import Button, { StylableButton } from "@architus/facade/components/Button";
import Tooltip from "@architus/facade/components/Tooltip";
import Comfy from "@architus/facade/icons/comfy.svg";
import Compact from "@architus/facade/icons/compact.svg";
import Sparse from "@architus/facade/icons/sparse.svg";
import { color } from "@architus/facade/theme/color";
import { down, up } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

const Section = styled.div`
  background-color: ${color("bg-10")};
  display: flex;
  flex-direction: column;
  padding: 0 var(--padding);
  align-items: flex-start;
`;

const Styled = {
  Outer: styled.div`
    border-radius: ${gap.pico};
    margin: 0 0 ${gap.micro};
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    ${up("md")} {
      margin-left: ${gap.milli};
      margin-right: ${gap.milli};
    }

    ${down("md")} {
      border-radius: 0;
    }
  `,
  Left: styled.div`
    background-color: ${color("bg-10")};
    display: grid;
    --padding: ${gap.micro};
    padding: var(--padding) 0;
  `,
  RightFill: styled.div`
    background-color: ${color("bg-10")};
    opacity: 0.6;
    flex-basis: 0;
    flex-shrink: 0;
    flex-grow: 1;
  `,
  SectionGrid: styled.div`
    background-color: ${color("border")};
    max-width: 700px;
    width: 100%;
    display: grid;
    grid-auto-flow: row;

    grid-template-columns: 3fr 3fr 5fr 5fr 5fr;
    grid-template-rows: auto;
    column-gap: 1px;

    ${down("md")} {
      grid-template-columns: 3fr 5fr 5fr;
    }
  `,
  TopRowSectionOnMedium: styled(Section)`
    ${down("md")} {
      padding-bottom: ${gap.micro};
    }
  `,
  EnabledSection: styled(Section)`
    ${down("md")} {
      grid-column: 1;
      grid-row: 1 / 3;
    }
  `,
  Section,
  SectionTitle: styled.h4`
    font-size: 1.1rem;
    margin-bottom: ${gap.pico};
  `,
  Count: styled.span`
    font-weight: 600;
    display: inline-block;
    background-color: ${color("activeOverlay")};
    /* font-size: 1.1rem; */
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
  `,
};

export type ManagerJumbotronProps = {
  docsLink: string;
  enabled: boolean;
  onChangeEnabled: (next: boolean) => boolean;
  current: number;
  discordLimit: number;
  architusLimit: number | "unlimited";
};

/**
 * Big banner thing at the top of the emoji manager page for extra info and controls.
 */
export default function ManagerJumbotron({
  docsLink,
  enabled,
  onChangeEnabled,
  current,
  discordLimit,
  architusLimit,
}: ManagerJumbotronProps): React.ReactElement {
  return (
    <Styled.Outer>
      <Styled.Left>
        <Styled.SectionGrid>
          <Styled.EnabledSection>
            <Styled.SectionTitle>Enable</Styled.SectionTitle>
            <Switch onChange={onChangeEnabled} checked={enabled} />
          </Styled.EnabledSection>
          <Styled.TopRowSectionOnMedium>
            <Styled.SectionTitle>Current</Styled.SectionTitle>
            <Styled.Count>{current}</Styled.Count>
          </Styled.TopRowSectionOnMedium>
          <Styled.TopRowSectionOnMedium>
            <Styled.SectionTitle>Discord Limit</Styled.SectionTitle>
            <Styled.Count>{discordLimit}</Styled.Count>
          </Styled.TopRowSectionOnMedium>
          <Styled.Section>
            <Styled.SectionTitle>Architus Limit</Styled.SectionTitle>
            <Styled.Count>{architusLimit}</Styled.Count>
          </Styled.Section>
          <Styled.Section>
            <Styled.SectionTitle>More Info</Styled.SectionTitle>
            <AutoLink href={docsLink}>docs.archit.us</AutoLink>
          </Styled.Section>
        </Styled.SectionGrid>
      </Styled.Left>
      <Styled.RightFill></Styled.RightFill>
    </Styled.Outer>
  );
}
