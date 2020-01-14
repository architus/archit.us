/* eslint-disable max-classes-per-file */
import {
  takeOrReplenish,
  includes,
  isNil,
  generateName,
  randomColor,
  randomInt
} from "Utility";
import {
  MockUser,
  User,
  MockMessageClump,
  MockMessage,
  SerializedMockReaction,
  MockReaction,
  Predicate,
  DiscordMockContext,
  TransformMessage,
  DiscordMockCommands
} from "Utility/types";
import { transformReaction } from "Components/DiscordMock/transform";
import { getAvatarUrl } from "Components/UserDisplay";

// ? ==========================
// ? User creation utilities
// ? ==========================

const discriminatorMax = 5;

/**
 * Provisions random discriminators to mock users, ensuring collisions don't occur
 * unless the internal pool becomes depleted
 */
export class DiscriminatorProvisioner {
  private static _instance: DiscriminatorProvisioner | undefined;

  static get instance(): DiscriminatorProvisioner {
    if (isNil(DiscriminatorProvisioner._instance)) {
      DiscriminatorProvisioner._instance = new DiscriminatorProvisioner(
        discriminatorMax
      );
    }
    return DiscriminatorProvisioner._instance;
  }

  private max: number;

  private templatePool: Readonly<Record<number, number>>;

  private currentPool: Record<number, number>;

  constructor(max: number) {
    this.max = max;
    // Initialize template pool and current pool
    this.templatePool = {};
    for (let i = 0; i < max; ++i) {
      (this.templatePool as Record<number, number>)[i] = i;
    }
    this.currentPool = { ...this.templatePool };
  }

  /**
   * Attempts to provision the seed discriminator, trying each other discriminator
   * while increasing the current one (wrapping around), optionally until all
   * have been checked. At that point, the pool is replenished.
   * @param seed - base (random) number to start at
   */
  provision(seed: number): number {
    const { max } = this;
    const initial = seed % max;
    return takeOrReplenish(
      this.currentPool,
      initial,
      key => (key + 1) % max,
      this.templatePool
    );
  }
}

/**
 * Username colors of the default avatar users
 */
export const colors = ["#7e95e5", "#a0adbc", "#43B581", "#FAA61A", "#ef5b5b"];

/**
 * Generates a mock user with a random client Id, discriminator, and username
 * @param guildId - (random) guild id to use as a seed
 */
export function createMockUser(guildId: number): MockUser {
  const id = guildId % 100;
  const mockDiscriminator = DiscriminatorProvisioner.instance.provision(id);
  const mockNameColor = colors[mockDiscriminator];
  const mockUsername = generateName();
  return {
    id: id.toString(),
    username: mockUsername,
    nameColor: mockNameColor,
    discriminator: mockDiscriminator.toString(),
    bot: false
  };
}

const userColor = randomColor(0.5);
const userId = randomInt(120000).toString();

/**
 * Creates the accompanying mock user for a given real user
 * @param base - real user
 */
export function makeMockUser(base: User): MockUser {
  return {
    id: userId,
    discriminator: base.discriminator,
    username: base.username,
    avatarUrl: getAvatarUrl({ user: base }),
    nameColor: userColor,
    bot: false
  };
}

/**
 * Creates the accompanying fake webhook user for a given mock user
 * @param base - real user
 */
export function makeFakeWebhookUser(base: MockUser): MockUser {
  return {
    ...base,
    id: `${base.id}_mock`,
    nameColor: "white",
    bot: true
  };
}

// ? ==========================
// ? Extension class definition
// ? ==========================

export abstract class Extension {
  context: DiscordMockContext;

  commands: DiscordMockCommands;

  constructor(context: DiscordMockContext, commands: DiscordMockCommands) {
    this.context = context;
    this.commands = commands;
  }

  abstract destruct(): void;

  abstract onSend(message: string, id: number): boolean;

  // eslint-disable-next-line class-methods-use-this
  wrapTransform(transform: TransformMessage): TransformMessage {
    return transform;
  }
}

// ? ==========================
// ? Message handling utilities
// ? ==========================

/**
 * Controls unique ID provisioning
 * @remarks
 * only uses even numbers to let the server use odd numbers
 */
export class IdProvisioner {
  private internalCount: number;

  constructor() {
    this.internalCount = 0;
  }

  provision(): number {
    const next = 2 * this.internalCount;
    this.internalCount += 1;
    return next;
  }
}

/**
 * Whether two messsage clumps should be merged together (same sender/AMPM)
 * @param a - The first clump
 * @param b - The second clump
 */
export function shouldMergeClumps(
  a: MockMessageClump,
  b: MockMessageClump
): boolean {
  if (a.sender.id !== b.sender.id) return false;
  const aDate = new Date(a.timestamp);
  const bDate = new Date(b.timestamp);
  return (
    aDate.getHours() === bDate.getHours() &&
    aDate.getMinutes() === bDate.getMinutes()
  );
}

/**
 * Performs a clump merge, returning a new merged clump with the messages of both
 * @param a - The first clump (metadata preserved)
 * @param b - The second clump
 */
export function mergeClumps(
  a: MockMessageClump,
  b: MockMessageClump
): MockMessageClump {
  return {
    // Keep clump A's other properties
    ...a,
    messages: [...a.messages, ...b.messages]
  };
}

/**
 * Initializes a new clump with a single message
 * @param message - Single contained message
 * @param sender - Sender of the message
 */
export function createClump(
  message: MockMessage,
  sender: MockUser
): MockMessageClump {
  return {
    timestamp: Date.now(),
    sender,
    messages: [message]
  };
}

/**
 * Parses a reaction from its network equivalent to the internal representation
 * @param reaction - Incoming network reaction
 */
export function parseReaction(reaction: SerializedMockReaction): MockReaction {
  return {
    emoji: transformReaction(reaction[1]),
    rawEmoji: reaction[1],
    number: 1,
    userHasReacted: false,
    targetId: reaction[0]
  };
}

/**
 * Converts a reaction to its network representation
 * @param messageId - Target message ID
 * @param reaction - Mock reaction object
 */
export function serializeReaction(
  messageId: number,
  reaction: MockReaction
): SerializedMockReaction {
  return [messageId, reaction.rawEmoji];
}

/**
 * Filters a list of reactions by using an id filter predicate function
 * @param reactions - Reactions array
 * @param idFilter - Predicate function
 */
export function filterReactionsById(
  reactions: MockReaction[],
  idFilter: Predicate<number>
): MockReaction[] {
  return reactions.filter(r => idFilter(r.targetId));
}

/**
 * Finds the index of the clump contanining the message with the given id
 * @param clumps - Clumps array to search
 * @param messageId - Target message id
 */
export function containingClumpIndex(
  clumps: MockMessageClump[],
  messageId: number
): number {
  return clumps.findIndex(clump =>
    includes(clump.messages, message => message.id === messageId)
  );
}
