import React from "react";
import { StyleObject, MockMessageSet } from "Utility/types";
import { isDefined, MockTyper, isNil } from "Utility";
import {
  DiscordMockDispatch,
  sendInvisibleMessage,
  sendMessage,
  clearMessages
} from "Components/DiscordMock/actions";
import Input from "Components/DiscordMock/Input";

// Mock typer options
const keypressDelay = 90;
const lineDelay = 810;
const setDelay = 2250;

/**
 * Represents the state of an InputController: either in "automatic" mode with an active
 * MockTyper following a given message set or in "manual" mode with no mock typer and only
 * using standardd user input
 */
type TyperState = AutomaticTyperState | ManualTyperState;

interface AutomaticTyperState {
  mode: "automatic";
  mockTyper: MockTyper;
  currentSet: number;
  paused: boolean;
  idleTimeout?: number;
}

interface ManualTyperState {
  mode: "manual";
}

type InputControllerProps = {
  channelName: string;
  dispatch: DiscordMockDispatch;
  loop?: boolean;
  pause?: boolean;
  messageSets?: MockMessageSet[];
  style?: StyleObject;
  className?: string;
};

type InputControllerState = {
  value: string;
};

export default class InputController extends React.Component<
  InputControllerProps,
  InputControllerState
> {
  private typerState: TyperState;

  constructor(props: InputControllerProps) {
    super(props);

    this.state = { value: "" };
    this.typerState = this.initializeTyperState();
    if (this.typerState.mode === "automatic")
      this.sendInvisibleMessages({ mode: "setup" });
  }

  /**
   * Creates the initial typer state, defaulting to manual mode if no message sets are
   * provided
   */
  initializeTyperState(): TyperState {
    const { messageSets } = this.props;
    if (isDefined(messageSets) && messageSets.length > 0) {
      return {
        mode: "automatic",
        currentSet: 0,
        paused: false,
        mockTyper: new MockTyper({
          keypressDelay,
          lineDelay,
          onKeypress: this.onMockKeypress,
          onEnter: this.onMockEnter,
          onFinish: this.onMockFinish,
          lines: messageSets[0].messages
        })
      };
    }
    return { mode: "manual" };
  }

  /**
   * Sends the cleanup or setup message set specified in the currently active message set,
   * sending them as "invisble" messages
   * @param mode - Whether to send the cleanup or setup messages for the current message set
   */
  sendInvisibleMessages({ mode }: { mode: "cleanup" | "setup" }): void {
    const { messageSets, dispatch } = this.props;
    if (this.typerState.mode === "automatic" && isDefined(messageSets)) {
      const lineSet = messageSets[this.typerState.currentSet][mode];
      if (isDefined(lineSet)) {
        lineSet.forEach(line => dispatch(sendInvisibleMessage(line)));
      }
    }
  }

  /**
   * Determines the next message set to use, wrapping around to 0 if at the end
   */
  nextMessageSet(loop: boolean): number {
    const { messageSets } = this.props;
    if (this.typerState.mode !== "automatic" || isNil(messageSets)) return 0;

    if (this.typerState.currentSet === messageSets.length - 1) {
      // Wrap back to start
      if (loop) return 0;

      // Finish
      return -1;
    }
    return this.typerState.currentSet + 1;
  }

  // ? ==================
  // ? Callback functions
  // ? ==================

  onMockKeypress = (char: string): void =>
    this.setState({ value: this.state.value + char });

  onMockEnter = (line: string): void => {
    const { dispatch } = this.props;
    dispatch(sendMessage(line));
    this.setState({ value: "" });
  };

  onMockFinish = (): void => {
    if (this.typerState.mode !== "automatic") return;

    this.sendInvisibleMessages({ mode: "cleanup" });
    this.typerState.idleTimeout = window.setTimeout(() => {
      const { messageSets, loop, dispatch } = this.props;
      if (this.typerState.mode !== "automatic" || isNil(messageSets)) return;
      this.typerState.idleTimeout = undefined;

      // Start the next message set
      const next = this.nextMessageSet(!!loop);
      if (next === -1) {
        // Loop was unset, stop typing and return to manual mode
        this.typerState.mockTyper.stop();
        clearTimeout(this.typerState.idleTimeout);
        this.typerState = { mode: "manual" };
        this.setState({ value: "" });
      } else {
        this.typerState.mockTyper.reset({ lines: messageSets[next].messages });
        this.typerState.currentSet = next;
        this.sendInvisibleMessages({ mode: "setup" });
        dispatch(clearMessages());
      }
    }, setDelay);
  };

  onSend = (): void => {
    const { dispatch } = this.props;
    dispatch(sendMessage(this.state.value));
    this.setState({ value: "" });
  };

  onFocus = (): void => {
    if (this.typerState.mode === "automatic") {
      // Disable automatic mode and clear the input box
      this.typerState.mockTyper.stop();
      clearTimeout(this.typerState.idleTimeout);
      this.typerState = { mode: "manual" };
      this.setState({ value: "" });
    }
  };

  onChange = (value: string): void => this.setState({ value });

  // ? ===================
  // ? Lifecycle functions
  // ? ===================

  componentWillUnmount(): void {
    // Make sure there are no pending timeouts
    if (this.typerState.mode === "automatic") {
      clearTimeout(this.typerState.idleTimeout);
      this.typerState.mockTyper.stop();
    }
  }

  componentDidUpdate(): void {
    if (this.typerState.mode === "automatic") {
      // Pause/unpause the mock typer if in the wrong state after prop change
      const { pause } = this.props;
      if (this.typerState.paused && !pause) {
        this.typerState.paused = false;
        this.typerState.mockTyper.resume();
      } else if (!this.typerState.paused && pause) {
        this.typerState.paused = true;
        this.typerState.mockTyper.stop();
      }
    }
  }

  render(): React.ReactNode {
    const { channelName, style, className } = this.props;

    return (
      <Input
        onSend={this.onSend}
        onFocus={this.onFocus}
        onChange={this.onChange}
        value={this.state.value}
        className={className}
        style={style}
        channelName={channelName}
      />
    );
  }
}
