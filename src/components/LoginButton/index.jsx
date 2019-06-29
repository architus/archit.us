import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "store/reducers/session";

import { Link as RouterLink } from "components/Router";
import Icon from "components/Icon";
import { Button } from "react-bootstrap";

import "./style.scss";

export const redirectUrl = "https://api.aut-bot.com/login";

function LoginButton({ loggedIn }) {
  return loggedIn ? (
    <div>
      <p className="mb-2">
        <em>You are already logged in</em>
      </p>
      <Button to="/app" as={RouterLink}>
        Get started
      </Button>
    </div>
  ) : (
    <Button variant="discord" href={redirectUrl} className="login">
      <Icon name="discord" />
      <span>Connect</span> <span> with Discord</span>
    </Button>
  );
}

export default connect(mapStateToLoggedIn)(LoginButton);

LoginButton.propTypes = {
  loggedIn: PropTypes.bool
};
