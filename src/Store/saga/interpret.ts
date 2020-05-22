import {
  interpretInvisible,
  interpretMessage,
  interpretReact,
  interpretUnreact,
} from "Store/slices/interpret";
import { mockUserEvent } from "Store/routes";
import { LogEvents } from "Utility/types";
import { SagaIterator } from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

export default function* interpret(): SagaIterator {
  yield takeEvery(interpretMessage.type, handleInterpretMessage);
  yield takeEvery(interpretInvisible.type, handleInterpretInvisible);
  yield takeEvery(interpretReact.type, handleInterpretReact);
  yield takeEvery(interpretUnreact.type, handleInterpretUnreact);
}
function* handleInterpretMessage(
  action: ReturnType<typeof interpretMessage>
): SagaIterator {
  const { context, message, id } = action.payload;
  yield put(
    mockUserEvent({
      action: LogEvents.MessageSend,
      guildId: context.guildId,
      content: message,
      messageId: id,
      allowedCommands: context.allowedCommands || [],
      silent: false,
    })
  );
}

function* handleInterpretInvisible(
  action: ReturnType<typeof interpretInvisible>
): SagaIterator {
  const { context, message, id } = action.payload;
  yield put(
    mockUserEvent({
      action: LogEvents.MessageSend,
      guildId: context.guildId,
      messageId: id,
      content: message,
      allowedCommands: context.allowedCommands || [],
      silent: true,
    })
  );
}

function* handleInterpretReact(
  action: ReturnType<typeof interpretReact>
): SagaIterator {
  const { context, reaction } = action.payload;
  yield put(
    mockUserEvent({
      action: LogEvents.ReactionAdd,
      guildId: context.guildId,
      messageId: reaction.id,
      emoji: reaction.reaction.rawEmoji,
    })
  );
}

function* handleInterpretUnreact(
  action: ReturnType<typeof interpretUnreact>
): SagaIterator {
  const { context, reaction } = action.payload;
  yield put(
    mockUserEvent({
      action: LogEvents.ReactionRemove,
      guildId: context.guildId,
      messageId: reaction.id,
      emoji: reaction.reaction.rawEmoji,
    })
  );
}
