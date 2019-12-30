import axios, { AxiosError, AxiosRequestConfig, AxiosPromise } from "axios";
import { HttpVerbs, isNil, isDefined, API_BASE, log, toJSON } from "Utility";
import { Nil } from "Utility/types";
import { Option, Some, None } from "Utility/option";
import {
  restStart,
  restEnd,
  restError,
  restDispatchUnsafe
} from "Store/api/rest/actions";
import { Middleware, Dispatch as ReduxDispatch, AnyAction } from "redux";
import { Store, Dispatch } from "Store";
import { ApiError } from "../actions";
import { ApiRequest } from "./types";

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
  dispatch
}: {
  dispatch: Dispatch;
}) => (next: Dispatch) => (action: AnyAction): void => {
  next(action);
  if (!restDispatchUnsafe.match(action)) {
    return;
  }

  const { decode, onSuccess, onFailure, label } = action.payload;
  dispatch(restStart(label));
  makeRequest(action.payload)
    .then(({ data: responseData }: { data: unknown }) =>
      Option.from(decode)
        .match({
          Some: d => d(responseData),
          // Fall back to raw data if no decode function given
          None: () => Some(responseData)
        })
        // Dispatch onSuccess action if given and returns action
        .flatMap<AnyAction>(d => consumeFactory(onSuccess, d))
        .forEach(dispatch)
    )
    .catch((error: AxiosError) => {
      const errorObject: ApiError = consumeAxiosError(error);
      dispatch(restError(label, errorObject));
      // Dispatch onFailure action if given and returns action
      consumeFactory(onFailure, errorObject).forEach(dispatch);
    })
    .finally(() => {
      dispatch(restEnd(label));
    });
};

export function makeRequest({
  route,
  method,
  data,
  headers
}: ApiRequest): AxiosPromise {
  const dataOrParams = [HttpVerbs.GET, HttpVerbs.DELETE].includes(method)
    ? "params"
    : "data";

  return axios({
    url: `${API_BASE}/${route}`,
    method,
    headers,
    [dataOrParams]: data
  });
}

export default RestMiddleware;

/**
 * Consumes a nullable Action factory to produce a Some(Action) if the factory was
 * defined and the creation was successful, else None.
 * @param factory - Nullable Action factory that can also produce Nil instead of an Action
 * @param arg - Argument to pass to the action factory
 */
function consumeFactory<T>(
  factory: ((u: T) => AnyAction | Nil) | Nil,
  arg: T
): Option<AnyAction> {
  if (isDefined(factory)) return Option.from(factory(arg));
  return None;
}

/**
 * Consumes an axios error object, transforming it into an ApiError object depending
 * on why it occurred
 * @param error - The incoming axios error
 */
export function consumeAxiosError(axiosError: AxiosError): ApiError {
  let message: string;
  let error: object;
  let logMessage: string;

  if (isDefined(axiosError.response)) {
    // Server error
    const { data, status } = axiosError.response;
    const asText = Option.from(data)
      .flatMap<string>(o => toJSON(o))
      .getOrElse(axiosError.toString());

    logMessage = `${status} Error: ${asText}`;
    message = `An error ocurred: status code ${asText}`;
    error = data;
  } else if (isDefined(axiosError.request)) {
    // Client error
    const { request } = axiosError;
    const asText = Option.from(request)
      .flatMap<string>(o => toJSON(o))
      .getOrElse(axiosError.toString());

    logMessage = `Client Error: ${asText}`;
    message = "Could not make request. Check network connectivity";
    error = request;
  } else {
    // Unknown error
    logMessage = `Generic Error: ${axiosError.message}`;
    message = axiosError.message;
    error = axiosError;
  }

  log(logMessage);
  return { error, message };
}
