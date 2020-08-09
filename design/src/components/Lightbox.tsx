import { styled } from "linaria/react";
import React, { useState } from "react";
import { Modal } from "react-overlays";
import ResizeObserver from "react-resize-observer";
import { CSSTransition } from "react-transition-group";

import { color } from "../theme/color";
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
    width: 85%;
    height: 85%;
    position: relative;

    ${down("md")} {
      width: 100%;
      height: 100%;
    }
  `,
  Image: styled.img<{ constrainHeight: boolean }>`
    /* See https://stackoverflow.com/a/9994936 */
    /* Background-images or object-fit don't work because we need:
       - border radiuses
       - clickable overlay with image being non-clickable */
    height: ${(props): string => (props.constrainHeight ? "100%" : "auto")};
    width: ${(props): string => (props.constrainHeight ? "auto" : "100%")};
    margin: auto;

    border-radius: 8px;
    box-shadow: ${shadow("z1")};
    user-select: none;
    pointer-events: auto;
  `,
  ImagePlacer: styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  `,
};

export type LightboxProps = {
  image: Option<[string, number]>;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Used to show a full screen preview of an image
 */
const Lightbox: React.FC<LightboxProps> = ({
  image,
  onClose,
  className,
  style,
}) => {
  // Use the previous value of 'image' as a fallback to show when transitioning out
  const prevImage = usePrevious(image);
  const latentImage = image.or(prevImage ?? None);
  const [constrainHeight, setConstrainHeight] = useState(false);
  return (
    <Styled.Lightbox
      show={image.isDefined()}
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
      {latentImage.match({
        None: () => <Styled.ImageWrapper />,
        Some: ([src, aspectRatio]) => (
          <Styled.ImageWrapper>
            <ResizeObserver
              onResize={(rect): void => {
                const { width, height } = rect;
                const shouldConstrainHeight = width / height > aspectRatio;
                if (shouldConstrainHeight !== constrainHeight) {
                  setConstrainHeight(shouldConstrainHeight);
                }
              }}
            />
            <Styled.ImagePlacer>
              {/* There could be a link here,
                  but it might be best just to use the built-in browser method */}
              <Styled.Image src={src} constrainHeight={constrainHeight} />
            </Styled.ImagePlacer>
          </Styled.ImageWrapper>
        ),
      })}
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
