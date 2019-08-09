import { takeEvery, put } from "redux-saga/effects";
import { SIGN_OUT, LOAD_SESSION } from "store/actions";
import { LOCAL_STORAGE_KEY } from "store/reducers/session";
import { log, isNil, sleep } from "utility";
import { navigate } from "@reach/router";
import { SHOW_NOTIFICATION, hideNotification, showToast } from "./actions";

function* signOut() {
  window.localStorage.clear();
  navigate("/");
  yield put(showToast("Signed out"));
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

function* autoHideNotification(action) {
  const { type, duration, id } = action.payload;
  if (duration > 0) {
    yield sleep(duration);
    yield put(hideNotification(type, id));
  }
}

export default function* saga() {
  yield takeEvery(SIGN_OUT, signOut);
  yield takeEvery(LOAD_SESSION, loadNewSession);
  yield takeEvery(SHOW_NOTIFICATION, autoHideNotification);
}
