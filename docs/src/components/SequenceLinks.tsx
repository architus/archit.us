import React from "react";
import { styled } from "linaria/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { transparentize } from "polished";

import { Nil } from "@lib/types";
import { isNil } from "@lib/utility";
import Card from "@design/components/Card";
import NavLabel from "@docs/components/NavLabel";
import { Link } from "@docs/components/Router";
import {
  gap,
  color,
  shadow,
  transition,
  up,
  down,
  dynamicColor,
  ColorMode,
} from "@design/theme";

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Styled = {
  Icon,
  SequenceLinks: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;

    --gutter: calc(${gap.flow} / 2);
    & > * {
      flex-grow: 1;
      ${down("md")} {
        width: 100%;
        &:nth-child(2n) {
          margin-top: ${gap.nano};
        }
      }

      ${up("md")} {
        max-width: calc(50% - var(--gutter));
      }
    }

    a {
      display: flex;
      flex-direction: row;
      border-bottom: none !important;
      align-items: stretch;

      ${Card} {
        width: 100%;
        flex-grow: 1;
        padding: ${gap.micro};
        display: flex;
        flex-direction: row;
        ${transition(["box-shadow", "border-color"])};
      }

      --icon-margin-left: 0;
      --icon-margin-right: 0;
      ${Icon} {
        ${transition(["padding-left", "padding-right", "font-size", "opacity"])}
        padding-left: var(--icon-margin-left);
        padding-right: var(--icon-margin-right);
        font-size: 0;
        opacity: 0;
      }

      &:hover {
        ${Card} {
          box-shadow: ${shadow("z2")};
          border: 1px solid
            ${transparentize(0.2, dynamicColor("primary", ColorMode.Dark))};
        }

        ${Icon} {
          font-size: 120%;
          opacity: 0.5;
        }

        &:nth-child(2n) {
          --icon-margin-left: ${gap.nano};
        }
        &:nth-child(2n + 1) {
          --icon-margin-right: ${gap.nano};
        }
      }

      &:nth-child(2n) {
        text-align: right;
        ${Card} {
          flex-direction: row-reverse;
        }
      }
    }
  `,
  Label: styled.h5`
    font-size: 80% !important;
    color: ${color("primary")} !important;
    margin-bottom: calc(0.4 * ${gap.flow});
    margin-top: 0.2em;
  `,
  Title: styled.h4`
    margin-bottom: 0;
  `,
};

export type SequenceLinkData = {
  title: string;
  badge: string | Nil;
  path: string;
};

type SequenceLinksProps = {
  next: SequenceLinkData | Nil;
  previous: SequenceLinkData | Nil;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Previous/next cards at the bottom of each docs page
 */
const SequenceLinks: React.FC<SequenceLinksProps> = ({
  next,
  previous,
  className,
  style,
}) => (
  <Styled.SequenceLinks className={className} style={style}>
    <SequenceLink data={previous} type="previous" />
    <SequenceLink data={next} type="next" />
  </Styled.SequenceLinks>
);

export default SequenceLinks;

// ? =================
// ? Helper components
// ? =================

type SequenceLinkProps = {
  data: SequenceLinkData | Nil;
  type: "previous" | "next";
};

const SequenceLink: React.FC<SequenceLinkProps> = ({ data, type }) => {
  if (isNil(data)) return <div />;
  const { title, badge, path } = data;
  return (
    <Link to={path}>
      <Card>
        <Styled.Icon>
          {type === "previous" ? <FaChevronLeft /> : <FaChevronRight />}
        </Styled.Icon>
        <div>
          <Styled.Label>
            {type === "previous" ? "Previous" : "Next"}
          </Styled.Label>
          <Styled.Title>
            <NavLabel text={title} badge={badge} />
          </Styled.Title>
        </div>
      </Card>
    </Link>
  );
};
