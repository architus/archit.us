import { styled } from "linaria/react";
import React, { useCallback } from "react";

import { outerPadding } from "@app/components/DiscordMock/style";
import { OtherColors } from "@app/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { shadow } from "@architus/facade/theme/shadow";

const Styled = {
  Outer: styled.div`
    padding-top: ${outerPadding};
    padding-right: ${outerPadding};
  `,
  Input: styled.input`
    background-color: ${OtherColors.DiscordInputBg} !important;
    border-radius: 4px;
    border: none;
    width: 100%;
    height: 36px;
    outline: none !important;
    padding: 0.1rem 0.75rem;
    color: white !important;

    box-shadow: none;
    ${transition(["box-shadow"])}

    &::placeholder {
      color: rgba(white, 0.4);
      opacity: 1;
      font-style: italic;
    }

    &:focus {
      box-shadow: ${shadow("highlight")(OtherColors.DiscordInputBg)};
    }

    &:disabled {
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
      cursor: not-allowed;

      &::placeholder {
        color: rgba(white, 0.2);
      }
    }
  `,
};

export type InputProps = {
  channelName: string;
  onSend: () => void;
  onFocus: () => void;
  onChange: (newValue: string) => void;
  value: string;
  style?: React.CSSProperties;
  className?: string;
};

/**
 * Discord-style input box, used as a controlled input
 */
const Input: React.FC<InputProps> = ({
  channelName,
  onSend,
  onFocus,
  onChange,
  value,
  className,
  style,
}) => (
  <Styled.Outer className={className} style={style}>
    <Styled.Input
      type="text"
      placeholder={`Message #${channelName}`}
      aria-label={`Message ${channelName} discord channel`}
      onKeyDown={useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            onSend();
          }
        },
        [onSend]
      )}
      value={value}
      onFocus={onFocus}
      onChange={useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
        [onChange]
      )}
    />
  </Styled.Outer>
);

export default Input;
