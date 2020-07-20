import classNames from "classnames";
import React, { useCallback } from "react";

import { StyleObject } from "@app/utility/types";
import "./style.scss";

type InputProps = {
  channelName: string;
  onSend: () => void;
  onFocus: () => void;
  onChange: (newValue: string) => void;
  value: string;
  style?: StyleObject;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  channelName,
  onSend,
  onFocus,
  onChange,
  value,
  style,
  className,
}) => (
  <div className={classNames(className, "discord-input")} style={style}>
    <div className="discord-input--inner">
      <input
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
    </div>
  </div>
);

export default Input;
