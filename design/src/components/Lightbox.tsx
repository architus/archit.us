import React, { useEffect } from "react";
import { css, cx } from "linaria";
import { styled } from "linaria/react";

import { Option } from "@lib/option";
import { ZIndex, shadow, color, gap, transition, down } from "@design/theme";
import AutoLink from "@design/components/AutoLink";
import { isDefined } from "@lib/utility";

const showClass = css``;

const ImageWrapper = styled.div`
  max-width: 85%;
  max-height: 85%;

  ${down("md")} {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${ZIndex.ModalOverlay};

    display: flex;
    align-items: center;
    justify-content: center;

    ${transition(["background-color"])}
    background-color: transparent;
    pointer-events: none;

    &.${showClass} {
      background-color: ${color("modalOverlay")};
      pointer-events: initial;
    }

    & ${ImageWrapper} {
      ${transition(["transform, opacity"])}
      transform: scale(0.5);
      opacity: 0;
    }

    &.${showClass} {
      & ${ImageWrapper} {
        transform: none;
        opacity: 1;
      }
    }
  `,
  ImageWrapper,
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
  useEffect(() => {
    let handler: EventListener | null = null;
    if (src.isDefined()) {
      const actualHandler = (e: KeyboardEvent): void => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      handler = actualHandler as EventListener;
      document.addEventListener("keydown", actualHandler, false);
    }

    return (): void => {
      if (isDefined(handler)) {
        document.removeEventListener("keydown", handler, false);
      }
    };
  }, [src, onClose]);

  return (
    <Styled.Wrapper
      className={cx(className, src.isDefined() && showClass)}
      style={style}
      onClick={onClose}
    >
      <Styled.ImageWrapper>
        {src.isDefined() && (
          <>
            <Styled.Image
              src={src.get}
              onClick={(e: React.MouseEvent): void => e.stopPropagation()}
            />
            <Styled.OriginalLink
              href={src.get}
              noUnderline
              noIcon
              external
              onClick={(e: React.MouseEvent): void => e.stopPropagation()}
            >
              Open original
            </Styled.OriginalLink>
          </>
        )}
      </Styled.ImageWrapper>
    </Styled.Wrapper>
  );
};

export default Lightbox;
