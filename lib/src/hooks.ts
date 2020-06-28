import { useEffect, useState } from "react";

/**
 * Runs an effect hook once, simulating `componentDidMount`/`componentWillUnmount`
 * @param effectFunc - same as `useEffect(effectFunc)`
 */
export function useEffectOnce(effectFunc: () => void | (() => void)): void {
  useEffect(effectFunc, []);
}

/**
 * Returns true only if the current render
 * (useful for ensuring SSR/client hydration symmetry)
 */
export function useInitialRender(): boolean {
  const [isInitial, setIsInitial] = useState(true);
  useEffectOnce(() => setIsInitial(false));
  return isInitial;
}
