import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "store/actions";

export const initial = {
  toast: [],
  alert: []
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const { type, ...rest } = action.payload;
      return {
        ...state,
        [type]: [...state[type], rest]
      };
    }

    case HIDE_NOTIFICATION: {
      const { type, id } = action.payload;
      return {
        ...state,
        [type]: state[type].filter(notification => notification.id !== id)
      };
    }

    default:
      return state;
  }
}
