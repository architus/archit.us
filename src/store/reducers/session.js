import { SIGN_OUT, LOAD_SESSION } from "../actions";
import {
  getUrlParameter,
  clearUrlQueries,
  isEmptyOrNil,
  log
} from "../../util";

const LOCAL_STORAGE_KEY = "session";

export const initial = {
  loggedIn: false,
  connectedToDiscord: false,
  discordAuthCode: "",
  accessToken: "",
  expiresAt: ""
};

export const mapStateToLoggedIn = state => {
  return {
    loggedIn: state.session.connectedToDiscord
  };
};

export const tryLoadSession = () => {
  // URL param from Discord oauth Redirect URI
  const urlCode = getUrlParameter("code");
  if (!isEmptyOrNil(urlCode) && window.location.pathname === "/home") {
    clearUrlQueries();
    // State will initiate token exchange when /home is loaded
    return {
      ...initial,
      connectedToDiscord: true,
      discordAuthCode: urlCode
    };
  }

  // Load session from local storage
  const storageSession = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!isEmptyOrNil(storageSession)) {
    const { expiresAtString, accessToken } = JSON.parse(storageSession);
    const expiresAt = new Date(expiresAtString);
    const now = new Date();
    if (expiresAt - now < 0) {
      log("Session has expired; clearing");
      window.localStorage.set(LOCAL_STORAGE_KEY, null);
      return initial;
    } else {
      return {
        ...initial,
        loggedIn: true,
        connectedToDiscord: true,
        accessToken,
        expiresAt
      };
    }
  }

  // Default: start un-authenticated
  return initial;
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initial;

    case LOAD_SESSION:
      // Load the new token to the session state if applicable
      let addendum = {};
      if (action.newToken) {
        const { expiresIn, accessToken } = action.payload;
        let expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + parseInt(expiresIn));
        addendum = { expiresAt, accessToken };
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(addendum)
        );
      }

      const { username, discriminator, id, avatar } = action.payload;
      return {
        ...state,
        loggedIn: true,
        discordAuthCode: "",
        username,
        discriminator,
        id,
        avatar,
        ...addendum
      };

    default:
      return state;
  }
}
