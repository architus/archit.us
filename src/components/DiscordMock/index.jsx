import React from "react";
import PropTypes from "prop-types";
import { addMissingUnit } from "../../util";

import Input from "./Input";
import MessageView from "./MessageView";

import "./style.scss";

function DiscordMock({ height }) {
  return (
    <div className="discord-mock" style={{ height: addMissingUnit(height) }}>
      <MessageView messages={undefined} style={{ flexGrow: 1 }} />
      <hr className="input-border" />
      <Input />
    </div>
  );
}

export default DiscordMock;

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
