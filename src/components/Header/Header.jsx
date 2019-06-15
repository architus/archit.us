import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="container header-container">
      <text>aut-bot</text>
      <ul>
          <li>
              <Link to="/">Login</Link>
          </li>
          <li>
              <Link to="/home">Home</Link>
          </li>
      </ul>
    </div>
  );
}

export default Header;
