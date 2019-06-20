import { LOAD_AUTH_TOKEN } from "./actions";

const initialState = {
  authToken: ""
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case LOAD_AUTH_TOKEN:
      return Object.assign({}, state, {
        authToken: action.authToken
      });
    default:
      return state;
  }
}
