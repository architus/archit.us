import { SagaIterator } from "@redux-saga/core";
import { delay } from "@redux-saga/core/effects";
import { takeEvery, put, fork } from "redux-saga/effects";

import { withBasePath } from "@app/api";
import { navigate } from "@app/components/Router";
import {
  hideNotification,
  showToast,
  signOut,
  showNotification,
} from "@app/store/actions";
import gatewayFlow from "@app/store/saga/gateway";
import interpret from "@app/store/saga/interpret";
import pools from "@app/store/saga/pools";
import sessionFlow from "@app/store/saga/session";
import { LOCAL_STORAGE_KEY } from "@app/store/slices/session";
import { setLocalStorage } from "@app/utility";

/**
 * Root saga
 */
export default function* saga(): SagaIterator {
  yield fork(gatewayFlow);
  yield fork(sessionFlow);
  yield fork(interpret);
  yield fork(pools);

  yield takeEvery(signOut.type, handleSignOut);
  yield takeEvery(showNotification.type, autoHideNotification);
}

/**
 * Sets a timeout to automatically hide a notification after its `duration` parameter
 * has elapsed
 * @param action - The show notification action dispatched upon notification display
 */
function* autoHideNotification(
  action: ReturnType<typeof showNotification>
): SagaIterator {
  const { type, duration, id } = action.payload;
  if (duration > 0) {
    yield delay(duration);
    yield put(hideNotification({ type, id }));
  }
}

/**
 * Upon sign out, clears session storage, shows a toast, and navigates to the home
 */
function* handleSignOut(action: ReturnType<typeof signOut>): SagaIterator {
  navigate(withBasePath("/"));
  setLocalStorage(LOCAL_STORAGE_KEY, "");
  if (!action.payload.silent) {
    yield put(showToast({ message: "Signed out" }));
  }
}
