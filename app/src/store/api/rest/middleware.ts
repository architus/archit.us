import axios from "axios";
import { Middleware, Dispatch as ReduxDispatch, AnyAction } from "redux";

import { ApiError } from "./types";
import { Store, Dispatch } from "@app/store";
import {
  restDispatch,
  restStart,
  apiFetch,
  restSuccess,
  isApiError,
  restFailure,
} from "@app/store/api/rest";
import { isNil } from "@app/utility";

// axios default configs
if (isNil(axios.defaults.headers)) {
  axios.defaults.headers = { common: {} };
}
axios.defaults.headers.common["Content-Type"] = "application/json";

/**
 * Creates an API middleware that asyncryonously enqueues Rest API dispatch events to axios,
 * dispatching additional actions as the requests are resolved
 */
const RestMiddleware: Middleware<{}, Store, ReduxDispatch<AnyAction>> = ({
  dispatch,
}: {
  dispatch: Dispatch;
}) => (next: Dispatch) => (action: AnyAction): void => {
  next(action);
  if (restDispatch.match(action)) {
    const { route, method, data, headers, auth } = action.payload;
    const start = performance.now();
    dispatch(restStart({ ...action.payload, timing: { start } }));
    apiFetch({ route, method, data, headers, auth })
      .then((result) => {
        const end = performance.now();
        const duration = end - start;
        const { data: response } = result;
        dispatch(
          restSuccess({
            ...action.payload,
            response,
            timing: { start, end, duration },
          })
        );
      })
      .catch((e) => {
        const end = performance.now();
        const duration = start - end;
        let error: ApiError;
        if (isApiError(e)) {
          error = e;
        } else {
          error = {
            type: "api",
            reason: "client",
            message: `An unexpected error ocurred: ${e.toString()}`,
            request: {
              url: route,
              method,
              data,
              headers,
            },
          };
        }
        dispatch(
          restFailure({
            ...action.payload,
            error,
            timing: { start, end, duration },
          })
        );
      });
  }
};

export default RestMiddleware;
