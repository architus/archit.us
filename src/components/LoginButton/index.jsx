import React from "react";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "../../util";

import Icon from "../Icon";
import { Button } from "react-bootstrap";
import { NavLink as RouterLink } from "react-router-dom";

const redirectUrl = "https://api.aut-bot.com/login";

function LoginButton({ loggedIn }) {
  return loggedIn ? (
    <div>
      <p className="mb-2">
        <em>You are already logged in</em>
      </p>
      <Button to="/home" as={RouterLink}>
        Get started
      </Button>
    </div>
  ) : (
    <Button variant="discord" href={redirectUrl}>
      <Icon name="discord" className="mr-2" />
      Connect with Discord
    </Button>
  );
}

export default connect(mapStateToLoggedIn)(LoginButton);
