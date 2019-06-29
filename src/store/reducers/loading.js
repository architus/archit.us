import * as ApiLabels from "store/api/labels";
import { API_START, API_END, API_ERROR } from "store/api/actions";

export const initial = Object.assign(
  {},
  ...Object.keys(ApiLabels).map(label => ({ [label]: false }))
);

export function reducer(state = initial, action) {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        [action.payload]: true
      };

    case API_ERROR:
    case API_END:
      return {
        ...state,
        [action.payload]: false
      };

    default:
      return state;
  }
}
