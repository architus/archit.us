import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "store/reducers/session";
import { useReturnQuery, API_BASE, processIfNotEmptyOrNil } from "utility";

import { Link as RouterLink } from "components/Router";
import Icon from "components/Icon";
import { Button } from "react-bootstrap";

import "./style.scss";

export function useOauthUrl() {
  const returnQuery = useReturnQuery();
  return `${API_BASE}/login${processIfNotEmptyOrNil(
    returnQuery,
    q => `?${q}`
  )}`;
}

function LoginButton({ loggedIn }) {
  const oauthUrl = useOauthUrl();
  return loggedIn ? (
    <div>
      <p className="mb-3">
        You are already logged in
      </p>
      <Button to="/app" as={RouterLink}>
        Get started
      </Button>
    </div>
  ) : (
    <div>
      <p>Sign in to add architus to a server.</p>
      <Button variant="discord" href={oauthUrl} className="login">
        <Icon name="discord" />
        <span>Connect</span> <span> with Discord</span>
      </Button>
    </div>

  );
}

export default connect(mapStateToLoggedIn)(LoginButton);

LoginButton.propTypes = {
  loggedIn: PropTypes.bool
};
