import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { websocketConnect } from "store/actions";

class WebSocketConnectionInitiator extends React.Component {
  componentDidMount() {
    const { connected, isConnecting, initiate } = this.props;
    if (!connected && !isConnecting) initiate();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    connected: state.socket.connected,
    isConnecting: state.socket.isConnecting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiate: () => {
      dispatch(websocketConnect());
    }
  };
};

WebSocketConnectionInitiator.propTypes = {
  connected: PropTypes.bool.isRequired,
  isConnecting: PropTypes.bool.isRequired,
  initiate: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebSocketConnectionInitiator);
