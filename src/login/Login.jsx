import React from "react";
import Icon from "../components/Icon/Icon";

const oauthUrl = ({ clientId }) =>
  `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=https%3A%2F%2Faut-bot.com&response_type=code&scope=identify`;

function Login() {
  return (
    <div>
      <div className="container py-5">
        <h1>Login</h1>
        <a
          className="btn btn-discord"
          href={oauthUrl({ clientId: "475497380360224780" })}
        >
          <Icon name="discord" className="mr-2" />
          Connect with Discord
        </a>
      </div>
    </div>
  );
}

export default Login;
