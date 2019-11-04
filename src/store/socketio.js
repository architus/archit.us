import { bindActionCreators } from "redux";

const EMIT_MESSAGE = "socket-io/EMIT_MESSAGE";

export function emitMessage(eventName, message) {
  return {
    type: EMIT_MESSAGE,
    payload: { eventName, message }
  };
}

function createSocketIoMiddleware(io, actionCreators) {
  return ({ dispatch }) => {
    const boundActionCreators = bindActionCreators(actionCreators, dispatch);
    const events = Object.keys(boundActionCreators);
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      let actionCreator = boundActionCreators[event];
      io.on(event, actionCreator);
    }

    return next => action => {
      if (action.type !== EMIT_MESSAGE) {
        return next(action);
      }

      const { eventName, message } = action.payload;
      io.emit(eventName, message);
    };
  };
}

export default createSocketIoMiddleware;
