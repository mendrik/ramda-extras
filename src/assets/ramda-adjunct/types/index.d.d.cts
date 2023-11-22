// Minimum TypeScript Version: 2.4
/* eslint-disable no-shadow */

interface Functor<T> {
  map<U>(fn: (t: T) => U): Functor<U>;
}

interface Apply<T> extends Functor<T> {
  ap<U>(fn: Apply<(t: T) => U>): Apply<U>;
}

interface Foldable<T> {
  reduce<Acc>(fn: (acc: Acc, val: T) => Acc, initAcc: Acc): Acc;
}

interface Filterable<T> {
  filter(fn: (t: T) => Boolean): Filterable<T>;
}

interface Semigroup {
  // https://www.typescriptlang.org/docs/handbook/advanced-types.html#polymorphic-this-types
  concat(other: this): this;
}

interface Catamorphism<T> {
  cata<T1>(leftFn: (v: T1) => T, rightFn: (v: T1) => T): T;
}

type SettledPromiseStatus = 'fulfilled' | 'rejected';

interface SettledPromise<T> {
  status: SettledPromiseStatus;
  value: T;
}

type Variadic<T1, T2> = (...args: T1[]) => T2;

type Pred = (...a: any[]) => boolean;

interface Dictionary<T> {
  [key: string]: T;
}

type DictPred<T> = (value: T, key: string) => boolean;
type Primitive = string | number | bigint | boolean | undefined | null | symbol;

/**
 * Checks if input value is `Array`.
 */
declare function isArray(val: any): val is any[];

/**
 * Checks whether the passed value is iterable.
 */
declare function isIterable<T>(val: any): val is Iterable<T>;

/**
 * Checks if input value is an empty `Array`.
 */
declare function isEmptyArray(val: any): val is any[];

/**
 * Checks if input value is `Boolean`.
 */
declare function isBoolean(val: any): val is boolean;

/**
 * Checks if value is a primitive data type. There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` and a special case of `null`.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Primitive_values
 * for definition of what sub-types comprise a primitive.
 */
declare function isPrimitive<T>(val: T | Primitive): val is Primitive;

/**
 * Checks if value is not a primitive data type. There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` and a special case of `null`.
 */
declare function isNotPrimitive<T>(val: T | Primitive): val is T;

/**
 * Checks if an object exists in another object's prototype chain.
 */
declare function isPrototypeOf(type: object, object: object): boolean;
declare function isPrototypeOf(type: object): (object: object) => boolean;

/**
 * Returns `true` if the given value is its type's empty value, `null` or `undefined`.
 */
declare function isNilOrEmpty(val: any): boolean;

/**
 * Returns `true` if the given value is not its type's empty value, nor `null` nor `undefined`.
 */
declare function isNotNilOrEmpty(val: any): boolean;

/**
 * Checks if input value is complement of `Array`.
 */
declare function isNotArray(val: any): boolean;

/**
 * Checks if input value is a non empty `Array`.
 */
declare function isNonEmptyArray(val: any): val is any[];

/**
 * Checks if input value is complement of `Boolean`.
 */
declare function isNotBoolean(val: any): boolean;

/**
 * Returns true if the given value is not its type's empty value; `false` otherwise.
 */
declare function isNotEmpty(val: any): boolean;

/**
 * Checks if input value is complement of `null` or `undefined`.
 */
/* tslint:disable-next-line:no-null-undefined-union null or undefined is the accurate type here */
declare function isNotNil<T>(val: T | null | undefined): val is T;

/**
 * Checks if input value is complement of `null`.
 */
declare function isNotNull(val: any): boolean;

/**
 * Checks if input value is complement of `String`.
 */
declare function isNotString(val: any): boolean;

/**
 * Checks if input value is a non empty `String`.
 */
declare function isNonEmptyString(val: any): boolean;

/**
 * Checks if input value is complement `undefined`.
 */
declare function isNotUndefined(val: any): boolean;

/**
 * Checks if input value is `Symbol`.
 */
declare function isSymbol(val: any): val is Symbol;

/**
 * Checks if input value is `null`.
 */
declare function isNull(val: any): val is null;

/**
 * Checks if input value is `String`.
 */
declare function isString(val: any): val is string;

/**
 * Checks if input value is an empty `String`.
 */
declare function isEmptyString(val: any): val is string;

/**
 * Checks if input value is `undefined`.
 */
declare function isUndefined(val: any): val is undefined;

/**
 * Tests whether or not an object is similar to an array.
 */
declare function isArrayLike(val: any): boolean;

/**
 * Tests whether or not an object is similar to an array.
 */
declare function isNotArrayLike(val: any): boolean;

/**
 * Checks if input value is `Generator Function`.
 */
declare function isGeneratorFunction(val: any): val is Function;

/**
 * Checks if input value is complement of `Generator Function`.
 */
declare function isNotGeneratorFunction(val: any): boolean;

/**
 * Checks if input value is `Async Function`.
 */
declare function isAsyncFunction(val: any): val is Function;

/**
 * Checks if input value is complement of `Async Function`.
 */
declare function isNotAsyncFunction(val: any): boolean;

/**
 * Checks if input value is `Function`.
 */
declare function isFunction(val: any): val is Function;

/**
 * Checks if input value is complement of `Function`.
 */
declare function isNotFunction(val: any): boolean;

/**
 * Checks if input value is language type of `Object`.
 */
declare function isObj(val: any): val is {} | Function;
declare function isObject(val: any): val is {} | Function; // alias

/**
 * Checks if input value is complement of language type of `Object`.
 */
declare function isNotObj(val: any): boolean;
declare function isNotObject(val: any): boolean; // alias

/**
 * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
 */
declare function isObjLike(val: any): val is object;
declare function isObjectLike(val: any): val is object; // alias

/**
 * Checks if value is not object-like.
 * A value is object-like if it's not null and has a typeof result of "object".
 */
declare function isNotObjLike(val: any): boolean;
declare function isNotObjectLike(val: any): boolean; // alias

/**
 * Check to see if an object is a plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 */
declare function isPlainObj(val: any): val is object;
declare function isPlainObject(val: any): val is object; // alias

/**
 * Check to see if an object is not a plain object
 * (created using `{}`, `new Object()` or `Object.create(null)`).
 */
declare function isNotPlainObj(val: any): boolean;
declare function isNotPlainObject(val: any): boolean; // alias

/**
 * Checks if value is `Date` object.
 */
declare function isDate(val: any): val is Date;

/**
 * Checks if value is complement of `Date` object.
 */
declare function isNotDate(val: any): boolean;

/**
 * Checks if value is valid `Date` object.
 */
declare function isValidDate(val: any): val is Date;

/**
 * Checks if value is complement of valid `Date` object.
 */
declare function isNotValidDate(val: any): boolean;

/**
 * Checks if value is complement of valid `Date` object.
 */
declare function isInvalidDate(val: any): boolean; // alias of isNotValidDate

/**
 * Checks if value is `Map`.
 */
declare function isMap(val: any): val is Map<any, any>;

/**
 * Checks if value is complement of `Map` object.
 */
declare function isNotMap(val: any): boolean;

/**
 * Checks whether the passed value is `NaN` and its type is `Number`.
 * It is a more robust version of the original, global isNaN().
 */
declare function isNaN(val: any): val is typeof NaN;

/**
 * Checks if value is a natural number.
 * Natural numbers correspond to all non-negative integers and 0.
 */
declare function isNaturalNumber(val: any): boolean;

/**
 * Checks whether the passed value is complement of `NaN` and its type is not `Number`.
 */
declare function isNotNaN(val: any): boolean;

/**
 * Checks if value is a `Number` primitive or object.
 */
declare function isNumber(val: any): val is number;

/**
 * Checks if value is a complement of `Number` primitive or object.
 */
declare function isNotNumber(val: any): boolean;

/**
 * Checks if value is a positive `Number` primitive or object. Zero is considered neither
 * positive or negative.
 */
declare function isPositive(val: any): val is number;

/**
 * Checks if value is a negative `Number` primitive or object. Zero is considered neither
 * positive or negative.
 */
declare function isNegative(val: any): val is number;

/**
 * Checks if value is a positive zero (+0).
 */
declare function isPositiveZero(val: any): boolean;

/**
 * Checks if value is a negative zero (-0).
 */
declare function isNegativeZero(val: any): boolean;

/**
 * Checks if value is a non-positive `Number` primitive or object. This includes all
 * negative numbers and zero.
 */
declare function isNonPositive(val: any): val is number;

/**
 * Checks if value is a non-negative `Number` primitive or object. This includes all
 * positive numbers and zero.
 */
declare function isNonNegative(val: any): val is number;

/**
 * Checks whether the passed value is a finite `Number`.
 */
declare function isFinite(val: any): boolean;

/**
 * Checks whether the passed value is complement of finite `Number`.
 */
declare function isNotFinite(val: any): boolean;

/**
 * Checks whether the passed value is an `integer`.
 */
declare function isInteger(val: any): val is number;

/**
 * Checks whether the passed value is a signed 32 bit `integer`.
 */
declare function isInteger32(val: any): boolean;

/**
 * Checks whether the passed value is an unsigned 32 bit integer number.
 */
declare function isUinteger32(val: any): boolean;
declare function isUint32(val: any): boolean; // alias

/**
 * Checks whether the passed value is complement of `integer`.
 */
declare function isNotInteger(val: any): boolean;

/**
 * Checks if value is a BigInt.
 */
declare function isBigInt(val: any): boolean;

/**
 * Returns `true` if the given value is its type's empty value, `false`, `undefined`
 * as well as strings containing only whitespace characters; `false` otherwise.
 */
declare function isBlank(val: any): boolean;

/**
 * Checks whether the passed value is a `float`.
 */
declare function isFloat(val: any): val is number;

/**
 * Checks whether the passed value is a safe `integer`.
 */
declare function isSafeInteger(val: any): boolean;

/**
 * Checks whether the passed value is complement of a `float`.
 */
declare function isNotFloat(val: any): boolean;

/**
 * Checks if value is a valid `Number`. A valid `Number` is a number that is not `NaN`,
 * `Infinity` or `-Infinity`.
 */
declare function isValidNumber(val: any): boolean;

/**
 * Checks if value is not a valid `Number`. A valid `Number` is a number that is not `NaN`,
 * `Infinity` or `-Infinity`.
 */
declare function isNotValidNumber(val: any): boolean;

/**
 * Checks if value is odd integer number.
 * An odd number is an integer which is not a multiple DIVISIBLE of two.
 */
declare function isOdd(val: any): boolean;

/**
 * Checks if value is even integer number.
 * An even number is an integer which is "evenly divisible" by two.
 * Zero is an even number because zero divided by two equals zero,
 * which despite not being a natural number, is an integer.
 * Even numbers are either positive or negative.
 */
declare function isEven(val: any): boolean;

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError` or `URIError` object.
 */
declare function isError(val: any): val is Error;

/**
 * Checks if input value is a pair.
 */
declare function isPair(val: any): val is any[];

/**
 * Checks if input value is complement of a pair.
 */
declare function isNotPair(val: any): boolean;

/**
 * Checks if value is `RegExp` object.
 */
declare function isRegExp(val: any): boolean;

/**
 * Checks if value is `Set`.
 */
declare function isSet(val: any): val is Set<any>;

/**
 * Checks if value is complement of `Set` object.
 */
declare function isNotSet(val: any): boolean;

/**
 * Checks if value is complement of `RegExp` object.
 */
declare function isNotRegExp(val: any): boolean;

/**
 * Checks if input value is a sparse Array.
 * An array with at least one "empty slot" in it is often called a "sparse array."
 * Empty slot doesn't mean that the slot contains `null` or `undefined` values,
 * but rather that the slots don't exist.
 */
declare function isSparseArray(val: any): boolean;

/**
 * Checks whether the passed value is
 * {@link https://github.com/getify/You-Dont-Know-JS/blob/9959fc904d584bbf0b02cf41c192f74ff4238581/types-grammar/ch4.md#the-curious-case-of-the-|a sentinel value}.
 */
declare function isSentinelValue(val: any): boolean;

/**
 * A function that returns `undefined`.
 */
declare function stubUndefined(): undefined;

/**
 * A function that returns `null`.
 */
declare function stubNull(): null;

/**
 * A function that returns new empty array on every call.
 */
declare function stubArray(): any[];

/**
 * This function returns a new empty object.
 */
declare function stubObj(): {};
declare function stubObject(): {}; // alias

/**
 * A function that returns empty string.
 */
declare function stubString(): '';

/**
 * A function that performs no operations.
 */
declare function noop(...args: any[]): undefined;

/**
 * Picks values from list by indexes.
 */
declare function pickIndexes<T>(indexes: number[], list: T[]): T[];
declare function pickIndexes(indexes: number[]): <T>(list: T[]) => T[];

/**
 * Creates a list from arguments.
 */
declare function list(...items: any[]): any[];

/**
 * Returns a singleton array containing the value provided.
 * If value is already an array, it is returned as is.
 */
declare function ensureArray<T>(value: T | T[]): T[];

/**
 * Returns the result of concatenating the given lists or strings.
 * Note: RA.concatAll expects all elements to be of the same type.
 * It will throw an error if you concat an Array with a non-Array value.
 * Dispatches to the concat method of the preceding element, if present.
 * Can also concatenate multiple elements of a [fantasy-land compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 * Returns undefined if empty array was passed.
 */
declare function concatAll<S extends Semigroup>(
  foldable: Foldable<S>
): S | undefined;

/**
 * Returns the result of concatenating the given lists or strings.
 */
declare function concatRight<T extends any[]>(firstList: T, secondList: T): T;
declare function concatRight<T extends any[]>(
  firstList: T
): (secondList: T) => T;
declare function concatRight(firstList: string, secondList: string): string;
declare function concatRight(firstList: string): (secondList: string) => string;

/**
 * Acts as multiple path: arrays of paths in, array of values out. Preserves order.
 */
declare function paths(ps: Array<Array<string | number>>, obj: object): any[];
declare function paths(
  ps: Array<Array<string | number>>
): (obj: object) => any[];

/**
 * If the given, non-null object has a value at the given path, returns the value at that path.
 * Otherwise returns the result of invoking the provided function with the object.
 */
declare function pathOrLazy<T>(
  defaultValueFn: () => T,
  path: Array<number | string>,
  obj: object
): T;
declare function pathOrLazy<T>(
  defaultValueFn: () => T,
  path: Array<number | string>
): (obj: object) => T;
declare function pathOrLazy<T>(defaultValueFn: () => T): {
  (path: Array<number | string>, obj: object): T;
  (path: Array<number | string>): (obj: object) => T;
};

/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the Apply spec of fantasy land.
 */
declare function liftFN<T>(arity: number, fn: Variadic<Apply<T>, T>): Apply<T>;
declare function liftFN(
  arity: number
): <T>(fn: Variadic<Apply<T>, T>) => Apply<T>;

/**
 * "lifts" a function of arity > 1 so that it may "map over" objects that satisfy
 * the Apply spec of fantasy land.
 */
declare function liftF<T>(fn: Variadic<Apply<T>, T>): Apply<T>;

/**
 * The catamorphism for either. If the either is right than the right function will be executed with
 * the right value and the value of the function returned. Otherwise the left function
 * will be called with the left value.
 */
declare function cata<V1, V2, T1, T2>(
  leftFn: (leftValue: V1) => T1,
  rightFn: (rightValue: V2) => T2,
  either: Catamorphism<V1 | V2>
): T1 | T2;
declare function cata<V1, V2, T1, T2>(
  leftFn: (leftValue: V1) => T1,
  rightFn: (rightValue: V2) => T2
): (either: Catamorphism<V1 | V2>) => T1 | T2;
declare function cata<V1, V2, T1, T2>(
  leftFn: (leftValue: V1) => T1
): {
  (rightFn: (rightValue: V2) => T2, either: Catamorphism<V1 | V2>): T1 | T2;
  (rightFn: (rightValue: V2) => T2): (either: Catamorphism<V1 | V2>) => T1 | T2;
};

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 */
type PickRenameMulti<
  R extends { [K: string]: string },
  T extends { [s in keyof R]: any },
> = {
  [P in keyof T as P extends keyof R ? R[P] : P]: T[P];
};
declare function renameKeys<
  MAP extends Dictionary<string>,
  OBJ extends { readonly [s in keyof MAP]: any },
>(keysMap: MAP, obj: OBJ): PickRenameMulti<MAP, OBJ>;
declare function renameKeys<MAP extends Dictionary<string>>(
  keysMap: MAP
): <OBJ extends { readonly [s in keyof MAP]: any }>(
  obj: OBJ
) => PickRenameMulti<MAP, OBJ>;

type Keyable = string | number | symbol;
type RenameObjectKey<
  OKey extends keyof OBJ, // eslint-disable-line no-use-before-define
  OBJ extends { readonly [s in OKey]: any },
  NKey extends Keyable,
> = Omit<OBJ, OKey> & Record<NKey, OBJ[OKey]>;
/**
 * Creates a new object with the own properties of the provided object, but a
 * single key is renamed from `oldKey` to `newKey`.
 */
declare function renameKey<OKey extends Keyable>(
  oldKey: OKey
): <NKey extends Keyable>(
  newKey: NKey
) => <OBJ extends { readonly [s in OKey]: any }>(
  obj: OBJ
) => RenameObjectKey<OKey, OBJ, NKey>;
declare function renameKey<OKey extends Keyable, NKey extends Keyable>(
  oldKey: OKey,
  newKey: NKey
): <OBJ extends { readonly [s in OKey]: any }>(
  obj: OBJ
) => RenameObjectKey<OKey, OBJ, NKey>;
declare function renameKey<
  OKey extends keyof OBJ, // eslint-disable-line no-use-before-define
  OBJ extends { readonly [s in OKey]: any },
  NKey extends Keyable,
>(oldKey: OKey, newKey: NKey, obj: OBJ): RenameObjectKey<OKey, OBJ, NKey>;

/**
 * Creates a new object with the own properties of the provided object, and the
 * keys copied according to the keysMap object as `{oldKey: newKey}`.
 * When no key from the keysMap is found, then a shallow clone of an object is returned.
 */
declare function copyKeys(keysMap: Dictionary<string>, obj: object): object;
declare function copyKeys(keysMap: Dictionary<string>): (obj: object) => object;

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to logic of renaming function.
 */
declare function renameKeysWith(
  renameFn: (key: string) => string,
  obj: object
): object;
declare function renameKeysWith(
  renameFn: (key: string) => string
): (obj: object) => object;

/**
 * Creates a new object with the own properties of the provided object, but the
 * key `key` renamed according to logic of renaming function.
 */
declare function renameKeyWith(
  renameFn: (key: string) => string,
  key: string,
  obj: object
): object;
declare function renameKeyWith(
  renameFn: (key: string) => string,
  key: string
): (obj: object) => object;
declare function renameKeyWith(renameFn: (key: string) => string): {
  (key: string, obj: object): object;
  (key: string): (obj: object) => object;
};

/**
 * Functional equivalent of merging object properties with object spread.
 */
declare function mergeProps(ps: string[], obj: object): object;
declare function mergeProps(ps: string[]): (obj: object) => object;

/**
 * Merge objects under corresponding paths.
 */
declare function mergePaths(
  paths: Array<Array<string | number>>,
  obj: object
): object;
declare function mergePaths(
  paths: Array<Array<string | number>>
): (obj: object) => object;

/**
 * Create a new object with the own properties of the object under the `p`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 */
declare function mergeProp(p: string, source: object, obj: object): object;
declare function mergeProp(p: string, source: object): (obj: object) => object;
declare function mergeProp(p: string): {
  (source: object, obj: object): object;
  (source: object): (obj: object) => object;
};

/**
 * Create a new object with the own properties of the object under the `path`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 */
declare function mergePath(
  path: Array<string | number>,
  source: object,
  obj: object
): object;
declare function mergePath(
  path: Array<string | number>,
  source: object
): (obj: object) => object;
declare function mergePath(path: Array<string | number>): {
  (source: object, obj: object): object;
  (source: object): (obj: object) => object;
};

/**
 * Returns a partial copy of an object containing only the keys
 * that don't satisfy the supplied predicate.
 */
declare function omitBy<T, U extends Dictionary<T>>(
  pred: DictPred<T>,
  obj: U
): U;
declare function omitBy<T, U extends Dictionary<T>>(
  pred: DictPred<T>
): (obj: U) => U;

/**
 * Weave a configuration into function returning the runnable monad like `Reader` or `Free`.
 */
declare function weave(fn: Function, config: any): Function;
declare function weave(fn: Function): (config: any) => Function;

/**
 * Weave a configuration into function returning the runnable monad like `Reader` or `Free`.
 */
declare function weaveLazy(fn: Function, configAccessor: Function): Function;
declare function weaveLazy(fn: Function): (configAccessor: Function) => Function;

/**
 * Returns a curried equivalent of the provided function, with the specified arity.
 * This function is like curryN, except that the provided arguments order is reversed.
 */
declare function curryRightN(arity: number, fn: Function): Function;
declare function curryRightN(arity: number): (fn: Function) => Function;

/**
 * Returns a curried equivalent of the provided function.
 * This function is like curry, except that the provided arguments order is reversed.
 */
declare function curryRight(fn: Function): Function;

/**
 * {@link http://ramdajs.com/docs/#map|R.map} function that more closely resembles Array.prototype.map.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 */
declare function mapIndexed<T, U>(
  iterator: (elem: T, key: number, list: T[]) => U,
  list: ReadonlyArray<T>
): U[];
declare function mapIndexed<T, U>(
  iterator: (elem: T, key: number, list: T[]) => U
): (list: ReadonlyArray<T>) => U[];
declare function mapIndexed<T, U>(
  iterator: (elem: T, key: number, list: Dictionary<T>) => U,
  list: Dictionary<T>
): Dictionary<U>;
declare function mapIndexed<T, U>(
  iterator: (elem: T, key: number, list: Dictionary<T>) => U
): (list: Dictionary<T>) => Dictionary<U>;
declare function mapIndexed<T, U>(
  iterator: (elem: T, key: number, list: Functor<T>) => U,
  list: Functor<T>
): Functor<U>;
declare function mapIndexed<T, U>(
  iterator: (elem: T, key: number, list: Functor<T>) => U
): (list: Functor<T>) => Functor<U>;
declare function mapIndexed(
  iterator: (char: string, key: number, str: string) => string,
  str: string
): string[];
declare function mapIndexed(
  iterator: (char: string, key: number, str: string) => string
): (str: string) => string[];

/**
 * {@link http://ramdajs.com/docs/#reduce|R.reduce} function that more closely resembles Array.prototype.reduce.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 */
declare function reduceIndexed<T, TResult, R extends T[]>(
  iterator: (acc: TResult, elem: T, key: number, list: R) => TResult,
  acc: TResult,
  list: R
): TResult;
declare function reduceIndexed<T, TResult, R extends T[]>(
  iterator: (acc: TResult, elem: T, key: number, list: R) => TResult,
  acc: TResult
): (list: R) => TResult;
declare function reduceIndexed<T, TResult, R extends T[]>(
  iterator: (acc: TResult, elem: T, key: number, list: R) => TResult
): {
  (acc: TResult): (list: R) => TResult;
  (acc: TResult, list: R): TResult;
};

/**
 * {@link http://ramdajs.com/docs/#filter|R.filter} function that more closely resembles `Array.prototype.filter`.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 *
 * `filterIndexed` implementation is simple: `
 *  const filterIndexed = R.addIndex(R.filter);
 * `
 */
declare function filterIndexed<T>(
  iterator: (elem: T, idx: number, list: T[]) => Boolean,
  list: ReadonlyArray<T>
): T[];
declare function filterIndexed<T>(
  iterator: (elem: T, idx: number, list: T[]) => Boolean
): (list: ReadonlyArray<T>) => T[];
declare function filterIndexed<T>(
  iterator: (elem: T, idx: number, list: Dictionary<T>) => Boolean,
  list: Dictionary<T>
): Dictionary<T>;
declare function filterIndexed<T>(
  iterator: (elem: T, idx: number, list: Dictionary<T>) => Boolean
): (list: Dictionary<T>) => Dictionary<T>;
declare function filterIndexed<T>(
  iterator: (elem: T, idx: number, list: Filterable<T>) => Boolean,
  list: Filterable<T>
): Filterable<T>;
declare function filterIndexed<T>(
  iterator: (elem: T, idx: number, list: Filterable<T>) => Boolean
): (list: Filterable<T>) => Filterable<Boolean>;
declare function filterIndexed(
  iterator: (char: string, idx: number, str: string) => Boolean,
  str: string
): string[];
declare function filterIndexed(
  iterator: (char: string, idx: number, str: string) => Boolean
): (str: string) => string[];

/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 */
declare function reduceP<T, TResult, R extends T[]>(
  fn: (acc: TResult, elem: T) => TResult,
  acc: TResult,
  list: R
): TResult;
declare function reduceP<T, TResult, R extends T[]>(
  fn: (acc: TResult, elem: T) => TResult,
  acc: TResult
): (list: R) => TResult;
declare function reduceP<T, TResult, R extends T[]>(
  fn: (acc: TResult, elem: T) => TResult
): {
  (acc: TResult, list: R): TResult;
  (acc: TResult): (list: R) => TResult;
};

/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * Similar to {@link RA.reduceP|reduceP} except moves through the input list from the right to the left.
 * The iterator function receives two values: (value, acc),
 * while the arguments' order of reduceP's iterator function is (acc, value).
 */
declare function reduceRightP<T, TResult, R extends T[]>(
  fn: (elem: T, acc: TResult) => TResult,
  acc: TResult,
  list: R
): TResult;
declare function reduceRightP<T, TResult, R extends T[]>(
  fn: (elem: T, acc: TResult) => TResult,
  acc: TResult
): (list: R) => TResult;
declare function reduceRightP<T, TResult, R extends T[]>(
  fn: (elem: T, acc: TResult) => TResult
): {
  (acc: TResult, list: R): TResult;
  (acc: TResult): (list: R) => TResult;
};
/**
 * Returns `true` if data structure focused by the given lens equals provided value.
 */
declare function lensEq(lens: Function, value: any, data: any): boolean;
declare function lensEq(lens: Function, value: any): (data: any) => boolean;
declare function lensEq(lens: Function): (value: any) => (data: any) => boolean;

/**
 * Returns `false` if data structure focused by the given lens equals provided value.
 */
declare function lensNotEq(lens: Function, value: any, data: any): boolean;
declare function lensNotEq(lens: Function, value: any): (data: any) => boolean;
declare function lensNotEq(
  lens: Function
): (value: any) => (data: any) => boolean;

/**
 * Returns `true` if data structure focused by the given lens satisfies the predicate.
 * Note that the predicate is expected to return boolean value and will be evaluated
 * as `false` unless the predicate returns `true`.
 */
declare function lensSatisfies(
  predicate: Function,
  lens: Function,
  data: any
): boolean;
declare function lensSatisfies(
  predicate: Function,
  lens: Function
): (data: any) => boolean;
declare function lensSatisfies(
  predicate: Function
): (lens: Function) => (data: any) => boolean;

/**
 * Returns `true` if data structure focused by the given lens doesn't satisfy the predicate.
 * Note that the predicate is expected to return boolean value.
 */
declare function lensNotSatisfy(
  predicate: Function,
  lens: Function,
  data: any
): boolean;
declare function lensNotSatisfy(
  predicate: Function,
  lens: Function
): (data: any) => boolean;
declare function lensNotSatisfy(
  predicate: Function
): (lens: Function) => (data: any) => boolean;

/**
 * Returns a "view" of the given data structure, determined by the given lens
 * The lens's focus determines which portion of the data structure is visible.
 * Returns the defaultValue if "view" is null, undefined or NaN; otherwise the "view" is returned.
 */
declare function viewOr(defaultValue: any, lens: Function, data: any): any;
declare function viewOr(defaultValue: any, lens: Function): (data: any) => any;
declare function viewOr(
  defaultValue: any
): (lens: Function) => (data: any) => any;

/**
 * Defines an isomorphism that will work like a lens. It takes two functions.
 * The function that converts and the function that recovers.
 */

declare function lensIso(to: Function, from: Function): Function;
declare function lensIso(to: Function): (from: Function) => Function;
declare namespace lensIso {
  function from(lens: Function): Function;
}

/**
 * Creates a [Traversable](https://github.com/fantasyland/fantasy-land#traversable) lens
 * from an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning function.
 *
 * When executed, it maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 */
declare function lensTraverse(of: Function): Function;

/**
 * Returns true if the specified object property is not equal,
 * in R.equals terms, to the given value; false otherwise.
 */
declare function propNotEq(
  prop: string | number,
  value: any,
  obj: object
): boolean;
declare function propNotEq(
  prop: string | number,
  value: any
): (obj: object) => boolean;
declare function propNotEq(prop: string | number): {
  (value: any, obj: object): boolean;
  (value: any): (obj: object) => boolean;
};

/**
 * Determines whether a nested path on an object doesn't have a specific value,
 * in R.equals terms. Most likely used to filter a list.
 */
declare function pathNotEq(
  path: Array<string | number>,
  value: any,
  obj: object
): boolean;
declare function pathNotEq(
  path: Array<string | number>,
  value: any
): (obj: object) => boolean;
declare function pathNotEq(path: Array<string | number>): {
  (value: any, obj: object): boolean;
  (value: any): (obj: object) => boolean;
};

/**
 * Checks if `value` is between `low` and up to but not including `high`.
 */
declare function inRange(low: number, high: number, value: number): boolean;
declare function inRange(low: number, high: number): (value: number) => boolean;
declare function inRange(low: number): {
  (high: number, value: number): boolean;
  (high: number): (value: number) => boolean;
};

/**
 * Spreads object under property path onto provided object.
 */
declare function spreadPath(path: Array<string | number>, obj: object): object;
declare function spreadPath(
  path: Array<string | number>
): (obj: object) => object;

/**
 * Spreads object under property onto provided object.
 */
declare function spreadProp(prop: string | number, obj: object): object;
declare function spreadProp(prop: string | number): (obj: object) => object;

/**
 * Flattens a property path so that its fields are spread out into the provided object.
 */
declare function flattenPath(path: Array<string | number>, obj: object): object;
declare function flattenPath(
  path: Array<string | number>
): (obj: object) => object;

/**
 * Flattens a property so that its fields are spread out into the provided object.
 */
declare function flattenProp(prop: string | number, obj: object): object;
declare function flattenProp(prop: string | number): (obj: object) => object;

/**
 * Creates a new object out of a list of keys and a list of values by applying the function
 * to each equally-positioned pair in the lists.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 */
declare function zipObjWith<T, U, V>(
  fn: (value: T, key: U) => [string, V],
  keys: U[],
  values: T[]
): { [k: string]: V };
declare function zipObjWith<T, U, V>(
  fn: (value: T, key: U) => [string, V]
): (keys: U[], values: T[]) => { [k: string]: V };
declare function zipObjWith<T, U, V>(
  fn: (value: T, key: U) => [string, V]
): {
  (keys: U[], values: T[]): { [k: string]: V };
  (keys: U[]): (values: T[]) => { [k: string]: V };
};

/**
 * Creates a new list out of the supplied object by applying the function to each key/value pairing.
 */
declare function unzipObjWith<T, U, V>(
  fn: (v: T, k: string) => [U, V],
  obj: { [k: string]: T }
): [U[], V[]];
declare function unzipObjWith<T, U, V>(
  fn: (v: T, k: string) => [U, V]
): (obj: { [k: string]: T }) => [U[], V[]];

/**
 * Composable shortcut for `Promise.all`.
 *
 * The `allP` method returns a single Promise that resolves when all of the promises
 * in the iterable argument have resolved or when the iterable argument contains no promises.
 * It rejects with the reason of the first promise that rejects.
 */
declare function allP<T>(iterable: Iterable<T>): Promise<T[]>;

/**
 * Returns a Promise that is resolved with an array of reasons when all of the provided Promises reject, or rejected when any Promise is resolved.
 * This pattern is like allP, but fulfillments and rejections are transposed - rejections become the fulfillment values and vice versa.
 */
declare function noneP<T>(iterable: Iterable<T | Promise<T>>): Promise<T[]>;

/**
 * allSettledP returns a promise that is fulfilled with an array of promise state snapshots,
 * but only after all the original promises have settled, i.e. become either fulfilled or rejected.
 * We say that a promise is settled if it is not pending, i.e. if it is either fulfilled or rejected.
 */
declare function allSettledP<T>(
  iterable: Iterable<T>
): Promise<Array<SettledPromise<T>>>;

/**
 * Returns a promise that is fulfilled by the first given promise to be fulfilled,
 * or rejected with an array of rejection reasons if all of the given promises are rejected.
 */
declare function anyP<T>(iterable: Iterable<T>): Promise<T>;
declare function firstP<T>(iterable: Iterable<T>): Promise<T>; // alias

/**
 * Returns a promise that is fulfilled by the last given promise to be fulfilled,
 * or rejected with an array of rejection reasons if all of the given promises are rejected.
 */
declare function lastP<T>(iterable: Iterable<T>): Promise<T>;

/**
 * Composable shortcut for `Promise.resolve`.
 *
 * Returns a Promise object that is resolved with the given value.
 * If the value is a thenable (i.e. has a "then" method), the returned promise will
 * "follow" that thenable, adopting its eventual state.
 */
declare function resolveP<T>(value?: T): Promise<T>;

/**
 * Composable shortcut for `Promise.reject`.
 *
 * Returns a Promise object that is rejected with the given reason.
 */
declare function rejectP<T>(value?: T): Promise<T>;

/**
 * Creates a promise which resolves/rejects after the specified milliseconds.
 */
declare function delayP(milliseconds: number): Promise<undefined>;
declare function delayP<T>(options: { timeout: number; value: T }): Promise<T>;
declare namespace delayP {
  function reject(milliseconds: number): Promise<undefined>;
  function reject<T>(options: { timeout: number; value: T }): Promise<T>;
}

/**
 * Composable shortcut for `Promise.catch`.
 * The catchP function returns a Promise. It takes two arguments: a callback function for the rejections of the Promise
 * and the promise instance itself.
 */
declare function catchP<A, B = unknown>(
  onRejected: (error: any) => B | Promise<B>,
  promise: Promise<A>
): Promise<A | B>;
declare function catchP<A, B = unknown>(
  onRejected: (error: any) => B | Promise<B>
): (promise: Promise<A>) => Promise<A | B>;

/**
 * Composable shortcut for `Promise.then` that allows for success and failure call backs.
 * The thenCatchP function returns a Promise. It takes three arguments: a callback function for the success of the Promise,
 * a callback function for the failure of the Promise, and the promise instance itself.
 */
declare function thenCatchP<A, B>(
  onFulfilled: Function,
  onRejected: (error: any) => B | Promise<B>,
  thenable: Promise<A>
): Promise<A | B>;
declare function thenCatchP<A, B>(
  onFulfilled: Function,
  onRejected: (error: any) => B | Promise<B>
): (thenable: Promise<A>) => Promise<A | B>;
declare function thenCatchP<A, B>(
  onFulfilled: Function
): (
  onRejected: (error: any) => B | Promise<B>
) => (thenable: Promise<A>) => Promise<A | B>;

/**
 * Runs the given list of functions in order with the supplied object, then returns the object.
 * Also known as the normal order sequencing combinator.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 */
declare function seq<T>(fns: Function[], x: T): T;
declare function seq<T>(fns: Function[]): (x: T) => T;
declare function sequencing<T>(fns: Function[], x: T): T; // alias
declare function sequencing<T>(fns: Function[]): (x: T) => T; // alias

/**
 * Returns the elements of the given list or string (or object with a slice method)
 * from fromIndex (inclusive).
 * Dispatches to the slice method of the third argument, if present.
 */
declare function sliceFrom<T>(
  fromIndex: number,
  list: string | T[]
): string | T[];
declare function sliceFrom(
  fromIndex: number
): <T>(list: string | T[]) => string | T[];

/**
 * Returns the elements of the given list or string (or object with a slice method)
 * to toIndex (exclusive).
 * Dispatches to the slice method of the second argument, if present.
 */
declare function sliceTo<T>(toIndex: number, list: string | T[]): string | T[];
declare function sliceTo(
  toIndex: number
): <T>(list: string | T[]) => string | T[];

/**
 * Returns a partial copy of an array omitting the indexes specified.
 */
declare function omitIndexes<T>(indexes: number[], list: T[]): T[];
declare function omitIndexes(indexes: number[]): <T>(list: T[]) => T[];

/**
 * Returns `true` if the supplied list or string has a length greater than `valueLength`.
 */
declare function lengthGt<T>(valueLength: number, list: string | T[]): boolean;
declare function lengthGt(
  valueLength: number
): <T>(list: string | T[]) => boolean;

/**
 * Returns `true` if the supplied list or string has a length less than `valueLength`.
 */
declare function lengthLt<T>(valueLength: number, list: string | T[]): boolean;
declare function lengthLt(
  valueLength: number
): <T>(list: string | T[]) => boolean;

/**
 * Returns `true` if the supplied list or string has a length less than or equal to
 * `valueLength`.
 */
declare function lengthLte<T>(valueLength: number, list: string | T[]): boolean;
declare function lengthLte(
  valueLength: number
): <T>(list: string | T[]) => boolean;

/**
 * Returns `true` if the supplied list or string has a length greater than or equal to
 * `valueLength`.
 */
declare function lengthGte<T>(valueLength: number, list: string | T[]): boolean;
declare function lengthGte(
  valueLength: number
): <T>(list: string | T[]) => boolean;

/**
 * Returns `true` if the supplied list or string has a length equal to `valueLength`.
 */
declare function lengthEq<T>(valueLength: number, list: string | T[]): boolean;
declare function lengthEq(
  valueLength: number
): <T>(list: string | T[]) => boolean;

/**
 * Returns `true` if the supplied list or string has a length not equal to `valueLength`.
 */
declare function lengthNotEq<T>(
  valueLength: number,
  list: string | T[]
): boolean;
declare function lengthNotEq(
  valueLength: number
): <T>(list: string | T[]) => boolean;

/**
 *  Returns true if all items in the list are equivalent using `R.equals` for equality comparisons.
 */
declare function allEqual<T>(list: T[]): boolean;

/**
 * Returns `true` if its arguments are not equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 */
declare function notEqual(a: any, b: any): boolean;
declare function notEqual(a: any): (b: any) => boolean;

/**
 * Constructs and returns a new string which contains the specified
 * number of copies of the string on which it was called, concatenated together.
 */
declare function repeatStr(value: string, count: number): string;
declare function repeatStr(value: string): (count: number) => string;

/*
 * Returns true if all items in the list are equivalent using `R.identical` for equality comparisons.
 */
declare function allIdentical<T>(list: T[]): boolean;

/*
 * Returns true if all items in the list are equivalent to user provided value using `R.identical` for equality comparisons.
 */
declare function allIdenticalTo<T>(val: T, list: T[]): boolean;
declare function allIdenticalTo<T>(val: T): (list: T[]) => boolean;

/*
 * Returns true if all items in the list are equivalent to user provided value using `R.equals` for equality comparisons.
 */
declare function allEqualTo<T>(val: T, list: T[]): boolean;
declare function allEqualTo<T>(val: T): <T>(list: T[]) => boolean;

/*
 * Flattens the list to the specified depth.
 */
declare function flattenDepth<T>(depth: number, list: T[]): T[];
declare function flattenDepth(depth: number): (list: any[]) => any[];

/**
 * Checks if input value is a `thenable`.
 * `thenable` is an object or function that defines a `then` method.
 */
declare function isThenable(val: any): boolean;

/**
 * Checks if input value is a native `Promise`.
 * The Promise object represents the eventual completion (or failure)
 * of an asynchronous operation, and its resulting value.
 */
declare function isPromise(val: any): val is Promise<any>;

/**
 * Checks if input value is the Boolean primitive `true`. Will return false for Boolean
 * objects created using the `Boolean` function as a constructor.
 */
declare function isTrue(val: any): boolean;

/**
 * Checks if input value is the Boolean primitive `false`. Will return false for Boolean objects created using the `Boolean` function as a constructor.
 */
declare function isFalse(val: any): boolean;

/**
 * In JavaScript, a `truthy` value is a value that is considered true
 * when evaluated in a Boolean context. All values are truthy unless
 * they are defined as falsy (i.e., except for `false`, `0`, `""`, `null`, `undefined`, and `NaN`).
 */
declare function isTruthy(val: any): boolean;

/**
 * A falsy value is a value that translates to false when evaluated in a Boolean context.
 * Falsy values are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
 */
declare function isFalsy(val: any): boolean;

/**
 * Returns the second argument if predicate function returns `true`,
 * otherwise the third argument is returned.
 */
declare function defaultWhen<DefVal, Val>(
  predicate: Function,
  defaultVal: DefVal,
  val: Val
): DefVal | Val;
declare function defaultWhen<DefVal, Val>(
  predicate: Function,
  defaultVal: DefVal
): (val: Val) => DefVal | Val;
declare function defaultWhen(
  predicate: Function
): <DefVal, Val>(defaultVal: DefVal) => (val: Val) => DefVal | Val;

/**
 * Returns the first element of the list which matches the predicate.
 * Returns default value if no element matches or matched element is `null`, `undefined` or `NaN`.
 * Dispatches to the find method of the second argument, if present.
 * Acts as a transducer if a transformer is given in list position.
 */
declare function findOr<DefVal, T>(
  defaultVal: DefVal,
  predicate: (element: T) => boolean,
  list: ReadonlyArray<T>
): T | DefVal;
declare function findOr<DefVal, T>(
  defaultVal: DefVal,
  predicate: (element: T) => boolean
): (list: ReadonlyArray<T>) => T | DefVal;
declare function findOr<DefVal, T>(
  defaultVal: DefVal
): {
  (predicate: (element: T) => boolean, list: ReadonlyArray<T>): T | DefVal;
  (predicate: (element: T) => boolean): (list: ReadonlyArray<T>) => T | DefVal;
};

/**
 * Y-combinator
 *
 * The Y combinator is an interesting function which only works with functional languages,
 * showing how recursion can still be done even without any variable or function declarations,
 * only functions and parameters
 */
declare function Y(le: Function): Function;

/**
 * A function which calls the two provided functions and returns the complement of `&&`ing
 * the results. It returns true if the first function is false-y and the complement of the
 * second function otherwise. Note that this is short-circuited, meaning that the second
 * function will not be invoked if the first returns a false-y value. In short it will
 * return true unless both predicates return true.
 *
 * In addition to functions, `RA.notBoth` also accepts any fantasy-land compatible
 * applicative functor.
 */
declare function notBoth(
  firstPredicate: Function,
  secondPredicate: Function
): Function;

/**
 * A function which calls the two provided functions and returns the complement of `||`ing
 * the results. It returns false if the first function is truth-y and the complement of the
 * second function otherwise. Note that this is short-circuited, meaning that the second
 * function will not be invoked if the first returns a truth-y value. In short it will
 * return true if neither predicate returns true.
 *
 * In addition to functions, `RA.neither` also accepts any fantasy-land compatible
 * applicative functor.
 */
declare function neither(
  firstPredicate: Function,
  secondPredicate: Function
): Function;

/**
 * Returns false if both arguments are truesy; true otherwise.
 */
declare function nand(a: any, b: any): Boolean;
declare function nand(a: any): (b: any) => Boolean;

/**
 * Returns true if both arguments are falsy; false otherwise.
 */
declare function nor(a: any, b: any): Boolean;
declare function nor(a: any): (b: any) => Boolean;

/**
 * Takes a list of predicates and returns a predicate that returns true for a given list of
 * arguments if one or more of the provided predicates is not satisfied by those arguments.
 * It is the complement of Ramda's allPass.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 */
declare function notAllPass(predicates: Function[]): Function;

/**
 * Takes a list of predicates and returns a predicate that returns true for a given list of
 * arguments if none of the provided predicates are satisfied by those arguments. It is the
 * complement of Ramda's anyPass.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 */
declare function nonePass(predicates: Function[]): Function;

/**
 * Takes a combining predicate and a list of functions and returns a function which will map
 * the arguments it receives to the list of functions and returns the result of passing the
 * values returned from each function to the combining predicate. A combining predicate is a
 * function that combines a list of Boolean values into a single Boolean value, such as
 * `R.any` or `R.all`. It will test each value using `RA.isTruthy`, meaning the functions
 * don't necessarily have to be predicates.
 *
 * The function returned is curried to the number of functions supplied, and if called with
 * more arguments than functions, any remaining arguments are passed in to the combining
 * predicate untouched.
 */
declare function argsPass<T>(
  combiningPredicate: (fn: (a: T) => boolean) => (list: T[]) => boolean,
  predicates: Pred[]
): Pred;
declare function argsPass<T>(
  combiningPredicate: (fn: (a: T) => boolean) => (list: T[]) => boolean
): (predicates: Pred[]) => Pred;

/**
 * Returns a function which is called with the given arguments. If any of the given arguments are null or undefined,
 * the corresponding default value for that argument is used instead.
 */
declare function fnull(fn: Function, defaults: any[]): Function;
declare function fnull(fn: Function): (defaults: any[]) => Function;

/**
 * Accepts a function with any arity and returns a function with arity of zero.
 * The returned function ignores any arguments supplied to it.
 */
declare function dropArgs(fn: Function): Function;

/**
 * Creates an array with all falsy values removed.
 * The values false, null, 0, "", undefined, and NaN are falsy.
 */
declare function compact<T>(
  list: T[]
): Array<Exclude<NonNullable<T>, false | '' | 0>>;

/**
 * Returns a new list containing the contents of the given list, followed by the given
 * element. Like {@link http://ramdajs.com/docs/#append|R.append} but with argument order
 * reversed.
 */
declare function appendFlipped<T>(list: T[], val: any): T[];
declare function appendFlipped<T>(list: T[]): (val: any) => T[];

/**
 * Returns true if the specified value is equal, in R.equals terms,
 * to at least one element of the given list or false otherwise.
 * Given list can be a string.
 *
 * Like {@link http://ramdajs.com/docs/#contains|R.includes} but with argument order reversed.
 */
declare function included<T>(list: T[], val: T): boolean;
declare function included<T>(list: T[]): (val: T) => boolean;

/**
 * Can be used as a way to compose multiple invokers together to form polymorphic functions,
 * or functions that exhibit different behaviors based on their argument(s).
 * Consumes dispatching functions and keep trying to invoke each in turn, until a non-nil value is returned.
 *
 * Accepts a list of dispatching functions and returns a new function.
 * When invoked, this new function is applied to some arguments,
 * each dispatching function is applied to those same arguments until one of the
 * dispatching functions returns a non-nil value.
 */
declare function dispatch(functions: Function[]): Function;

/**
 * Returns a new list with the item at the position `fromIdx` moved to the position `toIdx`.
 * If the `toIdx` is out of the `list` range, the item will be placed at the last position
 * of the `list`. When negative indices are provided, the behavior of the move is
 * unspecified.
 */
declare function move<T>(fromIdx: number, toIdx: number, list: T[]): T[];
declare function move<T>(fromIdx: number): (toIdx: number, list: T[]) => T[];
declare function move<T>(fromIdx: number): {
  (toIdx: number, list: T[]): T[];
  (toIdx: number): (list: T[]) => T[];
};

/**
 * Returns the value of a number rounded to the nearest integer.
 */
declare function round(val: number): number;

/**
 * Subtracts its first argument from its second argument.
 */
declare function subtractNum(subtrahend: number, minuend: number): number;
declare function subtractNum(subtrahend: number): (minuend: number) => number;

/**
 * Returns the smallest integer greater than or equal to a given number.
 *
 * Note: ceil(null) returns integer 0 and does not give a NaN error.
 */
declare function ceil(val: number): number;

/**
 * Returns the largest integer less than or equal to a given number.
 *
 * Note: floor(null) returns integer 0 and do not give a NaN error.
 */
declare function floor(val: number): number;

/**
 * Returns the integer part of a number by removing any fractional digits.
 *
 */
declare function trunc(val: number): number;

/**
 * Returns the sign of a number, indicating whether the number is positive, negative or zero.
 */
declare function sign(val: number): number;

/**
 * Takes a generator function and returns an async function.
 * The async function returned is a curried function whose arity matches that of the generator function.
 *
 * Note: This function is handy for environments that does support generators but doesn't support async/await.
 */
declare function async(generatorFn: Function): Function;

/**
 * Replace all substring matches in a string with a replacement.
 */
declare function replaceAll(
  searchValue: string | RegExp,
  replaceValue: string,
  str: string
): string;
declare function replaceAll(
  searchValue: string | RegExp
): (replaceValue: string, str: string) => string;
declare function replaceAll(searchValue: string | RegExp): {
  (replaceValue: string, str: string): string;
  (replaceValue: string): (str: string) => string;
};

/**
 * Escapes the RegExp special characters.
 */
declare function escapeRegExp(val: string): string;

/**
 * Divides two numbers, where the second number is divided by the first number.
 */
declare function divideNum(divisor: number, dividend: number): number;
declare function divideNum(divisor: number): (dividend: number) => number;

/**
 * Identity type.
 */
declare const Identity: Function;

/**
 * Converts value to an array.
 */
declare function toArray<T>(iterable: Iterable<T> | T): any[];

/**
 * Returns true if all items in the list are unique. `R.equals` is used to determine equality.
 */
declare function allUnique<T>(list: T[]): boolean;

/**
 * Returns true if at least one item of the list is repeated. `R.equals` is used to determine equality.
 */
declare function notAllUnique<T>(list: T[]): boolean;

/**
 * Removes whitespace from the beginning of a string
 */
declare function trimStart(value: string): string;
declare function trimLeft(value: string): string;

/**
 * Removes whitespace from the end of a string.
 */
declare function trimEnd(value: string): string;
declare function trimRight(value: string): string;

/**
 * Removes specified characters from the end of a string.
 */
declare function trimCharsEnd(chars: string, value: string): string;
declare function trimCharsEnd(chars: string): (value: string) => string;

/**
 * Removes specified characters from the beginning of a string.
 */
declare function trimCharsStart(chars: string, value: string): string;
declare function trimCharsStart(chars: string): (value: string) => string;

/**
 * The function pads the current string with a given string
 * (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 */
declare function padCharsEnd(
  padString: string,
  targetLength: number,
  value: string
): string;
declare function padCharsEnd(
  padString: string,
  targetLength: number
): (value: string) => string;
declare function padCharsEnd(
  padString: string
): (targetLength: number, value: string) => string;

/**
 * The function pads the current string with an empty string
 * so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 */
declare function padEnd(targetLength: number, value: string): string;
declare function padEnd(targetLength: number): (value: string) => string;

/**
 * The function pads the current string with a given string
 * (repeated, if needed) so that the resulting string reaches a given lenght.
 * The padding is applied to the start of the current string.
 */
declare function padCharsStart(
  padString: string,
  targetLength: number,
  value: string
): string;
declare function padCharsStart(
  padString: string,
  targetLength: number
): (value: string) => string;
declare function padCharsStart(
  padString: string
): (targetLength: number, value: string) => string;

/**
 * Pads string on the left side if it's shorter than length.
 */
declare function padStart(targetLength: number, value: string): string;
declare function padStart(targetLength: number): (value: string) => string;

/**
 * Sort a list of objects by a property.
 */
declare function sortByProp<T>(prop: string | number, list: readonly T[]): T[];
declare function sortByProp(
  prop: string | number
): <T>(list: readonly T[]) => T[];

/**
 * Sort a list of objects by a list of props (if first prop value is equivalent, sort by second, etc).
 */
declare function sortByProps(props: string[], list: object[]): object[];
declare function sortByProps(props: string[]): (list: object[]) => object[];

/**
 * When given a number n and an array, returns an array containing every nth element.
 */
declare function skipTake<T>(n: number, list: T[]): T[];
declare function skipTake<T>(n: number): (list: T[]) => T[];

/**
 * Sort a list of objects by a list of paths (if first path value is equivalent, sort by second, etc).
 */
declare function sortByPaths(props: string[][], list: object[]): object[];
declare function sortByPaths(props: string[][]): (list: object[]) => object[];

/**
 * Determine if input value is an indexed data type.
 */
declare function isIndexed(val: any): val is string | any[];

/**
 * Invokes the method at path of object with given arguments.
 */
declare function invokeArgs(
  pathToMethod: string[],
  args: any[],
  obj: object
): any;
declare function invokeArgs(
  pathToMethod: string[],
  args: any[]
): (obj: object) => any;
declare function invokeArgs(
  pathToMethod: string[]
): (args: any[], obj: object) => any;

/**
 * Invokes the method at path of object.
 */
declare function invoke(pathToMethod: string[], obj: object): any;
declare function invoke(pathToMethod: string[]): (obj: object) => any;

/**
 * Converts double-precision 64-bit binary format IEEE 754 to signed 32 bit integer number.
 */
declare function toInteger32(n: number): number;
declare function toInt32(n: number): number; // alias

/**
 * Converts double-precision 64-bit binary format IEEE 754 to unsigned 32 bit integer number.
 */
declare function toUinteger32(val: number): number;
declare function toUint32(val: number): number; // alias

/**
 * Converts value to a number.
 */
declare function toNumber(val: any): number;

/**
 * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end.
 *
 * `Note`: JavaScript follows the IEEE-754 standard for resolving floating-point values which can produce unexpected results.
 */
declare function rangeStep(step: number, from: number, to: number): number[];
declare function rangeStep(step: number, from: number): (to: number) => number[];
declare function rangeStep(step: number): {
  (from: number, to: number): number[];
  (from: number): (to: number) => number[];
};

/**
 * Returns true if two lists have at least one element common to both lists.
 */
declare function overlaps<T>(list1: T[], list2: T[]): boolean;
declare function overlaps<T>(list1: T[]): (list2: T[]) => boolean;
