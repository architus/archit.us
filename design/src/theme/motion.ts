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
  {
    speed = TransitionSpeed.Normal,
    important = false,
  }: { speed?: TransitionSpeed; important?: boolean } = {}
): string {
  const suffix = important ? " !important" : "";
  return `
    transition-property: ${properties.join(",")}${suffix};
    transition-timing-function: ${ease}${suffix};
    transition-duration: ${speed}${suffix};
  `;
}
