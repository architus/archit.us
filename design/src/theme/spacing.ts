// Fibonacci-based spacing values
const spacing = {
  atto: "3px",
  femto: "5px",
  pico: "8px",
  nano: "13px",
  micro: "21px",
  milli: "34px",
  centi: "55px",
  kilo: "89px",
  mega: "144px",
  giga: "233px",
  tera: "377px",
  peta: "610px",
  flow: "1rem",
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Selects a static spacing value from the design system,
 * for use in margin/padding
 * @param key - spacing key string
 */
function gapBase(key: SpacingKey): string {
  return spacing[key];
}

/**
 * Attaches getters for each spacing value so that they can be used more ergonomically
 * @param obj - base object to attach
 */
function attachGetters<T>(obj: T): T & typeof spacing {
  const build = (obj as unknown) as Record<keyof typeof spacing, unknown>;
  Object.entries(spacing).forEach(([key, value]) => {
    build[key as keyof typeof spacing] = value;
  });
  return build as T & typeof spacing;
}

export const gap = attachGetters(gapBase);
