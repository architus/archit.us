import React from "react";
import PropTypes from "prop-types";
import {
  addMissingUnit,
  generateName,
  randomDigitString,
  isNil
} from "../../util";
import {
  colors,
  nextDiscriminator,
  makeEmojiResponseUser,
  autBotUser,
  updateReaction,
  addMessage,
  MockTyper
} from "./util";

import DiscordView from "./DiscordView";

const keypressDelay = 120;
const lineDelay = 600;
const setDelay = 1200;

class DiscordMock extends React.Component {
  constructor(props) {
    super(props);
    const guildId = randomDigitString(9);
    const mockClientId = parseInt(guildId) % 100;
    const mockDiscriminator = nextDiscriminator(mockClientId);
    const mockNameColor = colors[mockDiscriminator];
    const mockUsername = generateName();
    const mockUser = {
      clientId: mockClientId,
      username: mockUsername,
      nameColor: mockNameColor,
      discriminator: mockDiscriminator,
      bot: false
    };
    const emojiResponder = makeEmojiResponseUser(mockUser);
    // escape hatch to scroll to bottom imperatively
    this.view = React.createRef();
    this.currentMessageNumber = 0;
    this.bindEventHandlers();
    this.state = {
      guildId,
      thisUser: mockUser,
      clumps: [],
      users: {
        [mockClientId]: mockUser,
        [emojiResponder.clientId]: emojiResponder,
        [autBotUser.clientId]: autBotUser
      },
      scrollUpdateFlag: false,
      automatedMode: true,
      inputValue: ""
    };
  }

  bindEventHandlers() {
    this.onReact = this.onReact.bind(this);
    this.onUnreact = this.onUnreact.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onMockKeypress = this.onMockKeypress.bind(this);
    this.onMockSend = this.onMockSend.bind(this);
    this.onMockFinish = this.onMockFinish.bind(this);
  }

  componentDidMount() {
    const currentSet = 0;
    this.mockTyper = new MockTyper({
      lines: this.props.messageSet[currentSet],
      keypressDelay,
      lineDelay,
      onKeypress: this.onMockKeypress,
      onEnter: this.onMockSend,
      onFinish: this.onMockFinish
    });
    this.mockTyper.currentSet = currentSet;
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.scrollUpdateFlag === !this.state.scrollUpdateFlag) {
      if (!isNil(this.view.current)) {
        this.view.current.scrollToBottom();
        // TODO this is a poor fix; try to figure out root cause
        setTimeout(() => this.view.current.scrollToBottom(), 1);
        // performance/race condition fallback?
        setTimeout(() => this.view.current.scrollToBottom(), 100);
      }
    }
    if (prevState.automatedMode && !this.state.automatedMode) {
      this.mockTyper.stop();
    }
  }

  componentWillUnmount() {
    this.mockTyper.stop();
  }

  onSend(message) {
    this.addMessage({ content: message, sender: this.state.thisUser });
    this.setState({ inputValue: "" });
  }

  onInputFocus() {
    if (this.state.automatedMode)
      this.setState({
        automatedMode: false,
        inputValue: ""
      });
  }

  onInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  onMockKeypress(key) {
    this.setState(state => ({
      inputValue: state.inputValue + key
    }));
  }

  onMockSend(line) {
    console.log({ line, state: this.state });
    this.setState({ inputValue: "" });
    this.onSend(line);
  }

  onMockFinish() {
    console.log("finish");
    this.mockTyper.currentSet++;
    const { messageSet } = this.props;
    if (this.mockTyper.currentSet < messageSet.length) {
      setTimeout(() => {
        this.setState({
          clumps: []
        });
        this.mockTyper.reset({
          lines: messageSet[this.mockTyper.currentSet]
        });
      }, setDelay);
    }
  }

  provisionId() {
    return 2 * ++this.currentMessageNumber;
  }

  addMessage({ id = null, content = "", sender = {}, reactions = [] }) {
    if (isNil(id)) id = this.provisionId();
    const messageData = { id, content, sender, reactions };
    this.setState(({ clumps, thisUser, users, scrollUpdateFlag }) => {
      return {
        clumps: addMessage(messageData, clumps, thisUser, users),
        scrollUpdateFlag: !scrollUpdateFlag
      };
    });
  }

  onReact(clumpIndex, messageId, reaction) {
    this.setState(({ clumps }) =>
      updateReaction(clumps, clumpIndex, messageId, reaction, n => n + 1, true)
    );
  }

  onUnreact(clumpIndex, messageId, reaction) {
    this.setState(({ clumps }) =>
      updateReaction(clumps, clumpIndex, messageId, reaction, n => n - 1, false)
    );
  }

  render() {
    const { height = 100, channelName = "channel" } = this.props;
    const { clumps, inputValue } = this.state;

    return (
      <DiscordView
        style={{ height: addMissingUnit(height) }}
        channelName={channelName}
        onSend={this.onSend}
        onReact={this.onReact}
        onUnreact={this.onUnreact}
        inputValue={inputValue}
        onInputFocus={this.onInputFocus}
        onInputChange={this.onInputChange}
        clumps={clumps}
        ref={this.view}
      />
    );
  }
}

export default DiscordMock;

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string,
  messageSet: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
