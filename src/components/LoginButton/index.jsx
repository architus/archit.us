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
      <p className="mb-2">
        <em>You are already logged in</em>
      </p>
      <Button to="/app" as={RouterLink}>
        Get started
      </Button>
    </div>
  ) : (
    <Button variant="discord" href={oauthUrl} className="login">
      <Icon name="discord" />
      <span>Connect</span> <span> with Discord</span>
    </Button>
  );
}

export default connect(mapStateToLoggedIn)(LoginButton);

LoginButton.propTypes = {
  loggedIn: PropTypes.bool
};
