export type Nil = null | undefined;
export type Predicate<A> = (arg: A) => boolean;
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
