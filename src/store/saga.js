import { takeEvery } from "redux-saga/effects";
import { SIGN_OUT } from "./actions";

function signOut(action) {
  window.localStorage.clear();
  if (action.payload && action.payload.push) action.payload.push("/");
  // TODO restore
  // else window.location.href = "/";
}

export default function* saga() {
  yield takeEvery(SIGN_OUT, signOut);
}
