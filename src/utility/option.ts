import { isDefined } from "./data";
import { Nil, Predicate } from "./types";

export interface OptionLike<A> {
  /**
   * Whether the option is `None`
   */
  isEmpty(): this is NoneType<A>;

  /**
   * Whether the option is `Some(...)`
   */
  isDefined(): this is SomeType<A>;

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
   * @param func The mapping function that is invoked to transform this option's inner
   * value to a value of B if and only if the original option is not None
   */
  map<B>(_: (_: A) => B): OptionLike<B>;

  /**
   * Applies a filter function if this option is defined, resulting in the same option if
   * it passes and returning None if it fails. If it wasn't defined, then it remains None
   * and the filter function is not invoked
   *
   * @param func The filter function to use if the option is defined
   */
  filter(_: Predicate<A>): OptionLike<A>;

  /**
   * Flat maps the option to another option Option<B>, using a mapping function that
   * itself returns an Option<B>
   *
   * @param func The mapping function that is invoked to transform this option's inner
   * value to a new Option<B> if and only if the original option is not None
   */
  flatMap<B>(_: (_: A) => OptionLike<B>): OptionLike<B>;

  /**
   * Allows for conditional branching and value resolution depending on the value of
   * the option
   *
   * @param m The matcher object to apply to the state of the Option
   */
  match<B> (m: Matcher<A, B>): B
}

interface ValuedOption<A> {
  readonly get: A
}

/**
 * Represents a value that either may exist or may not. To determine whether the value exists,
 * use `option.isEmpty`.
 */
export abstract class Option<A> implements OptionLike<A> {
  abstract isEmpty(): this is NoneType<A>;
  abstract isDefined(): this is SomeType<A>;
  abstract fastIsEmpty: boolean;
  abstract fastIsDefined: boolean;
  abstract orNull(): A | null;
  abstract orUndefined(): A | undefined;
  abstract getOrElse(_: A): A;
  abstract map<B>(_: (_: A) => B): Option<B>;
  abstract filter(_: Predicate<A>): Option<A>;
  abstract flatMap<B>(_: (_: A) => Option<B>): Option<B>;
  abstract match<B> (m: Matcher<A, B>): B

  /**
   * Constructs a new instance of a Some<T> or None object in an Option<T>, depending
   * on whether value was nil or not
   *
   * @param value The nullable value to wrap
   */
  static from<A>(value: A | Nil): Option<A> {
    if (isDefined(value)) return Some(value);
    else return None;
  }
}

export interface Matcher<A, B> {
  Some: (_: A) => B
  None: () => B
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
    return true
  }

  isEmpty(): this is NoneType<A> {
    return false
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

  getOrElse(_: A): A {
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

  match<B> (m: Matcher<A, B>): B {
    return m.Some(this._value);
  }
}

export class NoneType<A> extends Option<A> {
  fastIsDefined = false;
  fastIsEmpty = true;
  constructor() {
    super();
  }

  isDefined(): this is SomeType<A> {
    return false
  }

  isEmpty(): this is NoneType<A> {
    return true
  }

  orNull(): A | null {
    return null;
  }

  orUndefined(): A | undefined {
    return undefined;
  }

  getOrElse(_: A): A {
    return _;
  }

  map<B>(_: (_: A) => B): Option<B> {
    return None;
  }

  filter(_: Predicate<A>): Option<A> {
    return None;
  }

  flatMap<B>(_: (_: A) => Option<B>): Option<B> {
    return None;
  }

  match<B> (m: Matcher<A, B>): B {
    return m.None();
  }
}

/**
 * Constructs a new instance of a Some<T> object in an Option<T>
 *
 * @param value The value to wrap
 */
export function Some<A>(value: A): Option<A> {
  return new SomeType(value);
}

/**
 * Represents the singleton None object that represents no value in an Option<T>
 */
export const None: Option<never> = new NoneType();
