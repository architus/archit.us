import React from "react";
import { mapStateToLoggedIn } from "../../../util";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOut } from "../../../store/actions";

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
    window.localStorage.clear();
    dispatch(signOut());
    history.push("/");
  }

  render() {
    const { loggedIn } = this.props;

    return loggedIn ? (
      <Dropdown>
        <Dropdown.Toggle id="session-dropdown">
          <span className="mr-2">
            <UserDisplay />
          </span>
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
