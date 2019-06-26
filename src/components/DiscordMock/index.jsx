import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMissingUnit, randomDigitString, isNil, pick } from "../../util";
import MockTyper from "../../util/MockTyper";
import {
  createMockUser,
  makeFakeWebhookUser,
  autBotUser,
  withUpdatedReaction,
  withAddedMessage,
  IdProvisioner
} from "./util";

import DiscordView from "./DiscordView";
import { sendMessage } from "../../store/actions";
import { transformOutgoingMessage } from "./transform";
import { SLICED_LENGTH } from "../../store/reducers/interpret";

// Mock typer options
const keypressDelay = 120;
const lineDelay = 600;
const setDelay = 1200;

// Clump performance optimization threshold (clear old message clumps)
const CLUMP_SLICING_THRESHOLD = 50;
const CLUMP_SLICED_LENGTH = 40;

class DiscordMock extends React.Component {
  // ? ===================
  // ? Initialization
  // ? ===================

  constructor(props) {
    super(props);
    // Class level fields (non-stateful)
    this.guildId = randomDigitString(9);
    this.thisUser = createMockUser(this.guildId);
    this.fakeWebhookUser = makeFakeWebhookUser(this.thisUser);
    this.idProvisioner = new IdProvisioner();
    this.users = this.buildUserMap(
      this.thisUser,
      this.fakeWebhookUser,
      autBotUser
    );

    // escape hatch to scroll to bottom imperatively
    this.view = React.createRef();
    this.bindEventHandlers();
    this.state = {
      clumps: [],
      scrollUpdateFlag: false,
      automatedMode: true,
      inputValue: ""
    };
  }

  buildUserMap(...users) {
    let userMap = {};
    users.forEach(user => {
      userMap[user.clientId] = user;
    });
  }

  initializeMockTyper() {
    // Sets up the initial state of the mock typer
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

  // ? ===================
  // ? Lifecycle functions
  // ? ===================

  componentDidMount() {
    // Only initialize the mock typer once the websocket has been established
    const { isConnected } = this.props;
    if (isConnected) this.initializeMockTyper();
  }

  componentWillUnmount() {
    // Stop timers on unmount
    this.mockTyper.stop();
    if (this.mockTyperResetTimer) clearTimeout(this.mockTyperResetTimer);
  }

  componentDidUpdate(prevProps, prevState) {
    // Try to scroll to the bottom of the MessageView when the scroll update
    // flag gets toggled
    if (prevState.scrollUpdateFlag === !this.state.scrollUpdateFlag) {
      if (!isNil(this.view.current)) {
        this.view.current.scrollToBottom();
      }
    }

    // Stop the mock typer when the automated mode is stopped
    if (prevState.automatedMode && !this.state.automatedMode) {
      this.mockTyper.stop();
    }

    // If neccessary, apply the internal message limit to the message clumps array
    if (this.state.clumps.length > CLUMP_SLICING_THRESHOLD) {
      this.setState(state => ({
        clumps: state.clumps.slice(CLUMP_SLICED_LENGTH),
        scrollUpdateFlag: !state.scrollUpdateFlag
      }));
    }

    // Upon websocket connection, start the mock typer
    if (this.props.isConnected && isNil(this.mockTyper)) {
      this.initializeMockTyper();
    }

    // Handle new responses from the interpret module from the response queue
    const prevLength = prevProps.responseQueue.length;
    if (prevLength < this.props.responseQueue.length) {
      this.handleUpdatedResponseQueue(prevLength);
    } else if (prevLength > this.props.responseQueue.length) {
      // the internal array got sliced; find the new ones and handle
      const newResponses = this.props.responseQueue.slice(SLICED_LENGTH);
      newResponses.forEach(this.handleResponse.bind(this));
    }
  }

  // ? ===================
  // ? Event handlers
  // ? ===================

  bindEventHandlers() {
    this.onSend = this.onSend.bind(this);
    this.onReact = this.onReact.bind(this);
    this.onUnreact = this.onUnreact.bind(this);

    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.onMockKeypress = this.onMockKeypress.bind(this);
    this.onMockSend = this.onMockSend.bind(this);
    this.onMockFinish = this.onMockFinish.bind(this);
  }

  // On pressing the "enter" button while focusing the input box
  onSend(message) {
    const { inputValue } = this.state;
    message = message || inputValue;
    // Don't let empty messages get sent
    if (message.trim() === "") return;

    this.sentToInterpret(message);
    // Clear input field
    this.setState({ inputValue: "" });
  }

  // On clicking on an inactive reaction button (adding a reaction)
  onReact(clumpIndex, messageId, reaction) {
    this.setState(({ clumps }) => ({
      clumps: withUpdatedReaction({
        clumps,
        clumpIndex,
        messageId,
        reaction,
        number: n => n + 1,
        userHasReacted: true
      })
    }));
  }

  // On clicking on an active reaction button (removing a reaction)
  onUnreact(clumpIndex, messageId, reaction) {
    this.setState(({ clumps }) => ({
      clumps: withUpdatedReaction({
        clumps,
        clumpIndex,
        messageId,
        reaction,
        number: n => n - 1,
        userHasReacted: false
      })
    }));
  }

  // On user focus of the input box
  onInputFocus() {
    if (this.state.automatedMode)
      this.setState({
        automatedMode: false,
        inputValue: ""
      });
  }

  // Allows for two-way binding of the input's value
  onInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  // Callback for the mock typer typing a single character
  onMockKeypress(key) {
    this.setState(state => ({
      inputValue: state.inputValue + key
    }));
  }

  // Callback for the mock typer pressing enter
  onMockSend(line) {
    this.setState({ inputValue: "" });
    this.onSend(line);
  }

  // Callback for the mock typer finishing the current set
  onMockFinish() {
    this.mockTyper.currentSet++;
    if (this.mockTyper.currentSet < this.props.messageSet.length) {
      this.refreshMockTyper();
    } else if (this.props.loop) {
      this.mockTyper.currentSet = 0;
      this.refreshMockTyper();
    }
  }

  // ? ===================
  // ? General actions
  // ? ===================

  refreshMockTyper() {
    const { messageSet } = this.props;
    this.mockTyperResetTimer = setTimeout(() => {
      this.mockTyperResetTimer = null;
      // Check in case automated mode was disabled during the timer
      if (this.state.automatedMode) {
        this.setState({
          clumps: []
        });
        // Start the next message set & reset the mock typer's internal state
        this.mockTyper.reset({
          lines: messageSet[this.mockTyper.currentSet]
        });
      }
    }, setDelay);
  }

  // Analyzes all of the new messages added to the response queue, and if they
  // match the guild Id of the current Discord mock, handle them
  handleUpdatedResponseQueue(prevLength) {
    const { responseQueue } = this.props;
    const added = responseQueue.length - prevLength;
    for (let i = 0; i < added; ++i) {
      const newResponse = responseQueue[prevLength + i];
      if (newResponse.guildId === this.guildId) {
        this.handleResponse(newResponse);
      }
    }
  }

  // Adds a message sent by aut-bot to the clump/message array
  handleResponse(response) {
    this.addMessage({
      content: response.content,
      reactions: response.reactions,
      id: response.messageId,
      sender: autBotUser
    });
  }

  // Adds a message to the clump/message array, returning the internal object
  addMessage({ id = null, content = "", sender = {}, reactions = [] }) {
    // If a contentful message, provision id
    if (isNil(id) && content !== "") id = this.idProvisioner.provision();
    const messageData = { id, content, sender, reactions };
    this.setState(({ clumps, scrollUpdateFlag }) => {
      return {
        clumps: withAddedMessage(
          messageData,
          clumps,
          this.thisUser,
          this.users
        ),
        // Force a scroll upon message add
        scrollUpdateFlag: !scrollUpdateFlag
      };
    });
    return {
      messageId: id,
      guildId: this.guildId,
      message: content,
      reactions
    };
  }

  // Dispatches a websocket send for the given message, sending it to the interpret
  // server for aut-bot to respond to
  // TODO reconsider reactions schema
  sentToInterpret(message, reactions = []) {
    const { dispatch } = this.props;
    const builtMessage = this.addMessage({
      content: transformOutgoingMessage(message),
      sender: this.thisUser
    });
    const formatted = pick(builtMessage, [
      "message",
      reactions,
      { messageId: "message_id" },
      { guildId: "guild_id" }
    ]);
    dispatch(sendMessage("interpret", formatted));
  }

  // ? ===================
  // ? Render function
  // ? ===================

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
  responseQueue: state.interpret.responseQueue,
  isConnected: state.socket.connected
});

export default connect(mapStateToProps)(DiscordMock);

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string,
  messageSet: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  loop: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  responseQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  isConnected: PropTypes.bool.isRequired
};
