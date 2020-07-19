import React, { ErrorInfo } from "react";
import { Spinner } from "react-bootstrap";
import styled from "@xstyled/emotion";
import { warn, isDefined } from "Utility";
import { Option, Some, None } from "Utility/option";
import { opacity } from "Theme";

const Styled = {
  FallbackRenderer: styled.div`
    position: relative;
    height: 100%;
    display: block;
  `,
  ErrorWrapper: styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: dark_overlay_strong;
    z-index: 10;
    overflow-x: hide;
    overflow-y: auto;
    color: light;
    padding: milli;

    & :not(pre) > code,
    :not(pre) > code {
      color: primary;
      display: inline-block;
      background-color: light_overlay;
      border-radius: 4px;

      // Specific values to match font
      padding: 0.1em 0.35em 0.05em;
      font-size: 87.5%;
    }

    & p {
      color: ${opacity("light", 0.7)};
    }

    & h2 {
      font-size: 3rem;
      font-weight: 200;
      margin-bottom: nano;
    }

    & h3 {
      font-size: 1.5rem;
      margin-bottom: pico;
    }

    & h4 {
      font-size: 1.25rem;
      margin-bottom: pico;
    }
  `,
  ErrorDetails: styled.article`
    pre {
      color: light;
      margin-bottom: pico;
      background-color: light_overlay;
      border-radius: 4px;
      padding: nano;
      overflow: auto;
      margin-top: pico;
    }

    & p {
      margin-bottom: pico;

      strong {
        font-weight: 400;
        color: light;
      }
    }
  `,
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Option<Error>;
  info: Option<ErrorInfo>;
};

/**
 * Wraps errors in the component tree, hiding their effects so the rest of the application
 * can continue running
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: None, info: None };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error: Some(error), info: None };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    warn(
      "An error ocurred in the render tree and was " +
        "caught in an <ErrorBoundary /> component"
    );
    warn(error, info);
    if (isDefined(this.props.onError)) this.props.onError(error, info);
    this.setState({ info: Some(info) });
  }

  render(): React.ReactElement | null {
    const { error, info } = this.state;
    if (error.isDefined()) {
      const { fallback } = this.props;
      return <FallbackRenderer error={error} info={info} fallback={fallback} />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;

// ? ==============
// ? Sub components
// ? ==============

type FallbackRendererProps = Pick<ErrorBoundaryProps, "fallback"> & {
  error: Option<Error>;
  info: Option<ErrorInfo>;
};

/**
 * Renders the fallback if given in production, and displays more detailed error info
 * on development
 */
const FallbackRenderer: React.FC<FallbackRendererProps> = ({
  error,
  info,
  fallback,
}) => {
  if (process.env.NODE_ENV !== "production") {
    return (
      <Styled.FallbackRenderer>
        {fallback}
        <Styled.ErrorWrapper>
          <h2>An error occurred</h2>
          <h3>&lt;ErrorBoundary/&gt;</h3>
          <p>
            An error ocurred beneath this component in the component tree. This
            error boundary will catch errors and prevent them from crashing the
            entire application. To control the fallback, set the{" "}
            <code>fallback</code> prop on the corresponding{" "}
            <code>&lt;ErrorBoundary/&gt;</code> component
          </p>
          <p>
            <em>This message is hidden in production.</em>
          </p>
          <hr />
          <h3>Error details</h3>
          {error.match({
            None: () => (
              <p>No details were available for this error. Check the console</p>
            ),
            Some: (errorInner) => (
              <Styled.ErrorDetails>
                <p>
                  <strong>Name</strong>: <code>{errorInner?.name}</code>
                </p>
                <p>
                  <strong>Message</strong>: {errorInner?.message}
                </p>
                <p>
                  <strong>Stacktrace</strong>:{" "}
                  <pre>
                    <code>{Option.from(errorInner?.stack).getOrElse("~")}</code>
                  </pre>
                </p>
              </Styled.ErrorDetails>
            ),
          })}
          <Styled.ErrorDetails>
            <p>
              <strong>Component stack</strong>:{" "}
              {info.match({
                None: () => (
                  <Spinner animation="border" variant="primary" size="sm" />
                ),
                Some: (infoInner) => (
                  <pre>
                    <code>{infoInner.componentStack}</code>
                  </pre>
                ),
              })}
            </p>
          </Styled.ErrorDetails>
        </Styled.ErrorWrapper>
      </Styled.FallbackRenderer>
    );
  }

  return <>{fallback}</>;
};
