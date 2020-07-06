/**
 * Default easing function
 */
export const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/**
 * Easing function go go slightly further at the end and go back
 */
export const easeOutBack = "cubic-bezier(0.175, 0.9, 0.3, 1.065)";

/**
 * Speed of a given transition
 */
export enum TransitionSpeed {
  Fast = 125,
  Normal = 200,
  Slow = 400,
}

/**
 * Convenience function to build a base transition **block** for the given properties
 * @param properties - transition properties
 */
export function transition(
  properties: string[],
  {
    speed = TransitionSpeed.Normal,
    important = false,
  }: { speed?: TransitionSpeed; important?: boolean } = {}
): string {
  const suffix = important ? " !important" : "";
  return `
    transition-property: ${properties.join(",")}${suffix};
    transition-timing-function: ${ease}${suffix};
    transition-duration: ${speed}ms${suffix};
  `;
}
