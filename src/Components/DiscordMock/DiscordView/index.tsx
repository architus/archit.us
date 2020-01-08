import React from "react";
import classNames from "classnames";
import MessageView from "Components/DiscordMock/MessageView";
import Input from "Components/DiscordMock/Input";
import "./style.scss";
import { MockReaction, MockMessageClump, StyleObject } from "Utility/types";

type DiscordViewProps = {
  clumps: MockMessageClump[];
  channelName: string;
  onSend: () => void;
  onReact: (clumpIndex: number, id: number, reaction: MockReaction) => void;
  onUnreact: (clumpIndex: number, id: number, reaction: MockReaction) => void;
  displayError: boolean;
  inputValue: string;
  onInputFocus: () => void;
  onInputChange: (newValue: string) => void;
  style?: StyleObject;
  className?: string;
};

const DiscordView: React.FC<DiscordViewProps> = ({
  clumps = [],
  channelName,
  className,
  onSend,
  onReact,
  onUnreact,
  onInputFocus,
  onInputChange,
  inputValue,
  displayError = false,
  ...rest
}) => (
  <div className={classNames("discord-view", className)} {...rest}>
    <MessageView
      clumps={clumps}
      style={{ flexGrow: 1 }}
      onReact={onReact}
      onUnreact={onUnreact}
    />
    <hr className="input-border" />
    <Input
      channelName={channelName}
      onSend={onSend}
      onFocus={onInputFocus}
      onChange={onInputChange}
      value={inputValue}
    />
    <div
      className={classNames("error-overlay", {
        "show-error": displayError
      })}
    >
      <div className="error-inner">
        <span className="error-image" />
        <h4>Uh oh!</h4>
        <p>
          It looks like there has been an error connecting to the architus API
        </p>
      </div>
    </div>
  </div>
);

export default DiscordView;
