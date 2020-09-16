import { SagaIterator } from "@redux-saga/core";
import { delay, race, take } from "@redux-saga/core/effects";
import { takeEvery, put, fork } from "redux-saga/effects";

import { navigate } from "@app/components/Router";
import {
  hideNotification,
  showToast,
  signOut,
  showNotification,
} from "@app/store/actions";
import { restDispatch, statsSuccess } from "@app/store/api/rest";
import { stats, StatisticsResponse } from "@app/store/routes";
import gatewayFlow from "@app/store/saga/gateway";
import interpret from "@app/store/saga/interpret";
import pools from "@app/store/saga/pools";
import sessionFlow from "@app/store/saga/session";
import { LOCAL_STORAGE_KEY } from "@app/store/slices/session";
import { setLocalStorage } from "@app/utility";
import { isDefined } from "@architus/lib/utility";

/**
 * Root saga
 */
export default function* saga(): SagaIterator {
  if (process.env.NODE_ENV !== "test") yield fork(gatewayFlow);
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
  navigate("/");
  setLocalStorage(LOCAL_STORAGE_KEY, "");
  if (!action.payload.silent) {
    yield put(showToast({ message: "Signed out" }));
  }
}
