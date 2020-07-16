import { Option, Some, None } from "./option";
import { isDefined, isNil } from "./utility";

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

export type RawDimension = string | number | Dimension;
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

/**
 * Adds a missing unit to a dimension string
 * @deprecated use `parseDimension(dimension)`
 * @param dimension - The raw dimension text ot number to process
 */
export function addMissingUnit(dimension: RawDimension): Dimension {
  const parsed: Option<Dimension> = parseDimension(dimension);
  return parsed.getOrElse({ unit: "px", amount: 0 });
}

const DIMENSION_REGEX = /^([0-9]*\.?[0-9]*)([A-Za-z%]+)$/;

/**
 * Parses a raw dimension object (string or number) into a Some<Dimension> if successful,
 * else None
 * @param rawDimension - The string or number value to parse and validate
 */
export function parseDimension(rawDimension: RawDimension): Option<Dimension> {
  if (typeof rawDimension === "object") {
    if (isDimension(rawDimension)) {
      return Some(rawDimension);
    }

    return None;
  }

  if (typeof rawDimension === "number")
    return Some({ unit: "px", amount: rawDimension });

  const parsed = Number(rawDimension);
  if (isNaN(parsed)) {
    // Attempt to parse as a dimension string with unit
    const matches = DIMENSION_REGEX.exec(rawDimension);
    if (isNil(matches)) {
      return None;
    }
    const amount: number = Number.parseFloat(matches[1]);
    const unit: string = matches[2];
    // Validate the unit
    if (dimensionUnits.includes(unit)) {
      return Some({ unit: unit as DimensionUnit, amount });
    }
    return None;
  }
  // Preserve type
  return Some({ unit: "px", amount: parsed });
}

/**
 * Formats a dimension object into a CSS-consumable string
 * @param dimension - The source Dimension object to format
 * @param precision - The number of digits of dimension.amount to include in the string
 * (defaults to 3)
 */
export function formatDimension(dimension: Dimension, precision = 3): string {
  return `${dimension.amount.toFixed(precision)}${dimension.unit}`;
}

/**
 * Multiplies a dimension object's amount by the given amount
 * @param dimension - Dimension object
 * @param scalar - Unitless number to multiply the dimension by
 */
export function multiplyDimension(
  dimension: Dimension,
  scalar: number
): Dimension {
  return {
    amount: dimension.amount * scalar,
    unit: dimension.unit,
  };
}
