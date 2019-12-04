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
