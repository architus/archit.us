import { styled } from "linaria/react";
import React from "react";

import EmptyIcon from "../assets/empty.svg";
import { gap } from "../theme/spacing";
import { MergeProps, Nil } from "@architus/lib/types";
import { isDefined } from "@architus/lib/utility";

const Message = styled.p`
  margin-bottom: 0;
  color: currentColor;
  text-align: center;
`;

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;

    svg {
      opacity: 0.9;
    }

    &[data-size="normal"] {
      svg {
        width: 48px;
      }

      ${Message} {
        margin-top: ${gap.pico};
        font-size: 1rem;
        max-width: 200px;
      }
    }

    &[data-size="large"] {
      svg {
        width: 76px;
      }

      ${Message} {
        margin-top: ${gap.nano};
        font-size: 1.08rem;
        max-width: 300px;
      }
    }
  `,
  Message,
};

export type Size = "normal" | "large";
export type EmptyProps = MergeProps<
  {
    message?: React.ReactNode | Nil;
    size?: Size;
    className?: string;
    style?: React.CSSProperties;
  },
  React.HTMLAttributes<HTMLDivElement>
>;

/**
 * Empty placeholder content, including an icon and an optional message
 */
const Empty: React.FC<EmptyProps> = ({
  message,
  size = "normal",
  className,
  style,
  ...rest
}) => (
  <Styled.Container
    className={className}
    style={style}
    data-size={size}
    {...rest}
  >
    <EmptyIcon />
    {isDefined(message) && <Styled.Message>{message}</Styled.Message>}
  </Styled.Container>
);

export default Empty;
