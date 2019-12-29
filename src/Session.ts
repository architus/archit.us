import { useSelector } from "Utility";

/**
 * Utility hook to determine the status of the current session.
 *
 * @returns a tuple containing [isSignedIn, isSigningIn]
 */
export function useSessionStatus(): [boolean, boolean] {
  return useSelector(store => {
    const {
      session: { state }
    } = store;
    const isSigningIn = state !== "none";
    const isSignedIn = state === "authenticated" || state === "gateway";
    return [isSignedIn, isSigningIn];
  });
}
