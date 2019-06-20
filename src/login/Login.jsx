import React from "react";
import Icon from "../components/Icon/Icon";
import "./Login.scss";

const redirectUrl = "http://api.aut-bot.com/login";

function Login() {
  return (
    <div className="login">
      <div className="container py-5">
        <h1>Login</h1>
        <h2>Authentication Required</h2>
        <a className="btn btn-discord" href={redirectUrl}>
          <Icon name="discord" className="mr-2" />
          Connect with Discord
        </a>
      </div>
    </div>
  );
}

export default Login;
