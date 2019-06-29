import axios from "axios";
import { API } from "store/actions";
import { HttpVerbs, isNil } from "utility";
import { apiError, apiStart, apiEnd } from "store/api/actions";

// axios default configs
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
axios.defaults.headers.common["Content-Type"] = "application/json";

const dispatchNonNil = (dispatch, action) => {
  if (!isNil(action)) dispatch(action);
};

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
    dispatchNonNil(dispatch, apiStart(label));
  }

  const request = {
    url,
    method,
    headers,
    [dataOrParams]: data
  };

  axios(request)
    .then(({ data }) => {
      dispatchNonNil(dispatch, onSuccess(data));
    })
    .catch(error => {
      dispatchNonNil(dispatch, apiError(error));
      dispatchNonNil(dispatch, onFailure(error));
    })
    .finally(() => {
      if (label) {
        dispatchNonNil(dispatch, apiEnd(label));
      }
    });
};

export default ApiMiddleware;
