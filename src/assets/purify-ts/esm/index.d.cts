type MaybePatterns<T, U> =
  | {
      Just: (value: T) => U
      Nothing: () => U
    }
  | {
      _: () => U
    }
interface AlwaysJust {
  kind: "$$MaybeAlwaysJust"
}
type ExtractMaybe<T, TDefault> = T extends never ? TDefault : T | TDefault
interface MaybeTypeRef {
  /** Takes a value and wraps it in a `Just` */
  of<T>(value: T): Maybe<T>
  /** Returns `Nothing` */
  empty(): Nothing
  /** Returns `Nothing` */
  zero(): Nothing
  /** Takes a value and returns `Nothing` if the value is null or undefined, otherwise a `Just` is returned */
  fromNullable<T>(value: T | undefined | null | void): Maybe<T>
  /** Takes a value and returns Nothing if the value is falsy, otherwise a Just is returned */
  fromFalsy<T>(value: T | undefined | null | void): Maybe<T>
  /** Takes a predicate and a value, passes the value to the predicate and returns a Just if it returns true, otherwise a Nothing is returned */
  fromPredicate<T>(pred: (value: T) => boolean): (value: T) => Maybe<T>
  fromPredicate<T>(pred: (value: T) => boolean, value: T): Maybe<T>
  /** Returns only the `Just` values in a list */
  catMaybes<T>(list: readonly Maybe<T>[]): T[]
  /** Maps over a list of values and returns a list of all resulting `Just` values */
  mapMaybe<T, U>(f: (value: T) => Maybe<U>): (list: readonly T[]) => U[]
  mapMaybe<T, U>(f: (value: T) => Maybe<U>, list: readonly T[]): U[]
  /** Calls a function that may throw and wraps the result in a `Just` if successful or `Nothing` if an error is caught */
  encase<T>(thunk: () => T): Maybe<T>
  isMaybe<T>(x: unknown): x is Maybe<T>
  /** Turns a list of `Maybe`s into an `Maybe` of list if all items are `Just` */
  sequence<T>(maybes: readonly Maybe<T>[]): Maybe<T[]>
  "fantasy-land/of"<T>(value: T): Maybe<T>
  "fantasy-land/empty"(): Nothing
  "fantasy-land/zero"(): Nothing
}
interface Maybe<T> {
  /** Returns true if `this` is `Just`, otherwise it returns false */
  isJust(): this is AlwaysJust
  /** Returns true if `this` is `Nothing`, otherwise it returns false */
  isNothing(): this is Nothing
  inspect(): string
  toString(): string
  toJSON(): T
  /** Compares the values inside `this` and the argument, returns true if both are Nothing or if the values are equal */
  equals(other: Maybe<T>): boolean
  /** Transforms the value inside `this` with a given function. Returns `Nothing` if `this` is `Nothing` */
  map<U>(f: (value: T) => U): Maybe<U>
  /** Maps `this` with a `Maybe` function */
  ap<U>(maybeF: Maybe<(value: T) => U>): Maybe<U>
  /** Returns the first `Just` between `this` and another `Maybe` or `Nothing` if both `this` and the argument are `Nothing` */
  alt(other: Maybe<T>): Maybe<T>
  /** Lazy version of `alt` */
  altLazy(other: () => Maybe<T>): Maybe<T>
  /** Transforms `this` with a function that returns a `Maybe`. Useful for chaining many computations that may result in a missing value */
  chain<U>(f: (value: T) => Maybe<U>): Maybe<U>
  /** Transforms `this` with a function that returns a nullable value. Equivalent to `m.chain(x => Maybe.fromNullable(f(x)))` */
  chainNullable<U>(f: (value: T) => U | undefined | null | void): Maybe<U>
  /** Flattens nested Maybes. `m.join()` is equivalent to `m.chain(x => x)` */
  join<U>(this: Maybe<Maybe<U>>): Maybe<U>
  /** Takes a reducer and an initial value and returns the initial value if `this` is `Nothing` or the result of applying the function to the initial value and the value inside `this` */
  reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U
  /** Returns `this` if it's `Nothing`, otherwise it returns the result of applying the function argument to `this` and wrapping it in a `Just` */
  extend<U>(f: (value: Maybe<T>) => U): Maybe<U>
  /** Returns the value inside `this` or throws an error if `this` is `Nothing` */
  unsafeCoerce(): T
  /** Structural pattern matching for `Maybe` in the form of a function */
  caseOf<U>(patterns: MaybePatterns<T, U>): U
  /** Returns the default value if `this` is `Nothing`, otherwise it return the value inside `this` */
  orDefault(defaultValue: T): T
  /** Lazy version of `orDefault`. Takes a function that returns the default value, that function will be called only if `this` is `Nothing` */
  orDefaultLazy(getDefaultValue: () => T): T
  /** Returns empty list if the `Maybe` is `Nothing` or a list where the only element is the value of `Just` */
  toList(): T[]
  /** Maps over `this` and returns the resulting value or returns the default value if `this` is `Nothing` */
  mapOrDefault<U>(f: (value: T) => U, defaultValue: U): U
  /** Returns the value inside `this` or undefined if `this` is `Nothing`. Use `extractNullable` if you need a null returned instead */
  extract(): this extends AlwaysJust ? T : ExtractMaybe<T, undefined>
  /** Returns the value inside `this` or null if `this` is `Nothing`. Use `extract` if you need an undefined returned instead */
  extractNullable(): this extends AlwaysJust ? T : ExtractMaybe<T, null>
  /** Constructs a `Right` from a `Just` or a `Left` with a provided left value if `this` is `Nothing` */
  toEither<L>(left: L): Either<L, T>
  /** Runs an effect if `this` is `Just`, returns `this` to make chaining other methods possible */
  ifJust(effect: (value: T) => any): this
  /** Runs an effect if `this` is `Nothing`, returns `this` to make chaining other methods possible */
  ifNothing(effect: () => any): this
  /** Takes a predicate function and returns `this` if the predicate returns true or Nothing if it returns false */
  filter<U extends T>(pred: (value: T) => value is U): Maybe<U>
  /** Takes a predicate function and returns `this` if the predicate returns true or Nothing if it returns false */
  filter(pred: (value: T) => boolean): Maybe<T>
  "fantasy-land/equals"(other: Maybe<T>): boolean
  "fantasy-land/map"<U>(f: (value: T) => U): Maybe<U>
  "fantasy-land/ap"<U>(maybeF: Maybe<(value: T) => U>): Maybe<U>
  "fantasy-land/alt"(other: Maybe<T>): Maybe<T>
  "fantasy-land/chain"<U>(f: (value: T) => Maybe<U>): Maybe<U>
  "fantasy-land/reduce"<U>(
    reducer: (accumulator: U, value: T) => U,
    initialValue: U
  ): U
  "fantasy-land/extend"<U>(f: (value: Maybe<T>) => U): Maybe<U>
  "fantasy-land/filter"<U extends T>(pred: (value: T) => boolean): Maybe<U>
  "fantasy-land/filter"(pred: (value: T) => boolean): Maybe<T>
}
declare const Maybe: MaybeTypeRef
declare class Nothing implements Maybe<never> {
  private __value
  isJust(): boolean
  isNothing(): boolean
  inspect(): string
  toString(): string
  toJSON(): never
  equals<T>(other: Maybe<T>): boolean
  map<U>(_: (value: never) => U): Maybe<U>
  ap<U>(_: Maybe<(value: never) => U>): Maybe<U>
  alt<T>(other: Maybe<T>): Maybe<T>
  altLazy<T>(other: () => Maybe<T>): Maybe<T>
  chain<U>(_: (value: never) => Maybe<U>): Maybe<U>
  chainNullable<U>(_: (value: never) => U | undefined | null | void): Maybe<U>
  join<U>(this: Maybe<Maybe<U>>): Maybe<U>
  reduce<U>(_: (accumulator: U, value: never) => U, initialValue: U): U
  extend<U>(_: (value: Maybe<never>) => U): Maybe<U>
  unsafeCoerce<T>(): T
  caseOf<U>(patterns: MaybePatterns<never, U>): U
  orDefault<T>(defaultValue: T): T
  orDefaultLazy<T>(getDefaultValue: () => T): T
  toList<T>(): T[]
  mapOrDefault<U>(_: (value: never) => U, defaultValue: U): U
  extract(): this extends AlwaysJust ? never : ExtractMaybe<never, undefined>
  extractNullable(): this extends AlwaysJust ? never : ExtractMaybe<never, null>
  toEither<L, T>(left: L): Either<L, T>
  ifJust(_: (value: never) => any): this
  ifNothing(effect: () => any): this
  filter(_: (value: never) => boolean): Maybe<never>
  "fantasy-land/equals": <T>(other: Maybe<T>) => boolean
  "fantasy-land/map": <U>(_: (value: never) => U) => Maybe<U>
  "fantasy-land/ap": <U>(_: Maybe<(value: never) => U>) => Maybe<U>
  "fantasy-land/alt": <T>(other: Maybe<T>) => Maybe<T>
  "fantasy-land/chain": <U>(_: (value: never) => Maybe<U>) => Maybe<U>
  "fantasy-land/reduce": <U>(
    _: (accumulator: U, value: never) => U,
    initialValue: U
  ) => U
  "fantasy-land/extend": <U>(_: (value: Maybe<never>) => U) => Maybe<U>
  "fantasy-land/filter": (_: (value: never) => boolean) => Maybe<never>
}
/** Constructs a Just. Represents an optional value that exists */
declare const just: <T>(value: T) => Maybe<T>
/** Represents a missing value, you can think of it as a smart 'null' */
declare const nothing: Nothing

type EitherPatterns<L, R, T> =
  | {
      Left: (l: L) => T
      Right: (r: R) => T
    }
  | {
      _: () => T
    }
interface EitherTypeRef {
  /** Takes a value and wraps it in a `Right` */
  of<L, R>(value: R): Either<L, R>
  /** Takes a list of `Either`s and returns a list of all `Left` values */
  lefts<L, R>(list: readonly Either<L, R>[]): L[]
  /** Takes a list of `Either`s and returns a list of all `Right` values */
  rights<L, R>(list: readonly Either<L, R>[]): R[]
  /** Calls a function and returns a `Right` with the return value or an exception wrapped in a `Left` in case of failure */
  encase<L extends Error, R>(throwsF: () => R): Either<L, R>
  /** Turns a list of `Either`s into an `Either` of list */
  sequence<L, R>(eithers: readonly Either<L, R>[]): Either<L, R[]>
  isEither<L, R>(x: unknown): x is Either<L, R>
  "fantasy-land/of"<L, R>(value: R): Either<L, R>
}
interface Either<L, R> {
  /** Returns true if `this` is `Left`, otherwise it returns false */
  isLeft(): this is Either<L, never>
  /** Returns true if `this` is `Right`, otherwise it returns false */
  isRight(): this is Either<never, R>
  toJSON(): L | R
  inspect(): string
  toString(): string
  /** Given two functions, maps the value inside `this` using the first if `this` is `Left` or using the second one if `this` is `Right`.
   * If both functions return the same type consider using `Either#either` instead
   */
  bimap<L2, R2>(f: (value: L) => L2, g: (value: R) => R2): Either<L2, R2>
  /** Maps the `Right` value of `this`, acts like an identity if `this` is `Left` */
  map<R2>(f: (value: R) => R2): Either<L, R2>
  /** Maps the `Left` value of `this`, acts like an identity if `this` is `Right` */
  mapLeft<L2>(f: (value: L) => L2): Either<L2, R>
  /** Applies a `Right` function over a `Right` value. Returns `Left` if either `this` or the function are `Left` */
  ap<L2, R2>(other: Either<L2, (value: R) => R2>): Either<L | L2, R2>
  /** Compares `this` to another `Either`, returns false if the constructors or the values inside are different, e.g. `Right(5).equals(Left(5))` is false */
  equals(other: Either<L, R>): boolean
  /** Transforms `this` with a function that returns an `Either`. Useful for chaining many computations that may fail */
  chain<L2, R2>(f: (value: R) => Either<L2, R2>): Either<L | L2, R2>
  /** The same as Either#chain but executes the transformation function only if the value is Left. Useful for recovering from errors */
  chainLeft<L2, R2>(f: (value: L) => Either<L2, R2>): Either<L2, R | R2>
  /** Flattens nested Eithers. `e.join()` is equivalent to `e.chain(x => x)` */
  join<L2, R2>(this: Either<L, Either<L2, R2>>): Either<L | L2, R2>
  /** Returns the first `Right` between `this` and another `Either` or the `Left` in the argument if both `this` and the argument are `Left` */
  alt(other: Either<L, R>): Either<L, R>
  /** Lazy version of `alt` */
  altLazy(other: () => Either<L, R>): Either<L, R>
  /** Takes a reducer and an initial value and returns the initial value if `this` is `Left` or the result of applying the function to the initial value and the value inside `this` */
  reduce<T>(reducer: (accumulator: T, value: R) => T, initialValue: T): T
  /** Returns `this` if it's a `Left`, otherwise it returns the result of applying the function argument to `this` and wrapping it in a `Right` */
  extend<R2>(f: (value: Either<L, R>) => R2): Either<L, R2>
  /** Returns the value inside `this` if it's a `Right` or either throws the value or a generic exception depending on whether the value is an Error */
  unsafeCoerce(): R
  /** Structural pattern matching for `Either` in the form of a function */
  caseOf<T>(patterns: EitherPatterns<L, R, T>): T
  /** Returns the value inside `this` if it\'s `Left` or a default value if `this` is `Right` */
  leftOrDefault(defaultValue: L): L
  /** Returns the value inside `this` if it\'s `Right` or a default value if `this` is `Left` */
  orDefault(defaultValue: R): R
  /** Lazy version of `orDefault`. Takes a function that returns the default value, that function will be called only if `this` is `Left` */
  orDefaultLazy(getDefaultValue: () => R): R
  /** Lazy version of `leftOrDefault`. Takes a function that returns the default value, that function will be called only if `this` is `Right` */
  leftOrDefaultLazy(getDefaultValue: () => L): L
  /** Runs an effect if `this` is `Left`, returns `this` to make chaining other methods possible */
  ifLeft(effect: (value: L) => any): this
  /** Runs an effect if `this` is `Right`, returns `this` to make chaining other methods possible */
  ifRight(effect: (value: R) => any): this
  /** Constructs a `Just` with the value of `this` if it\'s `Right` or a `Nothing` if `this` is `Left` */
  toMaybe(): Maybe<R>
  /** Constructs a `Just` with the value of `this` if it\'s `Left` or a `Nothing` if `this` is `Right` */
  leftToMaybe(): Maybe<L>
  /** Extracts the value out of `this` */
  extract(): L | R
  /** Returns `Right` if `this` is `Left` and vice versa */
  swap(): Either<R, L>
  "fantasy-land/bimap"<L2, R2>(
    f: (value: L) => L2,
    g: (value: R) => R2
  ): Either<L2, R2>
  "fantasy-land/map"<R2>(f: (value: R) => R2): Either<L, R2>
  "fantasy-land/ap"<R2>(other: Either<L, (value: R) => R2>): Either<L, R2>
  "fantasy-land/equals"(other: Either<L, R>): boolean
  "fantasy-land/chain"<L2, R2>(
    f: (value: R) => Either<L2, R2>
  ): Either<L | L2, R2>
  "fantasy-land/alt"(other: Either<L, R>): Either<L, R>
  "fantasy-land/reduce"<T>(
    reducer: (accumulator: T, value: R) => T,
    initialValue: T
  ): T
  "fantasy-land/extend"<R2>(f: (value: Either<L, R>) => R2): Either<L, R2>
}
declare const Either: EitherTypeRef
declare const left: <L, R = never>(value: L) => Either<L, R>
declare const right: <R, L = never>(value: R) => Either<L, R>

interface TupleTypeRef {
  <F, S>(fst: F, snd: S): Tuple<F, S>
  /** Applies two functions over a single value and constructs a tuple from the results */
  fanout<F, S, T>(f: (value: T) => F, g: (value: T) => S, value: T): Tuple<F, S>
  fanout<F, S, T>(
    f: (value: T) => F,
    g: (value: T) => S
  ): (value: T) => Tuple<F, S>
  fanout<F, T>(
    f: (value: T) => F
  ): <S>(g: (value: T) => S) => (value: T) => Tuple<F, S>
  /** Constructs a tuple from an array with two elements */
  fromArray<F, S>([fst, snd]: [F, S]): Tuple<F, S>
}
interface Tuple<F, S> extends Iterable<F | S>, ArrayLike<F | S> {
  0: F
  1: S
  [index: number]: F | S
  length: 2
  toJSON(): [F, S]
  inspect(): string
  toString(): string
  /** Returns the first value of `this` */
  fst(): F
  /** Returns the second value of `this` */
  snd(): S
  /** Compares the values inside `this` and another tuple */
  equals(other: Tuple<F, S>): boolean
  /** Transforms the two values inside `this` with two mapper functions */
  bimap<F2, S2>(f: (fst: F) => F2, g: (snd: S) => S2): Tuple<F2, S2>
  /** Applies a function to the first value of `this` */
  mapFirst<F2>(f: (fst: F) => F2): Tuple<F2, S>
  /** Applies a function to the second value of `this` */
  map<S2>(f: (snd: S) => S2): Tuple<F, S2>
  /** A somewhat arbitrary implementation of Foldable for Tuple, the reducer will be passed the initial value and the second value inside `this` as arguments */
  reduce<T>(reducer: (accumulator: T, value: S) => T, initialValue: T): T
  /** Returns an array with 2 elements - the values inside `this` */
  toArray(): [F, S]
  /** Swaps the values inside `this` */
  swap(): Tuple<S, F>
  /** Applies the second value of a tuple to the second value of `this` */
  ap<T, S2>(f: Tuple<T, (value: S) => S2>): Tuple<F, S2>
  /** Tests whether both elements in the tuple pass the test implemented by the provided function */
  every(pred: (value: F | S) => boolean): boolean
  /** Tests whether at least one element in the tuple passes the test implemented by the provided function */
  some(pred: (value: F | S) => boolean): boolean
  "fantasy-land/equals"(other: Tuple<F, S>): boolean
  "fantasy-land/bimap"<F2, S2>(
    f: (fst: F) => F2,
    g: (snd: S) => S2
  ): Tuple<F2, S2>
  "fantasy-land/map"<S2>(f: (snd: S) => S2): Tuple<F, S2>
  "fantasy-land/reduce"<T>(
    reducer: (accumulator: T, value: S) => T,
    initialValue: T
  ): T
  "fantasy-land/ap"<T, S2>(f: Tuple<T, (value: S) => S2>): Tuple<F, S2>
}
declare const Tuple: TupleTypeRef

type NonEmptyListCompliant<T> = T[] & {
  0: T
}
interface NonEmptyListTypeRef {
  /** Typecasts an array with at least one element into a `NonEmptyList`. Works only if the compiler can confirm that the array has one or more elements */
  <T extends NonEmptyListCompliant<T[number]>>(list: T): NonEmptyList<T[number]>
  /** Returns a `Just NonEmptyList` if the parameter has one or more elements, otherwise it returns `Nothing` */
  fromArray<T>(source: readonly T[]): Maybe<NonEmptyList<T>>
  /** Converts a `Tuple` to a `NonEmptyList` */
  fromTuple<T, U>(source: Tuple<T, U>): NonEmptyList<T | U>
  /** Typecasts any array into a `NonEmptyList`, but throws an exception if the array is empty. Use `fromArray` as a safe alternative */
  unsafeCoerce<T>(source: readonly T[]): NonEmptyList<T>
  /** Returns true and narrows the type if the passed array has one or more elements */
  isNonEmpty<T>(list: readonly T[]): list is NonEmptyList<T>
  /** The same function as \`List#head\`, but it doesn't return a Maybe as a NonEmptyList will always have a head */
  head<T>(list: NonEmptyList<T>): T
  /** The same function as \`List#last\`, but it doesn't return a Maybe as a NonEmptyList will always have a last element */
  last<T>(list: NonEmptyList<T>): T
  /** The same function as \`List#tail\`, but it doesn't return a Maybe as a NonEmptyList will always have a tail (although it may be of length 0) */
  tail<T>(list: NonEmptyList<T>): T[]
}
interface NonEmptyList<T> extends NonEmptyListCompliant<T> {
  map<U>(
    this: NonEmptyList<T>,
    callbackfn: (value: T, index: number, array: NonEmptyList<T>) => U,
    thisArg?: any
  ): NonEmptyList<U>
  reverse(this: NonEmptyList<T>): NonEmptyList<T>
  concat(...items: ConcatArray<T>[]): NonEmptyList<T>
  concat(...items: (T | ConcatArray<T>)[]): NonEmptyList<T>
}
declare const NonEmptyList: NonEmptyListTypeRef

/** Special type used when you want to do the opposite of `GetType` - define a Codec for an existing type. The problem is that due to technical limitations optional properties are hard to generate in TypeScript so Codec generates properties of type "T | undefined" instead, which is not compatible */
type FromType<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined
}
/** You can use this to get a free type from any codec */
type GetType<T extends Codec<any>> = T extends Codec<infer U> ? U : never
interface Codec<T> {
  /** Takes a JSON value and runs the decode function the codec was constructed with. All of purify's built-in codecs return a descriptive error message in case the decode fails */
  decode: (input: unknown) => Either<string, T>
  /** Takes a runtime value and turns it into a JSON value using the encode function the codec was constructed with. Most of purify's built-in codecs have no custom encode method and they just return the same value, but you could add custom serialization logic for your custom codecs. */
  encode: <U = unknown>(input: T) => U
  /** The same as the decode method, but throws an exception on failure. Please only use as an escape hatch */
  unsafeDecode: (input: unknown) => T
  schema: () => any
}
declare const Codec: {
  /** Creates a codec for any JSON object */
  interface<T extends Record<string, Codec<any>>>(
    properties: T
  ): Codec<{ [k in keyof T]: GetType<T[k]> }>
  /** Creates a codec for any type, you can add your own deserialization/validation logic in the decode argument */
  custom<T_1>({
    decode,
    encode,
    schema
  }: {
    decode: (value: unknown) => Either<string, T_1>
    encode: (value: T_1) => any
    schema?: (() => object) | undefined
  }): Codec<T_1>
}
/** A codec for any string value. Most of the time you will use it to implement an interface codec (see the Codec#interface example above). Encoding a string acts like the identity function */
declare const string: Codec<string>
/** A codec for any number value. This includes anything that has a typeof number - NaN, Infinity etc. Encoding a number acts like the identity function */
declare const number: Codec<number>
/** A codec for null only */
declare const nullType: Codec<null>
declare const optional: <T>(codec: Codec<T>) => Codec<T | undefined>
/** A codec for a value T or null. Keep in mind if you use `nullable` inside `Codec.interface` the property will still be required */
declare const nullable: <T>(codec: Codec<T>) => Codec<T | null>
/** A codec for a boolean value */
declare const boolean: Codec<boolean>
/** A codec that can never fail, but of course you get no type information. Encoding an unknown acts like the identity function */
declare const unknown: Codec<unknown>
/** A codec for a TypeScript enum */
declare const enumeration: <T extends Record<string, string | number>>(
  e: T
) => Codec<T[keyof T]>
/** A codec combinator that receives a list of codecs and runs them one after another during decode and resolves to whichever returns Right or to Left if all fail */
declare const oneOf: <T extends [Codec<any>, ...Codec<any>[]]>(
  codecs: T
) => Codec<GetType<T extends (infer U)[] ? U : never>>
/** A codec for an array */
declare const array: <T>(codec: Codec<T>) => Codec<T[]>
/** A codec for an object without specific properties, its restrictions are equivalent to the Record<K, V> type so you can only check for number and string keys */
declare const record: <K extends string | number | symbol, V>(
  keyCodec: Codec<K>,
  valueCodec: Codec<V>
) => Codec<Record<K, V>>
/** A codec that only succeeds decoding when the value is exactly what you've constructed the codec with */
declare const exactly: <T extends (string | number | boolean)[]>(
  ...expectedValues: T
) => Codec<T[number]>
/** A special codec used when dealing with recursive data structures, it allows a codec to be recursively defined by itself */
declare const lazy: <T>(getCodec: () => Codec<T>) => Codec<T>
/** A codec for purify's Maybe type. Encode runs Maybe#toJSON, which effectively returns the value inside if it's a Just or undefined if it's Nothing */
declare const maybe: <T>(codec: Codec<T>) => Codec<Maybe<T>>
/** A codec for purify's NEL type */
declare const nonEmptyList: <T>(codec: Codec<T>) => Codec<NonEmptyList<T>>
/** The same as the array decoder, but accepts a fixed amount of array elements and you can specify each element type, much like the tuple type */
declare const tuple: <TS extends [Codec<any>, ...Codec<any>[]]>(
  codecs: TS
) => Codec<{ [i in keyof TS]: TS[i] extends Codec<infer U> ? U : never }>
/** A codec for a parsable date string, on successful decoding it resolves to a Date object. The validity of the date string during decoding is decided by the browser implementation of Date.parse. Encode runs toISOString on the passed in date object */
declare const date: Codec<Date>
/** Creates an intersection between two codecs. If the provided codecs are not for an object, the second decode result will be returned */
declare const intersect: <T, U>(t: Codec<T>, u: Codec<U>) => Codec<T & U>
/** A codec for the built-in Map type */
declare const map: <K, V>(
  keyCodec: Codec<K>,
  valueCodec: Codec<V>
) => Codec<Map<K, V>>
type ExpectedType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "null"
  | "undefined"
  | "enum"
type ReceivedType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "null"
  | "undefined"
  | "bigint"
  | "symbol"
  | "function"
type DecodeError =
  | {
      type: "property"
      property: string
      error: DecodeError
    }
  | {
      type: "index"
      index: number
      error: DecodeError
    }
  | {
      type: "oneOf"
      errors: DecodeError[]
    }
  | {
      type: "failure"
      expectedType?: ExpectedType
      receivedType: ReceivedType
      receivedValue?: unknown
    }
  | {
      type: "custom"
      message: string
    }
/** Turns a string error message produced by a built-in purify codec into a meta object */
declare const parseError: (error: string) => DecodeError

/** The identity function, returns the value it was given */
declare const identity: <T>(x: T) => T
/** Returns a function that always returns the same value. Also known as `const` in other languages */
declare const always: <T>(x: T) => <U>(y: U) => T
declare const enum Order {
  LT = "LT",
  EQ = "EQ",
  GT = "GT"
}
/** Compares two values using the default "<" and ">" operators */
declare const compare: <T>(x: T, y: T) => Order
/** Maps the Order enum to the values expected by the standard ECMAScript library when doing comparison (Array.prototype.sort, for example) */
declare const orderToNumber: (order: Order) => number
type TupleOfLength<T extends any[]> = Extract<
  {
    [K in keyof T]: any
  },
  any[]
>
type CurriedFn<TAllArgs extends any[], TReturn> = <
  TProvidedArgs extends TAllArgs extends [infer TFirstArg, ...infer TRestOfArgs]
    ? [TFirstArg, ...Partial<TRestOfArgs>]
    : never
>(
  ...args: TProvidedArgs
) => TProvidedArgs extends TAllArgs
  ? TReturn
  : TAllArgs extends [...TupleOfLength<TProvidedArgs>, ...infer TRestOfArgs]
  ? CurriedFn<TRestOfArgs, TReturn>
  : never
/** Takes a function that receives multiple arguments and returns a "curried" version of that function that can take any number of those arguments and if they are less than needed a new function that takes the rest of them will be returned */
declare const curry: <TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => TReturn
) => CurriedFn<TArgs, TReturn>

/** Returns the first element which satisfies a predicate. A more typesafe version of the already existing List.prototype.find */
declare function find<T>(
  f: (x: T, index: number, arr: T[]) => boolean,
  list: T[]
): Maybe<T>
declare function find<T>(
  f: (x: T, index: number, arr: T[]) => boolean
): (list: T[]) => Maybe<T>
/** Returns the index of the first element which satisfies a predicate. A more typesafe version of the already existing List.prototype.findIndex */
declare function findIndex<T>(
  f: (x: T, index: number, arr: T[]) => boolean,
  list: T[]
): Maybe<number>
declare function findIndex<T>(
  f: (x: T, index: number, arr: T[]) => boolean
): (list: T[]) => Maybe<number>
/** Returns the element at a given index of a list */
declare function at<T>(index: number, list: readonly T[]): Maybe<T>
declare function at<T>(index: number): (list: readonly T[]) => Maybe<T>
/** Sorts an array with the given comparison function */
declare function sort<T>(
  compare: (a: T, b: T) => Order,
  list: readonly T[]
): T[]
declare function sort<T>(
  compare: (a: T, b: T) => Order
): (list: readonly T[]) => T[]
declare const List: {
  init: <T>(list: readonly T[]) => Maybe<T[]>
  uncons: <T_1>(list: readonly T_1[]) => Maybe<Tuple<T_1, T_1[]>>
  at: typeof at
  head: <T_2>(list: readonly T_2[]) => Maybe<T_2>
  last: <T_3>(list: readonly T_3[]) => Maybe<T_3>
  tail: <T_4>(list: readonly T_4[]) => Maybe<T_4[]>
  find: typeof find
  findIndex: typeof findIndex
  sum: (list: readonly number[]) => number
  sort: typeof sort
}

interface EitherAsyncTypeRef {
  /** Constructs an `EitherAsync` object from a function that takes an object full of helpers that let you lift things into the `EitherAsync` context and returns a Promise */
  <L, R>(
    runPromise: (helpers: EitherAsyncHelpers<L>) => PromiseLike<R>
  ): EitherAsync<L, R>
  /** Constructs an `EitherAsync` object from a function that returns an Either wrapped in a Promise */
  fromPromise<L, R>(f: () => PromiseLike<Either<L, R>>): EitherAsync<L, R>
  /** Constructs an `EitherAsync` object from an Either */
  liftEither<L, R>(either: Either<L, R>): EitherAsync<L, R>
  /** Takes a list of `EitherAsync`s and returns a Promise that will resolve with all `Left` values. Internally it uses `Promise.all` to wait for all results */
  lefts<L, R>(list: readonly EitherAsync<L, R>[]): Promise<L[]>
  /** Takes a list of `EitherAsync`s and returns a Promise that will resolve with all `Right` values. Internally it uses `Promise.all` to wait for all results */
  rights<L, R>(list: readonly EitherAsync<L, R>[]): Promise<R[]>
  /** Turns a list of `EitherAsync`s into an `EitherAsync` of list. The returned `Promise` will be rejected as soon as a single `EitherAsync` resolves to a `Left`, it will not wait for all Promises to resolve and since `EitherAsync` is lazy, unlike `Promise`, the remaining async operations will not be executed at all */
  sequence<L, R>(eas: readonly EitherAsync<L, R>[]): EitherAsync<L, R[]>
  /** The same as `EitherAsync.sequence`, but it will run all async operations at the same time rather than sequentially */
  all<L, R>(eas: readonly EitherAsync<L, R>[]): EitherAsync<L, R[]>
}
interface EitherAsyncValue<R> extends PromiseLike<R> {}
interface EitherAsyncHelpers<L> {
  /** Allows you to take a regular Either value and lift it to the `EitherAsync` context. Awaiting a lifted Either will give you the `Right` value inside. If the Either is Left then the function will exit immediately and EitherAsync will resolve to that Left after running it */
  liftEither<R>(either: Either<L, R>): EitherAsyncValue<R>
  /** Allows you to take an Either inside a Promise and lift it to the `EitherAsync` context. Awaiting a lifted Promise<Either> will give you the `Right` value inside the Either. If the Either is Left or the Promise is rejected then the function will exit immediately and MaybeAsync will resolve to that Left or the rejection value after running it */
  fromPromise<R>(promise: PromiseLike<Either<L, R>>): EitherAsyncValue<R>
  /** A type safe version of throwing an exception. Unlike the Error constructor, which will take anything, throwE only accepts values of the same type as the Left part of the Either */
  throwE(error: L): never
}
interface EitherAsync<L, R> extends PromiseLike<Either<L, R>> {
  /**
   * It's important to remember how `run` will behave because in an
   * async context there are other ways for a function to fail other
   * than to return a Nothing, for example:
   * If any of the computations inside EitherAsync resolved to a Left,
   * `run` will return a Promise resolved to that Left.
   * If any of the promises were to be rejected then `run` will return
   * a Promise resolved to a Left with the rejection value inside
   * If an exception is thrown then `run` will return a Promise
   * resolved to a Left with the exception inside
   * If none of the above happen then a promise resolved to the
   * returned value wrapped in a Right will be returned
   */
  run(): Promise<Either<L, R>>
  /** Given two functions, maps the value that the Promise inside `this` resolves to using the first if it is `Left` or using the second one if it is `Right` */
  bimap<L2, R2>(
    f: (value: L) => L2,
    g: (value: R) => R2
  ): EitherAsync<Awaited<L2>, Awaited<R2>>
  /** Transforms the `Right` value of `this` with a given function. If the `EitherAsync` that is being mapped resolves to a Left then the mapping function won't be called and `run` will resolve the whole thing to that Left, just like the regular Either#map */
  map<R2>(f: (value: R) => R2): EitherAsync<L, Awaited<R2>>
  /** Maps the `Left` value of `this`, acts like an identity if `this` is `Right` */
  mapLeft<L2>(f: (value: L) => L2): EitherAsync<Awaited<L2>, R>
  /** Transforms `this` with a function that returns a `EitherAsync`. Behaviour is the same as the regular Either#chain */
  chain<L2, R2>(
    f: (value: R) => PromiseLike<Either<L2, R2>>
  ): EitherAsync<L | L2, R2>
  /** The same as EitherAsync#chain but executes the transformation function only if the value is Left. Useful for recovering from errors */
  chainLeft<L2, R2>(
    f: (value: L) => PromiseLike<Either<L2, R2>>
  ): EitherAsync<L2, R | R2>
  /** Flattens an `Either` nested inside an `EitherAsync`. `e.join()` is equivalent to `e.chain(async x => x)` */
  join<L2, R2>(this: EitherAsync<L, Either<L2, R2>>): EitherAsync<L | L2, R2>
  /** Converts `this` to a MaybeAsync, discarding any error values */
  toMaybeAsync(): MaybeAsync<R>
  /** Returns `Right` if `this` is `Left` and vice versa */
  swap(): EitherAsync<R, L>
  /** Runs an effect if `this` is `Left`, returns `this` to make chaining other methods possible */
  ifLeft(effect: (value: L) => any): EitherAsync<L, R>
  /** Runs an effect if `this` is `Right`, returns `this` to make chaining other methods possible */
  ifRight(effect: (value: R) => any): EitherAsync<L, R>
  /** Applies a `Right` function wrapped in `EitherAsync` over a future `Right` value. Returns `Left` if either the `this` resolves to a `Left` or the function is `Left` */
  ap<L2, R2>(
    other: PromiseLike<Either<L2, (value: R) => R2>>
  ): EitherAsync<L | L2, Awaited<R2>>
  /** Returns the first `Right` between the future value of `this` and another `EitherAsync` or the `Left` in the argument if both `this` and the argument resolve to `Left` */
  alt(other: EitherAsync<L, R>): EitherAsync<L, R>
  /** Returns `this` if it resolves to a `Left`, otherwise it returns the result of applying the function argument to `this` and wrapping it in a `Right` */
  extend<R2>(f: (value: EitherAsync<L, R>) => R2): EitherAsync<L, Awaited<R2>>
  /** Returns a Promise that resolves to the value inside `this` if it\'s `Left` or a default value if `this` is `Right` */
  leftOrDefault(defaultValue: L): Promise<L>
  /** Returns a Promise that resolves to the value inside `this` if it\'s `Right` or a default value if `this` is `Left` */
  orDefault(defaultValue: R): Promise<R>
  /** Useful if you are not interested in the result of an operation */
  void(): EitherAsync<L, void>
  /** Structural pattern matching for `EitherAsync` in the form of a function */
  caseOf<T>(patterns: EitherPatterns<L, R, T>): Promise<T>
  finally(effect: () => any): EitherAsync<L, R>
  "fantasy-land/chain"<R2>(
    f: (value: R) => PromiseLike<Either<L, R2>>
  ): EitherAsync<L, R2>
  "fantasy-land/alt"(other: EitherAsync<L, R>): EitherAsync<L, R>
  /** WARNING: This is implemented only for Promise compatibility. Please use `chain` instead. */
  then: PromiseLike<Either<L, R>>["then"]
}
declare const EitherAsync: EitherAsyncTypeRef

interface MaybeAsyncTypeRef {
  /** Constructs a MaybeAsync object from a function that takes an object full of helpers that let you lift things into the MaybeAsync context and returns a Promise */
  <T>(runPromise: (helpers: MaybeAsyncHelpers) => PromiseLike<T>): MaybeAsync<T>
  /** Constructs an MaybeAsync object from a function that returns a Maybe wrapped in a Promise */
  fromPromise<T>(f: () => Promise<Maybe<T>>): MaybeAsync<T>
  /** Constructs an MaybeAsync object from a Maybe */
  liftMaybe<T>(maybe: Maybe<T>): MaybeAsync<T>
  /** Takes a list of `MaybeAsync`s and returns a Promise that will resolve with all `Just` values. Internally it uses `Promise.all` to wait for all results */
  catMaybes<T>(list: readonly MaybeAsync<T>[]): Promise<T[]>
}
interface MaybeAsyncValue<T> extends PromiseLike<T> {}
interface MaybeAsyncHelpers {
  /** Allows you to take a regular Maybe value and lift it to the MaybeAsync context. Awaiting a lifted Maybe will give you the value inside. If the Maybe is Nothing then the function will exit immediately and MaybeAsync will resolve to Nothing after running it */
  liftMaybe<T>(maybe: Maybe<T>): MaybeAsyncValue<T>
  /** Allows you to take a Maybe inside a Promise and lift it to the MaybeAsync context. Awaiting a lifted Promise<Maybe> will give you the value inside the Maybe. If the Maybe is Nothing or the Promise is rejected then the function will exit immediately and MaybeAsync will resolve to Nothing after running it */
  fromPromise<T>(promise: PromiseLike<Maybe<T>>): MaybeAsyncValue<T>
}
interface MaybeAsync<T> extends PromiseLike<Maybe<T>> {
  /**
   * It's important to remember how `run` will behave because in an
   * async context there are other ways for a function to fail other
   * than to return a Nothing, for example:
   * If any of the computations inside MaybeAsync resolved to Nothing,
   * `run` will return a Promise resolved to Nothing.
   * If any of the promises were to be rejected then `run` will return
   * a Promise resolved to Nothing.
   * If an exception is thrown then `run` will return a Promise
   * resolved to Nothing.
   * If none of the above happen then a promise resolved to the
   * returned value wrapped in a Just will be returned.
   */
  run(): Promise<Maybe<T>>
  /** Transforms the value inside `this` with a given function. If the MaybeAsync that is being mapped resolves to Nothing then the mapping function won't be called and `run` will resolve the whole thing to Nothing, just like the regular Maybe#map */
  map<U>(f: (value: T) => U): MaybeAsync<Awaited<U>>
  /** Transforms `this` with a function that returns a `MaybeAsync`. Behaviour is the same as the regular Maybe#chain */
  chain<U>(f: (value: T) => PromiseLike<Maybe<U>>): MaybeAsync<U>
  /** Converts `this` to a EitherAsync with a default error value */
  toEitherAsync<L>(error: L): EitherAsync<L, T>
  /** Runs an effect if `this` is `Just`, returns `this` to make chaining other methods possible */
  ifJust(effect: (value: T) => any): MaybeAsync<T>
  /** Runs an effect if `this` is `Nothing`, returns `this` to make chaining other methods possible */
  ifNothing(effect: () => any): MaybeAsync<T>
  /** Returns the default value if `this` is `Nothing`, otherwise it returns a Promise that will resolve to the value inside `this` */
  orDefault(defaultValue: T): Promise<T>
  /** Maps the future value of `this` with another future `Maybe` function */
  ap<U>(maybeF: PromiseLike<Maybe<(value: T) => U>>): MaybeAsync<Awaited<U>>
  /** Returns the first `Just` between the future value of `this` and another future `Maybe` or future `Nothing` if both `this` and the argument are `Nothing` */
  alt(other: MaybeAsync<T>): MaybeAsync<T>
  /** Returns `this` if it resolves to `Nothing`, otherwise it returns the result of applying the function argument to the value of `this` and wrapping it in a `Just` */
  extend<U>(f: (value: MaybeAsync<T>) => U): MaybeAsync<Awaited<U>>
  /** Takes a predicate function and returns `this` if the predicate, applied to the resolved value, is true or Nothing if it's false */
  filter<U extends T>(pred: (value: T) => value is U): MaybeAsync<U>
  /** Takes a predicate function and returns `this` if the predicate, applied to the resolved value, is true or Nothing if it's false */
  filter(pred: (value: T) => boolean): MaybeAsync<T>
  /** Flattens a `Maybe` nested inside a `MaybeAsync`. `m.join()` is equivalent to `m.chain(async x => x)` */
  join<U>(this: MaybeAsync<Maybe<U>>): MaybeAsync<U>
  /** Useful if you are not interested in the result of an operation */
  void(): MaybeAsync<void>
  /** Structural pattern matching for `MaybeAsync` in the form of a function */
  caseOf<U>(patterns: MaybePatterns<T, U>): Promise<U>
  finally(effect: () => any): MaybeAsync<T>
  "fantasy-land/chain"<U>(f: (value: T) => PromiseLike<Maybe<U>>): MaybeAsync<U>
  "fantasy-land/alt"(other: MaybeAsync<T>): MaybeAsync<T>
  "fantasy-land/filter"<U extends T>(
    pred: (value: T) => value is U
  ): MaybeAsync<U>
  "fantasy-land/filter"(pred: (value: T) => boolean): MaybeAsync<T>
  /** WARNING: This is implemented only for Promise compatibility. Please use `chain` instead. */
  then: PromiseLike<Maybe<T>>["then"]
}
declare const MaybeAsync: MaybeAsyncTypeRef
