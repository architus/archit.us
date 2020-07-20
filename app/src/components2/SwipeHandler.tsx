import React, { TouchEvent } from "react";

import { isDefined } from "@app/utility";
import { StyleObject } from "@app/utility/types";

// Sourced from leandrowd/react-easy-swipe. Forked to modify (and
// converted to TypeScript)
// Licensed under MIT
// https://github.com/leandrowd/react-easy-swipe

let supportsCaptureOption = false;
export function setHasSupportToCaptureOption(hasSupport: boolean): void {
  supportsCaptureOption = hasSupport;
}

// Perform feature detection on capture
try {
  window.addEventListener(
    "test",
    () => null,
    Object.defineProperty({}, "capture", {
      // eslint-disable-next-line getter-return
      get: function get() {
        setHasSupportToCaptureOption(true);
      },
    })
  );
} catch (e) {} // eslint-disable-line no-empty

function getSafeEventHandlerOpts(
  options: AddEventListenerOptions = { capture: true }
): AddEventListenerOptions | boolean {
  return supportsCaptureOption ? options : options.capture || false;
}

interface Position {
  x: number;
  y: number;
}

/**
 * @returns a position element that works for mouse or touch events
 */
function getPosition(
  event: MouseEvent | TouchEvent | React.MouseEvent
): Position {
  if ("touches" in event) {
    const { pageX, pageY } = event.touches[0];
    return { x: pageX, y: pageY };
  }

  const { screenX, screenY } = event;
  return { x: screenX, y: screenY };
}

type SwipeHandlerProps = {
  tolerance: number;
  tagName?: React.ElementType;
  allowMouseEvents?: boolean;

  onSwipeUp?: (event: MouseEvent | React.TouchEvent) => void;
  onSwipeDown?: (event: MouseEvent | React.TouchEvent) => void;
  onSwipeLeft?: (event: MouseEvent | React.TouchEvent) => void;
  onSwipeRight?: (event: MouseEvent | React.TouchEvent) => void;
  onSwipeStart?: (event: React.MouseEvent | TouchEvent) => void;
  onSwipeMove?: (position: Position, event: MouseEvent | TouchEvent) => boolean;
  onSwipeEnd?: (event: MouseEvent | TouchEvent) => void;
  onPostSwipeEnd?: () => void;

  children?: React.ReactNode;
  className?: string;
  style?: StyleObject;
} & Record<string, unknown>;

class SwipeHandler extends React.Component<SwipeHandlerProps> {
  static displayName = "SwipeHandler";

  private swiper = React.createRef<HTMLElement>();

  public mouseDown = false;

  public moveStart: Position | null = null;

  public movePosition: { deltaX: number; deltaY: number } | null = null;

  public moving = false;

  componentDidMount(): void {
    if (this.swiper) {
      this.swiper.current?.addEventListener(
        "touchmove",
        this.handleSwipeMove as EventListener,
        getSafeEventHandlerOpts({
          capture: true,
          passive: false,
        })
      );
    }
  }

  componentWillUnmount(): void {
    if (this.swiper) {
      this.swiper.current?.removeEventListener(
        "touchmove",
        this.handleSwipeMove as EventListener,
        getSafeEventHandlerOpts({
          capture: true,
          passive: false,
        })
      );
    }
  }

  // Uses React synthetic event
  onMouseDown = (event: React.MouseEvent): void => {
    if (!this.props.allowMouseEvents) {
      return;
    }

    this.mouseDown = true;

    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);

    this.handleSwipeStart(event);
  };

  // Uses native event
  onMouseMove = (event: MouseEvent): void => {
    if (!this.mouseDown) {
      return;
    }

    this.handleSwipeMove(event);
  };

  // Uses native event
  onMouseUp = (event: MouseEvent): void => {
    this.mouseDown = false;

    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);

    this.handleSwipeEnd(event);
  };

  handleSwipeStart = (event: React.MouseEvent | TouchEvent): void => {
    const { x, y } = getPosition(event);
    this.moveStart = { x, y };
    if (isDefined(this.props.onSwipeStart)) this.props.onSwipeStart(event);
  };

  handleSwipeMove = (event: MouseEvent | TouchEvent): void => {
    if (!this.moveStart) {
      return;
    }
    const { x, y } = getPosition(event);
    const deltaX = x - this.moveStart.x;
    const deltaY = y - this.moveStart.y;
    this.moving = true;

    // handling the responsability of cancelling the scroll to
    // the component handling the event

    const shouldPreventDefault = isDefined(this.props.onSwipeMove)
      ? this.props.onSwipeMove({ x: deltaX, y: deltaY }, event)
      : false;

    if (shouldPreventDefault) {
      event.preventDefault();
    }

    this.movePosition = { deltaX, deltaY };
  };

  handleSwipeEnd = (event: MouseEvent | React.TouchEvent): void => {
    if (isDefined(this.props.onSwipeEnd)) this.props.onSwipeEnd(event);

    const { tolerance } = this.props;

    if (this.moving && this.movePosition) {
      if (this.movePosition.deltaX < -tolerance) {
        if (isDefined(this.props.onSwipeLeft)) this.props.onSwipeLeft(event);
      } else if (this.movePosition.deltaX > tolerance) {
        if (isDefined(this.props.onSwipeRight)) this.props.onSwipeRight(event);
      }
      if (this.movePosition.deltaY < -tolerance) {
        if (isDefined(this.props.onSwipeUp)) this.props.onSwipeUp(event);
      } else if (this.movePosition.deltaY > tolerance) {
        if (isDefined(this.props.onSwipeDown)) this.props.onSwipeDown(event);
      }
    }

    if (isDefined(this.props.onPostSwipeEnd)) this.props.onPostSwipeEnd();

    this.moveStart = null;
    this.moving = false;
    this.movePosition = null;
  };

  render(): React.ReactNode {
    const {
      tagName: TagName = "div",
      allowMouseEvents,
      className,
      style,
      children,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight,
      onSwipeStart,
      onSwipeMove,
      onSwipeEnd,
      onPostSwipeEnd,
      tolerance,
      ...props
    } = this.props;

    return (
      <TagName
        ref={this.swiper}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.handleSwipeStart}
        onTouchEnd={this.handleSwipeEnd}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </TagName>
    );
  }
}

export default SwipeHandler;
