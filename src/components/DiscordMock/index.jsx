import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMissingUnit, randomDigitString, isNil } from "../../util";
import MockTyper from "../../util/MockTyper";
import { sendMessage } from "../../store/actions";
import { SLICED_LENGTH } from "../../store/reducers/interpret";
import {
  autBotUser,
  createMockUser,
  IdProvisioner,
  serializeOutgoingMessage,
  serializeReaction,
  withUpdatedReaction,
  withAddedMessage,
  Extension,
  withRemovedMessage
} from "./util";

import DiscordView from "./DiscordView";

// Mock typer options
const keypressDelay = 90;
const lineDelay = 810;
const setDelay = 2250;

// Clump performance optimization threshold (clear old message clumps)
const CLUMP_SLICING_THRESHOLD = 50;
const CLUMP_SLICED_LENGTH = 40;

// Error display options
const ERROR_DISPLAY_DELAY = 4000;

class DiscordMock extends React.Component {
  // ? ===================
  // ? Initialization
  // ? ===================

  constructor(props) {
    super(props);
    // Class level fields (non-stateful)
    this.guildId = randomDigitString(9);
    this.thisUser = createMockUser(this.guildId);
    this.idProvisioner = new IdProvisioner();
    this.users = this.buildUserMap(this.thisUser, autBotUser);
    this.initializeExtension(props.extension);

    // escape hatch to scroll to bottom imperatively
    this.view = React.createRef();
    this.bindEventHandlers();
    this.state = {
      clumps: [],
      scrollUpdateFlag: false,
      automatedMode: true,
      inputValue: "",
      displayError: false
    };
  }

  buildUserMap(...users) {
    let userMap = {};
    users.forEach(user => {
      userMap[user.clientId] = user;
    });
    return userMap;
  }

  initializeMockTyper() {
    // Sets up the initial state of the mock typer
    const currentSet = 0;
    this.mockTyper = new MockTyper({
      lines: this.props.messageSet[currentSet].messages,
      keypressDelay,
      lineDelay,
      onKeypress: this.onMockKeypress,
      onEnter: this.onMockSend,
      onFinish: this.onMockFinish
    });
    this.mockTyper.currentSet = currentSet;
    // Send all initial messages
    this.sendSilentMessages(this.props.messageSet[currentSet].setup);
  }

  initializeExtension(extension) {
    const context = {
      guildId: this.guildId,
      thisUser: this.thisUser,
      users: this.users,
      autBotUser
    };
    const commands = {
      sendMessage: this.addMessage.bind(this),
      deleteMessage: this.deleteMessage.bind(this),
      provisionId: this.idProvisioner.provision.bind(this.idProvisioner)
    };
    this.extension = extension
      ? new extension(context, commands)
      : new Extension(context, commands);
  }

  // ? ===================
  // ? Lifecycle functions
  // ? ===================

  componentDidMount() {
    const { offline, isConnected } = this.props;
    if (!offline) {
      // Only initialize the mock typer once the websocket has been established
      if (isConnected) this.initializeMockTyper();
      this.startErrorTimeout();
    } else {
      this.initializeMockTyper();
    }
  }

  componentWillUnmount() {
    // Stop timers on unmount
    if (this.mockTyper) this.mockTyper.stop();
    if (this.mockTyperResetTimer) clearTimeout(this.mockTyperResetTimer);
    this.extension.destruct();
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
      if (this.mockTyper) this.mockTyper.stop();
    }

    // If neccessary, apply the internal message limit to the message clumps array
    if (this.state.clumps.length > CLUMP_SLICING_THRESHOLD) {
      this.setClumps(clumps => clumps.slice(CLUMP_SLICED_LENGTH));
    }

    if (this.props.isConnected) {
      if (isNil(this.errorTimeout)) {
        clearTimeout(this.errorTimeout);
      }
      if (this.state.displayError) {
        this.setState({ displayError: false });
      }
      // Upon websocket connection, start the mock typer
      if (this.state.automatedMode && isNil(this.mockTyper)) {
        this.initializeMockTyper();
      }
    }

    if (prevProps.isConnected && !this.props.isConnected) {
      this.startErrorTimeout();
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

    const messageId = this.idProvisioner.provision();
    this.addMessage({
      content: message,
      messageId,
      sender: this.thisUser
    });
    if (this.extension.onSend({ message, messageId })) {
      // Send for interpretation unless the extension cancels
      this.sentToInterpret({
        content: message,
        messageId
      });
    }
    // Clear input field
    this.setState({ inputValue: "" });
  }

  // On clicking on an inactive reaction button (adding a reaction)
  onReact(clumpIndex, messageId, reaction) {
    this.setClumps(clumps =>
      withUpdatedReaction({
        clumps,
        clumpIndex,
        messageId,
        reaction,
        number: n => n + 1,
        userHasReacted: true
      })
    );
    this.sentToInterpret({
      addedReactions: [serializeReaction(messageId, reaction)]
    });
  }

  // On clicking on an active reaction button (removing a reaction)
  onUnreact(clumpIndex, messageId, reaction) {
    this.setClumps(clumps =>
      withUpdatedReaction({
        clumps,
        clumpIndex,
        messageId,
        reaction,
        number: n => n - 1,
        userHasReacted: false
      })
    );
    this.sentToInterpret({
      removedReactions: [serializeReaction(messageId, reaction)]
    });
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
    this.mockTyper.prevSet = this.mockTyper.currentSet;
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
        this.sendSilentMessages(
          this.props.messageSet[this.mockTyper.prevSet].cleanup
        );
        this.setState({
          clumps: []
        });
        // Start the next message set & reset the mock typer's internal state
        this.mockTyper.reset({
          lines: messageSet[this.mockTyper.currentSet].messages
        });
      }
    }, setDelay);
  }

  startErrorTimeout() {
    this.errorTimeout = setTimeout(
      () => this.setState({ displayError: true }),
      ERROR_DISPLAY_DELAY
    );
  }

  // Sends a list of messages to the interpret websocket in "silent" mode, meaning
  // that the server is not to send any response in return, only process them
  sendSilentMessages(messageList) {
    if (isNil(messageList)) return;
    messageList.forEach(message =>
      this.sentToInterpret({
        content: message,
        messageId: this.idProvisioner.provision(),
        silent: true
      })
    );
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
    this.addMessage({ ...response, sender: autBotUser });
  }

  // Adds a message to the clump/message array, returning the internal object
  addMessage(messageData) {
    const withDefaults = Object.assign(
      {},
      {
        messageId: null,
        content: null,
        sender: {},
        edit: false,
        addedReactions: []
      },
      messageData
    );
    this.setClumps(clumps =>
      withAddedMessage({
        clumps: clumps,
        message: withDefaults,
        thisUser: this.thisUser,
        users: this.users
      })
    );
  }

  // Removes a message from the clump/message array
  deleteMessage(messageId) {
    this.setClumps(clumps =>
      withRemovedMessage({
        clumps,
        messageId
      })
    );
  }

  // Dispatches a websocket send for the given message, sending it to the interpret
  // server for aut-bot to respond to
  sentToInterpret(messageData) {
    const { dispatch, allowedCommands } = this.props;
    const message = serializeOutgoingMessage({
      ...messageData,
      guildId: this.guildId,
      allowedCommands
    });
    dispatch(sendMessage("interpret", message));
  }

  // Sets clumps state and flips the scroll update flag
  setClumps(map) {
    this.setState(({ clumps, scrollUpdateFlag }) => {
      return {
        clumps: map(clumps),
        scrollUpdateFlag: !scrollUpdateFlag
      };
    });
  }

  // ? ===================
  // ? Render function
  // ? ===================

  render() {
    const { height = 100, channelName = "channel" } = this.props;
    const { clumps, inputValue, displayError } = this.state;

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
        displayError={displayError}
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
  messageSet: PropTypes.arrayOf(
    PropTypes.shape({
      messages: PropTypes.arrayOf(PropTypes.string).isRequired,
      setup: PropTypes.arrayOf(PropTypes.string),
      cleanup: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  loop: PropTypes.bool,
  allowedCommands: PropTypes.arrayOf(PropTypes.string),
  offline: PropTypes.bool,
  extension: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  responseQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  isConnected: PropTypes.bool.isRequired
};
