/**
 * Default easing function
 */
export const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/**
 * Speed of a given transition
 */
export enum TransitionSpeed {
  Fast = "0.125s",
  Normal = "0.2s",
  Slow = "0.4s",
}

/**
 * Convenience function to build a base transition **block** for the given properties
 * @param properties - transition properties
 */
export function transition(
  properties: string[],
  speed: TransitionSpeed = TransitionSpeed.Normal
): string {
  return `
    transition-property: ${properties.join(",")};
    transition-timing-function: ${ease};
    transition-duration: ${speed};
  `;
}
