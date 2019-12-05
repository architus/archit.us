import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";

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

// ? ==================
// ? Ecosystem types
// ? ==================

export type Snowflake = string & { __snowflake__: void };
export type HoarFrost = string & { __id__: void };
export type Id = Snowflake | HoarFrost;
const ID_REGEX = /^[0-9]{7,20}$/g;

const validateId: any = (input: string): boolean =>
  input.match(ID_REGEX) != null;
export const isSnowflake: (input: string) => input is Snowflake = validateId;
export const isHoarFrost: (input: string) => input is HoarFrost = validateId;

/**
 * The type of premium on a user's account. From
 * https://discordapp.com/developers/docs/resources/user#user-object-premium-types
 */
enum PremiumType {
  NitroClassic = 1,
  Nitro = 2
}

/**
 * Discord user type, from https://discordapp.com/developers/docs/resources/user#user-object
 */
export interface User {
  id: Snowflake;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: PremiumType;
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

export type NotificationType = "alert" | "toast";
export type NotificationId = number;
export type NotificationVariant = "success" | "danger" | "warning" | "info";
export interface Notification {
  id: number;
  variant: NotificationVariant;
}
