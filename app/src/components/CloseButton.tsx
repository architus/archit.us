import { styled } from "linaria/react";
import React from "react";
import { IoMdClose } from "react-icons/io";

import { color } from "@architus/facade/theme/color";
import { blankButton } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";

const Styled = {
  CloseButton: styled.button`
    ${blankButton()}
    font-size: 1.5rem;
    color: ${color("textStrong")};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    outline: none !important;
    border: none;

    ${transition(["opacity"])}
    opacity: 0.3;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 1;
    }
  `,
};

export type CloseButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Close button used to dismiss notifications/alerts
 */
const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className,
  style,
}) => (
  <Styled.CloseButton onClick={onClick} className={className} style={style}>
    <IoMdClose />
  </Styled.CloseButton>
);

export default CloseButton;
