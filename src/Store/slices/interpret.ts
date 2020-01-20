/* eslint-disable @typescript-eslint/camelcase */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockBotEvent } from "Store/routes";
import { gatewayEvent } from "Store/api/gateway";
import {
  DiscordMockContext,
  MockReactionContext,
  MockMessageClump,
  MockUser,
  MockMessage,
  MockReaction,
  SerializedMockReaction,
  LogEvents
} from "Utility/types";
import { transformReaction } from "Components/DiscordMock/transform";
import {
  createClump,
  shouldMergeClumps,
  mergeClumps,
  containingClumpIndex
} from "Components/DiscordMock/util";
import { isNil, isDefined, architusUser } from "Utility";

/**
 * Stores incoming responses from the Gateway interpret API
 */
export interface Interpret {
  messageClumps: Record<number, MockMessageClump[]>;
}

export interface InterpretMessage {
  context: DiscordMockContext;
  message: string;
  id: number;
}

export interface InterpretReaction {
  context: DiscordMockContext;
  reaction: MockReactionContext;
}

export interface InterpretLocalMessage {
  context: DiscordMockContext;
  sender: MockUser;
  message: string;
  id: number;
}

export interface InterpretLocalDelete {
  context: DiscordMockContext;
  id: number;
}

// Clump performance optimization threshold (clear old message clumps)
const CLUMP_SLICING_THRESHOLD = 50;
const CLUMP_SLICED_LENGTH = 40;

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Interpret = { messageClumps: {} };
const slice = createSlice({
  name: "interpret",
  initialState,
  reducers: {
    interpretInvisible: (
      prev: Interpret,
      _: PayloadAction<InterpretMessage>
    ): Interpret => {
      // NO-OP
      return prev;
    },

    interpretMessage: (
      prev: Interpret,
      action: PayloadAction<InterpretMessage>
    ): Interpret => {
      const {
        message,
        id,
        context: { guildId, thisUser }
      } = action.payload;

      const newMessage = { content: message, id, edited: false, reactions: [] };
      addMessage(prev, guildId, newMessage, thisUser);
      sliceClumps(prev, guildId);
      return prev;
    },

    interpretReact: (
      prev: Interpret,
      action: PayloadAction<InterpretReaction>
    ): Interpret => {
      const { reaction, context } = action.payload;

      addReactions(prev, context.guildId, reaction.id, [
        {
          emoji: reaction.reaction.rawEmoji,
          rendered: reaction.reaction.emoji,
          targetsUser: true
        }
      ]);
      return prev;
    },

    interpretUnreact: (
      prev: Interpret,
      action: PayloadAction<InterpretReaction>
    ): Interpret => {
      const { reaction, context } = action.payload;

      removeReactions(prev, context.guildId, reaction.id, [
        {
          emoji: reaction.reaction.rawEmoji,
          targetsUser: true
        }
      ]);
      return prev;
    },

    interpretLocalMessage: (
      prev: Interpret,
      action: PayloadAction<InterpretLocalMessage>
    ): Interpret => {
      const {
        message,
        id,
        sender,
        context: { guildId }
      } = action.payload;

      const newMessage = { content: message, id, edited: false, reactions: [] };
      addMessage(prev, guildId, newMessage, sender);
      sliceClumps(prev, guildId);
      return prev;
    },

    interpretLocalDelete: (
      prev: Interpret,
      action: PayloadAction<InterpretLocalDelete>
    ): Interpret => {
      const {
        id,
        context: { guildId }
      } = action.payload;

      removeMessage(prev, guildId, id);
      sliceClumps(prev, guildId);
      return prev;
    },

    interpretClear: (
      prev: Interpret,
      action: PayloadAction<number>
    ): Interpret => {
      // Clear the message clumps for the given guild id
      prev.messageClumps[action.payload] = [];
      return prev;
    }
  },
  extraReducers: {
    [gatewayEvent.type]: (state, action): Interpret => {
      if (mockBotEvent.match(action)) {
        const { actions, guildId } = action.payload.data;
        for (const event of actions) {
          const { messageId } = event;

          if (event.action === LogEvents.MessageSend) {
            const { content } = event;
            addMessage(
              state,
              guildId,
              { content, id: messageId, reactions: [], edited: false },
              architusUser
            );
          } else if (event.action === LogEvents.MessageEdit) {
            const { content } = event;
            editMessage(state, guildId, messageId, content);
          } else if (event.action === LogEvents.MessageDelete) {
            removeMessage(state, guildId, messageId);
          } else if (event.action === LogEvents.ReactionAdd) {
            const { emoji } = event;
            addReactions(state, guildId, messageId, [
              { emoji, targetsUser: false }
            ]);
          } else if (event.action === LogEvents.ReactionRemove) {
            const { emoji, targetsUser } = event;
            removeReactions(state, guildId, messageId, [
              { emoji, targetsUser }
            ]);
          }
        }

        sliceClumps(state, guildId);
      }
      return state;
    }
  }
});

export const {
  interpretInvisible,
  interpretMessage,
  interpretReact,
  interpretUnreact,
  interpretLocalMessage,
  interpretLocalDelete,
  interpretClear
} = slice.actions;
export default slice.reducer;

function getMessage(
  state: Interpret,
  guildId: number,
  id: number
): MockMessage | undefined {
  const clumpIndex = containingClumpIndex(state.messageClumps[guildId], id);
  if (clumpIndex !== -1) {
    const clump = state.messageClumps[guildId][clumpIndex];
    return clump.messages.find(({ id: messageId }) => messageId === id);
  }
  return undefined;
}

type PrerenderedReaction = SerializedMockReaction & { rendered?: string };

/**
 * Adds a list of reactions to a message
 * @param state - Current state (immer.js)
 * @param guildId - Guild id to add message to
 * @param id - Id of message to add reactions to
 * @param reactions - List of network reaction objects
 */
function addReactions(
  state: Interpret,
  guildId: number,
  id: number,
  reactions: PrerenderedReaction[]
): void {
  const message = getMessage(state, guildId, id);
  if (isDefined(message)) {
    const emojiToReactionMap: Map<
      PrerenderedReaction["emoji"],
      PrerenderedReaction
    > = new Map();
    for (const reaction of reactions) {
      emojiToReactionMap.set(reaction.emoji, reaction);
    }

    const newReactions: MockReaction[] = [];
    for (const messageReaction of message.reactions) {
      const { rawEmoji } = messageReaction;
      const result = emojiToReactionMap.get(rawEmoji);
      if (isDefined(result)) {
        emojiToReactionMap.delete(rawEmoji);
        const { targetsUser } = result;
        if (targetsUser && !messageReaction.userHasReacted) {
          messageReaction.userHasReacted = true;
          messageReaction.number += 1;
        } else if (!targetsUser) {
          messageReaction.number += 1;
        }
      }
    }

    // Add all new reactions
    emojiToReactionMap.forEach(({ emoji, rendered, targetsUser }) => {
      newReactions.push({
        emoji: isDefined(rendered) ? rendered : transformReaction(emoji),
        number: 1,
        userHasReacted: targetsUser,
        rawEmoji: emoji,
        targetId: id
      });
    });

    message.reactions = [...message.reactions, ...newReactions];
  }
}

/**
 * Adds a list of reactions to a message
 * @param state - Current state (immer.js)
 * @param guildId - Guild id to add message to
 * @param id - Id of message to add reactions to
 * @param reactions - List of network reaction objects
 */
function removeReactions(
  state: Interpret,
  guildId: number,
  id: number,
  reactions: SerializedMockReaction[]
): void {
  const message = getMessage(state, guildId, id);
  if (isDefined(message)) {
    const emojiToReactionMap: Map<
      SerializedMockReaction["emoji"],
      SerializedMockReaction
    > = new Map();
    for (const reaction of reactions) {
      emojiToReactionMap.set(reaction.emoji, reaction);
    }

    for (const messageReaction of message.reactions) {
      const { rawEmoji } = messageReaction;
      const result = emojiToReactionMap.get(rawEmoji);
      if (isDefined(result)) {
        emojiToReactionMap.delete(rawEmoji);
        const { targetsUser } = result;
        if (targetsUser && messageReaction.userHasReacted) {
          messageReaction.userHasReacted = false;
          messageReaction.number -= 1;
        } else if (!targetsUser) {
          messageReaction.number -= 1;
        }
      }
    }

    message.reactions = message.reactions.filter(r => r.number > 0);
  }
}

/**
 * Edits a specific message by id
 * @param state - Current state (immer.js)
 * @param guildId - Guild id to add message to
 * @param id - Id of message to edit
 * @param newContent - New message content
 */
function editMessage(
  state: Interpret,
  guildId: number,
  id: number,
  newContent: string
): void {
  const message = getMessage(state, guildId, id);
  if (isDefined(message)) {
    message.content = newContent;
    message.edited = true;
  }
}

/**
 * Removes a specific message by id from the specified guild id's message clump array
 * @param state - Current state (immer.js)
 * @param guildId - Guild id to add message to
 * @param id - Id of message to delete
 */
function removeMessage(state: Interpret, guildId: number, id: number): void {
  const clumpIndex = containingClumpIndex(state.messageClumps[guildId], id);
  if (clumpIndex !== -1) {
    const clump = state.messageClumps[guildId][clumpIndex];
    if (clump.messages.length === 1) {
      // Remove entire clump
      state.messageClumps[guildId].splice(clumpIndex, 1);
    } else {
      // Remove specific message
      state.messageClumps[guildId][clumpIndex].messages = clump.messages.filter(
        ({ id: messageId }) => messageId !== id
      );
    }
  }
}

/**
 * Adds a message, merging as neccessary
 * @param state - Current state (immer.js)
 * @param guildId - Guild id to add message to
 * @param message - New message
 * @param sender - Sender of new message
 */
function addMessage(
  state: Interpret,
  guildId: number,
  message: MockMessage,
  sender: MockUser
): void {
  const clumps = state.messageClumps[guildId];
  const newClump = createClump(message, sender);

  if (isNil(clumps) || clumps.length === 0) {
    // first clump
    state.messageClumps[guildId] = [newClump];
  } else {
    // determine whether it should merge with the last clump
    const lastClump = clumps[clumps.length - 1];
    if (shouldMergeClumps(lastClump, newClump)) {
      state.messageClumps[guildId] = [
        ...clumps.slice(0, -1),
        mergeClumps(lastClump, newClump)
      ];
    } else {
      state.messageClumps[guildId] = [...clumps, newClump];
    }
  }
}

/**
 * Applies the clump optimization policy, slicing if the length is over the threshold
 * @param state - Current state (immer.js)
 * @param guildId - Guild id to apply the policy on
 */
function sliceClumps(state: Interpret, guildId: number): void {
  if (
    isDefined(state.messageClumps[guildId]) &&
    state.messageClumps[guildId].length >= CLUMP_SLICING_THRESHOLD
  ) {
    state.messageClumps[guildId] = state.messageClumps[guildId].slice(
      -CLUMP_SLICED_LENGTH
    );
  }
}
