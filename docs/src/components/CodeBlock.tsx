import React, { useRef } from "react";
import { styled } from "linaria/react";
import { MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";

import { color, gap, blankButton, transition } from "@design/theme";
import { isDefined } from "@lib/utility";

const CopyButton = styled.button`
  ${blankButton()}
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.5;
  font-size: 1.4rem;
  line-height: 0.9;
  padding: ${gap.pico};
  border-radius: 4px;

  color: ${color("textLight")};
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
      color: ${color("textFade")};
      opacity: 1;
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
  const parentRef = useRef<HTMLPreElement | null>(null);
  const onCopy = (): void => {
    if (isDefined(parentRef.current)) {
      const text = parentRef.current.innerText;
      copy(text);
      // TODO show toast
    }
  };

  return (
    <Styled.Pre {...rest} ref={parentRef}>
      {children}
      <Styled.CopyButton onClick={onCopy}>
        <MdContentCopy />
      </Styled.CopyButton>
    </Styled.Pre>
  );
};

export default Table;
