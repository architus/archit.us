import { Omitted } from "Utility/types";

export * from "./steps";

export type TransformerStep<TContext = Omitted> = (
  framgnet: string,
  context: TContext
) => string;

/**
 * Composes multiple steps into a single step
 * @param steps - Array of transformer steps
 */
export function makeTransformer<T = {}>(
  steps: TransformerStep<T>[]
): (original: string, context: T) => string {
  return (original: string, context: T): string => {
    let current = original;
    for (const step of steps) {
      current = step(current, context);
    }
    return current;
  };
}
