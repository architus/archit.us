import { styled } from "linaria/react";
import { lighten, darken } from "polished";
import React from "react";

import CloseButton from "@app/components/CloseButton";
import { NotificationType, NotificationVariant } from "@app/store/actions";
import { svgDataUrl } from "@architus/facade/css";
import {
  color,
  dynamicColor,
  ColorMode,
  staticColor,
} from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { blankButton } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";
import { shadow } from "@architus/facade/theme/shadow";

// Removes excess space from a multiline SVG source string
const trimSvg = (src: string): string =>
  src
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(" ");

const infoIcon = `
<?xml version='1.0' encoding='utf-8'?>
<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 24'>
  <path style='fill: white; opacity: 0.1' d='M14.1,0.2C7.6-1,1.4,3.3,0.2,9.9
    s3.2,12.8,9.7,13.9c6.5,1.2,12.8-3.2,13.9-9.7C25,7.6,20.7,1.4,14.1,0.2z M8.5,
    16.5 c1.1-2.1,2.9-4.5,3.2-5.1c0.5-0.9,0-1.4-2.2-0.1l-0.3-0.9c2.6-1.9,7.1
    -1.7,4.9,1.7c-1.3,2.1-2.3,3.5-2.9,4.6 c-0.9,1.6,0.7,1.2,2.3,0.1c0.1,0.3,0.2,
    0.5,0.3,0.8C10.3,20,6.8,19.7,8.5,16.5z M16.1,7.5c-0.8,0.4-1.7,0.3-2.2-0.4 c
    -0.4-0.7-0.2-1.6,0.6-2c0.8-0.4,1.7-0.2,2.2,0.4C17.2,6.2,16.9,7.1,16.1,
    7.5z' />
</svg>
`;
const successIcon = `
<?xml version='1.0' encoding='utf-8'?>
<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 22'>
  <path style='fill: white; opacity: 0.2' d='M21.9,9.3C21.9,9.9,22,10.4,22,
    11c0,6.1-4.9,11-11,11S0,17.1,0,11S4.9,0,11,0c2.3,0,4.5,0.7,6.3,2l-1.4,1.5
    C14.5,2.5,12.8,2,11,2c-5,0-9,4-9,9s4,9,9,9c4.9,0,8.9-3.9,9-8.8C20,11.2,
    21.9,9.3,21.9,9.3z M20.9,1.2l-9.4,9.6L7.7,7.2l-3.1,3.1 l6.9,6.7L24,4.3C24,
    4.3,20.9,1.2,20.9,1.2z' />
</svg>
`;
const warningIcon = `
<?xml version='1.0' encoding='utf-8'?>
<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 23.1 21.5'>
  <path style='fill: white; opacity: 0.2' d='M11.1,0.2L0.1,20.5c-0.2,0.4,0.1,
    0.9,0.6,0.9h21.7c0.5,0,0.9-0.6,0.6-1.1L12,0.2C11.8-0.1,11.3-0.1,11.1,0.2z
    M10.5,6.7h2.2 v7.7h-2.2V6.7z M11.6,19.1c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.
    -1.4c0.8,0,1.4,0.6,1.4,1.4S12.3,19.1,11.6,19.1z' />
</svg>
`;
const dangerIcon = `
<?xml version='1.0' encoding='utf-8'?>
<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 24'>
  <path style='fill: white; opacity: 0.2'
    d='M17,0H7L0,7V17l7,7H17l7-7V7C24,7,17,0,17,0z M16.5,18.2L12,13.8l-4.4,
    4.5l-1.8-1.8l4.4-4.5L5.8,7.7l1.8-1.8l4.5,4.3 l4.4-4.5l1.8,1.8L13.8,12l4.5,
    4.4L16.5,18.2z' />
</svg>
`;

const notificationVariant = (
  variant: NotificationVariant,
  c: string,
  icon: string
): string => `
  &[data-variant="${variant}"] {
    background-color: ${c};
    background-image: ${svgDataUrl(icon)};

    &[data-type="toast"]:hover {
      background-color: ${lighten(0.05, c)};
    }
  }
`;

const StyledCloseButton = styled(CloseButton)`
  width: 40px;
  height: 40px;

  position: absolute;
  top: 0;
  right: 2px;
`;

const Styled = {
  Content: styled.div`
    margin-bottom: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    border-radius: 4px;
  `,
  Notification: styled.div`
    ${blankButton()}
    ${transition([
      "transform",
      "opacity",
      "background-color",
      "max-height",
      "margin-bottom",
      "padding-top",
      "padding-bottom",
      "box-shadow",
    ])}

    position: relative;
    pointer-events: all;

    display: block;
    margin-bottom: 0.6rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 2.75rem;

    box-shadow: ${shadow("z0")};
    color: ${color("light")};
    background-size: 60px 60px;
    background-position: left -12px bottom -12px;
    background-repeat: no-repeat;

    &:last-child {
      margin-bottom: 0;
    }

    &[data-type="alert"] {
      border-radius: 6px;

      ${StyledCloseButton} {
        pointer-events: all;
      }
    }

    &[data-type="toast"] {
      display: inline-block;

      cursor: pointer;
      user-select: none;
      border-radius: 4px;

      ${down("md")} {
        padding: 0.5rem 0.75rem;

        ${StyledCloseButton} {
          display: none;
        }
      }

      &:hover {
        transform: translateY(-1px);
        box-shadow: ${shadow("z1")};
      }

      ${StyledCloseButton} {
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }
    }

    ${notificationVariant(
      "info",
      dynamicColor("bg+10", ColorMode.Dark),
      trimSvg(infoIcon)
    )}
    ${notificationVariant(
      "success",
      darken(0.2, staticColor("success")),
      trimSvg(successIcon)
    )}
    ${notificationVariant(
      "warning",
      darken(0.2, staticColor("warning")),
      trimSvg(warningIcon)
    )}
    ${notificationVariant(
      "danger",
      darken(0.2, staticColor("danger")),
      trimSvg(dangerIcon)
    )}
  `,
  CloseButton: StyledCloseButton,
};

export type NotificationProps = {
  type: NotificationType;
  variant: NotificationVariant;
  message: React.ReactNode;
  id: number;
  onDismiss: (id: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders a single alert or toast-style notification
 */
const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  id,
  variant,
  onDismiss,
  className,
  style,
}) => {
  const isToast = type === "toast";
  const dismissHandler = (): void => onDismiss(id);
  const outerOnClick = isToast ? (): void => onDismiss(id) : undefined;
  return (
    <Styled.Notification
      className={className}
      style={style}
      onClick={outerOnClick}
      data-type={type}
      data-variant={variant}
    >
      <Styled.CloseButton onClick={dismissHandler} />
      <Styled.Content>{message}</Styled.Content>
    </Styled.Notification>
  );
};

export default Notification;
