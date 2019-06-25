import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addMissingUnit,
  generateName,
  randomDigitString,
  isNil,
  pick
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
import { sendMessage } from "../../store/actions";

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.scrollUpdateFlag === !this.state.scrollUpdateFlag) {
      if (!isNil(this.view.current)) {
        this.view.current.scrollToBottom();
      }
    }
    if (prevState.automatedMode && !this.state.automatedMode) {
      this.mockTyper.stop();
    }
    const { responseQueue } = this.props;
    if (prevProps.responseQueue.length < responseQueue.length) {
      const prevLength = prevProps.responseQueue.length;
      const added = responseQueue.length - prevLength;
      for (let i = 0; i < added; ++i) {
        const newResponse = responseQueue[prevLength + i];
        if (newResponse.guildId === this.state.guildId) {
          this.handleResponse(newResponse);
        }
      }
    }
  }

  handleResponse(response) {
    this.addMessage({
      content: response.content,
      reactions: response.reactions,
      id: response.messageId,
      sender: autBotUser
    });
  }

  componentWillUnmount() {
    this.mockTyper.stop();
  }

  onSend(message) {
    const { dispatch } = this.props;
    const { inputValue, thisUser } = this.state;
    message = message || inputValue;
    if (message.trim() === "") return;
    const builtMessage = this.addMessage({
      content: message,
      sender: thisUser
    });
    const formatted = pick(builtMessage, [
      "message",
      { messageId: "message_id" },
      { guildId: "guild_id" }
    ]);
    dispatch(sendMessage("interpret", formatted));
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
    this.setState({ inputValue: "" });
    this.onSend(line);
  }

  onMockFinish() {
    this.mockTyper.currentSet++;
    if (this.mockTyper.currentSet < this.props.messageSet.length) {
      this.startNextMessages();
    } else if (this.props.loop) {
      this.mockTyper.currentSet = 0;
      this.startNextMessages();
    }
  }

  startNextMessages() {
    const { messageSet } = this.props;
    setTimeout(() => {
      if (this.state.automatedMode) {
        this.setState({
          clumps: []
        });
        this.mockTyper.reset({
          lines: messageSet[this.mockTyper.currentSet]
        });
      }
    }, setDelay);
  }

  provisionId() {
    return 2 * ++this.currentMessageNumber;
  }

  addMessage({ id = null, content = "", sender = {}, reactions = [] }) {
    if (isNil(id) && content !== "") id = this.provisionId();
    const messageData = { id, content, sender, reactions };
    this.setState(({ clumps, thisUser, users, scrollUpdateFlag }) => {
      return {
        clumps: addMessage(messageData, clumps, thisUser, users),
        scrollUpdateFlag: !scrollUpdateFlag
      };
    });
    return {
      messageId: id,
      guildId: this.state.guildId,
      message: content
    };
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

const mapStateToProps = state => ({
  responseQueue: state.interpret.responseQueue
});

export default connect(mapStateToProps)(DiscordMock);

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string,
  messageSet: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  loop: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  responseQueue: PropTypes.arrayOf(PropTypes.object).isRequired
};
