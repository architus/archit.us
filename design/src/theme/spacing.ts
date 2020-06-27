// Fibonacci-based spacing values
const spacing = {
  atto: 3,
  femto: 5,
  pico: 8,
  nano: 13,
  micro: 21,
  milli: 34,
  centi: 55,
  kilo: 89,
  mega: 144,
  giga: 233,
  tera: 377,
  peta: 610,
  flow: "1rem",
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Selects a static spacing value from the design system,
 * for use in margin/padding
 * @param key - spacing key string
 */
export function gap(key: SpacingKey): string {
  const value = spacing[key];
  return typeof value === "number" ? `${value}px` : value;
}
