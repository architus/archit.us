import { isDefined } from "./data";

export interface MockTyperOptions {
  keypressDelay: number;
  lineDelay: number;
  lines: string[];
  onKeypress: ((char: string) => void) | null;
  onEnter: ((line: string) => void) | null;
  onFinish: (() => void) | null;
}

export interface MockTyperState {
  currentLine: number;
  currentCharacter: number;
  waitingLine: boolean;
  waitingCounter: number;
  finished: boolean;
}

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

  static makeInitialState(): MockTyperState {
    return {
      waitingLine: false,
      waitingCounter: 0,
      finished: false,
      currentCharacter: 0,
      currentLine: 0
    };
  }

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
      lines
    };

    this.tick = this.tick.bind(this);
    this.state = MockTyper.makeInitialState();
    this.tickTimer = this.startTickTimer();
  }

  /**
   * Resets the Mock Typer, moving its cursor to the beginning of the message and optionally
   * letting new options be set before starting again.
   *
   * @param options New options to use after restarting
   */
  public reset(options: Partial<MockTyperOptions>): void {
    this.stop();
    this.options = {
      ...this.options,
      ...options
    };
    this.state = MockTyper.makeInitialState();
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

  private tick(): void {
    const { waitingLine, finished } = this.state;
    if (finished) return;
    if (waitingLine) {
      this.updateWaitingLine();
    } else {
      this.updateTyping();
    }
  }

  private updateWaitingLine(): void {
    const { waitingCounter } = this.state;
    const { lineDelay } = this.options;
    if (waitingCounter > lineDelay) {
      // Finished with waiting on the line
      this.state.waitingLine = false;
      this.state.waitingCounter = 0;
    } else {
      // Continue waiting
      this.state.waitingCounter += this.options.keypressDelay;
    }
  }

  private updateTyping(): void {
    const { lines, onKeypress } = this.options;
    const { currentLine, currentCharacter } = this.state;
    if (currentCharacter >= lines[currentLine].length) {
      this.handleEndOfLine();
    } else {
      // Type a single character
      const typedChar = lines[currentLine].charAt(currentCharacter);
      if (isDefined(onKeypress)) onKeypress(typedChar);
      ++this.state.currentCharacter;
    }
  }

  private handleEndOfLine(): void {
    const { lines, onEnter, onFinish } = this.options;
    const { currentLine } = this.state;
    if (isDefined(onEnter)) onEnter(lines[currentLine]);
    if (currentLine === lines.length - 1) {
      // Last line, finished
      this.state.finished = true;
      if (isDefined(onFinish)) onFinish();
      this.stop();
    } else {
      // Go to the next line, but first wait
      ++this.state.currentLine;
      this.state.currentCharacter = 0;
      this.state.waitingLine = true;
    }
  }
}
