import { styled } from "linaria/react";
import React, { useState } from "react";
import { Modal } from "react-overlays";
import ResizeObserver from "react-resize-observer";
import { CSSTransition } from "react-transition-group";

import { color, ColorMode, mode } from "../theme/color";
import { down } from "../theme/media";
import {
  TransitionSpeed,
  transition,
  ease,
  easeOutBack,
} from "../theme/motion";
import { ZIndex } from "../theme/order";
import { shadow } from "../theme/shadow";
import { usePrevious } from "@architus/lib/hooks";
import { Option, None } from "@architus/lib/option";
import Button from "./Button";
import { gap } from "@architus/facade/theme/spacing";

const fade = "lightbox-fade";
const fadeZoom = "lightbox-fadeZoom";
const speed = TransitionSpeed.Normal;
const Styled = {
  Backdrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${ZIndex.Dialog};
    background-color: ${color("modalOverlay")};

    &.${fade}-appear {
      opacity: 0;
    }
    &.${fade}-exit {
      opacity: 1;
    }
    &.${fade}-appear-active {
      opacity: 1;
    }
    &.${fade}-exit-active {
      opacity: 0;
    }

    &.${fade}-appear-active, &.${fade}-exit-active {
      ${transition(["opacity"])}
    }
  `,
  Dialog: styled(Modal)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${ZIndex.Dialog};
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    &.${fadeZoom}-appear {
      opacity: 0;
      transform: scale(0.25);
    }
    &.${fadeZoom}-exit {
      opacity: 1;
      transform: none;
    }
    &.${fadeZoom}-appear-active {
      opacity: 1;
      transform: none;
    }
    &.${fadeZoom}-exit-active {
      opacity: 0;
      transform: scale(0.25);
    }

    &.${fadeZoom}-exit-active {
      ${transition(["opacity", "transform"], { speed })}
    }

    &.${fadeZoom}-appear-active {
      transition: opacity ${speed}ms ${ease},
        transform ${speed}ms ${easeOutBack};
    }
  `,
  Box: styled.div`
    width: 400px;
    //height: 200px;
    pointer-events: all;
    background-color: ${color('bg')};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${mode(ColorMode.Light)} {
      border: 1px solid ${color('border')};
    }
    ${mode(ColorMode.Dark)} {
      box-shadow: ${shadow('z3')}
    }

    & > * {
      display: flex;
      padding: ${gap.nano} ${gap.nano};
      align-items: center;
    }

    & > :nth-child(1) {
      flex-grow: 1;
      flex-basis: 63px;

      h2 {
        color: ${color("textStrong")};
        font-size: 1.5rem;
        font-weight: 300;
      }
      border-bottom: 1px solid ${color('border')};
    }
    & > :nth-child(2) {
      flex-grow: 8;


    }
    & > :nth-child(3) {
      border-radius: 0 0 8px 8px;
      background-color: ${color('bg-10')};
      justify-content: right;
      border-top: 1px solid ${color('border')};
      flex-grow: 0;
      flex-basis: 54px;
      padding: ${gap.nano};
      & > :first-child {
        margin-right: ${gap.nano};
      }
    }
  `,
  Button: styled(Button)`
    //height: 10px;
  `,
};

export type LightboxProps = {
  show: boolean;
  onClose: () => void;
  header: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Used to show a full screen preview of an image
 */
const Dialog: React.FC<LightboxProps> = ({
  show,
  onClose,
  header,
  className,
  style,
}) => {
  return (
    <Styled.Dialog
      show={show}
      onHide={onClose}
      onBackdropClick={onClose}
      className={className}
      style={style}
      transition={FadeZoom}
      backdropTransition={Fade}
      renderBackdrop={(props): React.ReactNode => (
        <Styled.Backdrop {...props} />
      )}
    >
      <Styled.Box>
        <div>
          <h2>{header}</h2>

        </div>
        <div>
          <p>Are you sure you wish to delete the emoji <code>:james_bad:</code> from both your discord server and architus servers?</p>

        </div>
        <div>
          <Styled.Button size='compacter' variant='info' onClick={onClose}>Keep</Styled.Button>
          <Styled.Button size='compacter' variant='danger'>Delete</Styled.Button>
        </div>
      </Styled.Box>
    </Styled.Dialog>
  );
};

export default Dialog;

// ? =================
// ? Helper components
// ? =================

const Fade: React.FC<{
  in: boolean;
  appear?: boolean | undefined;
  unmountOnExit?: boolean | undefined;
}> = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={speed} classNames={fade}>
    {children}
  </CSSTransition>
);

const FadeZoom: React.FC<{
  in: boolean;
  appear?: boolean | undefined;
  unmountOnExit?: boolean | undefined;
}> = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={speed} classNames={fadeZoom}>
    {children}
  </CSSTransition>
);
