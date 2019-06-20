import React from "react";
import Icon from "../components/Icon/Icon";

const redirectUrl = 'http://api.aut-bot.com/login'

function Login() {
  return (
    <div>
      <div className="container py-5">
        <h1>Login</h1>
        <a
          className="btn btn-discord"
          href={redirectUrl}
        >
          <Icon name="discord" className="mr-2" />
          Connect with Discord
        </a>
      </div>
    </div>
  );
}

export default Login;
