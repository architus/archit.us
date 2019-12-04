export type Nil = null | undefined;
export type Predicate<T> = (arg: T) => boolean;
export type Supplier<T> = () => T;
export type RecordKey = string | number | symbol;
export type Comparator<T> = (a: T, b: T) => number;
