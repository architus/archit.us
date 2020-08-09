import copy from "copy-to-clipboard";
import { styled } from "linaria/react";
import React, { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";

import Tooltip from "@architus/facade/components/Tooltip";
import { color } from "@architus/facade/theme/color";
import { blankButton, scrollBarAuto } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { isDefined } from "@architus/lib/utility";

// Export for styling
export const CopyButton = styled.button<{ showingToast: boolean }>`
  ${blankButton()}
  position: absolute;
  z-index: 1;
  top: ${gap.pico};
  right: ${gap.pico};
  font-size: 1.4rem;
  line-height: 0.9;
  padding: ${gap.pico};
  border-radius: 4px;

  color: ${(props): string =>
    props.showingToast ? color("text") : "transparent"};
  background-color: ${(props): string =>
    props.showingToast ? "var(--code-bg)" : "transparent"};
  opacity: ${(props): number => (props.showingToast ? 0.7 : 0.3)};
  ${transition(["color", "opacity", "background-color"])}

  &:hover, &:focus {
    opacity: 0.5;
    background-color: var(--code-bg);
  }

  &:active {
    opacity: 1;
    background-color: var(--code-bg);
  }

  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    z-index: -1;
    content: " ";

    ${transition(["background-color"])}
    background-color: transparent;
  }

  &:hover,
  &:focus {
    &::after {
      background-color: ${color("textOverlay")};
    }
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Styled = {
  Pre: styled.pre`
    position: relative;
    margin: 0;
    padding: ${gap.micro};
    & > code {
      font-size: 0.875rem;
    }

    ${scrollBarAuto(0.125)}
    overflow: auto;
  `,
  CopyButton,
};

export type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

/**
 * Formatted code block component that includes a copy button in the top right corner.
 * Uses the same children as a normal `<pre />` element.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
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
    <>
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
      <Styled.Pre {...rest} ref={parentRef}>
        {children}
      </Styled.Pre>
    </>
  );
};

export default CodeBlock;
