import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOut } from "../../../store/actions";
import { mapStateToLoggedIn } from "../../../store/reducers/session";

import { NavLink as RouterLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import UserDisplay from "../../UserDisplay";

import "./style.scss";

class SessionControl extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut(e) {
    const { history, dispatch } = this.props;
    e.preventDefault();
    dispatch(signOut(history));
  }

  render() {
    const { loggedIn } = this.props;

    return loggedIn ? (
      <Dropdown className="session-dropdown">
        <Dropdown.Toggle id="session-dropdown-button">
          <UserDisplay className="mr-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={this.signOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <RouterLink
        className="nav-link"
        to="/login"
        exact
        activeClassName="unused"
      >
        Sign In
      </RouterLink>
    );
  }
}

export default connect(mapStateToLoggedIn)(withRouter(SessionControl));

SessionControl.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired
};
