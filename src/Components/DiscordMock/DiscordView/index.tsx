import React, { useContext } from "react";
import classNames from "classnames";
import MessageView from "Components/DiscordMock/MessageView";
import InputController from "Components/DiscordMock/InputController";
import { MockMessageClump, StyleObject, MockMessageSet } from "Utility/types";
import { DiscordMockDispatchContext } from "Components/DiscordMock/actions";
import "./style.scss";

type DiscordViewProps = {
  clumps: MockMessageClump[];
  channelName: string;
  displayError?: boolean;
  pause?: boolean;
  loop?: boolean;
  messageSets?: MockMessageSet[];
  style?: StyleObject;
  className?: string;
};

const discordViewStyle = { flexGrow: 1 };

const DiscordView: React.FC<DiscordViewProps> = ({
  clumps = [],
  channelName,
  displayError = false,
  pause = false,
  loop,
  messageSets,
  className,
  style,
}) => (
  <div className={classNames("discord-view", className)} style={style}>
    <MessageView clumps={clumps} style={discordViewStyle} />
    <hr className="input-border" />
    <InputController
      dispatch={useContext(DiscordMockDispatchContext).dispatch}
      channelName={channelName}
      loop={loop}
      messageSets={messageSets}
      pause={pause}
    />
    <div
      className={classNames("error-overlay", {
        "show-error": displayError,
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
