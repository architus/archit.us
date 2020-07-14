import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import AutoLink from "@design/components/AutoLink";
import { staticColor, dynamicColor, ColorMode } from "@design/theme/color";
import { setLinkColor } from "@design/theme/mixins";
import { gap } from "@design/theme/spacing";
import { Option } from "@lib/option";

const Styled = {
  Divider: styled.hr`
    border-top: 2px solid ${transparentize(0.6, staticColor("light"))};
    margin: ${gap.nano} 0 ${gap.micro};
    opacity: 0.25;
  `,
  ContextIcon: styled.span`
    margin-right: ${gap.pico};
    position: relative;
    top: 1px;
  `,
  EntryLabel: styled.h4`
    &:not(:first-of-type) {
      margin-top: ${gap.nano};
    }

    font-size: 0.95em;
    margin-top: 0;
    margin-bottom: 0;
    opacity: 0.55;
  `,
  EntryContent: styled.div`
    margin-top: ${gap.atto};
    font-size: 1em;
    /* Set the link color to be light always */
    ${setLinkColor(dynamicColor("primary+10", ColorMode.Dark))}
  `,
};

export interface BuildContext {
  label: string;
  message?: React.ReactNode;
  icon?: React.ReactNode;
}

export type BuildMetadataEntry = OptionLinkEntry | ContentEntry;
export interface OptionLinkEntry {
  type: "optionLink";
  label: string;
  href?: string | undefined;
  text?: string | undefined;
}
export interface ContentEntry {
  type: "content";
  label: string;
  content: string;
}

// Only used internally at runtime
export interface NodeEntry {
  type: "node";
  label: string;
  content: React.ReactNode;
}

export type BuildDetailsProps = {
  context: BuildContext;
  entries: BuildMetadataEntry[];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders a list of build metadata entries, used in the tooltip displayed by
 * a `<BuildTag />` once clicked
 */
const BuildDetails: React.FC<BuildDetailsProps> = ({
  context,
  entries,
  className,
  style,
}) => (
  <div className={className} style={style}>
    {context.message && (
      <>
        <div>{context.message}</div>
        <Styled.Divider />
      </>
    )}
    <Context context={context} />
    {entries.map((entry, i) => (
      <Entry key={i} data={entry} />
    ))}
  </div>
);

export default BuildDetails;

// ? ==============
// ? Sub-components
// ? ==============

/**
 * Renders a single detail entry, including a label and corresponding value
 */
const Entry: React.FC<{ data: BuildMetadataEntry | NodeEntry }> = ({
  data,
}) => {
  let content: React.ReactNode = null;
  switch (data.type) {
    case "content":
    case "node":
      content = data.content;
      break;
    case "optionLink":
      content = Option.from(data.href)
        .map((href) => (
          // eslint-disable-next-line react/jsx-key
          <AutoLink href={href} space="femto">
            {data.text ?? href}
          </AutoLink>
        ))
        .getOrElse(<>~</>);
      break;
  }
  return (
    <>
      <Styled.EntryLabel>{data.label}</Styled.EntryLabel>
      <Styled.EntryContent>{content}</Styled.EntryContent>
    </>
  );
};

/**
 * Renders the build context information, which is always visible
 */
const Context: React.FC<{ context: BuildContext }> = ({ context }) => (
  <>
    <Entry
      data={{
        type: "node",
        label: "Context",
        content: (
          <>
            {context.icon && (
              <Styled.ContextIcon>{context.icon}</Styled.ContextIcon>
            )}
            {context.label}
          </>
        ),
      }}
    />
  </>
);
