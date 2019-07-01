import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { exchangeTokens } from "store/actions";

class TokenExchangeInitiator extends React.Component {
  componentDidMount() {
    const {
      initiate,
      authenticated,
      connectedToDiscord,
      authCode
    } = this.props;
    if (!authenticated && connectedToDiscord) initiate(authCode);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated,
    connectedToDiscord: state.session.connectedToDiscord,
    authCode: state.session.discordAuthCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiate: authCode => {
      dispatch(exchangeTokens(authCode));
    }
  };
};

TokenExchangeInitiator.propTypes = {
  initiate: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  connectedToDiscord: PropTypes.bool.isRequired,
  authCode: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenExchangeInitiator);
