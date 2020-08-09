export type Nil = null | undefined;
export type Predicate<A> = (arg: A) => boolean;
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
export type MutableArray<T> = T extends readonly (infer I)[] ? I[] : never;

export type MergeProps<A, B> = A & Omit<B, keyof A>;
