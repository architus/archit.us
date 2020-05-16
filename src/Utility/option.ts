/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import * as t from "io-ts";
import { isRight, Either, either, right } from "fp-ts/lib/Either";
import { isDefined, isNil } from "./data";
import { Nil, Predicate } from "./types";

/**
 * Provides a runtime type wrapper around the given type, using None if the type is null or undefined
 * @param type - Underlying runtime type
 * @param preferNull - Whether to prefer null when encoding a None Option<A> to O | Nil
 */
export function option<T extends t.Mixed>(
  type: T,
  preferNull = true
): t.Type<Option<t.TypeOf<T>>, t.OutputOf<T> | Nil, unknown> {
  return new t.Type<Option<t.TypeOf<T>>, t.OutputOf<T> | Nil, unknown>(
    `Option<${type.name}>`,
    (u: unknown): u is Option<t.TypeOf<T>> => {
      if (isNil(u)) return true;
      return type.is(u);
    },
    (u: unknown, c: t.Context) => {
      if (isNil(u)) return right(None);
      const decodeResult = type.validate(u, c);
      return either.chain(
        decodeResult,
        (a: t.TypeOf<T>): Either<t.Errors, Option<t.TypeOf<T>>> =>
          right(Some(a))
      );
    },
    (a: Option<t.TypeOf<T>>): t.OutputOf<T> | Nil => {
      const outputOption = a.map(type.encode);
      return preferNull ? outputOption.orNull() : outputOption.orUndefined();
    }
  );
}

export type Unwrap<T> = T extends Option<infer K> ? K : T;

export interface OptionLike<A> {
  /**
   * Whether the option is `None`
   * **Note: does not act as a type guard**
   */
  fastIsEmpty: boolean;

  /**
   * Whether the option is `Some(...)`
   * **Note: does not act as a type guard**
   */
  fastIsDefined: boolean;

  /**
   * Whether the option is `None`
   */
  isEmpty(): this is NoneType;

  /**
   * Whether the option is `Some(...)`
   */
  isDefined(): this is SomeType<A>;

  /**
   * Gets the inner value of the option if it is defined, else `null`
   */
  orNull(): A | null;

  /**
   * Gets the inner value of the option if it is defined, else `undefined`
   */
  orUndefined(): A | undefined;

  /**
   * Gets the value of the Option, using the default value given if the option itself is
   * None
   */
  getOrElse(_: A): A;

  /**
   * Maps the option if it is of type Some(A) to Some(B), otherwise leaving it as None
   *
   * @param func - The mapping function that is invoked to transform this option's inner
   * value to a value of B if and only if the original option is not None
   */
  map<B>(func: (_: A) => B): OptionLike<B>;

  /**
   * Applies a filter function if this option is defined, resulting in the same option if
   * it passes and returning None if it fails. If it wasn't defined, then it remains None
   * and the filter function is not invoked
   * @param func - The filter function to use if the option is defined
   */
  filter(func: Predicate<A>): OptionLike<A>;

  /**
   * Flat maps the option to another option Option<B>, using a mapping function that
   * itself returns an Option<B>
   * @param func - The mapping function that is invoked to transform this option's inner
   * value to a new Option<B> if and only if the original option is not None
   */
  flatMap<B>(func: (_: A) => OptionLike<B>): OptionLike<B>;

  /**
   * Flat maps the option to another option Option<B>, using a mapping function that
   * itself returns a nullable type
   * @param func - The mapping function that is invoked to transform this option's inner
   * value to a new value B | Nil if and only if the original option is not None
   */
  flatMapNil<B>(func: (_: A) => B | Nil): OptionLike<B>;

  /**
   * Allows for conditional branching and value resolution depending on the value of
   * the option
   * @param m - The matcher object to apply to the state of the Option
   */
  match<B>(m: Matcher<A, B>): B;

  /**
   * Invokes a callback if the internal value is defined, otherwise does nothing
   * @param func - The callback function to call if the option's value is defined
   * @returns The original option
   */
  forEach(func: (_: A) => void): OptionLike<A>;

  /**
   * Compares the two options, performing a shallow equality on their real values
   * (if defined), unless a custom equality function is given
   * @param other - Other option to perform equality check against
   * @param compare - Optional custom value equality function
   */
  equals(other: Option<A>, compare?: (left: A, right: A) => boolean): boolean;
}

interface ValuedOption<A> {
  readonly get: A;
}

/**
 * Represents a value that either may exist or may not. To determine whether the value exists,
 * use `option.isEmpty`.
 */
export abstract class Option<A> implements OptionLike<A> {
  abstract isEmpty(): this is NoneType;

  abstract isDefined(): this is SomeType<A>;

  abstract fastIsEmpty: boolean;

  abstract fastIsDefined: boolean;

  abstract orNull(): A | null;

  abstract orUndefined(): A | undefined;

  abstract getOrElse<B = A>(_: B): A | B;

  abstract map<B>(_: (_: A) => B): Option<B>;

  abstract filter(_: Predicate<A>): Option<A>;

  abstract flatMap<B>(_: (_: A) => Option<B>): Option<B>;

  abstract flatMapNil<B>(_: (_: A) => B | Nil): Option<B>;

  abstract match<B>(m: Matcher<A, B>): B;

  abstract forEach(_: (_: A) => void): Option<A>;

  abstract equals(
    other: Option<A>,
    compare?: (left: A, right: A) => boolean
  ): boolean;

  /**
   * Constructs a new instance of a Some<T> or None object in an Option<T>, depending
   * on whether value was nil or not
   * @param value - The nullable value to wrap
   */
  static from<A>(value: A | Nil): Option<A> {
    if (isDefined(value)) return Some(value);
    return None;
  }

  /**
   * Conditionally creates an Option based on some condition value
   * @param cond - Whether to initialize the option as `Some({})` (if `true`)
   * or `None` if `false`
   */
  static if(cond: boolean): Option<{}> {
    if (cond) return Some({});
    return None;
  }

  /**
   * Drops an either into an option
   */
  static drop<A>(e: Either<unknown, A>): Option<A> {
    if (isRight(e)) return Some(e.right);
    return None;
  }

  /**
   * Merges two options together, creating an option of their tuple iff both are
   * defined
   * @param op2 - Option A
   * @param op1 - Option B
   */
  static merge<A, B>(op1: Option<A>, op2: Option<B>): Option<[A, B]> {
    if (op1.isDefined() && op2.isDefined()) return Some([op1.get, op2.get]);
    return None;
  }
}

export interface Matcher<A, B> {
  Some: (_: A) => B;
  None: () => B;
}

export class SomeType<A> extends Option<A> implements ValuedOption<A> {
  fastIsDefined = true;

  fastIsEmpty = false;

  _value: A;

  constructor(value: A) {
    super();
    this._value = value;
  }

  isDefined(): this is SomeType<A> {
    return true;
  }

  isEmpty(): this is NoneType {
    return false;
  }

  get get(): A {
    return this._value;
  }

  orNull(): A | null {
    return this._value;
  }

  orUndefined(): A | undefined {
    return this._value;
  }

  getOrElse<B>(_: B): A | B {
    return this._value;
  }

  map<B>(_: (_: A) => B): Option<B> {
    return Some(_(this._value));
  }

  filter(_: Predicate<A>): Option<A> {
    const result = _(this._value);
    return result ? this : None;
  }

  flatMap<B>(_: (_: A) => Option<B>): Option<B> {
    return _(this._value);
  }

  flatMapNil<B>(_: (_: A) => B | Nil): Option<B> {
    const result: B | Nil = _(this._value);
    if (isNil(result)) return None;
    return Some(result);
  }

  match<B>(m: Matcher<A, B>): B {
    return m.Some(this._value);
  }

  forEach(_: (_: A) => void): Option<A> {
    _(this._value);
    return this;
  }

  equals(other: Option<A>, compare?: (left: A, right: A) => boolean): boolean {
    if (!other.isDefined()) return false;
    if (isDefined(compare)) return compare(this._value, other._value);
    return this._value === other._value;
  }
}

export class NoneType extends Option<never> {
  private static _instance: NoneType | undefined = undefined;

  private constructor() {
    super();
  }

  public static get instance(): NoneType {
    if (isNil(NoneType._instance)) {
      NoneType._instance = new NoneType();
    }
    return NoneType._instance;
  }

  fastIsDefined = false;

  fastIsEmpty = true;

  isDefined(): this is SomeType<never> {
    return false;
  }

  isEmpty(): this is NoneType {
    return true;
  }

  orNull(): never | null {
    return null;
  }

  orUndefined(): never | undefined {
    return undefined;
  }

  getOrElse(_: never): never {
    return _;
  }

  map<B>(_: (_: never) => B): Option<B> {
    return None;
  }

  filter(_: Predicate<never>): Option<never> {
    return None;
  }

  flatMap<B>(_: (_: never) => Option<B>): Option<B> {
    return None;
  }

  flatMapNil<B>(_: (_: never) => B | Nil): Option<B> {
    return None;
  }

  match<B>(m: Matcher<never, B>): B {
    return m.None();
  }

  forEach(_: (_: never) => void): Option<never> {
    return this;
  }

  equals(other: Option<never>): boolean {
    return other.fastIsEmpty;
  }
}

/**
 * Constructs a new instance of a Some<T> object in an Option<T>
 * @param value - The value to wrap
 */
export function Some<A>(value: A): Option<A> {
  return new SomeType(value);
}

/**
 * Represents the singleton None object that represents no value in an Option<T>
 */
export const None: Option<never> = NoneType.instance;
