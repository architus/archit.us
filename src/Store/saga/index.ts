import { takeEvery, put, fork } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { delay, take, race } from "@redux-saga/core/effects";
import { LOCAL_STORAGE_KEY } from "Store/slices/session";
import { setLocalStorage, withBasePath, isDefined } from "Utility";
import { navigate } from "@reach/router";
import {
  hideNotification,
  showToast,
  signOut,
  showNotification,
} from "Store/actions";
import { stats, StatisticsResponse } from "Store/routes";
import interpret from "Store/saga/interpret";
import sessionFlow from "Store/saga/session";
import gatewayFlow from "Store/saga/gateway";
import pools from "Store/saga/pools";
import { restDispatch, statsSuccess } from "Store/api/rest";

/**
 * Root saga
 */
export default function* saga(): SagaIterator {
  yield fork(gatewayFlow);
  yield fork(sessionFlow);
  yield fork(interpret);
  yield fork(pools);

  yield takeEvery(stats.matchDispatch, handleFetchStatistics);
  yield takeEvery(signOut.type, handleSignOut);
  yield takeEvery(showNotification.type, autoHideNotification);
}

/**
 * Special saga for the statistics route to inject the guildId into the action.
 * Should probably be generalized.
 * @param action - the satistics respones action dispatched upon receiving a response from the api
 */
function* handleFetchStatistics(
  action: ReturnType<typeof restDispatch>
): SagaIterator {
  if (stats.matchDispatch(action)) {
    const { guildId } = action.payload.routeData;
    const { success } = yield race({
      success: take(stats.match),
      failure: take(stats.matchError),
      timeout: delay(10000),
    });

    if (isDefined(success) && stats.match(success)) {
      const response = success.payload.response as StatisticsResponse;
      yield put(statsSuccess({ guildId, response }));
    }
  }
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
