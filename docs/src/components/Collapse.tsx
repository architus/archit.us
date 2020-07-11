import React, { useCallback, useState, cloneElement } from "react";
import { styled } from "linaria/react";
import { FaChevronRight } from "react-icons/fa";

import { isDefined } from "@lib/utility";
import { color, blankButton, transition, shadow } from "@design/theme";

export const CollapseContent = styled.div``;
const CollapseIcon = styled(FaChevronRight)`
  color: ${color("textFade")};
  font-size: 125%;
  opacity: 0.75;
`;

const Styled = {
  Collapse: styled.div<{ open: boolean }>`
    position: relative;

    ${CollapseContent} {
      display: ${(p): string => (p.open ? "block" : "none")};
    }

    ${CollapseIcon} {
      transform: ${(p): string =>
        p.open
          ? "translateY(-4px) rotate(90deg)"
          : "translateY(-4px) rotate(-90deg)"};
    }
  `,
  CollapseButton: styled.button`
    ${blankButton()}
    ${transition(["box-shadow", "transform"])}
    background-color: ${color("bg+20")};
    color: ${color("text")};

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    box-shadow: ${shadow("z1")};
    padding: 0.75rem 1.25rem;
    transform: translateY(0);

    &:hover {
      box-shadow: ${shadow("z2")};
      transform: translateY(-2px);
    }
  `,
  CollapseHeader: styled.h5`
    margin: 0 !important;
    text-transform: none !important;
    font-size: 1.2rem !important;
    font-weight: 500 !important;
    letter-spacing: 0 !important;
  `,
  CollapseIcon,
  CollapseContent,
};

export type CollapseProps = {
  children: React.ReactNode | (() => React.ReactNode);
  unwrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Collapsible content that doesn't mount its inner content
 * until it's first expanded
 */
const Collapse: React.FC<CollapseProps> = ({
  children,
  unwrap,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const onClickExpand = useCallback(() => {
    setOpen(!open);
    if (!hasMounted && !open) setHasMounted(true);
  }, [open, hasMounted]);

  const getChildren = (): React.ReactNode =>
    typeof children === "function"
      ? (children as () => React.ReactElement)()
      : children;

  let derivedChildren: React.ReactNode = null;
  if (open || hasMounted) {
    derivedChildren = unwrap
      ? cloneElement(
          tryUnwrap(getChildren()) as React.DetailedReactHTMLElement<
            {},
            HTMLDivElement
          >
        )
      : getChildren();
  }

  return (
    <Styled.Collapse open={open} className={className} style={style}>
      <Styled.CollapseButton onClick={onClickExpand}>
        <Styled.CollapseHeader>{open ? "Hide" : "Show"}</Styled.CollapseHeader>
        <Styled.CollapseIcon name="chevron-right" />
      </Styled.CollapseButton>
      <Styled.CollapseContent>{derivedChildren}</Styled.CollapseContent>
    </Styled.Collapse>
  );
};

export default Collapse;

// ? ================
// ? Helper functions
// ? ================

function tryUnwrap(node: React.ReactNode): React.ReactNode {
  if (typeof node === "object") {
    type TargetType = { props?: { children?: React.ReactNode } };
    const target = node as TargetType;
    if (isDefined(target?.props) && isDefined(target.props?.children)) {
      return target.props.children;
    }
  }

  return node;
}
