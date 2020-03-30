import { put, fork } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { delay, take, race, call } from "@redux-saga/core/effects";
import { isDefined, error } from "Utility";
import { guilds, GuildsListResponse } from "Store/routes";
import {
  PoolType,
  poolKeys,
  fetchPool,
  populatePool
} from "Store/slices/pools";
import { ApiResponse } from "Store/api/rest/types";
import { signOut } from "Store/slices/session";

export default function* pools(): SagaIterator {
  yield fork(createLoadHandlers);
}

function* createLoadHandlers(): SagaIterator {
  for (const key of poolKeys) {
    yield fork(createLoadHandler, key);
  }
}

function* createLoadHandler(key: PoolType): SagaIterator {
  while (true) {
    const action = (yield take(fetchPool.type)) as ReturnType<typeof fetchPool>;
    if (action.payload.type === key) {
      // Fetch until successful
      let fetching = true;
      while (fetching) {
        try {
          const { load, logout } = yield race({
            load: call(guilds.fetch),
            timeout: delay(9000),
            logout: take(signOut.type)
          });

          if (isDefined(load)) {
            const guildList = (load as ApiResponse<GuildsListResponse>).data;
            yield put(
              populatePool({ type: "guilds", entities: guildList.guilds })
            );
            fetching = false;
          }

          // Stop fetching upon sign out
          if (isDefined(logout)) {
            fetching = false;
          }
        } catch (e) {
          error(e);
          const { logout } = yield race({
            timeout: delay(2000),
            logout: take(signOut.type)
          });

          // Stop fetching upon sign out
          if (isDefined(logout)) {
            fetching = false;
          }
        }
      }

      break;
    }
  }
}
