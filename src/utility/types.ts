import React from "react";
import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { isDefined } from "Utility";

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
export type RawDimension = string | number;

const _dimensionUnits = <const>[
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
];
/**
 * Units from
 * https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
 */
export type DimensionUnit = typeof _dimensionUnits[number];
/**
 * Units from
 * https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
 */
export const dimensionUnits = _dimensionUnits as readonly string[];

/**
 * Represents a CSS dimension, with possible units derived from DimensionUnit
 */
export interface Dimension {
  amount: number;
  unit: DimensionUnit;
}

export const DateFromString = new t.Type<Date, string, unknown>(
  "DateFromString",
  (u): u is Date => u instanceof Date,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
    }),
  a => a.toISOString()
);

// ? ==================
// ? Ecosystem types
// ? ==================

/**
 * Discord Entity snowflake-format
 *
 * @see https://discordapp.com/developers/docs/reference#snowflakes
 */
export type Snowflake = string & { __snowflake__: void };
/**
 * Architus Entity snowflake-format
 *
 * @see https://docs.archit.us/internal/api-reference/#hoar-frost
 */
export type HoarFrost = string & { __id__: void };
export type Id = Snowflake | HoarFrost;
const ID_REGEX = /^[0-9]{7,20}$/g;

const validateId: any = (input: string): boolean =>
  input.match(ID_REGEX) != null;
export const isSnowflake: (input: string) => input is Snowflake = validateId;
export const isHoarFrost: (input: string) => input is HoarFrost = validateId;
/**
 * Discord Entity snowflake-format
 *
 * @see https://discordapp.com/developers/docs/reference#snowflakes
 */
export const TSnowflake = new t.Type<Snowflake, string, unknown>(
  "snowflake",
  (u): u is Snowflake =>
    isDefined(u) && typeof u === "string" && isSnowflake(u),
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      if (isSnowflake(s)) return t.success(s);
      else return t.failure(u, c);
    }),
  t.identity
);
/**
 * Architus Entity snowflake-format
 *
 * @see https://docs.archit.us/internal/api-reference/#hoar-frost
 */
export const THoarFrost = new t.Type<HoarFrost, string, unknown>(
  "hoarfrost",
  (u): u is HoarFrost =>
    isDefined(u) && typeof u === "string" && isHoarFrost(u),
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      if (isHoarFrost(s)) return t.success(s);
      else return t.failure(u, c);
    }),
  t.identity
);

/**
 * The type of premium on a user's account.
 *
 * @see https://discordapp.com/developers/docs/resources/user#user-object-premium-types
 */
export enum PremiumType {
  NitroClassic = 1,
  Nitro = 2
}
/**
 * The type of premium on a user's account.
 *
 * @see https://discordapp.com/developers/docs/resources/user#user-object-premium-types
 */
export const TPremiumType = t.type({
  fruit: new EnumType<PremiumType>(PremiumType, "PremiumType"),
  quatity: t.number
});

/**
 * Discord user type
 *
 * @see https://discordapp.com/developers/docs/resources/user#user-object
 */
export type User = t.TypeOf<typeof TUser>;
/**
 * Discord user type
 *
 * @see https://discordapp.com/developers/docs/resources/user#user-object
 */
export const TUser = t.intersection([
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
 * Represents archit.us session access and expiration metadata
 *
 * @see https://docs.archit.us/internal/api-reference/auth/
 */
export type Access = t.TypeOf<typeof TAccess>;
/**
 * Represents archit.us session access and expiration metadata
 *
 * @see https://docs.archit.us/internal/api-reference/auth/
 */
export const TAccess = t.type({
  token: t.string,
  expiresAt: t.union([DateFromString, t.null])
});

export type NotificationType = "alert" | "toast";
export type NotificationId = number;
export type NotificationVariant = "success" | "danger" | "warning" | "info";
export interface Notification {
  readonly id: number;
  readonly variant: NotificationVariant;
  readonly message: React.ReactNode;
}

export interface ApiError {
  readonly message: string;
  readonly error?: object | string;
}
