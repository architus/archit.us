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

const animationDefinitions = {
  rotate: `
    100% {
      transform: rotate(360deg);
    }
  `,
  spinnerDash: `
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  `,
  shimmer: `
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  `,
  fadeIn: `
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `,
};

export type AnimationKey = keyof typeof animationDefinitions;

/**
 * Mixin used to create scoped keyframes
 * @param key - animation content key
 * @param name - name of keyframes
 */
export function animation(key: AnimationKey, name?: string): string {
  return `
    @keyframes ${name ?? key} {
      ${animationDefinitions[key]}
    }
  `;
}
