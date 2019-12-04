import { isDefined } from "./data";
import { Nil } from "./types";

// Type declarations
export interface None {
  readonly _tag: "None";
}
export interface Some<T> {
  readonly _tag: "Some";
  readonly value: T;
}
export type Option<T> = None | Some<T>;

/**
 * Represents the singleton None object that represents no value in an Option<T>
 */
export const None: None = {
  _tag: "None"
};

/**
 * Constructs a new instance of a Some<T> object in an Option<T>
 *
 * @param value The value to wrap
 */
export function Some<T>(value: T): Option<T> {
  return {
    _tag: "Some",
    value
  };
}

/**
 * Constructs a new instance of a Some<T> or None object in an Option<T>, depending
 * on whether value was nil or not
 *
 * @param value The nullable value to wrap
 */
export function Option<T>(value: T | Nil): Option<T> {
  if (isDefined(value)) return Some(value);
  else return None;
}

/**
 * Returns true if the option is none, false otherwise
 *
 * @param option The option to examine
 */
Option.isNone = function<T>(option: Option<T>): option is None {
  return option._tag === None._tag;
};

/**
 * Returns true if the option is none, false otherwise
 *
 * @param option The option to examine
 */
Option.has = function<T>(option: Option<T>): option is Some<T> {
  return option._tag === "Some";
};

/**
 * Maps an option if it is of type Some(A) to Some(B), otherwise leaving it as None
 *
 * @param option The option to use to map
 * @param func The mapping function that is invoked to transform the original option's
 * inner value to a value of B if and only if the original option is not None
 */
Option.map = function<A, B>(option: Option<A>, func: (a: A) => B): Option<B> {
  if (Option.isNone(option)) return None;
  else return Some(func(option.value));
};

/**
 * Flat maps an option Option<A> to another option Option<B>, using a mapping function
 * that itself returns an Option<B>
 *
 * @param option The option to use to map
 * @param func The mapping function that is invoked to transform the original option's
 * inner value to a new Option<B> if and only if the original option is not None
 */
Option.flatMap = function<A, B>(
  option: Option<A>,
  func: (a: A) => Option<B>
): Option<B> {
  if (Option.isNone(option)) return None;
  else return func(option.value);
};

/**
 * Maps an option if it is of type Some(A) to Some(B), otherwise leaving it as None
 *
 * @param option The option to unwrap
 * @param defaultValue The value to use if option is None
 */
Option.getOrDefault = function<A>(option: Option<A>, defaultValue: A): A {
  if (Option.isNone(option)) return defaultValue;
  else return option.value;
};

/**
 * Unwraps an option only if it is an instance of Some<T>
 */
Option.get = function<T>(option: Some<T>): T {
  return option.value;
};

/**
 * Unwraps an option to its value if it is an instance of Some<T>, or null otherwise
 */
Option.unwrap = function<T>(option: Option<T>): T | null {
  if (Option.isNone(option)) return null;
  else return option.value;
};
