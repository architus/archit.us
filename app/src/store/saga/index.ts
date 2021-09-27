import { SagaIterator } from "@redux-saga/core";
import { delay } from "@redux-saga/core/effects";
import { takeEvery, put, fork } from "redux-saga/effects";

import { navigate } from "@app/components/Router";
import {
  hideNotification,
  showToast,
  signOut,
  showNotification,
  load,
  LoadPayload,
} from "@app/store/actions";
import { restSuccess } from "@app/store/api/rest";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import gatewayFlow from "@app/store/saga/gateway";
import interpret from "@app/store/saga/interpret";
import pools from "@app/store/saga/pools";
import sessionFlow from "@app/store/saga/session";
import { LOCAL_STORAGE_KEY } from "@app/store/slices/session";
import { setLocalStorage } from "@app/utility";
import { CustomEmoji } from "@app/utility/types";
import { isRight } from "fp-ts/lib/Either";
import { Errors } from "io-ts";

/**
 * Root saga
 */
export default function* saga(): SagaIterator {
  if (process.env.NODE_ENV !== "test") yield fork(gatewayFlow);
  yield fork(sessionFlow);
  yield fork(interpret);
  yield fork(pools);

  yield takeEvery(signOut.type, handleSignOut);
  yield takeEvery(showNotification.type, autoHideNotification);
  yield takeEvery(restSuccess.type, testSaga)
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

function* testSaga(action: ReturnType<typeof restSuccess>): SagaIterator {
  console.log("test");
  if (loadCustomEmoji.match(action) || cacheCustomEmoji.match(action)) {
    console.log(action.payload.response.emoji);
    const decodeResult = CustomEmoji.decode(action.payload.response.emoji);
    const entities = [];
    if (isRight<Errors, CustomEmoji>(decodeResult)) {
      entities.push(decodeResult.right as CustomEmoji);
    } 
    yield put(load({
      type: 'customEmoji',
      guildId: action.payload.routeData.guildId,
      finished: true,
      nonexistant: [],
      entities: entities,
      method: 'partial',
      requestId: 200,
    } as LoadPayload))
    //yield put(load(action.payload.emoji));
  }
}