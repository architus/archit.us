import { SIGN_OUT, LOAD_SESSION } from "store/actions";
import {
  getUrlParameter,
  clearUrlQueries,
  isEmptyOrNil,
  log
} from "utility";

export const LOCAL_STORAGE_KEY = "session";

export const initial = {
  loggedIn: false,
  connectedToDiscord: false,
  discordAuthCode: "",
  accessToken: "",
  expiresAt: null
};

export const mapStateToLoggedIn = state => {
  return {
    loggedIn: state.session.connectedToDiscord
  };
};

export const tryLoadSession = () => {
  // Skip when building statically
  if (typeof window === "undefined") return initial;

  // URL param from Discord oauth Redirect URI
  const urlCode = getUrlParameter("code");
  if (!isEmptyOrNil(urlCode) && window.location.pathname === "/app") {
    clearUrlQueries();
    log("Loaded authorization code from discord oauth");
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
    const { expiresAt: expiresAtString, accessToken } = JSON.parse(
      storageSession
    );

    let expiresAt = null;
    if (
      !isEmptyOrNil(expiresAtString) &&
      expiresAtString.toString().trim() !== "null"
    ) {
      expiresAt = new Date(expiresAtString);
      const now = new Date();
      if (expiresAt - now < 0) {
        log("Session has expired; clearing");
        window.localStorage.set(LOCAL_STORAGE_KEY, null);
        return initial;
      }
    }
    log("Loaded session from local storage");

    return {
      ...initial,
      loggedIn: true,
      connectedToDiscord: true,
      accessToken,
      expiresAt
    };
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
      if (action.payload.newToken) {
        const { accessToken } = action.payload;
        addendum = { accessToken };
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
