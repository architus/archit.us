import { LOAD_AUTH_TOKEN, SIGN_OUT } from "./actions";

export const initialState = {
  authToken: ""
};

export function store(state = initialState, action) {
  switch (action.type) {
    case LOAD_AUTH_TOKEN:
      return Object.assign({}, state, {
        authToken: action.authToken
      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        authToken: ""
      });
    default:
      return state;
  }
}
