import axios from "axios";
import { API } from "store/actions";
import { HttpVerbs, isNil, isDefined } from "Utility";
import { apiError, apiStart, apiEnd } from "Store/api/rest/actions";

// axios default configs
if (isDefined(axios) && isDefined(axios.defaults))
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
