import React from "react";
import { styled } from "linaria/react";
import { Modal } from "react-overlays";
import { CSSTransition } from "react-transition-group";

import { Option, None } from "@lib/option";
import {
  ZIndex,
  shadow,
  color,
  gap,
  transition,
  down,
  TransitionSpeed,
  ease,
  easeOutBack,
} from "@design/theme";
import AutoLink from "@design/components/AutoLink";
import { usePrevious } from "@lib/hooks";

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
    z-index: ${ZIndex.ModalOverlay};
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
  Lightbox: styled(Modal)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${ZIndex.Modal};
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
  ImageWrapper: styled.div`
    max-width: 85%;
    max-height: 85%;

    ${down("md")} {
      max-width: 100%;
      max-height: 100%;
    }

    & > * {
      pointer-events: auto;
    }
  `,
  Image: styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
    box-shadow: ${shadow("z1")};
  `,
  OriginalLink: styled(AutoLink)`
    font-weight: 500;
    color: ${color("light")};
    padding-top: ${gap.atto};
    display: inline-block;

    ${transition(["opacity"])}
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
    }
  `,
};

export type LightboxProps = {
  src: Option<string>;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Used to show a full screen preview of an image
 */
const Lightbox: React.FC<LightboxProps> = ({
  src,
  onClose,
  className,
  style,
}) => {
  // Use the previous value of 'src' as a fallback to show when transitioning out
  const prevSrc = usePrevious(src);
  const latentSource = src.or(prevSrc ?? None);
  return (
    <Styled.Lightbox
      show={src.isDefined()}
      onHide={onClose}
      onBackdropClick={onClose}
      className={className}
      style={style}
      unmountOnExit
      transition={FadeZoom}
      backdropTransition={Fade}
      renderBackdrop={(props): React.ReactNode => (
        <Styled.Backdrop {...props} />
      )}
    >
      <Styled.ImageWrapper>
        {latentSource.isDefined() && (
          <>
            <Styled.Image
              src={latentSource.get}
              onClick={(e: React.MouseEvent): void => e.stopPropagation()}
            />
            <Styled.OriginalLink
              href={latentSource.get}
              noUnderline
              noIcon
              external
              onClick={(e: React.MouseEvent): void => e.stopPropagation()}
              {...{ autoFocus: true }}
            >
              Open original
            </Styled.OriginalLink>
          </>
        )}
      </Styled.ImageWrapper>
    </Styled.Lightbox>
  );
};

export default Lightbox;

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
