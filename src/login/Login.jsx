import React from "react";
import Icon from "../components/Icon/Icon"

function Login() {
  return (
    <div>
      <div className="container py-5">
        <h1>Login</h1>
        <a className="btn btn-discord" href="https://api.aut-bot.com/login">
          <Icon name="discord" className="mr-2" />
          Connect with Discord
        </a>
      </div>
    </div>
  );
}

export default Login;
