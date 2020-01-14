/* eslint-disable @typescript-eslint/camelcase */
import { takeEvery, put, fork } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { delay } from "@redux-saga/core/effects";
import { LOCAL_STORAGE_KEY } from "Store/slices/session";
import { setLocalStorage } from "Utility";
import { navigate } from "@reach/router";
import {
  hideNotification,
  showToast,
  signOut,
  showNotification
} from "Store/actions";
import sessionFlow from "Store/saga/session";
import gatewayFlow from "Store/saga/gateway";
import { interpretInvisible, interpretMessage } from "Store/slices/interpret";
import { mockUserEvent } from "Store/routes";

/**
 * Root saga
 */
export default function* saga(): SagaIterator {
  yield fork(gatewayFlow);
  yield fork(sessionFlow);

  yield takeEvery(signOut.type, handleSignOut);
  yield takeEvery(showNotification.type, autoHideNotification);
  yield fork(interpret);
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

function* interpret(): SagaIterator {
  yield takeEvery(interpretMessage.type, handleInterpretMessage);
  yield takeEvery(interpretInvisible.type, handleInterpretInvisble);
}

function* handleInterpretMessage(
  action: ReturnType<typeof interpretMessage>
): SagaIterator {
  const { context, message, id } = action.payload;
  yield put(
    mockUserEvent({
      guild_id: context.guildId,
      content: message,
      message_id: id,
      allowed_commands: context.allowedCommands
    })
  );
}

function* handleInterpretInvisble(
  action: ReturnType<typeof interpretMessage>
): SagaIterator {
  const { context, message, id } = action.payload;
  yield put(
    mockUserEvent({
      guild_id: context.guildId,
      content: message,
      message_id: id,
      allowed_commands: context.allowedCommands,
      silent: true
    })
  );
}
