import React from "react";
import PropTypes from "prop-types";
import { warn, isDefined } from "utility";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    warn(error, info);
    if (isDefined(this.props.onError)) this.props.onError(error, info);
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      return isDefined(fallback) ? fallback : null;
    } else return this.props.children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  onError: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ErrorBoundary.defaultProps = {
  onError() {}
};

ErrorBoundary.displayName = "ErrorBoundary";
