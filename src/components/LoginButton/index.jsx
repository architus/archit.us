import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "store/reducers/session";

import { Link as RouterLink } from "components/Router";
import Icon from "components/Icon";
import { Button } from "react-bootstrap";

import "./style.scss";

const baseOauthUrl = "https://api.aut-bot.com/login";
export function useOauthUrl() {
  if (process.env.PRODUCTION_URL) {
    return baseOauthUrl;
  } else {
    const [oauthUrl, setOauthUrl] = React.useState(baseOauthUrl);
    React.useEffect(() => {
      setOauthUrl(
        `https://api.aut-bot.com/login?return=${encodeURIComponent(
          `${window.location.protocol}//${window.location.host}/app`
        )}`
      );
    });
    return oauthUrl;
  }
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
