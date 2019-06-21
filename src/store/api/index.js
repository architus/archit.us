import axios from "axios";
import { API } from "../actions";
import { HttpVerbs } from "../../util";
import { apiError, apiStart, apiEnd } from "./actions";

// axios default configs
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
axios.defaults.headers.common["Content-Type"] = "application/json";

const ApiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    onSuccess,
    onFailure,
    label,
    headers
  } = action.payload;

  const dataOrParams = [HttpVerbs.GET, HttpVerbs.DELETE].includes(method)
    ? "params"
    : "data";

  if (label) {
    dispatch(apiStart(label));
  }

  const request = {
    url,
    method,
    headers,
    [dataOrParams]: data
  };
  console.log(request);

  axios(request)
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default ApiMiddleware;
