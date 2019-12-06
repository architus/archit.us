import { isDefined } from "./data";

export interface MockTyperOptions {
  keypressDelay: number;
  lineDelay: number;
  lines: string[];
  onKeypress: ((char: string) => void) | null;
  onEnter: ((line: string) => void) | null;
  onFinish: (() => void) | null;
}

type Typing = {
  readonly _kind: "typing";
  currentCharacter: number;
  currentLine: number;
};

type Waiting = {
  readonly _kind: "waiting";
  currentLine: number;
  durationRemaining: number;
};

type Idle = {
  readonly _kind: "idle";
};

type MockTyperState = Typing | Waiting | Idle;

/**
 * Class that simulates a user steadily typing a list of lines of text, one after
 * another (with configurable delay between keystrokes and lines, respectively). Upon
 * successful keystroke, line, or message, the class also invokes the callbacks specified
 * in the options
 */
export class MockTyper {
  private state: MockTyperState;
  private options: MockTyperOptions;
  private tickTimer: number | null;

  constructor({
    keypressDelay = 125,
    lineDelay = 400,
    onKeypress = null,
    onEnter = null,
    onFinish = null,
    lines
  }: MockTyperOptions) {
    this.options = {
      keypressDelay,
      lineDelay,
      onKeypress,
      onEnter,
      onFinish,
      // Perform shallow copy to prevent mutation safety concerns
      lines: [...lines]
    };

    this.tick = this.tick.bind(this);
    this.state = this.calculateInitialState();
    this.tickTimer = this.startTickTimer();
  }

  /**
   * Resets the Mock Typer, moving its cursor to the beginning of the message and optionally
   * letting new options be set before starting again.
   * @param options New options to use after restarting
   */
  public reset(options: Partial<MockTyperOptions>): void {
    this.stop();
    this.options = {
      ...this.options,
      ...options
    };
    // Perform shallow copy to prevent mutation safety concerns
    if (isDefined(options.lines)) this.options.lines = [...options.lines];
    this.state = this.calculateInitialState();
    this.tickTimer = this.startTickTimer();
  }

  /**
   * Stops the mock typer from typing
   */
  public stop(): void {
    if (isDefined(this.tickTimer)) {
      clearTimeout(this.tickTimer);
      this.tickTimer = null;
    }
  }

  /**
   * Resumes the mock typer from where it was at
   */
  public resume(): void {
    this.tickTimer = this.startTickTimer();
  }

  // ? ===============
  // ? Private members
  // ? ===============

  private startTickTimer(): number {
    return window.setInterval(this.tick, this.options.keypressDelay);
  }

  private calculateInitialState(): MockTyperState {
    const { lines } = this.options;

    if (lines.length === 0) {
      // Nothing to type, go immediately to idle
      return {
        _kind: "idle"
      };
    } else {
      // Start at the beginning of the first line
      return {
        _kind: "typing",
        currentLine: 0,
        currentCharacter: 0
      };
    }
  }

  private tick(): void {
    switch (this.state._kind) {
      case "idle":
        return;

      case "typing":
        this.updateTyping(this.state);
        break;

      case "waiting":
        this.updateWaiting(this.state);
        break;
    }
  }

  private updateWaiting(state: Waiting): MockTyperState {
    const { keypressDelay } = this.options;
    state.durationRemaining -= keypressDelay;

    // Transition condition
    if (state.durationRemaining <= 0) {
      // Start typing on the next line
      return {
        _kind: "typing",
        currentCharacter: 0,
        currentLine: state.currentLine + 1
      };
    }

    return state;
  }

  private updateTyping(state: Typing): MockTyperState {
    const { lines, onKeypress } = this.options;
    const line = lines[state.currentLine];

    if (state.currentCharacter < line.length) {
      // Type a single character
      const typedChar = line.charAt(state.currentCharacter);
      onKeypress?.(typedChar);
      ++state.currentCharacter;
    } else {
      // Transition conditions
      return this.handleEndOfLine(state);
    }

    return state;
  }

  private handleEndOfLine(state: Typing): MockTyperState {
    const { lines, onEnter, onFinish, lineDelay } = this.options;
    const line = lines[state.currentLine];

    // Notify listener
    onEnter?.(line);

    if (state.currentLine === lines.length - 1) {
      // Transition condition: notify listeners, stop, and move to idle
      onFinish?.();
      this.stop();

      return {
        _kind: "idle"
      };
    } else {
      // Transition condition: begin waiting
      return {
        _kind: "waiting",
        currentLine: state.currentLine,
        durationRemaining: lineDelay
      };
    }
  }
}
