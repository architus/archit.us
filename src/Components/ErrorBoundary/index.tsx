import React from "react";
import { warn, isDefined } from "Utility";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  onError: (error: Error, info: React.ErrorInfo) => void;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    warn(error, info);
    if (isDefined(this.props.onError)) this.props.onError(error, info);
  }

  render(): React.ReactElement | null {
    if (this.state.hasError) {
      const { fallback } = this.props;
      return isDefined(fallback) ? <>{fallback}</> : null;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
