import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOut, identifySession } from "Store/actions_old";
import { isEmptyOrNil } from "Utility";

import { Link as RouterLink } from "Components/Router";
import UserDisplay from "Components/UserDisplay";
import { Dropdown } from "react-bootstrap";
import Icon from "Components/Icon";

import "./style.scss";

class SessionControl extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const { identify, authenticated, id, accessToken } = this.props;
    if (authenticated && isEmptyOrNil(id) && !isEmptyOrNil(accessToken))
      identify(accessToken);
  }

  signOut(e) {
    const { signOut } = this.props;
    e.preventDefault();
    signOut();
  }

  render() {
    const {
      connectedToDiscord,
      avatar,
      username,
      discriminator,
      id
    } = this.props;

    return connectedToDiscord ? (
      <Dropdown className="session-dropdown">
        <Dropdown.Toggle id="session-dropdown-button">
          <UserDisplay
            className="mr-2"
            avatarHash={avatar}
            username={username}
            discriminator={discriminator}
            clientId={id}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={this.signOut}>
            <Icon name="sign-out-alt" className="mr-2" /> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <RouterLink className="nav-link" to="/login">
        Sign In
      </RouterLink>
    );
  }
}

export const mapStateToProps = state => {
  return {
    connectedToDiscord: state.session.connectedToDiscord,
    authenticated: state.session.authenticated,
    avatar: state.session.avatar,
    username: state.session.username,
    discriminator: state.session.discriminator,
    id: state.session.id,
    accessToken: state.session.accessToken
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    identify: accessToken => dispatch(identifySession(accessToken)),
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionControl);

SessionControl.propTypes = {
  signOut: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string,
  discriminator: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  identify: PropTypes.func.isRequired,
  connectedToDiscord: PropTypes.bool.isRequired,
  accessToken: PropTypes.string
};
