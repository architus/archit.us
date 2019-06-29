import { takeEvery } from "redux-saga/effects";
import { SIGN_OUT, LOAD_SESSION } from "store/actions";
import { LOCAL_STORAGE_KEY } from "store/reducers/session";
import { log, isNil } from "utility";

function signOut(action) {
  window.localStorage.clear();
  if (action.payload && action.payload.push) action.payload.push("/");
  // TODO enable better error handling/display here
  // else window.location.href = "/";
}

function loadNewSession(action) {
  if (action.payload.newToken) {
    const { accessToken, expiresIn } = action.payload;
    if (!isNil(expiresIn)) {
      let expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + parseInt(expiresIn));
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken, expiresAt })
      );
      log(`Saved session token that expires at ${expiresAt.toString()}`);
    } else {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken, expiresAt: null })
      );
      log("Saved indefinite session token");
    }
  }
}

export default function* saga() {
  yield takeEvery(SIGN_OUT, signOut);
  yield takeEvery(LOAD_SESSION, loadNewSession);
}
