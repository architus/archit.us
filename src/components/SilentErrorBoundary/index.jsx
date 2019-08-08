import React from "react";
import PropTypes from "prop-types";
import { warn } from "utility";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError() {
    return {};
  }

  componentDidCatch(error, info) {
    warn(error, info);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
