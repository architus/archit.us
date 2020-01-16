/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable max-classes-per-file */
import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { isDefined } from "./data";
import { TransformerStep } from "./transform";

export class EnumType<A> extends t.Type<A> {
  public readonly _tag: "EnumType" = "EnumType";

  public enumObject!: object;

  public constructor(e: object, name?: string) {
    super(
      name || "enum",
      (u): u is A => Object.values(this.enumObject).some(v => v === u),
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
  "vmax"
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
    either.chain(t.string.validate(u, c), s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d.getTime());
    }),
  a => new Date(a).toISOString()
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
    either.chain(t.string.validate(u, c), s => {
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
    either.chain(t.string.validate(u, c), s => {
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
  Nitro = 2
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

const TUser = t.intersection([
  t.type({
    id: TSnowflake,
    username: t.string,
    discriminator: t.string
  }),
  t.partial({
    avatar: t.string,
    bot: t.boolean,
    system: t.boolean,
    mfa_enabled: t.boolean,
    locale: t.string,
    verified: t.boolean,
    email: t.string,
    flags: t.number,
    premium_type: TPremiumType
  })
]);

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
  refreshIn: t.number
});
export interface Access extends t.TypeOf<typeof TAccess> {}
export const Access = alias(TAccess)<Access>();
export function expiresAt(access: Access): Date {
  return new Date(access.issuedAt + access.expiresIn * 1000);
}

const TPersistentSession = t.type({
  user: User,
  access: Access
});
export interface PersistentSession
  extends t.TypeOf<typeof TPersistentSession> {}
export const PersistentSession = alias(TPersistentSession)<PersistentSession>();

export enum VerificationLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  VeryHigh = 4
}
export const TVerificationLevel = new EnumType<VerificationLevel>(
  VerificationLevel,
  "VerificationLevel"
);

export enum DefaultMessageNotificationLevel {
  AllMessages = 0,
  OnlyMentions = 1
}
export const TDefaultMessageNotificationLevel = new EnumType<
  DefaultMessageNotificationLevel
>(DefaultMessageNotificationLevel, "DefaultMessageNotificationLevel");

export enum ExplicitContentFilter {
  Disabled = 0,
  MembersWithoutRoles = 1,
  AllMembers = 2
}
export const TExplicitContentFilter = new EnumType<ExplicitContentFilter>(
  ExplicitContentFilter,
  "ExplicitContentFilter"
);

export enum MfaLevel {
  None = 0,
  Elevated = 1
}
export const TMfaLevel = new EnumType<MfaLevel>(MfaLevel, "MfaLevel");

export enum PremiumTier {
  None = 0,
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3
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
  PublicDisabled = "PUBLIC_DISABLED"
}
export const TGuildFeature = new EnumType<GuildFeature>(
  GuildFeature,
  "GuildFeature"
);

const TGuild = t.intersection([
  t.type({
    id: TSnowflake,
    name: t.string,
    // owner_id: TSnowflake,
    // region: t.string,
    // afk_timeout: t.Integer,
    // verification_level: TVerificationLevel,
    // default_message_notifications: TDefaultMessageNotificationLevel,
    // explicit_content_filter: TExplicitContentFilter,
    // // foreign key reference
    // roles: t.array(TSnowflake),
    // // foreign key reference
    // emojis: t.array(TSnowflake),
    features: t.array(t.union([TGuildFeature, t.string])),
    // mfa_level: TMfaLevel,
    // premium_tier: TPremiumTier,
    // preferred_locale: t.string,
    // added fields
    architus_admin: t.boolean,
    has_architus: t.boolean
  }),
  t.partial({
    icon: t.union([t.string, t.null]),
    splash: t.string,
    owner: t.boolean,
    permissions: t.number,
    afk_channel_id: TSnowflake,
    embed_enabled: t.boolean,
    embed_channel_id: TSnowflake,
    application_id: TSnowflake,
    widget_enabled: t.boolean,
    widget_channel_id: TSnowflake,
    system_channel_id: TSnowflake,
    max_presences: t.Integer,
    max_members: t.Integer,
    vanity_url_code: t.string,
    description: t.string,
    banner: t.string,
    premium_subscription_count: t.Integer
  })
]);
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

/**
 * Represents [message id, raw emoji] tuple
 */
export type SerializedMockReaction = [number, string];

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
 * Common error contents with message and optional more detailed object
 * object/string
 */
export type ErrorContents = {
  readonly error?: object | string;
  readonly message: string;
};
