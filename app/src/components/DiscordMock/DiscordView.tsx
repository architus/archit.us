import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useContext } from "react";

import { DiscordMockDispatchContext } from "@app/components/DiscordMock/actions";
import InputController from "@app/components/DiscordMock/InputController";
import MessageView from "@app/components/DiscordMock/MessageView";
import { outerPadding } from "@app/components/DiscordMock/style";
import {
  windowPaddingBottom,
  windowBorderRadius,
} from "@app/components/Window";
import { OtherColors } from "@app/theme/color";
import { MockMessageClump, MockMessageSet } from "@app/utility/types";
import { svgDataUrl, trimSvg } from "@architus/facade/svg";
import { Color, staticColor } from "@architus/facade/theme/color";

/* istanbul ignore next */
const errorSvg = (fill: string): string =>
  trimSvg(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 39 39'>
      <g style='opacity: 0.15;'>
        <polygon style='fill:${fill}' points='39 4.9 34.1 0 19.5 14.6 4.9 0 0
          4.9 14.6 19.5 0 34.1 4.9 39 19.5 24.4 34.1 39 39 34.1 24.4 19.5'/>
        <path style='fill:${fill};' d='m34.1 0.9l4 4-14.2 14.2-0.4 0.4 0.4 0.4
          14.2 14.2-4 4-14.2-14.2-0.4-0.4-0.4 0.4-14.2 14.2-4-4 14.2-14.2 0.4
          -0.4-0.4-0.4-14.2-14.2 4-4 14.2 14.2 0.4 0.4 0.4-0.4 14.2-14.2m0-0.9
          l-14.6 14.6-14.6-14.6-4.9 4.9 14.6 14.6-14.6 14.6 4.9 4.9 14.6-14.6
          14.6 14.6 4.9-4.9-14.6-14.6 14.6-14.6-4.9-4.9z'/>
      </g>
    </svg>`
  );

const Styled = {
  Outer: styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding-bottom: calc(${outerPadding} - ${windowPaddingBottom});
    padding-left: ${outerPadding};
    color: ${OtherColors.DiscordFg};
    margin-right: 8px;

    & > * {
      flex-grow: 0;
    }
  `,
  MessageView: styled(MessageView)`
    flex-grow: 1;
  `,
  Divider: styled.hr`
    margin: 0;
    border: none;
    border-bottom: 1px solid ${OtherColors.DiscordMessageDivider};
    margin-right: 32px;
  `,
  ErrorOverlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: 80;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity linear 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    border-radius: ${windowBorderRadius};
    pointer-events: none;

    &[data-show-error="true"] {
      transition: opacity linear 1s;
      opacity: 1;
      pointer-events: all;
    }
  `,
  ErrorInner: styled.div`
    max-width: 70%;
    margin-bottom: 1rem;

    p {
      font-size: 1rem;
    }
  `,
  ErrorImage: styled.span`
    display: block;
    height: 80px;
    width: 100%;
    margin-bottom: 2rem;

    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: ${svgDataUrl(
      errorSvg(Color(staticColor("danger")).toHex())
    )};
  `,
  ErrorHeading: styled.h4`
    font-size: 2.5rem;
    text-transform: none;
    font-weight: 300;
    opacity: 1;
    color: ${transparentize(0.45, OtherColors.DiscordFg)};
  `,
};

export type DiscordViewProps = {
  clumps: MockMessageClump[];
  channelName: string;
  displayError?: boolean;
  pause?: boolean;
  loop?: boolean;
  messageSets?: MockMessageSet[];
  style?: React.CSSProperties;
  className?: string;
};

/**
 * Displays a set of message clumps in a Discord Mock,
 * including an optional error overlay
 */
const DiscordView: React.FC<DiscordViewProps> = ({
  clumps = [],
  channelName,
  displayError = false,
  pause = false,
  loop,
  messageSets,
  className,
  style,
}) => (
  <Styled.Outer className={className} style={style}>
    <Styled.MessageView clumps={clumps} />
    <Styled.Divider />
    <InputController
      dispatch={useContext(DiscordMockDispatchContext).dispatch}
      channelName={channelName}
      loop={loop}
      messageSets={messageSets}
      pause={pause}
    />
    <Styled.ErrorOverlay
      aria-hidden={!displayError}
      data-show-error={displayError ? "true" : undefined}
    >
      <Styled.ErrorInner>
        <Styled.ErrorImage />
        <Styled.ErrorHeading>Uh oh!</Styled.ErrorHeading>
        <p>
          It looks like there has been an error connecting to the architus API
        </p>
      </Styled.ErrorInner>
    </Styled.ErrorOverlay>
  </Styled.Outer>
);

export default DiscordView;
