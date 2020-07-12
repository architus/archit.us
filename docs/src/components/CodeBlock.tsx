import React, { useRef, useState } from "react";
import { styled } from "linaria/react";
import { MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";

import { color, gap, blankButton, transition } from "@design/theme";
import { isDefined } from "@lib/utility";
import Tooltip from "@design/components/Tooltip";

const CopyButton = styled.button<{ showingToast: boolean }>`
  ${blankButton()}
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.4rem;
  line-height: 0.9;
  padding: ${gap.pico};
  border-radius: 4px;

  color: ${(props): string =>
    props.showingToast ? color("textLight") : "transparent"};
  background-color: transparent;
  ${transition(["color", "background-color"])}

  &:hover, &:focus {
    color: ${color("text")} !important;
    background-color: ${color("textOverlay")};
  }

  &:active {
    color: ${color("textStrong")} !important;
  }
`;
const Styled = {
  Pre: styled.pre`
    position: relative;

    &:hover ${CopyButton} {
      color: ${color("textLight")};
    }
  `,
  CopyButton,
};

export type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

/**
 * Formatted code block component that includes a copy button in the top right corner.
 * Uses the same children as a normal `<pre />` element.
 */
const Table: React.FC<CodeBlockProps> = ({
  className,
  style,
  children,
  ...rest
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const currentTimeout = useRef<number | null>(null);
  const parentRef = useRef<HTMLPreElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const onCopy = (): void => {
    if (isDefined(parentRef.current)) {
      // Copy text to clipboard
      const text = parentRef.current.innerText;
      copy(text);

      // Unfocus button
      if (isDefined(buttonRef.current)) {
        buttonRef.current.blur();
      }

      // Handle notification timeout
      setShowNotification(true);
      if (isDefined(currentTimeout.current))
        clearTimeout(currentTimeout.current);
      currentTimeout.current = window.setTimeout(() => {
        setShowNotification(false);
        currentTimeout.current = null;
      }, 2000);
    }
  };

  return (
    <Styled.Pre {...rest} ref={parentRef}>
      {children}
      <Styled.CopyButton
        ref={buttonRef}
        onClick={onCopy}
        showingToast={showNotification}
      >
        <Tooltip
          tooltip="Copied to clipboard!"
          placement="top"
          tooltipShown={showNotification}
          trigger="none"
        >
          <MdContentCopy />
        </Tooltip>
      </Styled.CopyButton>
    </Styled.Pre>
  );
};

export default Table;
