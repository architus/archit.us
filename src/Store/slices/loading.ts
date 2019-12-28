import * as ApiLabels from "Store/api/rest/labels";
import { mapEntries } from "Utility";
import { StoreSlice, Reducer } from "Store/types";
import { scopeReducer } from "./base";

import { API_REST_DISPATCH } from "Store/api/rest/actions";
import {
  API_NAMESPACE,
  ApiAction,
  API_START,
  API_ERROR,
  API_END
} from "Store/api/actions";

/**
 * Stores loading status for each request=>response API request type
 */
export type Loading = { [key in ApiLabels.RestLabel]: boolean };

// ? ====================
// ? Reducer exports
// ? ====================

const initial: Loading = mapEntries(ApiLabels, (_, v) => [v, false]);

const reducer: Reducer<Loading> = scopeReducer(
  API_NAMESPACE,
  (state: Loading, action: ApiAction): Loading => {
    switch (action.type) {
      case API_START:
        return {
          ...state,
          [action.payload.label]: true
        };

      case API_ERROR:
      case API_END:
        return {
          ...state,
          [action.payload.label]: false
        };

      case API_REST_DISPATCH:
        return state;
    }
  }
);

const slice: StoreSlice<Loading> = { initial, reducer };
export default slice;
