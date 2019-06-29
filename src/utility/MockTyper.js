export class MockTyper {
  constructor(options) {
    const { keypressDelay } = options;
    this.tick = this.tick.bind(this);
    this.tickLength = keypressDelay;
    this.options = options;
    this.initialize();
  }

  initialize() {
    this.tickTimer = setInterval(this.tick, this.tickLength);
    this.currentLine = 0;
    this.currentCharacter = 0;
    this.state = {
      waitingLine: false,
      waitingCounter: 0,
      finished: false
    };
  }

  tick() {
    const { waitingLine, finished } = this.state;
    if (finished) return;
    if (waitingLine) {
      this.updateWaiting();
    } else {
      this.updateTyping();
    }
  }

  updateWaiting() {
    const { waitingCounter } = this.state;
    const { lineDelay } = this.options;
    if (waitingCounter > lineDelay) {
      // Finished with waiting on the line
      this.state.waitingLine = false;
      this.state.waitingCounter = 0;
    } else {
      // Continue waiting
      this.state.waitingCounter += this.tickLength;
    }
  }

  updateTyping() {
    const { lines } = this.options;
    const { currentLine, currentCharacter } = this;
    if (currentCharacter >= lines[currentLine].length) {
      this.handleEndOfLine();
    } else {
      // Type a single character
      const typedChar = lines[currentLine].charAt(currentCharacter);
      this.options.onKeypress(typedChar);
      ++this.currentCharacter;
    }
  }

  handleEndOfLine() {
    const { lines } = this.options;
    const { currentLine } = this;
    this.options.onEnter(lines[currentLine]);
    if (currentLine === lines.length - 1) {
      // Last line, finished
      this.state.finished = true;
      this.options.onFinish();
      this.stop();
    } else {
      // Go to the next line, but first wait
      ++this.currentLine;
      this.currentCharacter = 0;
      this.state.waitingLine = true;
    }
  }

  reset(options) {
    this.options = {
      ...this.options,
      ...options
    };
    this.initialize();
  }

  stop() {
    clearTimeout(this.tickTimer);
  }
}

export default MockTyper;
