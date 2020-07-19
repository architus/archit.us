/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable max-classes-per-file */
import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { BoxProps } from "@xstyled/emotion";
import { isDefined } from "./data";
import { TransformerStep } from "./transform";
import { option } from "./option";

export class EnumType<A> extends t.Type<A> {
  public readonly _tag: "EnumType" = "EnumType";

  public enumObject!: object;

  public constructor(e: object, name?: string) {
    super(
      name || "enum",
      (u): u is A => Object.values(this.enumObject).some((v) => v === u),
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity
    );
    this.enumObject = e;
  }
}

export type Nil = null | undefined;
export type Predicate<T> = (arg: T) => boolean;
export type Supplier<T> = () => T;
export type RecordKey = string | number | symbol;
export type Comparator<T> = (a: T, b: T) => number;
export type RawDimension = string | number | Dimension;
export type StyleObject = React.CSSProperties;

export function isDimension(o: unknown): o is Dimension {
  return (
    typeof o === "object" &&
    isDefined(o) &&
    isDefined((o as Dimension).amount) &&
    isDefined((o as Dimension).unit) &&
    typeof (o as Dimension).amount === "number" &&
    typeof (o as Dimension).unit === "string"
  );
}

export type DiscriminateUnion<
  T,
  K extends keyof T,
  V extends T[K]
> = T extends Record<K, V> ? T : never;

export type MapDiscriminatedUnion<
  T extends Record<K, string>,
  K extends keyof T
> = {
  [V in T[K]]: DiscriminateUnion<T, K, V>;
};

// From https://github.com/gcanti/io-ts/issues/149
export type Exact<T, X extends T> = T &
  { [K in Exclude<keyof X, keyof T>]?: never };

export function alias<P extends t.Props, A, O, I>(
  type: t.InterfaceType<P, A, O, I>
): <
  AA extends Exact<A, AA>,
  OO extends Exact<O, OO> = O,
  II extends Exact<I, II> = I
>() => t.InterfaceType<P, AA, OO, II>;
export function alias<A, O, I>(
  type: t.Type<A, O, I>
): <
  AA extends Exact<A, AA>,
  OO extends Exact<O, OO> = O,
  II extends Exact<I, II> = I
>() => t.Type<AA, OO, II>;
export function alias<A, O, I>(
  type: t.Type<A, O, I>
): <
  AA extends Exact<A, AA>,
  OO extends Exact<O, OO> = O,
  II extends Exact<I, II> = I
>() => t.Type<AA, OO, II> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): any => type as any;
}

export type MakeOptional<B extends {}, P extends keyof B> = Omit<B, P> &
  Partial<Pick<B, P>>;

export type MakeRequired<B extends {}, P extends keyof B> = Partial<
  Omit<B, P>
> &
  Pick<B, P>;

/**
 * Marks a type that can be omitted in call signatures
 */
export type Omitted = void;

/**
 * Gets an empty object if omitted
 */
export type OrEmpty<T> = T extends Omitted ? {} : T;

/**
 * Discriminates between T being void or any other type. If `Omitted`, then
 * returns empty object
 */
export type ConditionalWrap<K extends string, T> = T extends Omitted
  ? {}
  : { [k in K]: T };

const _dimensionUnits = [
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "vw",
  "vh",
  "vmin",
  "vmax",
] as const;

/**
 * CSS spatial units
 *
 * @remarks
 * The units come from the {@link https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units | mozilla list of CSS units}
 */
export type DimensionUnit = typeof _dimensionUnits[number];

/**
 * CSS spatial units
 *
 * @remarks
 * The units come from the {@link https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units | mozilla list of CSS units}
 */
export const dimensionUnits = _dimensionUnits as readonly string[];

/**
 * Represents a CSS dimension, with possible units derived from DimensionUnit
 */
export interface Dimension {
  amount: number;
  unit: DimensionUnit;
}

export const TimeFromString = new t.Type<number, string, unknown>(
  "TimeFromString",
  (u): u is number => typeof u === "number",
  (u, c) =>
    either.chain(t.string.validate(u, c), (s) => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d.getTime());
    }),
  (a) => new Date(a).toISOString()
);

/**
 * Represents a NodeJS module with HMR enabled
 */
type HmrModule = NodeJS.Module & {
  hot: { accept: (path: string, cb: () => void) => void };
};

/**
 * Determines whether the given module has HMR enabled (`module.hot`
 * is defined)
 * @param m - NodeJS global module reference
 */
export function isHot(m: NodeJS.Module): m is HmrModule {
  return isDefined((m as HmrModule).hot);
}

// ? ==================
// ? Ecosystem types
// ? ==================

/**
 * Discord Entity snowflake-format
 *
 * @remarks
 * The format comes from {@link https://discordapp.com/developers/docs/reference#snowflakes | the Discord API docs}
 */
export type Snowflake = string & { __snowflake__: void };

/**
 * Architus Entity snowflake-format
 *
 * @remarks
 * The format comes from {@link https://docs.archit.us/internal/api-reference/#hoar-frost | the Architus docs}
 */
export type HoarFrost = string & { __id__: void };
export type Id = Snowflake | HoarFrost;
const ID_REGEX = /^[0-9]{7,20}$/g;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateId: any = (input: string): boolean =>
  input.match(ID_REGEX) != null;
export const isSnowflake: (input: string) => input is Snowflake = validateId;
export const isHoarFrost: (input: string) => input is HoarFrost = validateId;

/**
 * Discord Entity snowflake-format
 *
 * @remarks
 * The format comes from {@link https://discordapp.com/developers/docs/reference#snowflakes | the Discord API docs}
 */
export const TSnowflake = new t.Type<Snowflake, string, unknown>(
  "snowflake",
  (u): u is Snowflake =>
    isDefined(u) && typeof u === "string" && isSnowflake(u),
  (u, c) =>
    either.chain(t.string.validate(u, c), (s) => {
      if (isSnowflake(s)) return t.success(s);
      return t.failure(u, c);
    }),
  t.identity
);

/**
 * Architus Entity snowflake-format
 *
 * @remarks
 * The format comes from {@link https://docs.archit.us/internal/api-reference/#hoar-frost | the Architus docs}
 */
export const THoarFrost = new t.Type<HoarFrost, string, unknown>(
  "hoarfrost",
  (u): u is HoarFrost =>
    isDefined(u) && typeof u === "string" && isHoarFrost(u),
  (u, c) =>
    either.chain(t.string.validate(u, c), (s) => {
      if (isHoarFrost(s)) return t.success(s);
      return t.failure(u, c);
    }),
  t.identity
);

/**
 * The type of premium on a user's account.
 *
 * @remarks
 * The format comes from {@link https://discordapp.com/developers/docs/resources/user#user-object-premium-types | the Discord API docs}
 */
export enum PremiumType {
  NitroClassic = 1,
  Nitro = 2,
}

/**
 * The type of premium on a user's account.
 *
 * @remarks
 * The format comes from {@link https://discordapp.com/developers/docs/resources/user#user-object-premium-types | the Discord API docs}
 */
export const TPremiumType = new EnumType<PremiumType>(
  PremiumType,
  "PremiumType"
);

const TUser = t.interface({
  id: TSnowflake,
  username: t.string,
  discriminator: t.string,
  avatar: option(t.string),
  bot: option(t.boolean),
  system: option(t.boolean),
  mfa_enabled: option(t.boolean),
  locale: option(t.string),
  verified: option(t.boolean),
  email: option(t.string),
  flags: option(t.number),
  premium_type: option(TPremiumType),
});

/**
 * Discord user type
 *
 * @remarks
 * The format comes from {@link https://discordapp.com/developers/docs/resources/user#user-object | the Discord API docs}
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends t.TypeOf<typeof TUser> {}

/**
 * Discord user type
 *
 * @remarks
 * The format comes from {@link https://discordapp.com/developers/docs/resources/user#user-object | the Discord API docs}
 */
export const User = alias(TUser)<User>();

const TAccess = t.type({
  issuedAt: TimeFromString,
  expiresIn: t.number,
  refreshIn: t.number,
});
export interface Access extends t.TypeOf<typeof TAccess> {}
export const Access = alias(TAccess)<Access>();
export function expiresAt(access: Access): Date {
  return new Date(access.issuedAt + access.expiresIn * 1000);
}

const TPersistentSession = t.type({
  user: User,
  access: Access,
});
export interface PersistentSession
  extends t.TypeOf<typeof TPersistentSession> {}
export const PersistentSession = alias(TPersistentSession)<PersistentSession>();

export enum VerificationLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  VeryHigh = 4,
}
export const TVerificationLevel = new EnumType<VerificationLevel>(
  VerificationLevel,
  "VerificationLevel"
);

export enum DefaultMessageNotificationLevel {
  AllMessages = 0,
  OnlyMentions = 1,
}
export const TDefaultMessageNotificationLevel = new EnumType<
  DefaultMessageNotificationLevel
>(DefaultMessageNotificationLevel, "DefaultMessageNotificationLevel");

export enum ExplicitContentFilter {
  Disabled = 0,
  MembersWithoutRoles = 1,
  AllMembers = 2,
}
export const TExplicitContentFilter = new EnumType<ExplicitContentFilter>(
  ExplicitContentFilter,
  "ExplicitContentFilter"
);

export enum MfaLevel {
  None = 0,
  Elevated = 1,
}
export const TMfaLevel = new EnumType<MfaLevel>(MfaLevel, "MfaLevel");

export enum PremiumTier {
  None = 0,
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3,
}
export const TPremiumTier = new EnumType<PremiumTier>(
  PremiumTier,
  "PremiumTier"
);

export enum GuildFeature {
  InviteSplash = "INVITE_SPLASH",
  VipRegions = "VIP_REGIONS",
  VanityUrl = "VANITY_URL",
  Verified = "VERIFIED",
  Partnered = "PARTNERED",
  Public = "PUBLIC",
  Commerce = "COMMERCE",
  News = "NEWS",
  Discoverable = "DISCOVERABLE",
  Featurable = "FEATURABLE",
  AnimatedIcon = "ANIMATED_ICON",
  Banner = "BANNER",
  EnabledDiscoverableBefore = "ENABLED_DISCOVERABLE_BEFORE",
  MemberListDisabled = "MEMBER_LIST_DISABLED",
  MoreEmoji = "MORE_EMOJI",
  PublicDisabled = "PUBLIC_DISABLED",
}
export const TGuildFeature = new EnumType<GuildFeature>(
  GuildFeature,
  "GuildFeature"
);

const TGuild = t.interface({
  id: TSnowflake,
  name: t.string,
  architus_admin: t.boolean,
  owner: t.boolean,
  permissions: t.number,
  features: t.array(t.union([TGuildFeature, t.string])),
  has_architus: t.boolean,
  icon: option(t.string),
  splash: option(t.string),
  region: option(t.array(t.string)),
  afk_timeout: option(t.number),
  max_members: option(t.number),
  banner: option(t.string),
  description: option(t.string),
  mfa_level: option(TMfaLevel),
  premium_tier: option(TPremiumTier),
  premium_subscription_count: option(t.number),
  preferred_locale: option(t.string),
  member_count: option(t.number),
});
export interface Guild extends t.TypeOf<typeof TGuild> {}
export const Guild = alias(TGuild)<Guild>();

// Mock Discord types

export interface MockReaction {
  emoji: string;
  number: number;
  userHasReacted: boolean;
  rawEmoji: string;
  targetId: number;
}

export type SerializedMockReaction = { emoji: string; targetsUser: boolean };

export interface MockMessage {
  id: number;
  content: string;
  edited: boolean;
  reactions: MockReaction[];
}

export interface MockUser {
  id: string;
  discriminator: string;
  username: string;
  nameColor: string;
  bot: boolean;
  avatarUrl?: string;
  verified: boolean;
}

export interface MockMessageClump {
  timestamp: number;
  sender: MockUser;
  messages: MockMessage[];
}

export interface MockMessageSet {
  messages: string[];
  setup?: string[];
  cleanup?: string[];
}

export interface DiscordMockContext {
  thisUser: MockUser;
  users: Record<number, MockUser>;
  architusUser: MockUser;
  guildId: number;
  allowedCommands?: string[];
}

export interface MockReactionContext {
  clumpIndex: number;
  id: number;
  reaction: MockReaction;
}

export type TransformMessage = (
  message: MockMessage,
  sender: MockUser,
  context: DiscordMockContext,
  customTransformer?: TransformerStep
) => { result: string; mentions: string[] };

export interface DiscordMockCommands {
  sendMessage: (message: string, sender: MockUser) => void;
  deleteMessage: (id: number) => void;
}

/**
 * Common error contents with human-readable message and optional more detailed
 * technical error string
 */
export type ErrorContents = {
  readonly error?: string;
  readonly message: string;
};

export enum LogEvents {
  GuildUpdate = 1,
  ChannelCreate = 10,
  ChannelUpdate = 11,
  ChannelDelete = 12,
  ChannelOverwriteCreate = 13,
  ChannelOverwriteUpdate = 14,
  ChannelOverwriteDelete = 15,
  MemberKick = 20,
  MemberPrune = 21,
  MemberBanAdd = 22,
  MemberBanRemove = 23,
  MemberUpdate = 24,
  MemberRoleUpdate = 25,
  MemberMove = 26,
  MemberDisconnect = 27,
  BotAdd = 28,
  RoleCreate = 30,
  RoleUpdate = 31,
  RoleDelete = 32,
  InviteCreate = 40,
  InviteUpdate = 41,
  InviteDelete = 42,
  WebhookCreate = 50,
  WebhookUpdate = 51,
  WebhookDelete = 52,
  EmojiCreate = 60,
  EmojiUpdate = 61,
  EmojiDelete = 62,
  MessageDelete = 72,
  MessageBulkDelete = 73,
  MessagePin = 74,
  MessageUnpin = 75,
  IntegrationCreate = 80,
  IntegrationUpdate = 81,
  IntegrationDelete = 82,
  MessageSend = 3001,
  MessageEdit = 3002,
  ReactionAdd = 3100,
  ReactionRemove = 3101,
  AutoResponseAdd = 3200,
  AutoResponseRemove = 3201,
  AutoResponseEdit = 3202,
  AutoResponseTrigger = 3203,
  LogRevert = 3300,
  LogRollback = 3301,
  EmojiManagerTrigger = 3400,
  EmojiManagerCreate = 3401,
  EmojiManagerDelete = 3402,
  EmojiManagerExchange = 3403,
}

export type BaseGatewayPacket = t.TypeOf<typeof BaseGatewayPacket>;
export const BaseGatewayPacket = t.type({
  _id: t.number,
});

export enum AutoResponseTriggerMode {
  Punctuated = "punctuated",
  Naive = "naive",
  Regex = "regex",
}
export const TAutoResponseTriggerMode = new EnumType<AutoResponseTriggerMode>(
  AutoResponseTriggerMode,
  "AutoResponseTriggerMode"
);

export type AutoResponse = t.TypeOf<typeof AutoResponse>;
export const AutoResponse = t.type({
  id: THoarFrost,
  trigger: t.string,
  response: t.string,
  authorId: option(TSnowflake),
  guildId: TSnowflake,
  triggerRegex: t.string,
  triggerPunctuation: t.array(t.string),
  responseTokens: t.array(t.tuple([t.string, t.string])),
  count: t.number,
  mode: TAutoResponseTriggerMode,
});

/**
 * Contains the common properties between `Member` and `User`, additionally
 * used to type methods that can accept both.
 */
export type UserLike = {
  [K in keyof User & keyof Member]: User[K] | Member[K];
} &
  // One of username or name must be defined
  // Username: from User
  // Name: from Member
  ({ username: string } | { name: string });

export type NormalizedUserLike = {
  [K in keyof User & keyof Member]: User[K] | Member[K];
} & {
  username: string;
};

/**
 * Normalizes a UserLike (Member or User) to have a predictable shape
 * @param userLike - Source user like (member or user)
 */
export function normalizeUserLike(userLike: UserLike): NormalizedUserLike {
  return {
    id: userLike.id,
    discriminator: userLike.discriminator,
    avatar: userLike.avatar,
    username: isDefined((userLike as { username: string | Nil }).username)
      ? (userLike as { username: string }).username
      : (userLike as { name: string }).name,
  };
}

export type WithBoxProps<P> = P & Omit<BoxProps, keyof P>;

export type Member = t.TypeOf<typeof Member>;
export const Member = t.type({
  id: TSnowflake,
  name: t.string,
  discriminator: t.string,
  joined_at: TimeFromString, // ISO 8601
  avatar: option(t.string),
  color: option(t.string), // hex color
  nick: option(t.string),
  roles: t.array(TSnowflake), // foreign key references
});

export type Role = t.TypeOf<typeof Role>;
export const Role = t.type({});

export type Channel = t.TypeOf<typeof Channel>;
export const Channel = t.type({});
