import axios, { AxiosError } from "axios";
import { HttpVerbs, isNil, isDefined, API_BASE, log, toJSON } from "Utility";
import { ApiError } from "Utility/types";
import { Option, Some } from "Utility/option";
import { Dispatch, Action, Store } from "Store/types";
import {
  restStart,
  restEnd,
  restError,
  API_REST_DISPATCH
} from "Store/api/rest/actions";
import { Middleware, Dispatch as ReduxDispatch, AnyAction } from "redux";

// axios default configs
if (isNil(axios.defaults.headers)) {
  axios.defaults.headers = { common: {} };
}
axios.defaults.headers.common["Content-Type"] = "application/json";

/**
 * Creates an API middleware that asyncryonously enqueues Rest API dispatch events to axios,
 * dispatching additional actions as the requests are resolved
 * @param param0 Store instance
 */
const RestMiddleware: Middleware<{}, Store, ReduxDispatch<AnyAction>> = ({
  dispatch
}: {
  dispatch: Dispatch;
}) => (next: Dispatch) => (action: Action) => {
  next(action);
  if (action.type !== API_REST_DISPATCH) return;

  const {
    route,
    label,
    method,
    data,
    headers,
    decode,
    onSuccess,
    onFailure
  } = action.payload;

  const dataOrParams = [HttpVerbs.GET, HttpVerbs.DELETE].includes(method)
    ? "params"
    : "data";

  const request = {
    url: `${API_BASE}/${route}`,
    method,
    headers,
    [dataOrParams]: data
  };

  dispatch(restStart(label));
  axios(request)
    .then(({ data }: { data: unknown }) => {
      const decoded: Option<unknown> = isNil(decode)
        ? Some(data)
        : decode(data);
      if (decoded.isDefined() && isDefined(onSuccess)) {
        const action: Action | undefined = onSuccess(decoded.get);
        if (isDefined(action)) dispatch(action);
      }
    })
    .catch((error: AxiosError) => {
      const errorObject: ApiError = consumeAxiosError(error);
      dispatch(restError(label, errorObject));
      if (isDefined(onFailure)) {
        const action: Action | undefined = onFailure(errorObject);
        if (isDefined(action)) dispatch(action);
      }
    })
    .finally(() => {
      dispatch(restEnd(label));
    });
};

export default RestMiddleware;

/**
 * Consumes an axios error object, transforming it into an ApiError object depending
 * on why it occurred
 * @param error The incoming axios error
 */
function consumeAxiosError(error: AxiosError): ApiError {
  if (isDefined(error.response)) {
    const { data } = error.response;
    const asText = Option.from(data).flatMap<string>(o => toJSON(o));
    if (asText.isDefined()) {
      log(`${error.response.status} Error: ${asText.get}`);
      return {
        error: data,
        message: asText.get
      };
    } else {
      log(`${error.response.status} Error: ${asText}`);
      return {
        error: data,
        message: `An error ocurred: status code ${error.response.status}`
      };
    }
  } else if (isDefined(error.request)) {
    const { request } = error;
    const asText = Option.from(request).flatMap<string>(o => toJSON(o));
    if (asText.isDefined()) {
      log(`Client Error: ${asText.get}`);
      return {
        error: request,
        message: "Could not make request. Check network connectivity"
      };
    } else {
      log(`Client Error: ${asText}`);
      return {
        error: request,
        message: "Could not make request. Check network connectivity"
      };
    }
  } else {
    log(`Generic Error: ${error.message}`);
    return {
      error: error,
      message: error.message
    };
  }
}
