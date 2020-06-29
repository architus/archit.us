import React from "react";
import { styled } from "linaria/react";
import {
  BsInfoCircleFill,
  BsExclamationTriangleFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";

import Article from "@design/components/Article";
import { Variant, color, mode, ColorMode, hybridColor } from "@design/theme";
import { isDefined } from "@lib/utility";
import { transparentize } from "polished";

const IconWrapper = styled.div`
  font-size: 2rem;
  position: absolute;
  top: calc(50% - 1.3rem);
  left: 1.25rem;
  display: block;
`;

const Styled = {
  IconWrapper,
  Alert: styled.div<{ variant: Variant }>`
    padding: 1.5rem 1.75rem 1.5rem 4.5rem;
    position: relative;

    & > :last-child {
      margin-bottom: 0 !important;
    }

    --base-color: ${(p): string => color(p.variant)};
    border-left: 4px solid var(--base-color);
    ${IconWrapper} {
      color: var(--base-color);
    }

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    ${mode(ColorMode.Light)} {
      background-color: ${(p): string =>
        transparentize(0.85, hybridColor(p.variant, ColorMode.Light))};
    }

    ${mode(ColorMode.Dark)} {
      background-color: ${(p): string =>
        transparentize(0.8, hybridColor(p.variant, ColorMode.Dark))};
    }
  `,
};

type AlertIcon = Extract<Variant, "info" | "success" | "warning" | "danger">;
type AlertProps = {
  children: React.ReactNode;
  icon?: AlertIcon;
  type?: Variant;
  className?: string;
  style?: React.CSSProperties;
};

const iconMap = {
  info: BsInfoCircleFill,
  success: IoIosCheckmarkCircle,
  warning: BsExclamationTriangleFill,
  danger: BsFillXCircleFill,
} as const;

/**
 * Alert block-level element similar to Bootstrap Alerts
 */
const Alert: React.FC<AlertProps> = ({
  children,
  icon,
  type = "warning",
  className,
  style,
}) => {
  const derivedIcon = isDefined(icon) ? icon : iconForType(type);
  const Icon = iconMap[derivedIcon];
  return (
    <Styled.Alert variant={type} className={className} style={style}>
      <Styled.IconWrapper>
        <Icon
          style={
            derivedIcon === "success"
              ? { fontSize: "1.231em", top: "3px", position: "relative" }
              : undefined
          }
        />
      </Styled.IconWrapper>
      <Article>{children}</Article>
    </Styled.Alert>
  );
};

export default Alert;

// ? ================
// ? Helper functions
// ? ================

const typeIconMap = {
  primary: "info",
  secondary: "info",
  tertiary: "info",
  danger: "danger",
  info: "info",
  light: "info",
  dark: "info",
  warning: "warning",
  success: "success",
} as const;
function iconForType(type: Variant): AlertIcon {
  return typeIconMap[type];
}
