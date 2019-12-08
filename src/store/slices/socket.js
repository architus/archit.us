import { SOCKET } from "store/actions";

export const initial = {
  connected: false,
  isConnecting: false
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case SOCKET.CONNECT:
      return {
        ...state,
        isConnecting: true
      };

    case SOCKET.ERROR:
      return {
        ...state,
        isConnecting: false
      };

    case SOCKET.OPEN:
      return {
        ...state,
        connected: true,
        isConnecting: false
      };

    case SOCKET.CLOSED:
      return {
        ...state,
        connected: false,
        isConnecting: false
      };

    default:
      return state;
  }
}
