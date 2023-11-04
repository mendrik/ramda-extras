/**
 * Check whether `A1` is equal to `A2` or not.
 * @param A1
 * @param A2
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Equals<42 | 0, 42 | 0>                    // true
 * type test1 = A.Equals<{a: string}, {b: string}>          // false
 * type test3 = A.Equals<{a: string}, {readonly a: string}> // false
 * ```
 */
declare type Equals<A1 extends any, A2 extends any> = (<A>() => A extends A2
  ? 1
  : 0) extends <A>() => A extends A1 ? 1 : 0
  ? 1
  : 0

declare type Boolean = 0 | 1

/**
 * Describes index keys for any type
 */
declare type Key = string | number | symbol

/**
 * A [[List]]
 * @param A its type
 * @returns [[List]]
 * @example
 * ```ts
 * type list0 = [1, 2, 3]
 * type list1 = number[]
 * ```
 */
declare type List<A = any> = ReadonlyArray<A>

/**
 * Get in `O` the type of a field of key `K`
 * @param O to extract from
 * @param K to extract at
 * @returns [[Any]]
 * @example
 * ```ts
 * import {O} from 'ts-toolbelt'
 *
 * type User = {
 *  info: {
 *      name: string
 *      age: number
 *      payment: {}
 *  }
 *  id: number
 * }
 *
 * type test0 = O.At<User, 'id'> // number
 * ```
 */
declare type At<A extends any, K extends Key> = A extends List
  ? number extends A["length"]
    ? K extends number | `${number}`
      ? A[never] | undefined
      : undefined
    : K extends keyof A
    ? A[K]
    : undefined
  : unknown extends A
  ? unknown
  : K extends keyof A
  ? A[K]
  : undefined

/**
 * Ask TS to re-check that `A1` extends `A2`.
 * And if it fails, `A2` will be enforced anyway.
 * Can also be used to add constraints on parameters.
 * @param A1 to check against
 * @param A2 to cast to
 * @returns `A1 | A2`
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Cast<'42', string> // '42'
 * type test1 = A.Cast<'42', number> // number
 * ```
 */
declare type Cast<A1 extends any, A2 extends any> = A1 extends A2 ? A1 : A2

/**
 * Describes the depth strategy when modifying types
 */
declare type Depth = "flat" | "deep"
/**
 * Make an object properties (all) `never`. We use this to intersect `object`s and
 * preserve the combine modifiers like `+readonly` and `?optional`.
 */
declare type Anyfy<O extends object> = {
  [K in keyof O]: any
}

/**
 * @hidden
 */
declare type BuiltIn =
  | Function
  | Error
  | Date
  | {
      readonly [Symbol.toStringTag]: string
    }
  | RegExp
  | Generator

/**
 * Check whether `U` contains `U1`
 * @param U to be inspected
 * @param U1 to check within
 * @returns [[Boolean]]
 * @example
 * ```ts
 * ```
 */
declare type Has<U extends any, U1 extends any> = [U1] extends [U] ? 1 : 0

/**
 * Check whether `A1` is part of `A2` or not. The difference with
 * `extends` is that it forces a [[Boolean]] return.
 * @param A1
 * @param A2
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Extends<'a' | 'b', 'b'> // Boolean
 * type test1 = A.Extends<'a', 'a' | 'b'> // True
 *
 * type test2 = A.Extends<{a: string}, {a: any}>      // True
 * type test3 = A.Extends<{a: any}, {a: any, b: any}> // False
 *
 * type test4 = A.Extends<never, never> // False
 * /// Nothing cannot extend nothing, use `A.Equals`
 * ```
 */
declare type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
  ? 0
  : A1 extends A2
  ? 1
  : 0

declare const _: unique symbol
/**
 * A placeholder that is used in various ways
 */
declare type x = typeof _ & {}

/**
 * Logical `&&` operator (behaves like the JS one)
 * @param B1 Left-hand side
 * @param B2 Right-hand side
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {B} from 'ts-toolbelt'
 *
 * type test0 = B.And<B.True, B.False>          // False
 * type test1 = B.And<B.True, B.True>           // True
 * type test2 = B.And<B.True | B.False, B.True> // Boolean
 * ```
 */
declare type And<B1 extends Boolean, B2 extends Boolean> = {
  0: {
    0: 0
    1: 0
  }
  1: {
    0: 0
    1: 1
  }
}[B1][B2]

/**
 * Logical `!` operator (behaves like the JS one)
 * @param B to negate
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {B} from 'ts-toolbelt'
 *
 * type test0 = B.Not<B.True>  // False
 * type test1 = B.Not<B.False> // True
 * ```
 */
declare type Not<B extends Boolean> = {
  0: 1
  1: 0
}[B]

/**
 * Logical `||` operator (behaves like the JS one)
 * @param B1 Left-hand side
 * @param B2 Right-hand side
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {B} from 'ts-toolbelt'
 *
 * type test0 = B.Or<B.True, B.False>    // True
 * type test1 = B.Or<B.True, B.True>     // True
 * type test2 = B.Or<B.Boolean, B.False> // Boolean
 * ```
 */
declare type Or<B1 extends Boolean, B2 extends Boolean> = {
  0: {
    0: 0
    1: 1
  }
  1: {
    0: 1
    1: 1
  }
}[B1][B2]

/**
 * An entry of `IterationMap`
 */
declare type Iteration = [
  value: number,
  sign: "-" | "0" | "+",
  prev: keyof IterationMap,
  next: keyof IterationMap,
  oppo: keyof IterationMap
]
declare type IterationMap = {
  __: [number, "-" | "0" | "+", "__", "__", "__"]
  "-100": [-100, "-", "__", "-99", "100"]
  "-99": [-99, "-", "-100", "-98", "99"]
  "-98": [-98, "-", "-99", "-97", "98"]
  "-97": [-97, "-", "-98", "-96", "97"]
  "-96": [-96, "-", "-97", "-95", "96"]
  "-95": [-95, "-", "-96", "-94", "95"]
  "-94": [-94, "-", "-95", "-93", "94"]
  "-93": [-93, "-", "-94", "-92", "93"]
  "-92": [-92, "-", "-93", "-91", "92"]
  "-91": [-91, "-", "-92", "-90", "91"]
  "-90": [-90, "-", "-91", "-89", "90"]
  "-89": [-89, "-", "-90", "-88", "89"]
  "-88": [-88, "-", "-89", "-87", "88"]
  "-87": [-87, "-", "-88", "-86", "87"]
  "-86": [-86, "-", "-87", "-85", "86"]
  "-85": [-85, "-", "-86", "-84", "85"]
  "-84": [-84, "-", "-85", "-83", "84"]
  "-83": [-83, "-", "-84", "-82", "83"]
  "-82": [-82, "-", "-83", "-81", "82"]
  "-81": [-81, "-", "-82", "-80", "81"]
  "-80": [-80, "-", "-81", "-79", "80"]
  "-79": [-79, "-", "-80", "-78", "79"]
  "-78": [-78, "-", "-79", "-77", "78"]
  "-77": [-77, "-", "-78", "-76", "77"]
  "-76": [-76, "-", "-77", "-75", "76"]
  "-75": [-75, "-", "-76", "-74", "75"]
  "-74": [-74, "-", "-75", "-73", "74"]
  "-73": [-73, "-", "-74", "-72", "73"]
  "-72": [-72, "-", "-73", "-71", "72"]
  "-71": [-71, "-", "-72", "-70", "71"]
  "-70": [-70, "-", "-71", "-69", "70"]
  "-69": [-69, "-", "-70", "-68", "69"]
  "-68": [-68, "-", "-69", "-67", "68"]
  "-67": [-67, "-", "-68", "-66", "67"]
  "-66": [-66, "-", "-67", "-65", "66"]
  "-65": [-65, "-", "-66", "-64", "65"]
  "-64": [-64, "-", "-65", "-63", "64"]
  "-63": [-63, "-", "-64", "-62", "63"]
  "-62": [-62, "-", "-63", "-61", "62"]
  "-61": [-61, "-", "-62", "-60", "61"]
  "-60": [-60, "-", "-61", "-59", "60"]
  "-59": [-59, "-", "-60", "-58", "59"]
  "-58": [-58, "-", "-59", "-57", "58"]
  "-57": [-57, "-", "-58", "-56", "57"]
  "-56": [-56, "-", "-57", "-55", "56"]
  "-55": [-55, "-", "-56", "-54", "55"]
  "-54": [-54, "-", "-55", "-53", "54"]
  "-53": [-53, "-", "-54", "-52", "53"]
  "-52": [-52, "-", "-53", "-51", "52"]
  "-51": [-51, "-", "-52", "-50", "51"]
  "-50": [-50, "-", "-51", "-49", "50"]
  "-49": [-49, "-", "-50", "-48", "49"]
  "-48": [-48, "-", "-49", "-47", "48"]
  "-47": [-47, "-", "-48", "-46", "47"]
  "-46": [-46, "-", "-47", "-45", "46"]
  "-45": [-45, "-", "-46", "-44", "45"]
  "-44": [-44, "-", "-45", "-43", "44"]
  "-43": [-43, "-", "-44", "-42", "43"]
  "-42": [-42, "-", "-43", "-41", "42"]
  "-41": [-41, "-", "-42", "-40", "41"]
  "-40": [-40, "-", "-41", "-39", "40"]
  "-39": [-39, "-", "-40", "-38", "39"]
  "-38": [-38, "-", "-39", "-37", "38"]
  "-37": [-37, "-", "-38", "-36", "37"]
  "-36": [-36, "-", "-37", "-35", "36"]
  "-35": [-35, "-", "-36", "-34", "35"]
  "-34": [-34, "-", "-35", "-33", "34"]
  "-33": [-33, "-", "-34", "-32", "33"]
  "-32": [-32, "-", "-33", "-31", "32"]
  "-31": [-31, "-", "-32", "-30", "31"]
  "-30": [-30, "-", "-31", "-29", "30"]
  "-29": [-29, "-", "-30", "-28", "29"]
  "-28": [-28, "-", "-29", "-27", "28"]
  "-27": [-27, "-", "-28", "-26", "27"]
  "-26": [-26, "-", "-27", "-25", "26"]
  "-25": [-25, "-", "-26", "-24", "25"]
  "-24": [-24, "-", "-25", "-23", "24"]
  "-23": [-23, "-", "-24", "-22", "23"]
  "-22": [-22, "-", "-23", "-21", "22"]
  "-21": [-21, "-", "-22", "-20", "21"]
  "-20": [-20, "-", "-21", "-19", "20"]
  "-19": [-19, "-", "-20", "-18", "19"]
  "-18": [-18, "-", "-19", "-17", "18"]
  "-17": [-17, "-", "-18", "-16", "17"]
  "-16": [-16, "-", "-17", "-15", "16"]
  "-15": [-15, "-", "-16", "-14", "15"]
  "-14": [-14, "-", "-15", "-13", "14"]
  "-13": [-13, "-", "-14", "-12", "13"]
  "-12": [-12, "-", "-13", "-11", "12"]
  "-11": [-11, "-", "-12", "-10", "11"]
  "-10": [-10, "-", "-11", "-9", "10"]
  "-9": [-9, "-", "-10", "-8", "9"]
  "-8": [-8, "-", "-9", "-7", "8"]
  "-7": [-7, "-", "-8", "-6", "7"]
  "-6": [-6, "-", "-7", "-5", "6"]
  "-5": [-5, "-", "-6", "-4", "5"]
  "-4": [-4, "-", "-5", "-3", "4"]
  "-3": [-3, "-", "-4", "-2", "3"]
  "-2": [-2, "-", "-3", "-1", "2"]
  "-1": [-1, "-", "-2", "0", "1"]
  "0": [0, "0", "-1", "1", "0"]
  "1": [1, "+", "0", "2", "-1"]
  "2": [2, "+", "1", "3", "-2"]
  "3": [3, "+", "2", "4", "-3"]
  "4": [4, "+", "3", "5", "-4"]
  "5": [5, "+", "4", "6", "-5"]
  "6": [6, "+", "5", "7", "-6"]
  "7": [7, "+", "6", "8", "-7"]
  "8": [8, "+", "7", "9", "-8"]
  "9": [9, "+", "8", "10", "-9"]
  "10": [10, "+", "9", "11", "-10"]
  "11": [11, "+", "10", "12", "-11"]
  "12": [12, "+", "11", "13", "-12"]
  "13": [13, "+", "12", "14", "-13"]
  "14": [14, "+", "13", "15", "-14"]
  "15": [15, "+", "14", "16", "-15"]
  "16": [16, "+", "15", "17", "-16"]
  "17": [17, "+", "16", "18", "-17"]
  "18": [18, "+", "17", "19", "-18"]
  "19": [19, "+", "18", "20", "-19"]
  "20": [20, "+", "19", "21", "-20"]
  "21": [21, "+", "20", "22", "-21"]
  "22": [22, "+", "21", "23", "-22"]
  "23": [23, "+", "22", "24", "-23"]
  "24": [24, "+", "23", "25", "-24"]
  "25": [25, "+", "24", "26", "-25"]
  "26": [26, "+", "25", "27", "-26"]
  "27": [27, "+", "26", "28", "-27"]
  "28": [28, "+", "27", "29", "-28"]
  "29": [29, "+", "28", "30", "-29"]
  "30": [30, "+", "29", "31", "-30"]
  "31": [31, "+", "30", "32", "-31"]
  "32": [32, "+", "31", "33", "-32"]
  "33": [33, "+", "32", "34", "-33"]
  "34": [34, "+", "33", "35", "-34"]
  "35": [35, "+", "34", "36", "-35"]
  "36": [36, "+", "35", "37", "-36"]
  "37": [37, "+", "36", "38", "-37"]
  "38": [38, "+", "37", "39", "-38"]
  "39": [39, "+", "38", "40", "-39"]
  "40": [40, "+", "39", "41", "-40"]
  "41": [41, "+", "40", "42", "-41"]
  "42": [42, "+", "41", "43", "-42"]
  "43": [43, "+", "42", "44", "-43"]
  "44": [44, "+", "43", "45", "-44"]
  "45": [45, "+", "44", "46", "-45"]
  "46": [46, "+", "45", "47", "-46"]
  "47": [47, "+", "46", "48", "-47"]
  "48": [48, "+", "47", "49", "-48"]
  "49": [49, "+", "48", "50", "-49"]
  "50": [50, "+", "49", "51", "-50"]
  "51": [51, "+", "50", "52", "-51"]
  "52": [52, "+", "51", "53", "-52"]
  "53": [53, "+", "52", "54", "-53"]
  "54": [54, "+", "53", "55", "-54"]
  "55": [55, "+", "54", "56", "-55"]
  "56": [56, "+", "55", "57", "-56"]
  "57": [57, "+", "56", "58", "-57"]
  "58": [58, "+", "57", "59", "-58"]
  "59": [59, "+", "58", "60", "-59"]
  "60": [60, "+", "59", "61", "-60"]
  "61": [61, "+", "60", "62", "-61"]
  "62": [62, "+", "61", "63", "-62"]
  "63": [63, "+", "62", "64", "-63"]
  "64": [64, "+", "63", "65", "-64"]
  "65": [65, "+", "64", "66", "-65"]
  "66": [66, "+", "65", "67", "-66"]
  "67": [67, "+", "66", "68", "-67"]
  "68": [68, "+", "67", "69", "-68"]
  "69": [69, "+", "68", "70", "-69"]
  "70": [70, "+", "69", "71", "-70"]
  "71": [71, "+", "70", "72", "-71"]
  "72": [72, "+", "71", "73", "-72"]
  "73": [73, "+", "72", "74", "-73"]
  "74": [74, "+", "73", "75", "-74"]
  "75": [75, "+", "74", "76", "-75"]
  "76": [76, "+", "75", "77", "-76"]
  "77": [77, "+", "76", "78", "-77"]
  "78": [78, "+", "77", "79", "-78"]
  "79": [79, "+", "78", "80", "-79"]
  "80": [80, "+", "79", "81", "-80"]
  "81": [81, "+", "80", "82", "-81"]
  "82": [82, "+", "81", "83", "-82"]
  "83": [83, "+", "82", "84", "-83"]
  "84": [84, "+", "83", "85", "-84"]
  "85": [85, "+", "84", "86", "-85"]
  "86": [86, "+", "85", "87", "-86"]
  "87": [87, "+", "86", "88", "-87"]
  "88": [88, "+", "87", "89", "-88"]
  "89": [89, "+", "88", "90", "-89"]
  "90": [90, "+", "89", "91", "-90"]
  "91": [91, "+", "90", "92", "-91"]
  "92": [92, "+", "91", "93", "-92"]
  "93": [93, "+", "92", "94", "-93"]
  "94": [94, "+", "93", "95", "-94"]
  "95": [95, "+", "94", "96", "-95"]
  "96": [96, "+", "95", "97", "-96"]
  "97": [97, "+", "96", "98", "-97"]
  "98": [98, "+", "97", "99", "-98"]
  "99": [99, "+", "98", "100", "-99"]
  "100": [100, "+", "99", "__", "-100"]
}

/**
 * Move `I`'s position forward
 * @param I to move
 * @returns [[Iteration]]
 * @example
 * ```ts
 * import {I} from 'ts-toolbelt'
 *
 * type i = I.IterationOf<'20'>
 *
 * type test0 = I.Pos<i>         // 20
 * type test1 = I.Pos<I.Next<i>> // 21
 * ```
 */
declare type Next<I extends Iteration> = IterationMap[I[3]]

/**
 * Move `I`'s position backwards
 * @param I to move
 * @returns [[Iteration]]
 * @example
 * ```ts
 * import {I} from 'ts-toolbelt'
 *
 * type i = I.IterationOf<'20'>
 *
 * type test0 = I.Pos<i>         // 20
 * type test1 = I.Pos<I.Prev<i>> // 19
 * ```
 */
declare type Prev<I extends Iteration> = IterationMap[I[2]]

/**
 * Transform a number into an [[Iteration]]
 * (to use [[Prev]], [[Next]], & [[Pos]])
 * @param N to transform
 * @returns [[Iteration]]
 * @example
 * ```ts
 * import {I} from 'ts-toolbelt'
 *
 * type i = I.IterationOf<0> // ["-1", "1", "0", 0, "0"]
 *
 * type next = I.Next<i>       // ["0", "2", "1", 1, "+"]
 * type prev = I.Prev<i>       // ["-2", "0", "-1", -1, "-"]
 *
 * type nnext = I.Pos<next>    // +1
 * type nprev = I.Pos<prev>    // -1
 * ```
 */
declare type IterationOf<N extends number> = `${N}` extends keyof IterationMap
  ? IterationMap[`${N}`]
  : IterationMap["__"]

/**
 * Get the position of `I` (**number**)
 * @param I to query
 * @returns `number`
 * @example
 * ```ts
 * import {I} from 'ts-toolbelt'
 *
 * type i = I.IterationOf<'20'>
 *
 * type test0 = I.Pos<i>         // 20
 * type test1 = I.Pos<I.Next<i>> // 21
 * ```
 */
declare type Pos<I extends Iteration> = I[0]

/**
 * Get the length of `L`
 * @param L to get length
 * @returns [[String]] or `number`
 * @example
 * ```ts
 * ```
 */
declare type Length<L extends List> = L["length"]

/**
 * Remove the first item out of a [[List]]
 * @param L
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
declare type Tail<L extends List> = L extends readonly []
  ? L
  : L extends readonly [any?, ...infer LTail]
  ? LTail
  : L

/**
 * Alias to create a [[Function]]
 * @param P parameters
 * @param R return type
 * @returns [[Function]]
 * @example
 * ```ts
 * import {F} from 'ts-toolbelt'
 *
 * type test0 = F.Function<[string, number], boolean>
 * /// (args_0: string, args_1: number) => boolean
 * ```
 */
declare type Function$1<P extends List = any, R extends any = any> = (
  ...args: P
) => R

/**
 * Attach `L1` at the end of `L`
 * @param L to concat with
 * @param L1 to be attached
 * @returns [[List]]
 * @example
 * ```ts
 * import {L} from 'ts-toolbelt'
 *
 * type test0 = L.Concat<[1, 2], [3, 4]> // [1, 2, 3, 4]
 * type test1 = L.Concat<[1, 2], [[3], 4]> // [1, 2, [3], 4]
 * type test2 = L.Concat<[1, 2], number[]> // [1, 2, ...number[]]
 * type test3 = L.Concat<readonly [1, 2], readonly [3]> // [1, 2, 3]
 * ```
 */
declare type Concat<L extends List, L1 extends List> = [...L, ...L1]

/**
 * Extract parameters from a [[Function]]
 * @param F to extract from
 * @returns [[List]]
 * @example
 * ```ts
 * import {F} from 'ts-toolbelt'
 *
 * const fn = (name: string, age: number) => {}
 *
 * type test0 = F.ParamsOf<typeof fn>                         // [string, number]
 *
 * type test1 = F.ParamsOf<(name: string, age: number) => {}> // [string, number]
 * ```
 */
declare type Parameters$1<F extends Function$1> = F extends (
  ...args: infer L
) => any
  ? L
  : never

/**
 * Extract the return type of a [[Function]]
 * @param F to extract from
 * @returns [[Any]]
 * @example
 * ```ts
 * import {F} from 'ts-toolbelt'
 *
 * const fn = () => true
 *
 * type test0 = F.ReturnOf<typeof fn>  // boolean
 *
 * type test1 = F.ReturnOf<() => true> // true
 * ```
 */
declare type Return<F extends Function$1> = F extends (...args: List) => infer R
  ? R
  : never

/**
 * Remove `M` out of `U`
 * @param U to remove from
 * @param M to remove out
 * @returns [[Union]]
 * @example
 * ```ts
 * ```
 */
declare type Exclude$1<U extends any, M extends any> = U extends M ? never : U

/**
 * Remove `undefined` & `null` out of `U`
 * @param U to make non-nullable
 * @returns [[Union]]
 * @example
 * ```ts
 * ```
 */
declare type NonNullable$1<U extends any> = Exclude$1<U, undefined | null>

/**
 * @hidden
 */
declare type __Pick<O extends object, K extends keyof O> = {
  [P in K]: O[P]
} & {}
/**
 * @hidden
 */
declare type _Pick<O extends object, K extends Key> = __Pick<O, keyof O & K>

/**
 * @hidden
 */
declare type _Omit<O extends object, K extends Key> = _Pick<
  O,
  Exclude$1<keyof O, K>
>

/**
 * @hidden
 */
declare type NonNullableFlat<O> = {
  [K in keyof O]: NonNullable$1<O[K]>
} & {}

/**
 * @hidden
 */
declare type _RequiredKeys<O extends object> = {
  [K in keyof O]-?: {} extends Pick<O, K> ? never : K
}[keyof O]
/**
 * Get the keys of `O` that are required
 * @param O
 * @returns [[Key]]
 * @example
 * ```ts
 * ```
 */
declare type RequiredKeys$1<O extends object> = O extends unknown
  ? _RequiredKeys<O>
  : never

/**
 * Transform a [[List]] into an [[Object]] equivalent
 * @param L to transform
 * @returns [[Object]]
 * @example
 * ```ts
 * ```
 */
declare type ObjectOf<O extends List> = O extends unknown
  ? number extends Length<O>
    ? _Pick<O, number>
    : _Omit<O, keyof any[]>
  : never

/**
 * Get the keys of `L` that are readonly
 * @param L
 * @returns [[Key]]
 * @example
 * ```ts
 * ```
 */
declare type RequiredKeys<L extends List> = RequiredKeys$1<ObjectOf<L>>

/**
 * @hidden
 */
declare type _SplitParams<
  P extends List,
  PSplit extends List[] = [],
  PRest extends List = Tail<P>
> = {
  0: P extends [...infer A, ...PRest]
    ? _SplitParams<Tail<P>, [...PSplit, A], Tail<PRest>>
    : never
  1: PSplit
  2: P[number][][]
}[number extends Length<P> ? 2 : P extends [] ? 1 : 0]
/**
 * Splits tuples to preserve their labels
 * @hidden
 */
declare type SplitParams<P extends List> = _SplitParams<P> extends infer X
  ? Cast<X, List[]>
  : never
/**
 * @hidden
 */
declare type _JoinParams<PSplit extends List[], L extends List = []> = {
  0: _JoinParams<Tail<PSplit>, [...L, ...PSplit[0]]>
  1: L
  2: PSplit[number][]
}[number extends Length<PSplit> ? 2 : PSplit extends [] ? 1 : 0]
/**
 * Undoes the job of [[SplitParams]]
 * @hidden
 */
declare type JoinParams<P extends List[]> = _JoinParams<P> extends infer X
  ? Cast<X, List>
  : never
/**
 * @hidden
 */
declare type GapOf<
  L1 extends List,
  L2 extends List[],
  LN extends List,
  I extends Iteration
> = L1[Pos<I>] extends x ? Concat<LN, L2[Pos<I>]> : LN
/**
 * @hidden
 */
declare type _GapsOf<
  L1 extends List,
  L2 extends List[],
  LN extends List = [],
  L2D extends List[] = L2,
  I extends Iteration = IterationOf<0>
> = {
  0: _GapsOf<L1, L2, GapOf<L1, L2, LN, I>, Tail<L2D>, Next<I>>
  1: Concat<LN, JoinParams<L2D>>
}[Extends<Pos<I>, Length<L1>>]
/**
 * @hidden
 */
declare type GapsOf<L1 extends List, L2 extends List> = _GapsOf<
  L1,
  SplitParams<L2>
> extends infer X
  ? Cast<X, List>
  : never
/**
 * @hidden
 */
declare type Gaps<L extends List> = Cast<
  NonNullableFlat<{
    [K in keyof L]?: L[K] | x
  }>,
  List
>
/**
 * Curry a [[Function]]
 * @param F to curry
 * @returns [[Function]]
 * @example
 * ```ts
 * import {F} from 'ts-toolbelt'
 *
 * /// If you are looking for creating types for `curry`
 * /// It handles placeholders and variable arguments
 * declare function curry<Fn extends F.Function>(fn: Fn): F.Curry<Fn>
 * ```
 */
declare type Curry<F extends Function$1> = <
  P extends Gaps<Parameters$1<F>>,
  G extends List = GapsOf<P, Parameters$1<F>>,
  R extends any = Return<F>
>(
  ...p: Gaps<Parameters$1<F>> | P
) => RequiredKeys<G> extends never ? R : Curry<(...p: G) => R>

/**
 * Update the fields of `O` with the ones of `O1`
 * (only the existing fields will be updated)
 * @param O to update
 * @param O1 to update with
 * @returns [[Object]]
 * @example
 * ```ts
 * ```
 */
declare type Overwrite<O extends object, O1 extends object> = {
  [K in keyof O]: K extends keyof O1 ? O1[K] : O[K]
} & {}

/** @ignore */ /** */

/**
 * Remove `?` & `readonly` from a [[List]]
 */
declare type Naked<L extends List> = Overwrite<Required<L>, L>

/**
 * All primitive types
 */
declare type Primitive =
  | boolean
  | string
  | number
  | bigint
  | symbol
  | undefined
  | null

/**
 * Add an element `A` at the beginning of `L`
 * @param L to append to
 * @param A to be added to
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
declare type Prepend<L extends List, A extends any> = [A, ...L]

/**
 * Describes how to perform iterations
 */
declare type Way = "->" | "<-"

/**
 * @hidden
 */
declare type _OptionalKeys<O extends object> = {
  [K in keyof O]-?: {} extends Pick<O, K> ? K : never
}[keyof O]

/**
 * @hidden
 */
declare type Longer<L extends List, L1 extends List> = L extends unknown
  ? L1 extends unknown
    ? {
        0: 0
        1: 1
      }[Has<RequiredKeys<L>, RequiredKeys<L1>>]
    : never
  : never
/**
 * @hidden
 */
declare type MergeProp<
  OK,
  O1K,
  fill,
  OOKeys extends Key,
  K extends Key
> = K extends OOKeys
  ? Exclude$1<OK, undefined> | O1K
  : [OK] extends [never]
  ? O1K
  : OK extends fill
  ? O1K
  : OK
/**
 * @hidden
 */
declare type MergeFlatObject<
  O extends object,
  O1 extends object,
  fill,
  OOKeys extends Key = _OptionalKeys<O>
> = {
  [K in keyof (Anyfy<O> & O1)]: MergeProp<At<O, K>, At<O1, K>, fill, OOKeys, K>
} & {}
/**
 * @hidden
 */
declare type MergeFlatList<
  L extends List,
  L1 extends List,
  ignore extends object,
  fill,
  LOK extends Key = _OptionalKeys<L>
> = number extends Length<L | L1>
  ? MergeFlatChoice<L[number], L1[number], ignore, fill>[]
  : Longer<L, L1> extends 1
  ? {
      [K in keyof L]: MergeProp<L[K], At<L1, K>, fill, LOK, K>
    }
  : {
      [K in keyof L1]: MergeProp<At<L, K>, L1[K], fill, LOK, K>
    }
/**
 * @hidden
 */
declare type MergeFlatChoice<
  O extends object,
  O1 extends object,
  ignore extends object,
  fill
> = O extends ignore
  ? O
  : O1 extends ignore
  ? O
  : O extends List
  ? O1 extends List
    ? MergeFlatList<O, O1, ignore, fill>
    : MergeFlatObject<O, O1, fill>
  : MergeFlatObject<O, O1, fill>
/**
 * @hidden
 */
declare type MergeFlat<
  O extends object,
  O1 extends object,
  ignore extends object = BuiltIn,
  fill = undefined
> = O extends unknown
  ? O1 extends unknown
    ? MergeFlatChoice<O, O1, ignore, fill>
    : never
  : never
/**
 * @hidden
 */
declare type MergeDeepList<
  L extends List,
  L1 extends List,
  ignore extends object,
  fill
> = number extends Length<L | L1>
  ? MergeDeepChoice<L[number], L1[number], ignore, fill, never, any>[]
  : Longer<L, L1> extends 1
  ? {
      [K in keyof L]: MergeDeepChoice<
        L[K],
        At<L1, K>,
        ignore,
        fill,
        _OptionalKeys<L>,
        K
      >
    }
  : {
      [K in keyof L1]: MergeDeepChoice<
        At<L, K>,
        L1[K],
        ignore,
        fill,
        _OptionalKeys<L>,
        K
      >
    }
/**
 * @hidden
 */
declare type MergeDeepObject<
  O extends object,
  O1 extends object,
  ignore extends object,
  fill,
  OOKeys extends Key = _OptionalKeys<O>
> = {
  [K in keyof (Anyfy<O> & O1)]: MergeDeepChoice<
    At<O, K>,
    At<O1, K>,
    ignore,
    fill,
    OOKeys,
    K
  >
}
/**
 * @hidden
 */
declare type MergeDeepChoice<
  OK,
  O1K,
  ignore extends object,
  fill,
  OOKeys extends Key,
  K extends Key
> = [OK] extends [never]
  ? MergeProp<OK, O1K, fill, OOKeys, K>
  : [O1K] extends [never]
  ? MergeProp<OK, O1K, fill, OOKeys, K>
  : OK extends ignore
  ? MergeProp<OK, O1K, fill, OOKeys, K>
  : O1K extends ignore
  ? MergeProp<OK, O1K, fill, OOKeys, K>
  : OK extends List
  ? O1K extends List
    ? MergeDeepList<OK, O1K, ignore, fill>
    : MergeProp<OK, O1K, fill, OOKeys, K>
  : OK extends object
  ? O1K extends object
    ? MergeDeepObject<OK, O1K, ignore, fill>
    : MergeProp<OK, O1K, fill, OOKeys, K>
  : MergeProp<OK, O1K, fill, OOKeys, K>
/**
 * @hidden
 */
declare type MergeDeep<
  O extends object,
  O1 extends object,
  ignore extends object,
  fill
> = O extends unknown
  ? O1 extends unknown
    ? MergeDeepChoice<O, O1, ignore, fill, "x", "y">
    : never
  : never
/**
 * Accurately merge the fields of `O` with the ones of `O1`. It is
 * equivalent to the spread operator in JavaScript. [[Union]]s and [[Optional]]
 * fields will be handled gracefully.
 *
 * (⚠️ needs `--strictNullChecks` enabled)
 * @param O to complete
 * @param O1 to copy from
 * @param depth (?=`'flat'`) 'deep' to do it deeply
 * @param ignore (?=`BuiltIn`) types not to merge
 * @param fill (?=`undefined`) types of `O` to be replaced with ones of `O1`
 * @returns [[Object]]
 * @example
 * ```ts
 * import {O} from 'ts-toolbelt'
 *
 * type O = {
 *  name?: string
 *  age? : number
 *  zip? : string
 *  pay  : {
 *      cvv?: number
 *  }
 * }
 *
 * type O1 = {
 *  age : number
 *  zip?: number
 *  city: string
 *  pay : {
 *      cvv : number
 *      ccn?: string
 *  }
 * }
 *
 * type test = O.Merge<O, O1, 'deep'>
 * // {
 * //     name?: string;
 * //     age: number;
 * //     zip?: string | number;
 * //     pay: {
 * //         cvv: number;
 * //         ccn?: string;
 * //     };
 * //     city: string;
 * // }
 * ```
 */
declare type Merge$1<
  O extends object,
  O1 extends object,
  depth extends Depth = "flat",
  ignore extends object = BuiltIn,
  fill extends any = undefined
> = {
  flat: MergeFlat<O, O1, ignore, fill>
  deep: MergeDeep<O, O1, ignore, fill>
}[depth]

/**
 * Add an element `A` at the end of `L`.
 * @param L to append to
 * @param A to be added to
 * @returns [[List]]
 * @example
 * ```ts
 * import {L} from 'ts-toolbelt'
 *
 * type test0 = L.Append<[1, 2, 3], 4> // [1, 2, 3, 4]
 * type test1 = L.Append<[], 'a'> // ['a']
 * type test2 = L.Append<readonly ['a', 'b'], 'c'> // ['a', 'b', 'c']
 * type test3 = L.Append<[1, 2], [3, 4]> // [1, 2, [3, 4]]
 * ```
 */
declare type Append<L extends List, A extends any> = [...L, A]

/**
 * @hidden
 */
declare type __Assign<
  O extends object,
  Os extends List<object>,
  depth extends Depth,
  ignore extends object,
  fill extends any,
  I extends Iteration = IterationOf<0>
> = {
  0: __Assign<
    Merge$1<Os[Pos<I>], O, depth, ignore, fill>,
    Os,
    depth,
    ignore,
    fill,
    Next<I>
  >
  1: O
}[Extends<Pos<I>, Length<Os>>]
/**
 * @hidden
 */
declare type _Assign<
  O extends object,
  Os extends List<object>,
  depth extends Depth,
  ignore extends object,
  fill extends any
> = __Assign<O, Os, depth, ignore, fill> extends infer X
  ? Cast<X, object>
  : never
/**
 * Assign a list of [[Object]] into `O` with [[Merge]]. Merges from right to
 * left, first items get overridden by the next ones (last-in overrides).
 * @param O to assign to
 * @param Os to assign
 * @param depth (?=`'flat'`) 'deep' to do it deeply
 * @param ignore (?=`BuiltIn`) types not to merge
 * @param fill (?=`undefined`) types of `O` to be replaced with ones of `O1`
 * @returns [[Object]]
 * @example
 * ```ts
 * ```
 */
declare type Assign<
  O extends object,
  Os extends List<object>,
  depth extends Depth = "flat",
  ignore extends object = BuiltIn,
  fill extends any = undefined
> = O extends unknown
  ? Os extends unknown
    ? _Assign<O, Os, depth, ignore, fill>
    : never
  : never

/**
 * Transform a [[List]] into an [[Union]]
 * @param L to transform
 * @returns [[Any]]
 * @example
 * ```ts
 * ```
 */
declare type UnionOf<L extends List> = L[number]

/**
 * @hidden
 */
declare type UnNestLoose<L extends List> = (UnionOf<L> extends infer UL
  ? UL extends unknown
    ? UL extends List
      ? UnionOf<UL>
      : UL
    : never
  : never)[] & {}
/**
 * @hidden
 */
declare type Flatter<
  L extends List,
  LN extends List,
  I extends Iteration
> = L[Pos<I>] extends infer LP
  ? LP extends List
    ? Concat<LN, L[Pos<I>]>
    : Append<LN, L[Pos<I>]>
  : never
/**
 * @hidden
 */
declare type UnNestStrict<
  L extends List,
  LN extends List = [],
  I extends Iteration = IterationOf<0>
> = {
  0: UnNestStrict<L, Flatter<L, LN, I>, Next<I>>
  1: LN
}[Extends<Pos<I>, Length<L>>]
/**
 * @hidden
 */
declare type __UnNest<L extends List, strict extends Boolean> = {
  0: UnNestLoose<L>
  1: UnNestStrict<L>
}[And<Not<Extends<number, Length<L>>>, strict>]
/**
 * @hidden
 */
declare type _UnNest<L extends List, strict extends Boolean> = __UnNest<
  Naked<L>,
  strict
> extends infer X
  ? Cast<X, List>
  : never
/**
 * Remove a dimension of `L`
 * @param L to un-nest
 * @param strict (?=`1`) `0` to not preserve tuples
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
declare type UnNest<
  L extends List,
  strict extends Boolean = 1
> = L extends unknown ? _UnNest<L, strict> : never

/**
 * @hidden
 */
declare type __Flatten<
  L extends List,
  LO extends List,
  strict extends Boolean,
  limit extends Iteration,
  I extends Iteration = IterationOf<0>
> = {
  0: __Flatten<_UnNest<L, strict>, L, strict, limit, Next<I>>
  1: L
}[Or<Equals<L, LO>, Extends<limit, I>>]
/**
 * @hidden
 */
declare type _Flatten<
  L extends List,
  strict extends Boolean,
  limit extends number = number
> = __Flatten<L, [], strict, IterationOf<limit>> extends infer X
  ? Cast<X, List>
  : never
/**
 * Remove all dimensions of `L` (10 max)
 * @param L to un-nest
 * @param strict (?=`1`) `0` to not preserve tuples
 * @param limit (?=`string`) to stop un-nesting at
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
declare type Flatten<
  L extends List,
  strict extends Boolean = 1,
  limit extends number = number
> = L extends unknown ? _Flatten<L, strict, limit> : never

/**
 * starts in reverse from `N` till `N` = 0
 * @hidden
 */
declare type TakeForth<
  L extends List,
  N extends Iteration,
  I extends Iteration = Prev<N>,
  LN extends List = []
> = {
  0: TakeForth<L, N, Prev<I>, Prepend<LN, L[Pos<I>]>>
  1: LN
}[Extends<-1, Pos<I>>]
/**
 * starts in reverse from the end till `N` = 0
 * @hidden
 */
declare type TakeBack<L extends List, N extends Iteration> = {
  0: TakeBack<Tail<L>, Prev<N>>
  1: L
}[Extends<0, Pos<N>>]
/**
 * @hidden
 */
declare type __Take<L extends List, N extends Iteration, way extends Way> = {
  "->": TakeForth<L, N>
  "<-": TakeBack<L, N>
}[way]
/**
 * @hidden
 */
declare type _Take<
  L extends List,
  N extends number,
  way extends Way = "->"
> = __Take<L, IterationOf<N>, way> extends infer X ? Cast<X, List> : never
/**
 * Extract `N` entries out of `L`
 * @param L to extract from
 * @param N to extract out
 * @param way (?=`'->'`) to extract from end
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
declare type Take$1<
  L extends List,
  N extends number,
  way extends Way = "->"
> = L extends unknown ? (N extends unknown ? _Take<L, N, way> : never) : never

/**
 * Accurately merge the fields of `L` with the ones of `L1`. It is
 * equivalent to the spread operator in JavaScript. [[Union]]s and [[Optional]]
 * fields will be handled gracefully.
 *
 * (⚠️ needs `--strictNullChecks` enabled)
 * @param L to complete
 * @param L1 to copy from
 * @param depth (?=`'flat'`) 'deep' to do it deeply
 * @param ignore (?=`BuiltIn`) types not to merge
 * @param fill (?=`undefined`) types of `O` to be replaced with ones of `O1`
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
declare type Merge<
  L extends List,
  L1 extends List,
  depth extends Depth = "flat",
  ignore extends object = BuiltIn,
  fill extends any = undefined
> = Cast<Merge$1<L, L1, depth, ignore, fill>, List>

/**
 * Recursively Update a deep property from a given path
 *
 * @param Keys array of keeps into the object
 * @param U The object to change
 * @param T the next type at the key path
 *
 * <created by @harris-miller>
 */
type DeepModify<Keys extends readonly PropertyKey[], U, T> = Keys extends [
  infer K,
  ...infer Rest
]
  ? K extends keyof U
    ? Rest extends readonly []
      ? Omit<U, K> & Record<K, T>
      : Rest extends readonly PropertyKey[]
      ? Omit<U, K> & Record<K, DeepModify<Rest, U[K], T>>
      : never
    : never
  : never

// Here lies a loose collection of tools that compute types for the functions in "index.d.ts"
// The goal of this file is to keep "index.d.ts" readable as well as hiding implementations

// WHEN ADDING A NEW TOOL
// - Add documentation for the tool you've created
// - Add <created by @username> on your tool's docs

// TODO
// - Types need proper descriptions, so that we know what they do

/**
 * Array of functions to compose/pipe with.
 */
type AtLeastOneFunctionsFlow<TArgs extends any[], TResult> =
  | [
      (...args: TArgs) => any,
      ...Array<(args: any) => any>,
      (...args: any[]) => TResult
    ]
  | [(...args: TArgs) => TResult]
type AtLeastOneFunctionsFlowFromRightToLeft<TArgs extends any[], TResult> =
  | [
      (...args: any) => TResult,
      ...Array<(args: any) => any>,
      (...args: TArgs) => any
    ]
  | [(...args: TArgs) => TResult]

/**
 * R.cond's [predicate, transform] pair.
 */
type CondPair<T extends any[], R> = [(...val: T) => boolean, (...val: T) => R]

/**
 * R.cond's [predicate, transform] pair in a typeguarded version
 */
type CondPairTypeguard<T, TFiltered extends T, R> = [
  (value: T) => value is TFiltered,
  (value: TFiltered) => R
]

/**
 * A conditional type to use with default values. (defaultTo, propOr, etc)
 * <created by @lax4mike>
 */
type DefaultTo<Fallback, Value> = Value extends null | undefined
  ? Fallback | Exclude<Value, null | undefined>
  : Value

/**
 * Represents all objects evolvable with Evolver E
 * @param E
 */
type Evolvable<E extends Evolver> = {
  [P in keyof E]?: Evolved<E[P]>
}

/**
 * <needs description>
 * @param O
 * @param E
 */
type Evolve<O extends Evolvable<E>, E extends Evolver> = {
  [P in keyof O]: P extends keyof E ? EvolveValue<O[P], E[P]> : O[P]
}

/**
 * <needs description>
 * @param A
 */
type Evolved<A> = A extends (value: infer V) => any
  ? V
  : A extends Evolver
  ? Evolvable<A>
  : never

/**
 * A set of transformation to run as part of an evolve
 * @param T - the type to be evolved
 */
type Evolver<T extends Evolvable<any> = any> = {
  // if T[K] isn't evolvable, don't allow nesting for that property
  [key in keyof Partial<T>]:
    | ((value: T[key]) => T[key])
    | (T[key] extends Evolvable<any> ? Evolver<T[key]> : never)
}

/**
 * <needs description>
 * @param O
 * @param E
 */
type EvolveNestedValue<O, E extends Evolver> = O extends object
  ? O extends Evolvable<E>
    ? Evolve<O, E>
    : never
  : never

/**
 * <needs description>
 * @param V
 * @param E
 */
type EvolveValue<V, E> = E extends (value: V) => any
  ? ReturnType<E>
  : E extends Evolver
  ? EvolveNestedValue<V, E>
  : never

/**
 * All falsy JavaScript values representable by the type system.
 *
 * @note Actually there are six (seven) falsy values in JS - the sixth being `NaN`;
 * the seventh being `document.all`. However `NaN` is not a valid literal type,
 * and `document.all` is an object so it's probably not a good idea to add it either.
 */
type Falsy = undefined | null | 0 | "" | false

/**
 * A functor satisfying the FantasyLand spec
 * @param A
 */
type Functor<A> =
  | {
      ["fantasy-land/map"]: <B>(fn: (a: A) => B) => Functor<B>
      [key: string]: any
    }
  | { map: <B>(fn: (a: A) => B) => Functor<B>; [key: string]: any }

/**
 * A Functor - a simple type representing a Functor that used `map` is the method prop name
 */
type FunctorMap<A> = {
  map<B>(fn: (a: A) => B): FunctorMap<B>
}

/**
 * A FantasyLand Functor - a simple type representing a Functor wiih the fantasy-land specific prop name
 */
type FunctorFantasyLand<A> = {
  ["fantasy-land/map"]<B>(fn: (a: A) => B): FunctorFantasyLand<B>
}

/**
 * R.any dispatches to `.any` of the second argument, if present.
 * This type infers the type of the first argument of that method and returns it
 */
type InferAnyAType<T> = T extends {
  any: (fn: (a: infer A) => boolean) => boolean
}
  ? A
  : never

/**
 * A pair containing the key and corresponding value of an object.
 * @param K Key type
 * @param V Value type
 */
type KeyValuePair<K, V> = [K, V]

/**
 * <needs description>
 * @param S Type of the full object
 * @param A Type of the lens focus
 */
type Lens<S, A> = (functorFactory: (a: A) => Functor<A>) => (s: S) => Functor<S>

/**
 * Returns true if T1 array length less than or equal to length of array T2, else returns false
 *
 * @param T1 First readonly array
 * @param T2 Second readonly array
 *
 * <created by @valerii15298>
 */
type Arr1LessThanOrEqual<
  T1 extends ReadonlyArray<any>,
  T2 extends ReadonlyArray<any>
> = T1["length"] extends T2["length"]
  ? true
  : T2["length"] extends 0
  ? false
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T2 extends readonly [infer First, ...infer Rest]
  ? Arr1LessThanOrEqual<T1, Rest>
  : never

/**
 * R.all dispatches to `.all` of the second argument, if present.
 * This type infers the type of the first argument of that method and returns it
 */
type InferAllAType<T> = T extends {
  all: (fn: (a: infer A) => boolean) => boolean
}
  ? A
  : never

/**
 * Return true if types T1 and T2 can intersect, e.g. both are primitives or both are objects.
 * Taking into account branded types too.
 *
 * @param T1 First readonly array
 * @param T2 Second readonly array
 *
 * <created by @valerii15298>
 */
type Intersectable<T1, T2> = [T1] extends [T2]
  ? true
  : [T2] extends [T1]
  ? true
  : [T1] extends [object]
  ? [T2] extends [object]
    ? true
    : false
  : [T1] extends [Primitive]
  ? [T2] extends [Primitive]
    ? true
    : false
  : false

/**
 * Check if type `T` is `any`
 *
 * @param T Type to check
 *
 * <created by @valerii15298>
 */
type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * Intersection when produced result can be usable type.
 * For example type `{a: any} & number` will not be reduced to `never`
 *  but `Intersection<{a: any}, number>` will be `never`
 * If one of type is any, another type will be returned.
 *
 * @param T1
 * @param T2
 *
 * <created by @valerii15298>
 */
type Intersection<T1, T2> = Intersectable<T1, T2> extends true
  ? IsAny<T1> extends true
    ? T2
    : IsAny<T2> extends true
    ? T1
    : T1 & T2
  : never

/**
 * Merge second array with first one,
 * resulting array will have the same length as array T1,
 * every item in new array will be item from first array(T1) by corresponding index
 * intersected with item from second array(also with the same index) if such exist
 *
 * examples:
 *   `mergeArrWithLeft<[1, number, number, string], [number, 2, 7]>` => `[1, 2, 7, string]`
 *   `mergeArrWithLeft<[1, string], [number, "exact text", number, any]>` => `[1, "exact text"]`
 *
 * @param T1
 * @param T2
 *
 * <created by @valerii15298>
 */
type mergeArrWithLeft<
  T1 extends ReadonlyArray<any>,
  T2 extends ReadonlyArray<any>
> = readonly [
  ...{
    readonly [Index in keyof T1]: Index extends keyof T2
      ? Intersection<T1[Index], T2[Index]>
      : T1[Index]
  }
]

/**
 * The same as mergeArrWithLeft but will merge smaller array to larger one,
 * so that data will not be lost and maximum length array will be returned
 *
 * example: MergeArrays<[1, number], [number, 2, string]>
 *   will result to => [1, 2, string]
 *
 * @param T1
 * @param T2
 *
 * <created by @valerii15298>
 */
type MergeArrays<
  T1 extends ReadonlyArray<any>,
  T2 extends ReadonlyArray<any>
> = Arr1LessThanOrEqual<T1, T2> extends true
  ? mergeArrWithLeft<T2, T1>
  : mergeArrWithLeft<T1, T2>

/**
 * Given array of functions will return new array which will be constructed
 * merging all functions parameters array using mergeArrays generic.
 *
 * If provided array is not array of functions, return type will be empty array([])
 *
 * @param T Array of functions
 *
 * <created by @valerii15298>
 */
type LargestArgumentsList<T extends ReadonlyArray<any>> = T extends readonly [
  (...args: infer Args) => any,
  ...infer Rest
]
  ? MergeArrays<LargestArgumentsList<Rest>, Args>
  : readonly []

/**
 * Checks if type is `never`
 *
 * Returns `true` if type is `never`, else returns `false`
 *
 * @param T Type to check
 *
 * <created by @valerii15298>
 */
type IsNever<T> = [T] extends [never] ? true : false

/**
 * Checks if array of types is contains `never` type
 *
 * Returns `true` if array contains `never` type, else returns `false`
 *
 * @param T Array of types to check
 *
 * <created by @valerii15298>
 */
type HasNever<T extends readonly any[]> = T extends readonly [
  infer First,
  ...infer Rest
]
  ? IsNever<First> extends true
    ? true
    : HasNever<Rest>
  : false

/**
 * Checks if corresponding types of arguments in functions overlap(have at least one type in common, except never)
 *
 * Returns `unknown` if arguments types overlap, else returns `ErrorMsg`
 *
 * @param T Type to check
 *
 * <created by @valerii15298>
 */
type IfFunctionsArgumentsDoNotOverlap<
  T extends ReadonlyArray<Fn>,
  ErrorMsg extends string
> = HasNever<LargestArgumentsList<T>> extends true ? ErrorMsg : unknown

/**
 * Predicate for an object containing the key.
 */
type ObjPred<T = unknown> = (
  value: any,
  key: unknown extends T ? string : keyof T
) => boolean

/**
 * Values that can be compared using the relational operators `<`/`<=`/`>`/`>=`
 */
type Ord = number | string | boolean | Date

/**
 * `a` is less than `b`
 */
type LT = -1
/**
 * `a` is equal to `b`
 */
type EQ = 0
/**
 * `a` is greater than `b`
 */
type GT = 1

/**
 * Represents two values' order
 */
type Ordering = LT | EQ | GT

/**
 * An object with at least one of its properties beeing of type `Key`.
 *
 * @example
 * ```
 * // $ExpectType { foo: unknown } | { bar: unknown }
 * type Foo = ObjectHavingSome<"foo" | "bar">
 * ```
 */
// Implementation taken from
// https://github.com/piotrwitek/utility-types/blob/df2502ef504c4ba8bd9de81a45baef112b7921d0/src/mapped-types.ts#L351-L362
type ObjectHavingSome<Key extends PropertyKey> = {
  [K in Key]: { [P in K]: unknown }
}[Key]

/**
 * Composition of `Partial` and `Record` types
 */
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

/**
 * <needs description>
 */
type Path = Array<number | string>

/**
 * A placeholder used to skip parameters, instead adding a parameter to the returned function.
 */
type Placeholder = x & { "@@functional/placeholder": true }

/**
 * A runtime-branded value used to stop `reduce` and `transduce` early.
 * @param A The type of the contained value
 */
interface Reduced<A> {
  "@@transducer/value": A
  "@@transducer/reduced": true
}

/**
 * A type representing any function. Useful as a generic constraint.
 */
type Fn = (...args: any[]) => unknown

/**
 * Converts an array of functions to an array of their return types.
 * @param A The array of functions
 */
type ReturnTypesOfFns<A extends ReadonlyArray<Fn>> = A extends readonly [
  (...args: any[]) => infer H,
  ...infer R
]
  ? R extends readonly Fn[]
    ? readonly [H, ...ReturnTypesOfFns<R>]
    : readonly []
  : readonly []

/**
 * Converts an array of functions taking a single parameter to an array of their parameter types.
 * @param A The array of functions
 */
type InputTypesOfFns<A extends ReadonlyArray<Fn>> = A extends [
  infer H,
  ...infer R
]
  ? H extends Fn
    ? R extends Fn[]
      ? [Parameters<H>[0], ...InputTypesOfFns<R>]
      : []
    : []
  : []

/**
 * If `T` is a union, `T[keyof T]` (cf. `map` and `values` in `index.d.ts`) contains the types of object values that are common across the union (i.e., an intersection).
 * Because we want to include the types of all values, including those that occur in some, but not all members of the union, we first define `ValueOfUnion`.
 * @see https://stackoverflow.com/a/60085683
 * @param T The (possible) union
 */
type ValueOfUnion<T> = T extends infer U ? U[keyof U] : never

/**
 * Take first `N` types of an Tuple
 * @param N Length of prefix to take
 * @param Tuple Input tuple type
 */
type Take<
  N extends number,
  Tuple extends any[],
  ReturnTuple extends any[] = []
> = ReturnTuple["length"] extends N
  ? ReturnTuple
  : Tuple extends [infer X, ...infer Xs]
  ? Take<N, Xs, [...ReturnTuple, X]>
  : never

/**
 * A homogeneous tuple of length `N`.
 * @param T Type of every element of the tuple
 * @param N Length of the tuple
 */
type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>

/**
 * Map tuple of ordinary type to tuple of array type
 * [string, number] -> [string[], number[]]
 */
type ToTupleOfArray<Tuple extends any[]> = Tuple extends []
  ? []
  : Tuple extends [infer X, ...infer Xs]
  ? [X[], ...ToTupleOfArray<Xs>]
  : never

/**
 * Map tuple of ordinary type to tuple of function type
 * @param R Parameter type of every function
 * @param Tuple Return type of every function
 */
type ToTupleOfFunction<R, Tuple extends any[]> = Tuple extends []
  ? []
  : Tuple extends [infer X, ...infer Xs]
  ? [(arg: R) => X, ...ToTupleOfFunction<R, Xs>]
  : never

/**
 * Getter of property from any value. Supports objects, arrays, tuples and maybe values
 *
 * @param T Value type
 * @param P Maybe key type
 *
 * @example
 * ```typescript
 * type K = Prop<{ x: number } | undefined, 'x'>
 * type L = Prop<[1, ...string[]] | undefined, 0>
 * type M = Prop<[1, ...string[]] | undefined, 1>
 * ```
 *
 * <created by @anion155>
 */
type Prop<T, P extends keyof never> = P extends keyof Exclude<T, undefined>
  ? T extends undefined
    ? undefined
    : T[Extract<P, keyof T>]
  : undefined

/**
 * When you have `gt = <T extends Ord>(a: T, b: T) => boolean`, `a` and `b` are different strings, and `T` defaults to `string
 * However, `gt = <T extends Ord>(a: T) => (b: T) => boolean`, because `a` is evaluated without `b`, `T` is the literal of `a`
 * `WidenLiteral` exists to go from a literal type to its base type, eg
 * * `"foobar"` -> `string`
 * * `1` -> `number`
 * * `true` -> `boolean
 * @see https://stackoverflow.com/a/56333836/10107466
 *
 * <created by @harris-miller>
 */
type WidenLiterals<T> = T extends boolean
  ? boolean
  : T extends string
  ? string
  : T extends number
  ? number
  : T

/**
 * Extract the types from an array
 * Works with Tuples, eg `ElementOf<typeof ['p1', 'p2']>` => `'p1' | 'p2'`
 *
 * <created by @harris-miller>
 */
type ElementOf<Type extends readonly any[]> =
  Type extends readonly (infer Values)[] ? Values : never

/**
 * Convenance type function to extract keys of an object as a tuple literal
 *
 * <created by @harris-miller>
 */
type KeysAsTuple<T> = [keyof T, ...(keyof T)[]]

/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @example
 * ```typescript
 * const greet = R.replace('{name}', R.__, 'Hello, {name}!');
 * greet('Alice'); //=> 'Hello, Alice!'
 * ```
 */
declare const __: Placeholder

/**
 * Adds two values.
 *
 * See also {@link subtract}
 *
 * @example
 * ```typescript
 * R.add(2, 3);       //=>  5
 * R.add(7)(10);      //=> 17
 * ```
 */
declare function add(a: number): (b: number) => number
declare function add(a: number, b: number): number

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @example
 * ```typescript
 * const mapIndexed = R.addIndex(R.map);
 * mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 * //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 * ```
 */
declare function addIndex<T>(
  fn: (f: (item: T) => void, list: readonly T[]) => T[]
): Curry<(a: (item: T, idx: number, list: T[]) => void, b: readonly T[]) => T[]>
// Special case for filter
declare function addIndex<T>(
  fn: (f: (item: T) => boolean, list: readonly T[]) => T[]
): Curry<
  (a: (item: T, idx: number, list: T[]) => boolean, b: readonly T[]) => T[]
>
// Special case for map
declare function addIndex<T, U>(
  fn: (f: (item: T) => U, list: readonly T[]) => U[]
): Curry<(a: (item: T, idx: number, list: T[]) => U, b: readonly T[]) => U[]>
// Special case for reduce
declare function addIndex<T, U>(
  fn: (f: (acc: U, item: T) => U, aci: U, list: readonly T[]) => U
): Curry<
  (
    a: (acc: U, item: T, idx: number, list: T[]) => U,
    b: U,
    c: readonly T[]
  ) => U
>

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * See also {@link update}
 *
 * @example
 * ```typescript
 * R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 * R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * ```
 */
declare function adjust(index: number): {
  // adjust(index)(fn, list)
  <T>(fn: (a: T) => T, list: readonly T[]): T[]
  // adjust(index)(__, list)(fn)
  <T>(__: Placeholder, list: readonly T[]): (fn: (a: T) => T) => T[]
  // adjust(index)(fn)(list)
  <T>(fn: (a: T) => T): (list: readonly T[]) => T[]
}

// adjust(__, fn)
declare function adjust<T>(
  __: Placeholder,
  fn: (a: T) => T
): {
  // adjust(__, fn)(list)(index)
  (list: readonly T[]): (index: number) => T[]
  // adjust(__, fn)(__, index)(list)
  (__: Placeholder, index: number): (list: readonly T[]) => T[]
  // adjust(__, fn)(list, index)
  (list: readonly T[], index: number): T[]
}

declare function adjust<T>(
  index: number,
  fn: (a: T) => T
): (list: readonly T[]) => T[]

// adjust(index, fn)(list)
declare function adjust<T>(
  index: number,
  fn: (a: T) => T
): (list: readonly T[]) => T[]
// adjust(index, fn)(list)
declare function adjust<T>(
  index: number,
  fn: (a: T) => T
): (list: readonly T[]) => T[]

// adjust(__, __, list)
declare function adjust<T>(
  __: Placeholder,
  __2: Placeholder,
  list: readonly T[]
): {
  // adjust(__, __, list)(index)(fn)
  (index: number): (fn: (a: T) => T) => T[]
  // adjust(__, __, list)(__, fn)(index)
  (__3: Placeholder, fn: (a: T) => T): (index: number) => T[]
  // adjust(__, __, list)(index, fn)
  (index: number, fn: (a: T) => T): T[]
}
// adjust(index, __, list)(fn)
declare function adjust<T>(
  index: number,
  __: Placeholder,
  list: readonly T[]
): (fn: (a: T) => T) => T[]
// adjust(__, fn, list)(index)
declare function adjust<T>(
  __: Placeholder,
  fn: (a: T) => T,
  list: readonly T[]
): (index: number) => T[]

// adjust(index, fn, list)
declare function adjust<T>(
  index: number,
  fn: (a: T) => T,
  list: readonly T[]
): T[]

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link any}, {@link none}, {@link transduce}
 *
 * @example
 * ```typescript
 * const equals3 = R.equals(3);
 * R.all(equals3)([3, 3, 3, 3]); //=> true
 * R.all(equals3)([3, 3, 1, 3]); //=> false
 * ```
 */
declare function all<T>(fn: (a: T) => boolean): {
  // all (fn)({ all })
  <U extends { all: (fn: (a: T) => boolean) => boolean }>(obj: U): boolean
  // all (fn)(list)
  (list: readonly T[]): boolean
}

// all(__, { all })(fn)
declare function all<U extends { all: (fn: (a: any) => boolean) => boolean }>(
  __: Placeholder,
  obj: U
): (fn: (a: InferAllAType<U>) => boolean) => boolean
// all(__, list)(fn)
declare function all<T>(
  __: Placeholder,
  list: readonly T[]
): (fn: (a: T) => boolean) => boolean

// all(fn, { all })
declare function all<T, U extends { all: (fn: (a: T) => boolean) => boolean }>(
  fn: (a: T) => boolean,
  obj: U
): boolean
// all(fn, list)
declare function all<T>(fn: (a: T) => boolean, list: readonly T[]): boolean

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * See also {@link anyPass}, {@link both}
 *
 * @example
 * ```typescript
 * const isQueen = R.propEq('rank', 'Q');
 * const isSpade = R.propEq('suit', '♠︎');
 * const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 * isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 * isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 * ```
 */
declare function allPass<T, TF1 extends T, TF2 extends T>(
  predicates: [(a: T) => a is TF1, (a: T) => a is TF2]
): (a: T) => a is TF1 & TF2
declare function allPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  predicates: [(a: T) => a is TF1, (a: T) => a is TF2, (a: T) => a is TF3]
): (a: T) => a is TF1 & TF2 & TF3
declare function allPass<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T
>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4
  ]
): (a: T) => a is TF1 & TF2 & TF3 & TF4
declare function allPass<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T
>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4,
    (a: T) => a is TF5
  ]
): (a: T) => a is TF1 & TF2 & TF3 & TF4 & TF5
declare function allPass<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T
>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4,
    (a: T) => a is TF5,
    (a: T) => a is TF6
  ]
): (a: T) => a is TF1 & TF2 & TF3 & TF4 & TF5 & TF6
declare function allPass<F extends (...args: any[]) => boolean>(
  predicates: readonly F[]
): F

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @example
 * ```typescript
 * const t = R.always('Tee');
 * t(); //=> 'Tee'
 * ```
 */
declare function always<T>(val: T): (...args: unknown[]) => T

/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * See also {@link both}, {@link or}
 *
 * @example
 * ```typescript
 * R.and(true, true); //=> true
 * R.and(true, false); //=> false
 * R.and(false, true); //=> false
 * R.and(false, false); //=> false
 * ```
 */
declare function and<A>(a: A): <B>(b: B) => A | B
declare function and<B>(__: Placeholder, b: B): <A>(a: A) => A | B
declare function and<A, B>(a: A, b: B): A | B

/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * See also {@link otherwise}
 *
 * @example
 * ```typescript
 * const makeQuery = email => ({ query: { email }});
 * const fetchMember = request =>
 *   Promise.resolve({ firstName: 'Bob', lastName: 'Loblaw', id: 42 });
 *
 * //getMemberName :: String -> Promise ({ firstName, lastName })
 * const getMemberName = R.pipe(
 *   makeQuery,
 *   fetchMember,
 *   R.andThen(R.pick(['firstName', 'lastName']))
 * );
 *
 * getMemberName('bob@gmail.com').then(console.log);
 * ```
 */
declare function andThen<A, B>(
  onSuccess: (a: A) => B | Promise<B>
): (promise: Promise<A>) => Promise<B>
declare function andThen<A>(
  __: Placeholder,
  promise: Promise<A>
): <B>(onSuccess: (a: A) => B | Promise<B>) => Promise<B>
declare function andThen<A, B>(
  onSuccess: (a: A) => B | Promise<B>,
  promise: Promise<A>
): Promise<B>

/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link all}, {@link none}, {@link transduce}
 *
 * @example
 * ```typescript
 * const lessThan0 = R.flip(R.lt)(0);
 * const lessThan2 = R.flip(R.lt)(2);
 * R.any(lessThan0)([1, 2]); //=> false
 * R.any(lessThan2)([1, 2]); //=> true
 * ```
 */
declare function any<T>(fn: (a: T) => boolean): {
  // any(fn)(list)
  (list: readonly T[]): boolean
  // all (fn)({ any })
  <U extends { any: (fn: (a: T) => boolean) => boolean }>(obj: U): boolean
}

// any(__, list)(fn)
declare function any<T>(
  __: Placeholder,
  list: readonly T[]
): (fn: (a: T) => boolean) => boolean
// any(__, { any })(fn)
declare function any<U extends { any: (fn: (a: any) => boolean) => boolean }>(
  ___: Placeholder,
  obj: U
): (fn: (a: InferAnyAType<U>) => boolean) => boolean

// any(fn, list)
declare function any<T>(fn: (a: T) => boolean, list: readonly T[]): boolean
// any(fn, { any })
declare function any<T, U extends { any: (fn: (a: T) => boolean) => boolean }>(
  fn: (a: T) => boolean,
  obj: U
): boolean

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * See also {@link allPass}, {@link either}
 *
 * @example
 * ```typescript
 * const isClub = R.propEq('suit', '♣');
 * const isSpade = R.propEq('suit', '♠');
 * const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 * isBlackCard({rank: '10', suit: '♣'}); //=> true
 * isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 * isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 * ```
 */
declare function anyPass<T, TF1 extends T, TF2 extends T>(
  predicates: [(a: T) => a is TF1, (a: T) => a is TF2]
): (a: T) => a is TF1 | TF2
declare function anyPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  predicates: [(a: T) => a is TF1, (a: T) => a is TF2, (a: T) => a is TF3]
): (a: T) => a is TF1 | TF2 | TF3
declare function anyPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  predicates: [(a: T) => a is TF1, (a: T) => a is TF2, (a: T) => a is TF3]
): (a: T) => a is TF1 | TF2 | TF3
declare function anyPass<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T
>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4
  ]
): (a: T) => a is TF1 | TF2 | TF3 | TF4
declare function anyPass<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T
>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4,
    (a: T) => a is TF5
  ]
): (a: T) => a is TF1 | TF2 | TF3 | TF4 | TF5
declare function anyPass<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T
>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4,
    (a: T) => a is TF5,
    (a: T) => a is TF6
  ]
): (a: T) => a is TF1 | TF2 | TF3 | TF4 | TF5 | TF6
declare function anyPass<F extends (...args: any[]) => boolean>(
  predicates: readonly F[]
): F

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the first argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @example
 * ```typescript
 * R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 * R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 * // R.ap can also be used as S combinator
 * // when only two functions are passed
 * R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * ```
 */
declare function ap<T, U>(
  fns: ReadonlyArray<(a: T) => U>
): (vs: readonly T[]) => U[]
declare function ap<R, A, B>(
  fn: (r: R, a: A) => B,
  fn1: (r: R) => A
): (r: R) => B
declare function ap<T, U>(
  fns: ReadonlyArray<(a: T) => U>,
  vs: readonly T[]
): U[]

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 * R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 * ```
 */
declare function aperture<N extends number>(
  n: N
): <T>(list: readonly T[]) => Array<Tuple<T, N>> | []
declare function aperture<T>(
  __: Placeholder,
  list: readonly T[]
): <N extends number>(n: N) => Array<Tuple<T, N>> | []
declare function aperture<N extends number, T>(
  n: N,
  list: readonly T[]
): Array<Tuple<T, N>> | []

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * See also {@link prepend}
 *
 * @example
 * ```typescript
 * R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 * R.append('tests', []); //=> ['tests']
 * R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 * ```
 */
declare function append<T>(el: T): (list: readonly T[]) => T[]
// append(__, list)(el)
declare function append<T>(__: Placeholder, list: readonly T[]): (el: T) => T[]
// append(el, list)
declare function append<T>(el: T, list: readonly T[]): T[]

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * See also {@link call}, {@link unapply}
 *
 * @example
 * ```typescript
 * const nums = [1, 2, 3, -99, 42, 6, 7];
 * R.apply(Math.max, nums); //=> 42
 * ```
 */
declare function apply<F extends (...args: readonly any[]) => any>(
  fn: F
): (args: Parameters<F>) => ReturnType<F>
// apply(args, fn)
// overload Placeholder options with versions for 1-to-5 args for best constraining
declare function apply<A extends readonly [any]>(
  __: Placeholder,
  args: A
): <F extends (...args: A) => any>(fn: F) => ReturnType<F>
declare function apply<A extends readonly [any, any]>(
  __: Placeholder,
  args: A
): <F extends (...args: A) => any>(fn: F) => ReturnType<F>
declare function apply<A extends readonly [any, any, any]>(
  __: Placeholder,
  args: A
): <F extends (...args: A) => any>(fn: F) => ReturnType<F>
declare function apply<A extends readonly [any, any, any, any]>(
  __: Placeholder,
  args: A
): <F extends (...args: A) => any>(fn: F) => ReturnType<F>
declare function apply<A extends readonly [any, any, any, any, any]>(
  __: Placeholder,
  args: A
): <F extends (...args: A) => any>(fn: F) => ReturnType<F>
declare function apply<A extends readonly any[]>(
  __: Placeholder,
  args: A
): <F extends (...args: A) => any>(fn: F) => ReturnType<F>
// apply(args, fn)
declare function apply<F extends (...args: readonly any[]) => any>(
  fn: F,
  args: Parameters<F>
): ReturnType<F>

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * See also {@link converge}, {@link juxt}
 *
 * @example
 * ```typescript
 * const getMetrics = R.applySpec({
 *   sum: R.add,
 *   nested: { mul: R.multiply }
 * });
 * getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * ```
 */
declare function applySpec<
  Obj extends Record<string, (...args: readonly any[]) => any>
>(
  obj: Obj
): (...args: Parameters<Obj[keyof Obj]>) => {
  [Key in keyof Obj]: ReturnType<Obj[Key]>
}
declare function applySpec<T>(obj: any): (...args: readonly any[]) => T

/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @example
 * ```typescript
 * const t42 = R.applyTo(42);
 * t42(R.identity); //=> 42
 * t42(R.add(1)); //=> 43
 * ```
 */
declare function applyTo<T>(el: T): <U>(fn: (t: T) => U) => U
declare function applyTo<T, U>(el: T, fn: (t: T) => U): U

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * See also {@link descend}
 *
 * @example
 * ```typescript
 * const byAge = R.ascend(R.prop('age'));
 * const people = [
 *   { name: 'Emma', age: 70 },
 *   { name: 'Peter', age: 78 },
 *   { name: 'Mikhail', age: 62 },
 * ];
 * const peopleByYoungestFirst = R.sort(byAge, people);
 *   //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 * ```
 */
declare function ascend<T>(fn: (obj: T) => Ord): (a: T, b: T) => Ordering
declare function ascend<T>(fn: (obj: T) => Ord, a: T, b: T): Ordering

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * See also {@link dissoc}, {@link pick}
 *
 * @example
 * ```typescript
 * R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 * ```
 */
declare function assoc<T, U>(
  __: Placeholder,
  val: T,
  obj: U
): <K extends string>(
  prop: K
) => K extends keyof U
  ? T extends U[K]
    ? U
    : Record<K, T> & Omit<U, K>
  : U & Record<K, T>
// assoc(prop, __, obj)(val), when K is keyof obj, tests if val is typeof obj[prop] for best return type
declare function assoc<U, K extends keyof U>(
  prop: K,
  __: Placeholder,
  obj: U
): <T>(val: T) => T extends U[K] ? U : Record<K, T> & Omit<U, K>
// assoc(prop, __, obj)(val), when prop is not keyof obj
declare function assoc<U, K extends string>(
  prop: K,
  __: Placeholder,
  obj: U
): <T>(val: T) => U & Record<K, T>
// assoc(prop, val, obj) when prop is keyof obj and val is same type
declare function assoc<K extends keyof U, U>(prop: K, val: U[K], obj: U): U
// assoc(prop, val, obj) when prop is keyof obj  and val is not same type
declare function assoc<T, K extends keyof U, U>(
  prop: K,
  val: T,
  obj: U
): Record<K, T> & Omit<U, K>
// assoc(prop, val, obj) when prop is not keyof obj
declare function assoc<T, U, K extends string>(
  prop: K,
  val: T,
  obj: U
): U & Record<K, T>

// assoc(__, val)
declare function assoc<T>(
  __: Placeholder,
  val: T
): {
  // assoc(__, val)(__, obj)
  <U>(
    __2: Placeholder,
    obj: U
  ): {
    // assoc(__, val)(__, obj)(prop), prop is keyof obj, tests if val is typeof obj[prop] for best return type
    <K extends keyof U>(prop: K): U[K] extends T ? U : Record<K, T> & Omit<U, K>
    // assoc(__, val)(__, obj)(prop), prop is not keyof obj
    <K extends string>(prop: K): U & Record<K, T>
  }
  // assoc(__, val)(prop, obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <K extends keyof U, U>(
    prop: K,
    obj: U
  ): U[K] extends T ? U : Record<K, T> & Omit<U, K>
  // assoc(__, val)(prop, obj), when obj does not have key prop
  <K extends string, U>(prop: K, obj: U): U & Record<K, T>

  // assoc(__, val)(prop)
  <K extends string>(
    prop: K
  ): {
    // assoc(__, val)(prop)(obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
    <U extends Record<K, any>>(
      obj: U
    ): U[K] extends T ? U : Record<K, T> & Omit<U, K>
    // assoc(__, val)(prop)(obj) when obj does not have key prop
    <U>(obj: U): U & Record<K, T>
  }
}

// assoc(prop, val)
declare function assoc<T, K extends string>(
  prop: K,
  val: T
): {
  // assoc(prop, val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <U extends Record<K, any>>(
    obj: U
  ): U[K] extends T ? U : Record<K, T> & Omit<U, K>
  // assoc(prop, val)(obj), when obj does not have key prop
  <U>(obj: U): U & Record<K, T>
}

// assoc(prop)
declare function assoc<K extends string>(
  prop: K
): {
  // assoc(prop)(__, obj) when prop is keyof obj
  <U extends Record<K, any>>(
    __: Placeholder,
    obj: U
  ): {
    // assoc(prop)(__, obj)(val) if val is typeof obj[prop]
    <T extends U[K]>(val: T): U
    // assoc(prop)(__, obj)(val) if val is not typeof obj[prop]
    <T>(val: T): Record<K, T> & Omit<U, K>
  }
  // assoc(prop)(__, obj) when prop is not keyof obj
  <U>(__: Placeholder, obj: U): <T>(val: T) => U & Record<K, T>

  // assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
  <T, U extends Record<K, any>>(
    val: T,
    obj: U
  ): U[K] extends T ? U : Record<K, T> & Omit<U, K>
  // assoc(prop)(val, obj) when obj does not have a key prop
  <T, U>(val: T, obj: U): U & Record<K, T>

  // assoc(prop)(val)
  <T>(val: T): {
    // assoc(prop)(val)(obj) when obj has key prop and val is typeof obj[prop]
    <U extends Record<K, T>>(obj: U): U
    // assoc(prop)(val)(obj) when obj has key prop and val is not typeof obj[prop]
    <U extends Record<K, any>>(obj: U): Record<K, T> & Omit<U, K>
    // assoc(prop)(val)(obj) when obj does not have key prop
    <U>(obj: U): U & Record<K, T>
  }
}

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * See also {@link dissocPath}
 *
 * @example
 * ```typescript
 * R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 * // Any missing or non-object keys in path will be overridden
 * R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 * ```
 */
declare function assocPath<T, U>(path: Path): Curry<(a: T, b: U) => U>
declare function assocPath<T, U>(path: Path, val: T): (obj: U) => U
declare function assocPath<T, U>(
  __: Placeholder,
  val: T,
  obj: U
): (path: Path) => U
declare function assocPath<T, U>(
  path: Path,
  __: Placeholder,
  obj: U
): (val: T) => U
declare function assocPath<T, U>(path: Path, val: T, obj: U): U

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * See also {@link nAry}, {@link unary}
 *
 * @example
 * ```typescript
 * const takesThreeArgs = function(a, b, c) {
 *   return [a, b, c];
 * };
 * takesThreeArgs.length; //=> 3
 * takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 * const takesTwoArgs = R.binary(takesThreeArgs);
 * takesTwoArgs.length; //=> 2
 * // Only 2 arguments are passed to the wrapped function
 * takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * ```
 */
declare function binary<T extends (...arg: any) => any>(
  fn: T
): (...arg: Take$1<Parameters<T>, 2>) => ReturnType<T>

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * See also {@link partial}
 *
 * @example
 * ```typescript
 * const log = R.bind(console.log, console);
 * R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 * // logs {a: 2}
 * ```
 */
declare function bind<F extends (...args: readonly any[]) => any, T>(
  fn: F
): (thisObj: T) => (...args: Parameters<F>) => ReturnType<F>
declare function bind<F extends (...args: readonly any[]) => any, T>(
  fn: F,
  thisObj: T
): (...args: Parameters<F>) => ReturnType<F>

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * See also {@link either}, {@link allPass}, {@link and}
 *
 * @example
 * ```typescript
 * const gt10 = R.gt(R.__, 10)
 * const lt20 = R.lt(R.__, 20)
 * const f = R.both(gt10, lt20);
 * f(15); //=> true
 * f(30); //=> false
 *
 * R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 * R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 * ```
 */
declare function both<T, RT1 extends T>(
  f: (a: T) => a is RT1
): <RT2 extends T>(g: (a: T) => a is RT2) => (a: T) => a is RT1 & RT2
declare function both<Args extends any[]>(
  f: (...args: Args) => boolean
): (g: (...args: Args) => boolean) => (...args: Args) => boolean
// both(f, g) => (x: T) => boolean
declare function both<T, RT1 extends T, RT2 extends T>(
  f: (a: T) => a is RT1,
  g: (a: T) => a is RT2
): (a: T) => a is RT1 & RT2
declare function both<Args extends any[]>(
  f: (...args: Args) => boolean,
  g: (...args: Args) => boolean
): (...args: Args) => boolean

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * See also {@link apply}
 *
 * @example
 * ```typescript
 * R.call(R.add, 1, 2); //=> 3
 *
 * const indentN = R.pipe(
 *   R.repeat(' '),
 *   R.join(''),
 *   R.replace(/^(?!$)/gm)
 * );
 *
 * const format = R.converge(
 *   R.call,
 *   [
 *     R.pipe(R.prop('indent'), indentN),
 *     R.prop('value')
 *   ]
 * );
 *
 * format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * ```
 */
declare function call<T extends (...args: readonly any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T>

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * const duplicate = n => [n, n];
 * R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 * R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 * ```
 */
declare function chain<A, B>(
  fn: (n: A) => readonly B[],
  list: readonly A[]
): B[]
// chain(fn)(list)
declare function chain<A, B>(
  fn: (n: A) => readonly B[]
): (list: readonly A[]) => B[]

// chain(fn, monad)
declare function chain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(
  fn: (a: A) => Mb,
  monad: Ma
): Mb
// chain(fn)(monad)
declare function chain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(
  fn: (a: A) => Mb
): (monad: Ma) => Mb

// chain (f, g)(x)
declare function chain<A, B, R>(
  aToMb: (a: A, r: R) => B,
  Ma: (r: R) => A
): (r: R) => B
// chain (f)(g)(x)
declare function chain<A, B, R>(
  aToMb: (a: A, r: R) => B
): (Ma: (r: R) => A) => (r: R) => B

// TODO: types for transducer variation

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @example
 * ```typescript
 * R.clamp(1, 10, -5) // => 1
 * R.clamp(1, 10, 15) // => 10
 * R.clamp(1, 10, 4)  // => 4
 * ```
 */
declare function clamp<T>(min: T): {
  (max: T): (value: T) => T
  (max: T, value: T): T
}
declare function clamp<T>(min: T, max: T): (value: T) => T
declare function clamp<T>(min: T, max: T, value: T): T

/**
 * Creates a deep copy of the source that can be used in place of the source
 * object without retaining any references to it.
 * The source object may contain (nested) `Array`s and `Object`s,
 * `Number`s, `String`s, `Boolean`s and `Date`s.
 * `Function`s are assigned by reference rather than copied.
 *
 * Dispatches to a `clone` method if present.
 *
 * Note that if the source object has multiple nodes that share a reference,
 * the returned object will have the same structure, but the references will
 * be pointed to the location within the cloned value.
 *
 * @example
 * ```typescript
 * const objects = [{}, {}, {}];
 * const objectsClone = R.clone(objects);
 * objects === objectsClone; //=> false
 * objects[0] === objectsClone[0]; //=> false
 * ```
 */
declare function clone<T>(value: readonly T[]): T[]
declare function clone<T>(value: T): T

/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * See also {@link groupBy}, {@link partition}
 *
 * @example
 * ```typescript
 * R.collectBy(R.prop('type'), [
 *   {type: 'breakfast', item: '☕️'},
 *   {type: 'lunch', item: '🌯'},
 *   {type: 'dinner', item: '🍝'},
 *   {type: 'breakfast', item: '🥐'},
 *   {type: 'lunch', item: '🍕'}
 * ]);
 *
 * // [ [ {type: 'breakfast', item: '☕️'},
 * //     {type: 'breakfast', item: '🥐'} ],
 * //   [ {type: 'lunch', item: '🌯'},
 * //     {type: 'lunch', item: '🍕'} ],
 * //   [ {type: 'dinner', item: '🍝'} ] ]
 * ```
 */
declare function collectBy<T, K extends PropertyKey>(
  keyFn: (value: T) => K
): (list: readonly T[]) => T[][]
declare function collectBy<T, K extends PropertyKey>(
  keyFn: (value: T) => K,
  list: readonly T[]
): T[][]

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @example
 * ```typescript
 * const byAge = R.comparator((a, b) => a.age < b.age);
 * const people = [
 *   { name: 'Emma', age: 70 },
 *   { name: 'Peter', age: 78 },
 *   { name: 'Mikhail', age: 62 },
 * ];
 * const peopleByIncreasingAge = R.sort(byAge, people);
 *   //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 * ```
 */
declare function comparator<T>(
  pred: (a: T, b: T) => boolean
): (x: T, y: T) => Ordering

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * See also {@link not}
 *
 * @example
 * ```typescript
 * const isNotNil = R.complement(R.isNil);
 * R.isNil(null); //=> true
 * isNotNil(null); //=> false
 * R.isNil(7); //=> false
 * isNotNil(7); //=> true
 * ```
 */
declare function complement<T, TFiltered extends T>(
  pred: (value: T) => value is TFiltered
): (value: T) => value is Exclude<T, TFiltered>
declare function complement<TArgs extends any[]>(
  pred: (...args: TArgs) => unknown
): (...args: TArgs) => boolean

/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * See also {@link pipe}
 *
 * @example
 * ```typescript
 * const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 * const yellGreeting = R.compose(R.toUpper, classyGreeting);
 * yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 * R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 * ```
 */
declare function compose<
  TArgs extends any[],
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  TResult
>(
  ...func: [
    fnLast: (a: any) => TResult,
    ...func: Array<(a: any) => any>,
    f7: (a: R6) => R7,
    f6: (a: R5) => R6,
    f5: (a: R4) => R5,
    f4: (a: R3) => R4,
    f3: (a: R2) => R3,
    f2: (a: R1) => R2,
    f1: (...args: TArgs) => R1
  ]
): (...args: TArgs) => TResult
// fallback overload if number of composed functions greater than 7
declare function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R7
declare function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R7
declare function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R6
declare function compose<TArgs extends any[], R1, R2, R3, R4, R5>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R5
declare function compose<TArgs extends any[], R1, R2, R3, R4>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R4
declare function compose<TArgs extends any[], R1, R2, R3>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R3
declare function compose<TArgs extends any[], R1, R2>(
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R2
declare function compose<TArgs extends any[], R1>(
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R1

/**
 * Performs right-to-left function composition using transforming function. The last function may have
 * any arity; the remaining functions must be unary. Unlike `compose`, functions are passed in an array.
 *
 * **Note:** The result of composeWith is not automatically curried. Transforming function is not used
 * on the last argument.
 *
 * See also {@link compose}, {@link pipeWith}
 *
 * @example
 * ```typescript
 * const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 * composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 * composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 * ```
 */
declare function composeWith(
  transformer: (fn: (...args: any[]) => any, intermediatResult: any) => any
): <TArgs extends any[], TResult>(
  fns: AtLeastOneFunctionsFlowFromRightToLeft<TArgs, TResult>
) => (...args: TArgs) => TResult
declare function composeWith<TArgs extends any[], TResult>(
  transformer: (fn: (...args: any[]) => any, intermediatResult: any) => any,
  fns: AtLeastOneFunctionsFlowFromRightToLeft<TArgs, TResult>
): (...args: TArgs) => TResult

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @example
 * ```typescript
 * R.concat('ABC', 'DEF'); // 'ABCDEF'
 * R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 * R.concat([], []); //=> []
 * ```
 */
declare function concat<S1 extends string>(
  s1: S1
): <S2 extends string>(s2: S2) => string extends S1 | S2 ? string : `${S1}${S2}`
// concat(list)(list)
declare function concat<T>(list1: readonly T[]): (list2: readonly T[]) => T[]
// concat(__, string)(string)
declare function concat<S2 extends string>(
  __: Placeholder,
  s2: S2
): <S1 extends string>(s1: S1) => string extends S1 | S2 ? string : `${S1}${S2}`
// concat(__, list)(list)
declare function concat<T2>(
  __: Placeholder,
  list2: readonly T2[]
): <T1>(
  list1: readonly T2[] extends readonly T1[] ? readonly T1[] : never
) => T1[]
// concat(string, string)
declare function concat<S1 extends string, S2 extends string>(
  s1: S1,
  s2: S2
): string extends S1 | S2 ? string : `${S1}${S2}`
// concat(list, list)
// if you don't do 2 types here the single T will collapse list1 and list2 when you have tuples of the same type, which is incorrect behavior
declare function concat<T1, T2 extends T1>(
  list1: readonly T1[],
  list2: readonly T2[]
): T1[]

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * See also {@link ifElse}, {@link unless}, {@link when}
 *
 * @example
 * ```typescript
 * const fn = R.cond([
 *   [R.equals(0),   R.always('water freezes at 0°C')],
 *   [R.equals(100), R.always('water boils at 100°C')],
 *   [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 * ]);
 * fn(0); //=> 'water freezes at 0°C'
 * fn(50); //=> 'nothing special happens at 50°C'
 * fn(100); //=> 'water boils at 100°C'
 * ```
 */
declare function cond<T, TF1 extends T, R>(
  pairs: [CondPairTypeguard<T, TF1, R>]
): (value: T) => R
declare function cond<T, TF1 extends T, TF2 extends T, R>(
  pairs: [CondPairTypeguard<T, TF1, R>, CondPairTypeguard<T, TF2, R>]
): (value: T) => R
declare function cond<T, TF1 extends T, TF2 extends T, TF3 extends T, R>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  TF9 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>,
    CondPairTypeguard<T, TF9, R>
  ]
): (value: T) => R
declare function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  TF9 extends T,
  TF10 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>,
    CondPairTypeguard<T, TF9, R>,
    CondPairTypeguard<T, TF10, R>
  ]
): (value: T) => R
declare function cond<T extends any[], R>(
  pairs: Array<CondPair<T, R>>
): (...args: T) => R

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * See also {@link invoker}
 *
 * @example
 * ```typescript
 * // Constructor function
 * function Animal(kind) {
 *   this.kind = kind;
 * };
 * Animal.prototype.sighting = function() {
 *   return "It's a " + this.kind + "!";
 * }
 *
 * const AnimalConstructor = R.construct(Animal)
 *
 * // Notice we no longer need the 'new' keyword:
 * AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 * const animalTypes = ["Lion", "Tiger", "Bear"];
 * const animalSighting = R.invoker(0, 'sighting');
 * const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 * R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 * ```
 */
declare function construct<A extends any[], T>(
  constructor: { new (...a: A): T } | ((...a: A) => T)
): Curry<(...a: A) => T>

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @example
 * ```typescript
 * // Variadic Constructor function
 * function Salad() {
 *   this.ingredients = arguments;
 * }
 *
 * Salad.prototype.recipe = function() {
 *   const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *   return R.join('\n', instructions);
 * };
 *
 * const ThreeLayerSalad = R.constructN(3, Salad);
 *
 * // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 * const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 * console.log(salad.recipe());
 * // Add a dollop of Mayonnaise
 * // Add a dollop of Potato Chips
 * // Add a dollop of Ketchup
 * ```
 */
declare function constructN<A extends any[], T, N extends number>(
  n: N,
  constructor: { new (...a: A): T } | ((...a: A) => T)
): Curry<(...a: mergeArrWithLeft<Tuple<any, N>, A>) => T>

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * See also {@link useWith}
 *
 * @example
 * ```typescript
 * const average = R.converge(R.divide, [R.sum, R.length])
 * average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 * const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 * strangeConcat("Yodel") //=> "YODELyodel"
 * ```
 */
declare function converge<
  TResult,
  FunctionsList extends ReadonlyArray<Fn> &
    IfFunctionsArgumentsDoNotOverlap<
      _Fns,
      "Functions arguments types must overlap"
    >,
  _Fns extends ReadonlyArray<Fn> = FunctionsList
>(
  converging: (...args: ReturnTypesOfFns<FunctionsList>) => TResult,
  branches: FunctionsList
): Curry<(...args: LargestArgumentsList<FunctionsList>) => TResult>
declare function converge<
  CArgs extends ReadonlyArray<any>,
  TResult,
  FunctionsList extends readonly [
    ...{
      [Index in keyof CArgs]: (...args: ReadonlyArray<any>) => CArgs[Index]
    }
  ] &
    IfFunctionsArgumentsDoNotOverlap<
      _Fns,
      "Functions arguments types must overlap"
    >,
  _Fns extends ReadonlyArray<Fn> = FunctionsList
>(
  converging: (...args: CArgs) => TResult,
  branches: FunctionsList
): Curry<(...args: LargestArgumentsList<FunctionsList>) => TResult>

/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @example
 * ```typescript
 * const even = x => x % 2 == 0;
 *
 * R.count(even, [1, 2, 3, 4, 5]); // => 2
 * R.map(R.count(even), [[1, 1, 1], [2, 3, 4, 5], [6]]); // => [0, 2, 1]
 * ```
 */
declare function count<T>(fn: (a: T) => boolean): (list: readonly T[]) => number
declare function count<T>(fn: (a: T) => boolean, list: readonly T[]): number

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 * R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 * const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 * R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 * ```
 */
declare function countBy<T>(
  fn: (a: T) => string | number
): (list: readonly T[]) => { [index: string]: number }
declare function countBy<T>(
  fn: (a: T) => string | number,
  list: readonly T[]
): { [index: string]: number }

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * Please note that default parameters don't count towards a [function arity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
 * and therefore `curry` won't work well with those:
 *
 * ```
 * const h = R.curry((a, b, c = 2) => a + b + c);
 *
 * h(40);
 * //=> function (waits for `b`)
 *
 * h(39)(1);
 * //=> 42
 *
 * h(1)(2, 3);
 * //=> 6
 *
 * h(1)(2)(7);
 * //=> Error! (`3` is not a function!)
 * ```
 *
 * See also {@link curryN}, {@link partial}
 *
 * @example
 * ```typescript
 * const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 * const curriedAddFourNumbers = R.curry(addFourNumbers);
 * const f = curriedAddFourNumbers(1, 2);
 * const g = f(3);
 * g(4); //=> 10
 * ```
 */
declare function curry<F extends (...args: any) => any>(f: F): Curry<F>

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * See also {@link curry}
 *
 * @example
 * ```typescript
 * const sumArgs = (...args) => R.sum(args);
 *
 * const curriedAddFourNumbers = R.curryN(4, sumArgs);
 * const f = curriedAddFourNumbers(1, 2);
 * const g = f(3);
 * g(4); //=> 10
 * ```
 */
declare function curryN<N extends number>(
  length: N
): <F extends (...args: any) => any>(
  fn: F
) => Curry<(...a: Take$1<Parameters<F>, N>) => ReturnType<F>>
declare function curryN<N extends number, F extends (...args: any) => any>(
  length: N,
  fn: F
): Curry<(...a: Take$1<Parameters<F>, N>) => ReturnType<F>>

/**
 * Decrements its argument.
 *
 * See also {@link inc}
 *
 * @example
 * ```typescript
 * R.dec(42); //=> 41
 * ```
 */
declare function dec(n: number): number

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @example
 * ```typescript
 * const defaultTo42 = R.defaultTo(42);
 *
 * defaultTo42(null);  //=> 42
 * defaultTo42(undefined);  //=> 42
 * defaultTo42(false);  //=> false
 * defaultTo42('Ramda');  //=> 'Ramda'
 * // parseInt('string') results in NaN
 * defaultTo42(parseInt('string')); //=> 42
 * ```
 */
declare function defaultTo<Fallback>(
  a: Fallback
): <Value>(b: Value) => DefaultTo<Fallback, Value>
declare function defaultTo<Value>(
  __: Placeholder,
  b: Value
): <Fallback>(a: Fallback) => DefaultTo<Fallback, Value>
declare function defaultTo<Fallback, Value>(
  a: Fallback,
  b: Value
): DefaultTo<Fallback, Value>

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * See also {@link ascend}
 *
 * @example
 * ```typescript
 * const byAge = R.descend(R.prop('age'));
 * const people = [
 *   { name: 'Emma', age: 70 },
 *   { name: 'Peter', age: 78 },
 *   { name: 'Mikhail', age: 62 },
 * ];
 * const peopleByOldestFirst = R.sort(byAge, people);
 *   //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 * ```
 */
declare function descend<T>(fn: (obj: T) => Ord): (a: T, b: T) => Ordering
declare function descend<T>(fn: (obj: T) => Ord, a: T, b: T): Ordering

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * See also {@link differenceWith}, {@link symmetricDifference}, {@link symmetricDifferenceWith}, {@link without}
 *
 * @example
 * ```typescript
 * R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 * R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 * R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 * ```
 */
declare function difference<T>(
  list1: readonly T[]
): (list2: readonly T[]) => T[]
declare function difference<T>(list1: readonly T[], list2: readonly T[]): T[]

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * See also {@link difference}, {@link symmetricDifference}, {@link symmetricDifferenceWith}
 *
 * @example
 * ```typescript
 * const cmp = (x, y) => x.a === y.a;
 * const l1 = [{a: 1}, {a: 2}, {a: 3}];
 * const l2 = [{a: 3}, {a: 4}];
 * R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 *
 * R.differenceWith(R.equals, [1, 2, 3, 3, 3], []); //=> [1, 2, 3]
 * R.differenceWith(R.equals, [1, 2, 3, 3, 3], [1]); //=> [2, 3]
 * ```
 */
declare function differenceWith<T1, T2>(
  pred: (a: T1, b: T2) => boolean
): (list1: readonly T1[], list2: readonly T2[]) => T1[]
declare function differenceWith<T1, T2>(
  pred: (a: T1, b: T2) => boolean,
  list1: readonly T1[]
): (list2: readonly T2[]) => T1[]
declare function differenceWith<T1, T2>(
  pred: (a: T1, b: T2) => boolean,
  list1: readonly T1[],
  list2: readonly T2[]
): T1[]

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * See also {@link assoc}, {@link omit}
 *
 * @example
 * ```typescript
 * R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 * ```
 */
declare function dissoc<K extends string | number>(
  prop: K
): <T extends object>(obj: T) => Omit<T, K>
declare function dissoc<T extends object, K extends keyof T>(
  prop: K,
  obj: T
): Omit<T, K>

/**
 * Makes a shallow clone of an object. Note that this copies and flattens
 * prototype properties onto the new object as well. All non-primitive
 * properties are copied by reference.
 */
declare function dissocPath<T>(path: Path): (obj: any) => T
declare function dissocPath<T>(path: Path, obj: any): T

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * See also {@link multiply}
 *
 * @example
 * ```typescript
 * R.divide(71, 100); //=> 0.71
 *
 * const half = R.divide(R.__, 2);
 * half(42); //=> 21
 *
 * const reciprocal = R.divide(1);
 * reciprocal(4);   //=> 0.25
 * ```
 */
declare function divide(a: number): (b: number) => number
declare function divide(__: Placeholder, b: number): (a: number) => number
declare function divide(a: number, b: number): number

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * See also {@link take}, {@link transduce}, {@link dropLast}, {@link dropWhile}
 *
 * @example
 * ```typescript
 * R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 * R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 * R.drop(3, ['foo', 'bar', 'baz']); //=> []
 * R.drop(4, ['foo', 'bar', 'baz']); //=> []
 * R.drop(3, 'ramda');               //=> 'da'
 * ```
 */
declare function drop<T>(n: number): {
  (xs: string): string
  (xs: readonly T[]): T[]
}
declare function drop(n: number, xs: string): string
declare function drop<T>(n: number, xs: readonly T[]): T[]

/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link takeLast}, {@link drop}, {@link dropWhile}, {@link dropLastWhile}
 *
 * @example
 * ```typescript
 * R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 * R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 * R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 * R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 * R.dropLast(3, 'ramda');               //=> 'ra'
 * ```
 */
declare function dropLast<T>(n: number): {
  (xs: string): string
  (xs: readonly T[]): T[]
}
declare function dropLast<T>(n: number, xs: readonly T[]): T[]
declare function dropLast(n: number, xs: string): string

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link takeLastWhile}, {@link addIndex}, {@link drop}, {@link dropWhile}
 *
 * @example
 * ```typescript
 * const lteThree = x => x <= 3;
 *
 * R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 * R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 * ```
 */
declare function dropLastWhile<T>(
  fn: (a: T) => boolean
): (list: readonly T[]) => T[]
declare function dropLastWhile<T>(
  fn: (a: T) => boolean,
  list: readonly T[]
): T[]

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 * ```
 */
declare function dropRepeats<T>(list: readonly T[]): T[]

/**
 * Returns a new list without any consecutively repeating elements,
 * based upon the value returned by applying the supplied function to
 * each list element. [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * R.dropRepeatsBy(Math.abs, [1, -1, -1, 2, 3, -4, 4, 2, 2]); //=> [1, 2, 3, -4, 2]
 * ```
 */
declare function dropRepeatsBy<T, U>(
  fn: (a: T) => U
): (list: readonly T[]) => T[]
declare function dropRepeatsBy<T, U>(fn: (a: T) => U, list: readonly T[]): T[]

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 * R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 * ```
 */
declare function dropRepeatsWith<T>(
  predicate: (left: T, right: T) => boolean
): (list: readonly T[]) => T[]
declare function dropRepeatsWith<T>(
  predicate: (left: T, right: T) => boolean,
  list: readonly T[]
): T[]

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link takeWhile}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const lteTwo = x => x <= 2;
 *
 * R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 * R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 * ```
 */
declare function dropWhile<T>(
  fn: (a: T) => boolean
): (list: readonly T[]) => T[]
declare function dropWhile<T>(fn: (a: T) => boolean, list: readonly T[]): T[]

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * See also {@link both}, {@link anyPass}, {@link or}
 *
 * @example
 * ```typescript
 * const gt10 = x => x > 10;
 * const even = x => x % 2 === 0;
 * const f = R.either(gt10, even);
 * f(101); //=> true
 * f(8); //=> true
 *
 * R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 * R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 * ```
 */
declare function either<Fn extends (...args: any[]) => boolean>(
  f: Fn
): (g: Fn) => Fn
declare function either<Fn extends (...args: any[]) => boolean>(
  f: Fn,
  g: Fn
): Fn

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`),
 * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @example
 * ```typescript
 * R.empty(Just(42));               //=> Nothing()
 * R.empty([1, 2, 3]);              //=> []
 * R.empty('unicorns');             //=> ''
 * R.empty({x: 1, y: 2});           //=> {}
 * R.empty(Uint8Array.from('123')); //=> Uint8Array []
 * ```
 */
declare function empty<T>(x: T): T

/**
 * Checks if a list ends with the provided sublist.
 *
 * Similarly, checks if a string ends with the provided substring.
 *
 * See also {@link startsWith}
 *
 * @example
 * ```typescript
 * R.endsWith('c', 'abc')                //=> true
 * R.endsWith('b', 'abc')                //=> false
 * R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 * R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 * ```
 */
declare function endsWith(substr: string): (str: string) => boolean
declare function endsWith<T>(
  subList: readonly T[]
): (list: readonly T[]) => boolean
declare function endsWith(substr: string, str: string): boolean
declare function endsWith<T>(subList: readonly T[], list: readonly T[]): boolean

/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @example
 * ```typescript
 * R.eqBy(Math.abs, 5, -5); //=> true
 * ```
 */
declare function eqBy<T>(fn: (a: T) => unknown): {
  (a: T): (b: T) => boolean
  (a: T, b: T): boolean
}
declare function eqBy<T>(fn: (a: T) => unknown, a: T): (b: T) => boolean
declare function eqBy<T>(fn: (a: T) => unknown, a: T, b: T): boolean

/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @example
 * ```typescript
 * const o1 = { a: 1, b: 2, c: 3, d: 4 };
 * const o2 = { a: 10, b: 20, c: 3, d: 40 };
 * R.eqProps('a', o1, o2); //=> false
 * R.eqProps('c', o1, o2); //=> true
 * ```
 */
declare function eqProps<P extends string>(
  prop: P
): <T, U>(obj1: Record<P, T>, obj2: Record<P, U>) => boolean
declare function eqProps<T>(prop: string, obj1: T): <U>(obj2: U) => boolean
declare function eqProps<T, U>(prop: string, obj1: T, obj2: U): boolean

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @example
 * ```typescript
 * R.equals(1, 1); //=> true
 * R.equals(1, '1'); //=> false
 * R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 * const a = {}; a.v = a;
 * const b = {}; b.v = b;
 * R.equals(a, b); //=> true
 * ```
 */
declare function equals<T>(a: T): (b: T) => boolean
declare function equals<T>(__: Placeholder, b: T): (a: T) => boolean
declare function equals<T>(a: T, b: T): boolean

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @example
 * ```typescript
 * const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 * const transformations = {
 *   firstName: R.trim,
 *   lastName: R.trim, // Will not get invoked.
 *   data: {elapsed: R.add(1), remaining: R.add(-1)}
 * };
 * R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 * ```
 */
declare function evolve<E extends Evolver>(
  transformations: E
): <V extends Evolvable<E>>(obj: V) => Evolve<V, E>
declare function evolve<E extends Evolver, V extends Evolvable<E>>(
  transformations: E,
  obj: V
): Evolve<V, E>

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * See also {@link T}
 *
 * @example
 * ```typescript
 * R.F(); //=> false
 * ```
 */
declare function F(...args: unknown[]): false

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link reject}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isEven = n => n % 2 === 0;
 *
 * R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 * R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 * ```
 */
declare function filter<A, P extends A>(
  pred: (val: A) => val is P
): {
  <B extends A>(list: readonly B[]): P[]
  <B extends A>(dict: Record<string, B>): Record<string, P>
}
declare function filter<T>(
  pred: (value: T) => boolean
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: C) => C
declare function filter<T, P extends T>(
  pred: (val: T) => val is P,
  list: readonly T[]
): P[]
declare function filter<T, P extends T>(
  pred: (val: T) => val is P,
  dict: Record<string, T>
): Record<string, P>
declare function filter<T, C extends readonly T[] | Record<string, T>>(
  pred: (value: T) => boolean,
  collection: C
): C

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 * R.find(R.propEq('a', 4))(xs); //=> undefined
 * ```
 */
declare function find<T, P extends T>(
  pred: (val: T) => val is P
): (list: readonly T[]) => P | undefined
declare function find<T>(
  pred: (val: T) => boolean
): (list: readonly T[]) => T | undefined
declare function find<T, P extends T>(
  pred: (val: T) => val is P,
  list: readonly T[]
): P | undefined
declare function find<T>(
  pred: (val: T) => boolean,
  list: readonly T[]
): T | undefined

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}, {@link indexOf}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * R.findIndex(R.propEq('a', 2))(xs); //=> 1
 * R.findIndex(R.propEq('a', 4))(xs); //=> -1
 * ```
 */
declare function findIndex<T>(
  fn: (a: T) => boolean
): (list: readonly T[]) => number
declare function findIndex<T>(fn: (a: T) => boolean, list: readonly T[]): number

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 * R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 * R.findLast(R.propEq('a', 4))(xs); //=> undefined
 * ```
 */
declare function findLast<T, P extends T>(
  pred: (val: T) => val is P
): (list: readonly T[]) => P | undefined
declare function findLast<T>(
  pred: (val: T) => boolean
): (list: readonly T[]) => T | undefined
declare function findLast<T, P extends T>(
  pred: (val: T) => val is P,
  list: readonly T[]
): P | undefined
declare function findLast<T>(
  pred: (val: T) => boolean,
  list: readonly T[]
): T | undefined

/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}, {@link lastIndexOf}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 * R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 * R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 * ```
 */
declare function findLastIndex<T>(
  fn: (a: T) => boolean
): (list: readonly T[]) => number
declare function findLastIndex<T>(
  fn: (a: T) => boolean,
  list: readonly T[]
): number

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * See also {@link unnest}
 *
 * @example
 * ```typescript
 * R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 * ```
 */
declare function flatten<T extends readonly any[]>(list: T): Flatten<T>

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @example
 * ```typescript
 * const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 * mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 * R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * ```
 */
declare function flip<T, U, TResult>(
  fn: (arg0: T, arg1: U) => TResult
): {
  (arg1: U): (arg0: T) => TResult
  (arg1: U, arg0: T): TResult
}
declare function flip<
  F extends (...args: any) => any,
  P extends Parameters$1<F>
>(fn: F): Curry<(...args: Merge<[P[1], P[0]], P>) => Return<F>>

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * See also {@link addIndex}
 *
 * @example
 * ```typescript
 * const printXPlusFive = x => console.log(x + 5);
 * R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 * // logs 6
 * // logs 7
 * // logs 8
 * ```
 */
declare function forEach<T>(
  fn: (x: T) => void
): <U extends readonly T[]>(list: U) => U
declare function forEach<U extends readonly any[] = readonly any[]>(
  __: Placeholder,
  list: U
): (fn: (x: U extends readonly (infer T)[] ? T : never) => void) => U
declare function forEach<T, U extends readonly T[] = readonly T[]>(
  fn: (x: T) => void,
  list: U
): U

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @example
 * ```typescript
 * const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 * R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 * // logs x:1
 * // logs y:2
 * ```
 */
declare function forEachObjIndexed<T>(
  fn: (value: T[keyof T], key: keyof T, obj: T) => void
): (obj: T) => T
declare function forEachObjIndexed<T>(
  fn: (value: T[keyof T], key: keyof T, obj: T) => void,
  obj: T
): T

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * See also {@link toPairs}, {@link pair}
 *
 * @example
 * ```typescript
 * R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 * ```
 */
declare function fromPairs<K extends PropertyKey, V>(
  pairs: readonly [K, V][]
): { [P in K]: V }

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a key-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link reduceBy}, {@link transduce}, {@link indexBy}, {@link collectBy}
 *
 * @example
 * ```typescript
 * const byGrade = R.groupBy(function(student) {
 *   const score = student.score;
 *   return score < 65 ? 'F' :
 *          score < 70 ? 'D' :
 *          score < 80 ? 'C' :
 *          score < 90 ? 'B' : 'A';
 * });
 * const students = [{name: 'Abby', score: 84},
 *                 {name: 'Eddy', score: 58},
 *                 // ...
 *                 {name: 'Jack', score: 69}];
 * byGrade(students);
 * // {
 * //   'A': [{name: 'Dianne', score: 99}],
 * //   'B': [{name: 'Abby', score: 84}]
 * //   // ...,
 * //   'F': [{name: 'Eddy', score: 58}]
 * // }
 * ```
 */
declare function groupBy<T, K extends string = string>(
  fn: (a: T) => K
): (list: readonly T[]) => Partial<Record<K, T[]>>
declare function groupBy<T>(
  __: Placeholder,
  list: readonly T[]
): <K extends string = string>(fn: (a: T) => K) => Partial<Record<K, T[]>>
declare function groupBy<T, K extends string = string>(
  fn: (a: T) => K,
  list: readonly T[]
): Partial<Record<K, T[]>>

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @example
 * ```typescript
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * const isVowel = R.test(/^[aeiou]$/i);
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 * ```
 */
declare function groupWith<T>(fn: (a: T, b: T) => boolean): {
  (list: string): string[]
  (list: readonly T[]): T[][]
}
declare function groupWith<T>(
  fn: (a: T, b: T) => boolean,
  list: string
): string[]
declare function groupWith<T>(
  fn: (a: T, b: T) => boolean,
  list: readonly T[]
): T[][]

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * See also {@link lt}
 *
 * @example
 * ```typescript
 * R.gt(2, 1); //=> true
 * R.gt(2, 2); //=> false
 * R.gt(2, 3); //=> false
 * R.gt('a', 'z'); //=> false
 * R.gt('z', 'a'); //=> true
 * ```
 */
declare function gt<T extends Ord>(a: T): (b: WidenLiterals<T>) => boolean
declare function gt<T extends Ord>(
  __: Placeholder,
  b: T
): (a: WidenLiterals<T>) => boolean
declare function gt<T extends Ord>(a: T, b: T): boolean

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * See also {@link lte}
 *
 * @example
 * ```typescript
 * R.gte(2, 1); //=> true
 * R.gte(2, 2); //=> true
 * R.gte(2, 3); //=> false
 * R.gte('a', 'z'); //=> false
 * R.gte('z', 'a'); //=> true
 * ```
 */
declare function gte<T extends Ord>(a: T): (b: WidenLiterals<T>) => boolean
declare function gte<T extends Ord>(
  __: Placeholder,
  b: T
): (a: WidenLiterals<T>) => boolean
declare function gte<T extends Ord>(a: T, b: T): boolean

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @example
 * ```typescript
 * const hasName = R.has('name');
 * hasName({name: 'alice'});   //=> true
 * hasName({name: 'bob'});     //=> true
 * hasName({});                //=> false
 *
 * const point = {x: 0, y: 0};
 * const pointHas = R.has(R.__, point);
 * pointHas('x');  //=> true
 * pointHas('y');  //=> true
 * pointHas('z');  //=> false
 * ```
 */
declare function has<K extends PropertyKey>(
  prop: K
): (obj: unknown) => obj is ObjectHavingSome<K>
declare function has(
  __: Placeholder,
  obj: unknown
): <P extends PropertyKey>(s: P) => boolean
declare function has<K extends PropertyKey>(
  prop: K,
  obj: unknown
): obj is ObjectHavingSome<K>

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @example
 * ```typescript
 * function Rectangle(width, height) {
 *   this.width = width;
 *   this.height = height;
 * }
 * Rectangle.prototype.area = function() {
 *   return this.width * this.height;
 * };
 *
 * const square = new Rectangle(2, 2);
 * R.hasIn('width', square);  //=> true
 * R.hasIn('area', square);  //=> true
 * ```
 */
declare function hasIn(s: string): <T>(obj: T) => boolean
declare function hasIn<T>(s: string, obj: T): boolean

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * See also {@link has}
 *
 * @example
 * ```typescript
 * R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 * R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 * R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 * R.hasPath(['a', 'b'], {});                  // => false
 * ```
 */
declare function hasPath(list: readonly string[]): <T>(obj: T) => boolean
declare function hasPath<T>(list: readonly string[], obj: T): boolean

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * See also {@link tail}, {@link init}, {@link last}
 *
 * @example
 * ```typescript
 * R.head(['fi', 'fo', 'fum']); //=> 'fi'
 * R.head([]); //=> undefined
 *
 * R.head('abc'); //=> 'a'
 * R.head(''); //=> ''
 * ```
 */
declare function head(str: string): string
// empty tuple - purposefully `never`. `head` should never work on tuple type with no length
declare function head(list: readonly []): never
// non-empty tuple
declare function head<T1, TRest>(list: readonly [T1, ...TRest[]]): T1
// arrays, because these could be empty, they return `T | undefined`
// this is no different than the tuple form since `T[]` can be empty at runtime
declare function head<T>(list: readonly T[]): T | undefined

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * `identical` does not support the `__` placeholder.
 *
 * @example
 * ```typescript
 * const o = {};
 * R.identical(o, o); //=> true
 * R.identical(1, 1); //=> true
 * R.identical(1, '1'); //=> false
 * R.identical([], []); //=> false
 * R.identical(0, -0); //=> false
 * R.identical(NaN, NaN); //=> true
 * ```
 */
declare function identical<T>(a: T): (b: T) => boolean
declare function identical<T>(a: T, b: T): boolean

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @example
 * ```typescript
 * R.identity(1); //=> 1
 *
 * const obj = {};
 * R.identity(obj) === obj; //=> true
 * ```
 */
declare function identity<T>(a: T): T

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * Note that `ifElse` takes its arity from the longest of the three functions passed to it.
 *
 * See also {@link unless}, {@link when}, {@link cond}
 *
 * @example
 * ```typescript
 * const incCount = R.ifElse(
 *   R.has('count'),
 *   R.over(R.lensProp('count'), R.inc),
 *   R.assoc('count', 1)
 * );
 * incCount({ count: 1 }); //=> { count: 2 }
 * incCount({});           //=> { count: 1 }
 * ```
 */
declare function ifElse<T, TF extends T, TOnTrueResult, TOnFalseResult>(
  pred: (a: T) => a is TF,
  onTrue: (a: TF) => TOnTrueResult,
  onFalse: (a: Exclude<T, TF>) => TOnFalseResult
): (a: T) => TOnTrueResult | TOnFalseResult
declare function ifElse<
  TArgs extends readonly any[],
  TOnTrueResult,
  TOnFalseResult
>(
  fn: (...args: TArgs) => boolean,
  onTrue: (...args: TArgs) => TOnTrueResult,
  onFalse: (...args: TArgs) => TOnFalseResult
): (...args: TArgs) => TOnTrueResult | TOnFalseResult

/**
 * Increments its argument.
 *
 * See also {@link dec}
 *
 * @example
 * ```typescript
 * R.inc(42); //=> 43
 * ```
 */
declare function inc(n: number): number

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Also works with strings.
 *
 * See also {@link any}
 *
 * @example
 * ```typescript
 * R.includes(3, [1, 2, 3]); //=> true
 * R.includes(4, [1, 2, 3]); //=> false
 * R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 * R.includes([42], [[42]]); //=> true
 * R.includes('ba', 'banana'); //=>true
 * ```
 */
declare function includes(
  s: string
): (list: readonly string[] | string) => boolean
declare function includes<T>(target: T): (list: readonly T[]) => boolean

declare function includes(__: Placeholder, list: string): (s: string) => boolean
declare function includes<T>(
  __: Placeholder,
  list: readonly T[]
): (target: T) => boolean

declare function includes(s: string, list: string): boolean
declare function includes<T>(target: T, list: readonly T[]): boolean

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link groupBy}
 *
 * @example
 * ```typescript
 * const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 * R.indexBy(R.prop('id'), list);
 * //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 * ```
 */
declare function indexBy<T, K extends string | number = string>(
  fn: (a: T) => K
): (list: readonly T[]) => { [key in K]: T }
declare function indexBy<T, K extends string | number | undefined = string>(
  fn: (a: T) => K | undefined
): (list: readonly T[]) => { [key in NonNullable<K>]?: T }
declare function indexBy<T, K extends string | number = string>(
  fn: (a: T) => K,
  list: readonly T[]
): { [key in K]: T }
declare function indexBy<T, K extends string | number | undefined = string>(
  fn: (a: T) => K,
  list: readonly T[]
): { [key in NonNullable<K>]?: T }

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * See also {@link lastIndexOf}, {@link findIndex}
 *
 * @example
 * ```typescript
 * R.indexOf(3, [1,2,3,4]); //=> 2
 * R.indexOf(10, [1,2,3,4]); //=> -1
 * ```
 */
declare function indexOf(
  target: string
): (list: readonly string[] | string) => number
declare function indexOf<T>(target: T): (list: readonly T[]) => number
declare function indexOf(
  target: string,
  list: readonly string[] | string
): number
declare function indexOf<T>(target: T, list: readonly T[]): number

/**
 * Returns all but the last element of the given list or string.
 *
 * See also {@link last}, {@link head}, {@link tail}
 *
 * @example
 * ```typescript
 * R.init([1, 2, 3]);  //=> [1, 2]
 * R.init([1, 2]);     //=> [1]
 * R.init([1]);        //=> []
 * R.init([]);         //=> []
 *
 * R.init('abc');  //=> 'ab'
 * R.init('ab');   //=> 'a'
 * R.init('a');    //=> ''
 * R.init('');     //=> ''
 * ```
 */
declare function init(list: string): string
declare function init<T>(list: readonly T[]): T[]

/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * See also {@link intersection}
 *
 * @example
 * ```typescript
 * R.innerJoin(
 *   (record, id) => record.id === id,
 *   [{id: 824, name: 'Richie Furay'},
 *    {id: 956, name: 'Dewey Martin'},
 *    {id: 313, name: 'Bruce Palmer'},
 *    {id: 456, name: 'Stephen Stills'},
 *    {id: 177, name: 'Neil Young'}],
 *   [177, 456, 999]
 * );
 * //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 * ```
 */
declare function innerJoin<T1, T2>(
  pred: (a: T1, b: T2) => boolean
): (list1: readonly T1[], list2: readonly T2[]) => T1[]
declare function innerJoin<T1, T2>(
  pred: (a: T1, b: T2) => boolean,
  list1: readonly T1[]
): (list2: readonly T2[]) => T1[]
declare function innerJoin<T1, T2>(
  pred: (a: T1, b: T2) => boolean,
  list1: readonly T1[],
  list2: readonly T2[]
): T1[]

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that
 *
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @example
 * ```typescript
 * R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 * ```
 */
declare function insert(index: number): <T>(elt: T, list: readonly T[]) => T[]
declare function insert<T>(index: number, elt: T): (list: readonly T[]) => T[]
declare function insert<T>(index: number, elt: T, list: readonly T[]): T[]

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @example
 * ```typescript
 * R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 * ```
 */
declare function insertAll(
  index: number
): <T>(elts: readonly T[], list: readonly T[]) => T[]
declare function insertAll<T>(
  index: number,
  elts: readonly T[]
): (list: readonly T[]) => T[]
declare function insertAll<T>(
  index: number,
  elts: readonly T[],
  list: readonly T[]
): T[]

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * See also {@link innerJoin}
 *
 * @example
 * ```typescript
 * R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 * ```
 */
declare function intersection<T>(
  list1: readonly T[]
): (list2: readonly T[]) => T[]
declare function intersection<T>(list1: readonly T[], list2: readonly T[]): T[]

/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @example
 * ```typescript
 * R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 * ```
 */
declare function intersperse<T>(separator: T): (list: readonly T[]) => T[]
declare function intersperse<T>(separator: T, list: readonly T[]): T[]

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4];
 * const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 * R.into([], transducer, numbers); //=> [2, 3]
 *
 * const intoArray = R.into([]);
 * intoArray(transducer, numbers); //=> [2, 3]
 * ```
 */
declare function into(
  acc: any
): <T>(xf: (...a: readonly any[]) => any, list: readonly T[]) => T[]
declare function into<T>(
  acc: any,
  xf: (...a: readonly any[]) => any,
  list: readonly T[]
): T[]
declare function into<T, R>(
  acc: any,
  xf: (...a: readonly any[]) => R[],
  list: readonly T[]
): R[]
declare function into(
  acc: any,
  xf: (...a: readonly any[]) => any
): <T>(list: readonly T[]) => T[]

/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * See also {@link invertObj}
 *
 * @example
 * ```typescript
 * const raceResultsByFirstName = {
 *   first: 'alice',
 *   second: 'jake',
 *   third: 'alice',
 * };
 * R.invert(raceResultsByFirstName);
 * //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 * ```
 */
declare function invert<T>(obj: T): { [index: string]: string[] }

/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * See also {@link invert}
 *
 * @example
 * ```typescript
 * const raceResults = {
 *   first: 'alice',
 *   second: 'jake'
 * };
 * R.invertObj(raceResults);
 * //=> { 'alice': 'first', 'jake':'second' }
 *
 * // Alternatively:
 * const raceResults = ['alice', 'jake'];
 * R.invertObj(raceResults);
 * //=> { 'alice': '0', 'jake':'1' }
 * ```
 */
declare function invertObj(
  obj: { [index: string]: string } | { [index: number]: string }
): { [index: string]: string }

/**
 * Given an `arity` (Number) and a `name` (String) the `invoker` function
 * returns a curried function that takes `arity` arguments and a `context`
 * object. It will "invoke" the `name`'d function (a method) on the `context`
 * object.
 *
 * See also {@link construct}
 *
 * @example
 * ```typescript
 * // A function with no arguments
 * const asJson = invoker(0, "json")
 * // Just like calling .then((response) => response.json())
 * fetch("http://example.com/index.json").then(asJson)
 *
 * // A function with one argument
 * const sliceFrom = invoker(1, 'slice');
 * sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *
 * // A function with two arguments
 * const sliceFrom6 = invoker(2, 'slice')(6);
 * sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 * // NOTE: You can't simply pass some of the arguments to the initial invoker function.
 * const firstCreditCardSection = invoker(2, "slice", 0, 4)
 * firstCreditCardSection("4242 4242 4242 4242") // => Function<...>
 *
 * // Since invoker returns a curried function, you may partially apply it to create the function you need.
 * const firstCreditCardSection = invoker(2, "slice")(0, 4)
 * firstCreditCardSection("4242 4242 4242 4242") // => "4242"
 * ```
 */
declare function invoker(
  arity: number,
  method: string
): (...a: readonly any[]) => any

/**
 * See if an object (i.e. `val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 * If `val` was created using `Object.create`, `R.is(Object, val) === true`.
 *
 * @example
 * ```typescript
 * R.is(Object, {}); //=> true
 * R.is(Number, 1); //=> true
 * R.is(Object, 1); //=> false
 * R.is(String, 's'); //=> true
 * R.is(String, new String('')); //=> true
 * R.is(Object, new String('')); //=> true
 * R.is(Object, 's'); //=> false
 * R.is(Number, {}); //=> false
 * ```
 */
declare function is<C extends (...args: any[]) => any>(
  ctor: C
): (val: any) => val is ReturnType<C>
declare function is<C extends new (...args: any[]) => any>(
  ctor: C
): (val: any) => val is InstanceType<C>
declare function is<C extends (...args: any[]) => any>(
  ctor: C,
  val: any
): val is ReturnType<C>
declare function is<C extends new (...args: any[]) => any>(
  ctor: C,
  val: any
): val is InstanceType<C>

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * See also {@link empty}
 *
 * @example
 * ```typescript
 * R.isEmpty([1, 2, 3]);           //=> false
 * R.isEmpty([]);                  //=> true
 * R.isEmpty('');                  //=> true
 * R.isEmpty(null);                //=> false
 * R.isEmpty({});                  //=> true
 * R.isEmpty({length: 0});         //=> false
 * R.isEmpty(Uint8Array.from('')); //=> true
 * ```
 */
declare function isEmpty(value: any): boolean

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @example
 * ```typescript
 * R.isNil(null); //=> true
 * R.isNil(undefined); //=> true
 * R.isNil(0); //=> false
 * R.isNil([]); //=> false
 * ```
 */
declare function isNil(value: any): value is null | undefined

/**
 * Checks if the input value is not `null` and not `undefined`.
 *
 * @example
 * ```typescript
 * R.isNotNil(null); //=> false
 * R.isNotNil(undefined); //=> false
 * R.isNotNil(0); //=> true
 * R.isNotNil([]); //=> true
 * ```
 */
declare function isNotNil<T>(value: T): value is NonNullable<T>

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * See also {@link split}
 *
 * @example
 * ```typescript
 * const spacer = R.join(' ');
 * spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 * R.join('|', [1, 2, 3]);    //=> '1|2|3'
 * ```
 */
declare function join(x: string): (xs: readonly any[]) => string
declare function join(x: string, xs: readonly any[]): string

/**
 * juxt applies a list of functions to a list of values.
 *
 * See also {@link applySpec}
 *
 * @example
 * ```typescript
 * const getRange = R.juxt([Math.min, Math.max]);
 * getRange(3, 4, 9, -3); //=> [-3, 9]
 * ```
 */
declare function juxt<A extends any[], R1>(
  fns: [(...a: A) => R1]
): (...a: A) => [R1]
declare function juxt<A extends any[], R1, R2>(
  fns: [(...a: A) => R1, (...a: A) => R2]
): (...a: A) => [R1, R2]
declare function juxt<A extends any[], R1, R2, R3>(
  fns: [(...a: A) => R1, (...a: A) => R2, (...a: A) => R3]
): (...a: A) => [R1, R2, R3]
declare function juxt<A extends any[], R1, R2, R3, R4>(
  fns: [(...a: A) => R1, (...a: A) => R2, (...a: A) => R3, (...a: A) => R4]
): (...a: A) => [R1, R2, R3, R4]
declare function juxt<A extends any[], R1, R2, R3, R4, R5>(
  fns: [
    (...a: A) => R1,
    (...a: A) => R2,
    (...a: A) => R3,
    (...a: A) => R4,
    (...a: A) => R5
  ]
): (...a: A) => [R1, R2, R3, R4, R5]
declare function juxt<A extends any[], U>(
  fns: Array<(...args: A) => U>
): (...args: A) => U[]

/**
 * #__PURE__
 */
declare function keys<T extends object>(x: T): Array<keyof T>

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * See also {@link keys}, {@link valuesIn}
 *
 * @example
 * ```typescript
 * const F = function() { this.x = 'X'; };
 * F.prototype.y = 'Y';
 * const f = new F();
 * R.keysIn(f); //=> ['x', 'y']
 * ```
 */
declare function keysIn<T>(obj: T): string[]

/**
 * Returns the last element of the given list or string.
 *
 * See also {@link init}, {@link head}, {@link tail}
 *
 * @example
 * ```typescript
 * R.last(['fi', 'fo', 'fum']); //=> 'fum'
 * R.last([]); //=> undefined
 *
 * R.last('abc'); //=> 'c'
 * R.last(''); //=> ''
 * ```
 */
declare function last(str: string): string
declare function last(list: readonly []): undefined
declare function last<T extends any>(list: readonly T[]): T | undefined

/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * See also {@link indexOf}, {@link findLastIndex}
 *
 * @example
 * ```typescript
 * R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 * R.lastIndexOf(10, [1,2,3,4]); //=> -1
 * ```
 */
declare function lastIndexOf(
  target: string
): (list: readonly string[] | string) => number
declare function lastIndexOf<T>(target: T): (list: readonly T[]) => number
declare function lastIndexOf(
  target: string,
  list: readonly string[] | string
): number
declare function lastIndexOf<T>(target: T, list: readonly T[]): number

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @example
 * ```typescript
 * R.length([]); //=> 0
 * R.length([1, 2, 3]); //=> 3
 * ```
 */
declare function length<T extends { length: number }>(list: T): number

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * See also {@link view}, {@link set}, {@link over}, {@link lensIndex}, {@link lensProp}
 *
 * @example
 * ```typescript
 * const xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 * R.view(xLens, {x: 1, y: 2});            //=> 1
 * R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 * R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 * ```
 */
declare function lens<S, A>(
  getter: (s: S) => A,
  setter: (a: A, s: S) => S
): Lens<S, A>

/**
 * Returns a lens whose focus is the specified index.
 *
 * See also {@link view}, {@link set}, {@link over}, {@link nth}
 *
 * @example
 * ```typescript
 * const headLens = R.lensIndex(0);
 *
 * R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 * R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 * R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 * ```
 */
declare function lensIndex<A>(n: number): Lens<A[], A>
declare function lensIndex<A extends any[], N extends number>(
  n: N
): Lens<A, A[N]>

/**
 * Returns a lens whose focus is the specified path.
 *
 * See also {@link view}, {@link set}, {@link over}
 *
 * @example
 * ```typescript
 * const xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 * R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 * //=> 2
 * R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 * //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 * R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 * //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 * ```
 */
declare function lensPath<S, K0 extends keyof S = keyof S>(
  path: [K0]
): Lens<S, S[K0]>
declare function lensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0]
>(path: [K0, K1]): Lens<S, S[K0][K1]>
declare function lensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1]
>(path: [K0, K1, K2]): Lens<S, S[K0][K1][K2]>
declare function lensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2]
>(path: [K0, K1, K2, K3]): Lens<S, S[K0][K1][K2][K3]>
declare function lensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3]
>(path: [K0, K1, K2, K3, K4]): Lens<S, S[K0][K1][K2][K3][K4]>
declare function lensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3][K4] = keyof S[K0][K1][K2][K3][K4]
>(path: [K0, K1, K2, K3, K4, K5]): Lens<S, S[K0][K1][K2][K3][K4][K5]>
declare function lensPath<S = any, A = any>(path: Path): Lens<S, A>

/**
 * Returns a lens whose focus is the specified property.
 *
 * See also {@link view}, {@link set}, {@link over}
 *
 * @example
 * ```typescript
 * const xLens = R.lensProp('x');
 *
 * R.view(xLens, {x: 1, y: 2});            //=> 1
 * R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 * R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 * ```
 */
declare function lensProp<S, K extends keyof S = keyof S>(
  prop: K
): Lens<S, S[K]>

/**
 * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * See also {@link liftN}
 *
 * @example
 * ```typescript
 * const madd3 = R.lift((a, b, c) => a + b + c);
 *
 * madd3([100, 200], [30, 40], [5, 6, 7]); //=> [135, 136, 137, 145, 146, 147, 235, 236, 237, 245, 246, 247]
 *
 * const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 * madd5([10, 20], [1], [2, 3], [4], [100, 200]); //=> [117, 217, 118, 218, 127, 227, 128, 228]
 * ```
 */
declare function lift<F extends (...args: readonly any[]) => any>(
  fn: F
): {
  (...args: ToTupleOfArray<Parameters<F>>): Array<ReturnType<F>>
  <R>(...args: ToTupleOfFunction<R, Parameters<F>>): (arg: R) => ReturnType<F>
}

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * See also {@link lift}, {@link ap}
 *
 * @example
 * ```typescript
 * const madd3 = R.liftN(3, (...args) => R.sum(args));
 * madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 * ```
 */
declare function liftN<
  N extends number,
  F extends (...args: readonly any[]) => any
>(
  n: N,
  fn: F
): {
  (...args: Take<N, ToTupleOfArray<Parameters<F>>>): Array<ReturnType<F>>
  <R>(
    ...args: Take<N, ToTupleOfFunction<R, Parameters<F>>>
  ): (arg: R) => ReturnType<F>
}

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * See also {@link gt}
 *
 * @example
 * ```typescript
 * R.lt(2, 1); //=> false
 * R.lt(2, 2); //=> false
 * R.lt(2, 3); //=> true
 * R.lt('a', 'z'); //=> true
 * R.lt('z', 'a'); //=> false
 * ```
 */
declare function lt<T extends Ord>(a: T): (b: WidenLiterals<T>) => boolean
declare function lt<T extends Ord>(
  __: Placeholder,
  b: T
): (a: WidenLiterals<T>) => boolean
declare function lt<T extends Ord>(a: T, b: T): boolean

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * See also {@link gte}
 *
 * @example
 * ```typescript
 * R.lte(2, 1); //=> false
 * R.lte(2, 2); //=> true
 * R.lte(2, 3); //=> true
 * R.lte('a', 'z'); //=> true
 * R.lte('z', 'a'); //=> false
 * ```
 */
declare function lte<T extends Ord>(a: T): (b: WidenLiterals<T>) => boolean
declare function lte<T extends Ord>(
  __: Placeholder,
  b: T
): (a: WidenLiterals<T>) => boolean
declare function lte<T extends Ord>(a: T, b: T): boolean

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * See also {@link transduce}, {@link addIndex}, {@link pluck}, {@link project}
 *
 * @example
 * ```typescript
 * const double = x => x * 2;
 *
 * R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 * R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * ```
 */
declare function map<A, B>(
  fn: (x: A) => B
): {
  // first and last def are the same and are here on purpose
  // the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
  (list: readonly A[]): B[]
  (functor: FunctorFantasyLand<A>): FunctorFantasyLand<B>
  (functor: FunctorMap<A>): FunctorMap<B>
  <U extends Record<PropertyKey, A>>(dict: U): Record<keyof U, B>
  // it also needs to be here when you pass map as an argument to a function, eg `compose(map(fn))`
  (list: readonly A[]): B[]
}

// map(__, list)
declare function map<A>(
  __: Placeholder,
  list: readonly A[]
): <B>(fn: (x: A) => B) => B[]
declare function map<A>(
  __: Placeholder,
  obj: FunctorFantasyLand<A>
): <B>(fn: (a: A) => B) => FunctorFantasyLand<B>
declare function map<A>(
  __: Placeholder,
  obj: FunctorMap<A>
): <B>(fn: (a: A) => B) => FunctorMap<B>
declare function map<U extends object>(
  __: Placeholder,
  dict: U
): <B>(fn: (x: ValueOfUnion<B>) => B) => Record<keyof U, B>
// map(fn, list)
// first and last def are the same and are here on purpose
// the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
declare function map<A, B>(fn: (x: A) => B, list: readonly A[]): B[]
declare function map<A, B>(
  fn: (x: A) => B,
  obj: FunctorFantasyLand<A>
): FunctorFantasyLand<B>
declare function map<A, B>(fn: (x: A) => B, obj: FunctorMap<A>): FunctorMap<B>
declare function map<U extends object, B>(
  fn: (x: ValueOfUnion<U>) => B,
  dict: U
): Record<keyof U, B>
// it also needs to be here when you pass map as an argument to a function, eg `flip(map)`
declare function map<A, B>(fn: (x: A) => B, list: readonly A[]): B[]

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * See also {@link scan}, {@link addIndex}, {@link mapAccumRight}
 *
 * @example
 * ```typescript
 * const digits = ['1', '2', '3', '4'];
 * const appender = (a, b) => [a + b, a + b];
 *
 * R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * ```
 */
declare function mapAccum<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult]
): (acc: U, list: readonly T[]) => [U, TResult[]]
declare function mapAccum<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
  acc: U
): (list: readonly T[]) => [U, TResult[]]
declare function mapAccum<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
  acc: U,
  list: readonly T[]
): [U, TResult[]]

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * See also {@link addIndex}, {@link mapAccum}
 *
 * @example
 * ```typescript
 * const digits = ['1', '2', '3', '4'];
 * const appender = (a, b) => [b + a, b + a];
 *
 * R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * ```
 */
declare function mapAccumRight<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult]
): (acc: U, list: readonly T[]) => [U, TResult[]]
declare function mapAccumRight<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
  acc: U
): (list: readonly T[]) => [U, TResult[]]
declare function mapAccumRight<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
  acc: U,
  list: readonly T[]
): [U, TResult[]]

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * See also {@link map}
 *
 * @example
 * ```typescript
 * const xyz = { x: 1, y: 2, z: 3 };
 * const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 * R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 * ```
 */
declare function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: Record<TKey, T>) => TResult
): (obj: Record<TKey, T>) => Record<TKey, TResult>
declare function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: PartialRecord<TKey, T>) => TResult
): (obj: Record<TKey, T>) => PartialRecord<TKey, TResult>
declare function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: Record<TKey, T>) => TResult,
  obj: Record<TKey, T>
): Record<TKey, TResult>
declare function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: Record<TKey, T>) => TResult,
  obj: PartialRecord<TKey, T>
): PartialRecord<TKey, TResult>
declare function mapObjIndexed<T, TResult>(
  fn: (
    value: T,
    key: string,
    obj?: {
      [key: string]: T
    }
  ) => TResult,
  obj: {
    [key: string]: T
  }
): {
  [key: string]: TResult
}

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * See also {@link test}
 *
 * @example
 * ```typescript
 * R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 * R.match(/a/, 'b'); //=> []
 * R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 * ```
 */
declare function match(regexp: RegExp): (str: string) => string[]
declare function match(regexp: RegExp, str: string): string[]

/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * See also {@link modulo}
 *
 * @example
 * ```typescript
 * R.mathMod(-17, 5);  //=> 3
 * R.mathMod(17, 5);   //=> 2
 * R.mathMod(17, -5);  //=> NaN
 * R.mathMod(17, 0);   //=> NaN
 * R.mathMod(17.2, 5); //=> NaN
 * R.mathMod(17, 5.3); //=> NaN
 *
 * const clock = R.mathMod(R.__, 12);
 * clock(15); //=> 3
 * clock(24); //=> 0
 *
 * const seventeenMod = R.mathMod(17);
 * seventeenMod(3);  //=> 2
 * seventeenMod(4);  //=> 1
 * seventeenMod(10); //=> 7
 * ```
 */
declare function mathMod(a: number): (b: number) => number
declare function mathMod(__: Placeholder, b: number): (a: number) => number
declare function mathMod(a: number, b: number): number

/**
 * Returns the larger of its two arguments.
 *
 * See also {@link maxBy}, {@link min}
 *
 * @example
 * ```typescript
 * R.max(789, 123); //=> 789
 * R.max('a', 'b'); //=> 'b'
 * ```
 */
declare function max<T extends Ord>(a: T): (b: T) => T
declare function max<T extends Ord>(a: T, b: T): T

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * See also {@link max}, {@link minBy}
 *
 * @example
 * ```typescript
 * //  square :: Number -> Number
 * const square = n => n * n;
 *
 * R.maxBy(square, -3, 2); //=> -3
 *
 * R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 * R.reduce(R.maxBy(square), 0, []); //=> 0
 * ```
 */
declare function maxBy<T>(keyFn: (a: T) => Ord): Curry<(a: T, b: T) => T>
declare function maxBy<T>(keyFn: (a: T) => Ord, a: T): (b: T) => T
declare function maxBy<T>(keyFn: (a: T) => Ord, a: T, b: T): T

/**
 * Returns the mean of the given list of numbers.
 *
 * See also {@link median}
 *
 * @example
 * ```typescript
 * R.mean([2, 7, 9]); //=> 6
 * R.mean([]); //=> NaN
 * ```
 */
declare function mean(list: readonly number[]): number

/**
 * Returns the median of the given list of numbers.
 *
 * See also {@link mean}
 *
 * @example
 * ```typescript
 * R.median([2, 9, 7]); //=> 7
 * R.median([7, 2, 10, 9]); //=> 8
 * R.median([]); //=> NaN
 * ```
 */
declare function median(list: readonly number[]): number

/**
 * Takes a string-returning function `keyGen` and a function `fn` and returns
 * a new function that returns cached results for subsequent
 * calls with the same arguments.
 *
 * When the function is invoked, `keyGen` is applied to the same arguments
 * and its result becomes the cache key. If the cache contains something
 * under that key, the function simply returns it and does not invoke `fn` at all.
 *
 * Otherwise `fn` is applied to the same arguments and its return value
 * is cached under that key and returned by the function.
 *
 * Care must be taken when implementing `keyGen` to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @example
 * ```typescript
 * const withAge = memoizeWith(o => `${o.birth}/${o.death}`, ({birth, death}) => {
 * //                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^
 * //                          keyGen                        fn
 *   console.log(`computing age for ${birth}/${death}`);
 *   return ({birth, death, age: death - birth});
 * });
 *
 * withAge({birth: 1921, death: 1999});
 * //=> LOG: computing age for 1921/1999
 * //=> {birth: 1921, death: 1999, age: 78} (returned from fn)
 *
 * withAge({birth: 1921, death: 1999});
 * //=> {birth: 1921, death: 1999, age: 78} (returned from cache)
 * ```
 */
declare function memoizeWith<T extends (...args: readonly any[]) => any>(
  keyFn: (...v: Parameters<T>) => string,
  fn: T
): T

/**
 * Creates one new object with the own properties from a list of objects.
 * If a key exists in more than one object, the value from the last
 * object it exists in will be used.
 *
 * See also {@link reduce}
 *
 * @example
 * ```typescript
 * R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 * R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * ```
 */
declare function mergeAll<T extends object, Ts extends readonly object[]>(
  list: [T, ...Ts]
): Assign<T, Ts>
// for when passing in an `T[]` where all the objects are the same shape `mergeAll([obj1, obj2, obj3]: T[])
// this just returns T
declare function mergeAll<T>(list: readonly T[]): T

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * See also {@link merge}, {@link mergeDeepRight}, {@link mergeDeepWith}, {@link mergeDeepWithKey}
 *
 * @example
 * ```typescript
 * R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                 { age: 40, contact: { email: 'baa@example.com' }});
 * //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 * ```
 */
declare function mergeDeepLeft<L extends object>(
  l: L
): <R extends object>(r: R) => Assign<R, [L], "deep">
declare function mergeDeepLeft<L extends object, R extends object>(
  l: L,
  r: R
): Assign<R, [L], "deep">

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * See also {@link merge}, {@link mergeDeepLeft}, {@link mergeDeepWith}, {@link mergeDeepWithKey}
 *
 * @example
 * ```typescript
 * R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                  { age: 40, contact: { email: 'baa@example.com' }});
 * //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 * ```
 */
declare function mergeDeepRight<L extends object>(
  l: L
): <R extends object>(r: R) => Assign<L, [R], "deep">
declare function mergeDeepRight<L extends object, R extends object>(
  l: L,
  r: R
): Assign<L, [R], "deep">

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * See also {@link mergeWith}, {@link mergeDeepWithKey}
 *
 * @example
 * ```typescript
 * R.mergeDeepWith(R.concat,
 *                 { a: true, c: { values: [10, 20] }},
 *                 { b: true, c: { values: [15, 35] }});
 * //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 * ```
 */
declare function mergeDeepWith<T1, T2>(
  fn: (x: any, z: any) => any
): (a: T1, b: T2) => any
declare function mergeDeepWith<T1, T2>(
  fn: (x: any, z: any) => any,
  a: T1
): (b: T2) => any
declare function mergeDeepWith<T1, T2>(
  fn: (x: any, z: any) => any,
  a: T1,
  b: T2
): any

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * See also {@link mergeWithKey}, {@link mergeDeepWith}
 *
 * @example
 * ```typescript
 * let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 * R.mergeDeepWithKey(concatValues,
 *                    { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                    { b: true, c: { thing: 'bar', values: [15, 35] }});
 * //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 * ```
 */
declare function mergeDeepWithKey<T1, T2>(
  fn: (k: string, x: any, z: any) => any
): (a: T1, b: T2) => any
declare function mergeDeepWithKey<T1, T2>(
  fn: (k: string, x: any, z: any) => any,
  a: T1
): (b: T2) => any
declare function mergeDeepWithKey<T1, T2>(
  fn: (k: string, x: any, z: any) => any,
  a: T1,
  b: T2
): any

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * See also {@link mergeRight}, {@link mergeDeepLeft}, {@link mergeWith}, {@link mergeWithKey}
 *
 * @example
 * ```typescript
 * R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 * //=> { 'name': 'fred', 'age': 40 }
 *
 * const resetToDefault = R.mergeLeft({x: 0});
 * resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * ```
 */
declare function mergeLeft<L extends object>(
  l: L
): <R extends object>(r: R) => Assign<R, [L], "flat">
declare function mergeLeft<L extends object, R extends object>(
  l: L,
  r: R
): Assign<R, [L], "flat">

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * See also {@link mergeLeft}, {@link mergeDeepRight}, {@link mergeWith}, {@link mergeWithKey}
 *
 * @example
 * ```typescript
 * R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 * //=> { 'name': 'fred', 'age': 40 }
 *
 * const withDefaults = R.mergeRight({x: 0, y: 0});
 * withDefaults({y: 2}); //=> {x: 0, y: 2}
 * ```
 */
declare function mergeRight<L extends object>(
  l: L
): <R extends object>(r: R) => Assign<L, [R], "flat">
declare function mergeRight<L extends object, R extends object>(
  l: L,
  r: R
): Assign<L, [R], "flat">

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * See also {@link mergeDeepWith}, {@link merge}, {@link mergeWithKey}
 *
 * @example
 * ```typescript
 * R.mergeWith(R.concat,
 *             { a: true, values: [10, 20] },
 *             { b: true, values: [15, 35] });
 * //=> { a: true, b: true, values: [10, 20, 15, 35] }
 * ```
 */
declare function mergeWith(
  fn: (x: any, z: any) => any
): <U, V>(a: U, b: V) => any
declare function mergeWith<U>(
  fn: (x: any, z: any) => any,
  a: U
): <V>(b: V) => any
declare function mergeWith<U, V>(fn: (x: any, z: any) => any, a: U, b: V): any

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * See also {@link mergeDeepWithKey}, {@link merge}, {@link mergeWith}
 *
 * @example
 * ```typescript
 * let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 * R.mergeWithKey(concatValues,
 *                { a: true, thing: 'foo', values: [10, 20] },
 *                { b: true, thing: 'bar', values: [15, 35] });
 * //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * ```
 */
declare function mergeWithKey(
  fn: (str: string, x: any, z: any) => any
): <U, V>(a: U, b: V) => any
declare function mergeWithKey<U>(
  fn: (str: string, x: any, z: any) => any,
  a: U
): <V>(b: V) => any
declare function mergeWithKey<U, V>(
  fn: (str: string, x: any, z: any) => any,
  a: U,
  b: V
): any

/**
 * Returns the smaller of its two arguments.
 *
 * See also {@link minBy}, {@link max}
 *
 * @example
 * ```typescript
 * R.min(789, 123); //=> 123
 * R.min('a', 'b'); //=> 'a'
 * ```
 */
declare function min<T extends Ord>(a: T): (b: T) => T
declare function min<T extends Ord>(a: T, b: T): T

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * See also {@link min}, {@link maxBy}
 *
 * @example
 * ```typescript
 * //  square :: Number -> Number
 * const square = n => n * n;
 *
 * R.minBy(square, -3, 2); //=> 2
 *
 * R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 * R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 * ```
 */
declare function minBy<T>(keyFn: (a: T) => Ord): Curry<(a: T, b: T) => T>
declare function minBy<T>(keyFn: (a: T) => Ord, a: T): (b: T) => T
declare function minBy<T>(keyFn: (a: T) => Ord, a: T, b: T): T

/**
 * Creates a copy of the passed object by applying an `fn` function to the given `prop` property.
 *
 * The function will not be invoked, and the object will not change
 * if its corresponding property does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @example
 * ```typescript
 * const person = {name: 'James', age: 20, pets: ['dog', 'cat']};
 * R.modify('age', R.add(1), person); //=> {name: 'James', age: 21, pets: ['dog', 'cat']}
 * R.modify('pets', R.append('turtle'), person); //=> {name: 'James', age: 20, pets: ['dog', 'cat', 'turtle']}
 * ```
 */
declare function modify<K extends string, A, P>(
  prop: K,
  fn: (a: A) => P
): <T extends Record<K, A>>(target: T) => Omit<T, K> & Record<K, P>

declare function modify<T extends object, K extends keyof T, P>(
  prop: K,
  fn: (a: T[K]) => P,
  obj: T
): Omit<T, K> & Record<K, P>

/**
 * Creates a shallow clone of the passed object by applying an `fn` function
 * to the value at the given path.
 *
 * The function will not be invoked, and the object will not change
 * if its corresponding path does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @example
 * ```typescript
 * const person = {name: 'James', address: { zipCode: '90216' }};
 * R.modifyPath(['address', 'zipCode'], R.reverse, person); //=> {name: 'James', address: { zipCode: '61209' }}
 *
 * // Can handle arrays too
 * const person = {name: 'James', addresses: [{ zipCode: '90216' }]};
 * R.modifyPath(['addresses', 0, 'zipCode'], R.reverse, person); //=> {name: 'James', addresses: [{ zipCode: '61209' }]}
 * ```
 */
declare function modifyPath<K0 extends keyof U, U, T>(
  path: [K0],
  fn: (value: U[K0]) => T,
  obj: U
): DeepModify<[K0], U, T>
declare function modifyPath<K0 extends keyof U, K1 extends keyof U[K0], U, T>(
  path: [K0, K1],
  fn: (value: U[K0][K1]) => T,
  obj: U
): DeepModify<[K0, K1], U, T>
declare function modifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  U,
  T
>(
  path: [K0, K1, K2],
  fn: (value: U[K0][K1][K2]) => T,
  obj: U
): DeepModify<[K0, K1, K2], U, T>
declare function modifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  U,
  T
>(
  path: [K0, K1, K2, K3],
  fn: (value: U[K0][K1][K2][K3]) => T,
  obj: U
): DeepModify<[K0, K1, K2, K3], U, T>
declare function modifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  U,
  T
>(
  path: [K0, K1, K2, K3, K4],
  fn: (value: U[K0][K1][K2][K3][K4]) => T,
  obj: U
): DeepModify<[K0, K1, K2, K3, K4], U, T>
declare function modifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  K5 extends keyof U[K0][K1][K2][K3][K4],
  U,
  T
>(
  path: [K0, K1, K2, K3, K4, K5],
  fn: (value: U[K0][K1][K2][K3][K4][K5]) => T,
  obj: U
): DeepModify<[K0, K1, K2, K3, K4, K5], U, T>
declare function modifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  K5 extends keyof U[K0][K1][K2][K3][K4],
  K6 extends keyof U[K0][K1][K2][K3][K4][K5],
  U,
  T
>(
  path: [K0, K1, K2, K3, K4, K5, K6],
  fn: (value: U[K0][K1][K2][K3][K4][K5][K6]) => T,
  obj: U
): DeepModify<[K0, K1, K2, K3, K4, K5, K6], U, T>
// backup type
// for unknown path, or key-chain larger than 6, allow user to set output type B and input type A
declare function modifyPath<B, A = any>(
  path: Path,
  fn: (a: any) => any,
  obj: A
): B

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * See also {@link mathMod}
 *
 * @example
 * ```typescript
 * R.modulo(17, 3); //=> 2
 * // JS behavior:
 * R.modulo(-17, 3); //=> -2
 * R.modulo(17, -3); //=> 2
 *
 * const isOdd = R.modulo(R.__, 2);
 * isOdd(42); //=> 0
 * isOdd(21); //=> 1
 * ```
 */
declare function modulo(a: number): (b: number) => number
declare function modulo(__: Placeholder, b: number): (a: number) => number
declare function modulo(a: number, b: number): number

/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @example
 * ```typescript
 * R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 * R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 * ```
 */
declare function move(from: number): {
  (to: number): <T>(list: readonly T[]) => T[]
  <T>(to: number, list: readonly T[]): T[]
}
declare function move(from: number, to: number): <T>(list: readonly T[]) => T[]
declare function move<T>(from: number, to: number, list: readonly T[]): T[]

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * See also {@link divide}
 *
 * @example
 * ```typescript
 * const double = R.multiply(2);
 * const triple = R.multiply(3);
 * double(3);       //=>  6
 * triple(4);       //=> 12
 * R.multiply(2, 5);  //=> 10
 * ```
 */
declare function multiply(a: number): (b: number) => number
declare function multiply(a: number, b: number): number

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * See also {@link binary}, {@link unary}
 *
 * @example
 * ```typescript
 * const takesTwoArgs = (a, b) => [a, b];
 *
 * takesTwoArgs.length; //=> 2
 * takesTwoArgs(1, 2); //=> [1, 2]
 *
 * const takesOneArg = R.nAry(1, takesTwoArgs);
 * takesOneArg.length; //=> 1
 * // Only `n` arguments are passed to the wrapped function
 * takesOneArg(1, 2); //=> [1, undefined]
 * ```
 */
declare function nAry<N extends number>(
  n: N
): <T extends (...arg: any) => unknown>(
  fn: T
) => (...arg: Take$1<Parameters<T>, N>) => ReturnType<T>
declare function nAry<N extends number, T extends (...arg: any) => unknown>(
  n: N,
  fn: T
): (...arg: Take$1<Parameters<T>, N>) => ReturnType<T>

/**
 * Negates its argument.
 *
 * @example
 * ```typescript
 * R.negate(42); //=> -42
 * ```
 */
declare function negate(n: number): number

/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link all}, {@link any}
 *
 * @example
 * ```typescript
 * const isEven = n => n % 2 === 0;
 * const isOdd = n => n % 2 !== 0;
 *
 * R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 * R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 * ```
 */
declare function none<T>(fn: (a: T) => boolean): (list: readonly T[]) => boolean
declare function none<T>(fn: (a: T) => boolean, list: readonly T[]): boolean

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * See also {@link complement}
 *
 * @example
 * ```typescript
 * R.not(true); //=> false
 * R.not(false); //=> true
 * R.not(0); //=> true
 * R.not(1); //=> false
 * ```
 */
declare function not(value: any): boolean

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @example
 * ```typescript
 * const list = ['foo', 'bar', 'baz', 'quux'];
 * R.nth(1, list); //=> 'bar'
 * R.nth(-1, list); //=> 'quux'
 * R.nth(-99, list); //=> undefined
 *
 * R.nth(2, 'abc'); //=> 'c'
 * R.nth(3, 'abc'); //=> ''
 * ```
 */
declare function nth(
  n: number
): <T extends readonly any[] | string>(
  list: T
) => (T extends Array<infer E> ? E : string) | undefined
declare function nth(n: number, list: string): string
declare function nth<T>(n: number, list: readonly T[]): T | undefined

/**
 * Returns a function which returns its nth argument.
 *
 * @example
 * ```typescript
 * R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 * R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * ```
 */
declare function nthArg(n: number): (...a: readonly any[]) => any

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * See also {@link compose}, {@link pipe}
 *
 * @example
 * ```typescript
 * const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 * const yellGreeting = R.o(R.toUpper, classyGreeting);
 * yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 * R.o(R.multiply(10), R.add(10))(-4) //=> 60
 * ```
 */
declare function o<T2, R>(
  f: (x: T2) => R
): {
  <T1>(g: (x: T1) => T2): (v: T1) => R
  <T1>(g: (x: T1) => T2, v: T1): R
}
declare function o<T1, T2, R>(f: (x: T2) => R, g: (x: T1) => T2): (v: T1) => R
declare function o<T1, T2, R>(f: (x: T2) => R, g: (x: T1) => T2, v: T1): R

/**
 * Creates an object containing a single key:value pair.
 *
 * See also {@link pair}
 *
 * @example
 * ```typescript
 * const matchPhrases = R.compose(
 *   R.objOf('must'),
 *   R.map(R.objOf('match_phrase'))
 * );
 * matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 * ```
 */
declare function objOf<K extends string>(key: K): <T>(value: T) => Record<K, T>
declare function objOf<T, K extends string>(key: K, value: T): Record<K, T>

/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 *
 * Dispatches to the `fantasy-land/of` method of the constructor first (if present)
 * or to the `of` method last (if present). When neither are present, wraps the
 * value in an array.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @example
 * ```typescript
 * R.of(Array, 42);   //=> [42]
 * R.of(Array, [42]); //=> [[42]]
 * R.of(Maybe, 42);   //=> Maybe.Just(42)
 * ```
 */
declare function of<Ctor extends { of: (value: any) => any }>(
  ctor: Ctor
): <T extends Parameters<Ctor["of"]>[0]>(
  val: T
) => Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor["of"]>
// of(__, val)(ctor)
declare function of<T>(
  __: Placeholder,
  val: T
): <Ctor extends { of: (value: any) => any }>(
  ctor: Ctor
) => Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor["of"]>
// of(ctor, val)
declare function of<
  Ctor extends { of: (value: any) => any },
  T extends Parameters<Ctor["of"]>[0]
>(
  ctor: Ctor,
  val: T
): Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor["of"]>

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * See also {@link pick}
 *
 * @example
 * ```typescript
 * R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 * ```
 */
declare function omit<K extends string>(
  names: readonly K[]
): <T>(obj: T) => Omit<T, K>
declare function omit<T, K extends string>(
  names: readonly K[],
  obj: T
): Omit<T, K>

/**
 * Takes a binary function `f`, a unary function `g`, and two values.
 * Applies `g` to each value, then applies the result of each to `f`.
 *
 * Also known as the P combinator.
 *
 * @example
 * ```typescript
 * const eqBy = R.on((a, b) => a === b);
 * eqBy(R.prop('a'), {b:0, a:1}, {a:1}) //=> true;
 *
 * const containsInsensitive = R.on(R.includes, R.toLower);
 * containsInsensitive('o', 'FOO'); //=> true
 * ```
 */
declare function on<U, R>(
  combine: (a: U, b: U) => R
): {
  <T>(transform: (value: T) => U): {
    (a: T): (b: T) => R
    (a: T, b: T): R
  }
  <T>(transform: (value: T) => U, a: T): (b: T) => R
  <T>(transform: (value: T) => U, a: T, b: T): R
}

// For manually specifying overloads
declare function on<T, U, R>(
  combine: (a: U, b: U) => R
): {
  (transform: (value: T) => U): {
    (a: T): (b: T) => R
    (a: T, b: T): R
  }
  (transform: (value: T) => U, a: T): (b: T) => R
  (transform: (value: T) => U, a: T, b: T): R
}

declare function on<T, U, R>(
  combine: (a: U, b: U) => R,
  transform: (value: T) => U
): {
  (a: T): (b: T) => R
  (a: T, b: T): R
}
declare function on<T, U, R>(
  combine: (a: U, b: U) => R,
  transform: (value: T) => U,
  a: T
): (b: T) => R
declare function on<T, U, R>(
  combine: (a: U, b: U) => R,
  transform: (value: T) => U,
  a: T,
  b: T
): R

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @example
 * ```typescript
 * const addOneOnce = R.once(x => x + 1);
 * addOneOnce(10); //=> 11
 * addOneOnce(addOneOnce(50)); //=> 11
 * ```
 */
declare function once<F extends (...a: readonly any[]) => any>(fn: F): F

/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Acts as the boolean `or` statement if both inputs are `Boolean`s.
 *
 * See also {@link either}, {@link and}
 *
 * @example
 * ```typescript
 * R.or(true, true); //=> true
 * R.or(true, false); //=> true
 * R.or(false, true); //=> true
 * R.or(false, false); //=> false
 * ```
 */
declare function or<T>(a: T | Falsy): <U>(b: U) => T | U
declare function or<T, U>(a: T | Falsy, b: U): T | U

/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * See also {@link andThen}
 *
 * @example
 * ```typescript
 * const failedFetch = id => Promise.reject('bad ID');
 * const useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' });
 *
 * //recoverFromFailure :: String -> Promise ({ firstName, lastName })
 * const recoverFromFailure = R.pipe(
 *   failedFetch,
 *   R.otherwise(useDefault),
 *   R.andThen(R.pick(['firstName', 'lastName'])),
 * );
 * recoverFromFailure(12345).then(console.log);
 * ```
 */
declare function otherwise<A, B>(
  onError: (error: any) => B | Promise<B>
): (promise: Promise<A>) => Promise<B>
declare function otherwise<A, B>(
  onError: (error: any) => B | Promise<B>,
  promise: Promise<A>
): Promise<B>

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * See also {@link view}, {@link set}, {@link lens}, {@link lensIndex}, {@link lensProp}, {@link lensPath}
 *
 * @example
 * ```typescript
 * const headLens = R.lensIndex(0);
 *
 * R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 * ```
 */
declare function over<S, A>(
  lens: Lens<S, A>
): {
  (fn: (a: A) => A): (value: S) => S
  (fn: (a: A) => A, value: S): S
}
declare function over<S, A>(lens: Lens<S, A>, fn: (a: A) => A): (value: S) => S
declare function over<S, A>(lens: Lens<S, A>, fn: (a: A) => A, value: S): S

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * See also {@link objOf}, {@link of}
 *
 * @example
 * ```typescript
 * R.pair('foo', 'bar'); //=> ['foo', 'bar']
 * ```
 */
declare function pair<F>(fst: F): <S>(snd: S) => [F, S]
declare function pair<F, S>(fst: F, snd: S): [F, S]

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * See also {@link partialRight}, {@link curry}
 *
 * @example
 * ```typescript
 * const multiply2 = (a, b) => a * b;
 * const double = R.partial(multiply2, [2]);
 * double(3); //=> 6
 *
 * const greet = (salutation, title, firstName, lastName) =>
 *   salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 * const sayHello = R.partial(greet, ['Hello']);
 * const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 * sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * ```
 */
declare function partial<V0, V1, T>(
  fn: (x0: V0, x1: V1) => T,
  args: [V0]
): (x1: V1) => T
declare function partial<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  args: [V0, V1]
): (x2: V2) => T
declare function partial<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  args: [V0]
): (x1: V1, x2: V2) => T
declare function partial<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  args: [V0, V1, V2]
): (x2: V3) => T
declare function partial<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  args: [V0, V1]
): (x2: V2, x3: V3) => T
declare function partial<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  args: [V0]
): (x1: V1, x2: V2, x3: V3) => T
declare function partial<T>(
  fn: (...a: readonly any[]) => T,
  args: readonly any[]
): (...a: readonly any[]) => T

/**
 * Takes a function `f` and an object, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the object
 * provided initially merged deeply (right) with the object provided as an argument to `g`.
 *
 * See also {@link partial}, {@link partialRight}, {@link curry}, {@link mergeDeepRight}
 *
 * @example
 * ```typescript
 * const multiply2 = ({ a, b }) => a * b;
 * const double = R.partialObject(multiply2, { a: 2 });
 * double({ b: 2 }); //=> 4
 *
 * const greet = ({ salutation, title, firstName, lastName }) =>
 *   salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 * const sayHello = R.partialObject(greet, { salutation: 'Hello' });
 * const sayHelloToMs = R.partialObject(sayHello, { title: 'Ms.' });
 * sayHelloToMs({ firstName: 'Jane', lastName: 'Jones' }); //=> 'Hello, Ms. Jane Jones!'
 * ```
 */
declare function partialObject<T, R>(
  fn: (value: T) => R
): <P1>(partial: P1) => (value: Omit<T, keyof P1>) => R
declare function partialObject<T extends P1, P1, R>(
  fn: (value: T) => R,
  partial: P1
): (value: Omit<T, keyof P1>) => R

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * See also {@link partial}
 *
 * @example
 * ```typescript
 * const greet = (salutation, title, firstName, lastName) =>
 *   salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 * const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 * greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * ```
 */
declare function partialRight<V0, V1, T>(
  fn: (x0: V0, x1: V1) => T,
  args: [V1]
): (x1: V0) => T
declare function partialRight<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  args: [V1, V2]
): (x2: V0) => T
declare function partialRight<V0, V1, V2, T>(
  fn: (x0: V0, x1: V1, x2: V2) => T,
  args: [V2]
): (x1: V0, x2: V1) => T
declare function partialRight<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  args: [V1, V2, V3]
): (x0: V0) => T
declare function partialRight<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  args: [V2, V3]
): (x0: V0, x1: V1) => T
declare function partialRight<V0, V1, V2, V3, T>(
  fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
  args: [V3]
): (x0: V0, x1: V1, x2: V2) => T
declare function partialRight<T>(
  fn: (...a: readonly any[]) => T,
  args: readonly any[]
): (...a: readonly any[]) => T

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * See also {@link filter}, {@link reject}
 *
 * @example
 * ```typescript
 * R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 * // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 * R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 * // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 * ```
 */
declare function partition(
  fn: (a: string) => boolean
): (list: readonly string[]) => [string[], string[]]
declare function partition<T>(
  fn: (a: T) => boolean
): (list: readonly T[]) => [T[], T[]]
declare function partition(
  fn: (a: string) => boolean,
  list: readonly string[]
): [string[], string[]]
declare function partition<T>(
  fn: (a: T) => boolean,
  list: readonly T[]
): [T[], T[]]

/**
 * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
 * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
 *
 * See also {@link prop}, {@link nth}, {@link assocPath}, {@link dissocPath}
 *
 * @example
 * ```typescript
 * R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 * R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 * R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 * R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 * R.path([2], {'2': 2}); //=> 2
 * R.path([-2], {'-2': 'a'}); //=> undefined
 * ```
 */
declare function path<S, K0 extends keyof S = keyof S>(
  path: [K0],
  obj: S
): S[K0]
declare function path<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0]
>(path: [K0, K1], obj: S): S[K0][K1]
declare function path<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1]
>(path: [K0, K1, K2], obj: S): S[K0][K1][K2]
declare function path<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2]
>(path: [K0, K1, K2, K3], obj: S): S[K0][K1][K2][K3]
declare function path<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3]
>(path: [K0, K1, K2, K3, K4], obj: S): S[K0][K1][K2][K3][K4]
declare function path<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3][K4] = keyof S[K0][K1][K2][K3][K4]
>(path: [K0, K1, K2, K3, K4, K5], obj: S): S[K0][K1][K2][K3][K4][K5]
declare function path<T>(path: Path, obj: any): T | undefined
declare function path<T>(path: Path): (obj: any) => T | undefined

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * See also {@link whereEq}, {@link propEq}, {@link pathSatisfies}, {@link equals}
 *
 * @example
 * ```typescript
 * const user1 = { address: { zipCode: 90210 } };
 * const user2 = { address: { zipCode: 55555 } };
 * const user3 = { name: 'Bob' };
 * const users = [ user1, user2, user3 ];
 * const isFamous = R.pathEq(90210, ['address', 'zipCode']);
 * R.filter(isFamous, users); //=> [ user1 ]
 * ```
 */
declare function pathEq(val: any): {
  (path: Path): (obj: any) => boolean
  (path: Path, obj: any): boolean
}
declare function pathEq(val: any, path: Path): (obj: any) => boolean
declare function pathEq(val: any, path: Path, obj: any): boolean

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @example
 * ```typescript
 * R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 * R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 * ```
 */
declare function pathOr<T>(defaultValue: T): Curry<(a: Path, b: any) => T>
declare function pathOr<T>(defaultValue: T, path: Path): (obj: any) => T
declare function pathOr<T>(defaultValue: T, path: Path, obj: any): T

/**
 * Retrieves the values at given paths of an object.
 *
 * See also {@link path}
 *
 * @example
 * ```typescript
 * R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 * R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 * ```
 */
declare function paths<T>(paths: Path[]): (obj: any) => Array<T | undefined>
declare function paths<T>(paths: Path[], obj: any): Array<T | undefined>

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * See also {@link propSatisfies}, {@link path}
 *
 * @example
 * ```typescript
 * R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 * R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 * ```
 */
declare function pathSatisfies<T, U>(
  pred: (val: T) => boolean
): Curry<(a: Path, b: U) => boolean>
declare function pathSatisfies<T, U>(
  pred: (val: T) => boolean,
  path: Path
): (obj: U) => boolean
declare function pathSatisfies<T, U>(
  pred: (val: T) => boolean,
  path: Path,
  obj: U
): boolean

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * See also {@link omit}, {@link props}
 *
 * @example
 * ```typescript
 * R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 * R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 * ```
 */
declare function pick<
  const Names extends readonly [PropertyKey, ...PropertyKey[]]
>(
  names: Names
): <U extends Record<ElementOf<Names>, any>>(
  obj: U
) => string extends keyof U
  ? Record<string, U[keyof U]>
  : Pick<U, ElementOf<Names>>
declare function pick<
  U,
  const Names extends readonly [keyof U, ...(keyof U)[]]
>(
  names: Names,
  obj: U
): string extends keyof U
  ? Record<string, U[keyof U]>
  : Pick<U, ElementOf<Names>>

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * See also {@link pick}
 *
 * @example
 * ```typescript
 * R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 * R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 * ```
 */
declare function pickAll(names: readonly string[]): <T, U>(obj: T) => U
declare function pickAll<T, K extends keyof T>(
  names: readonly K[],
  obj: T
): Pick<T, K>
declare function pickAll<T, U>(names: readonly string[], obj: T): U

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * See also {@link pick}, {@link filter}
 *
 * @example
 * ```typescript
 * const isUpperCase = (val, key) => key.toUpperCase() === key;
 * R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 * ```
 */
declare function pickBy<T>(pred: ObjPred<T>): <U, V extends T>(obj: V) => U
declare function pickBy<T, U>(pred: ObjPred<T>, obj: T): U

/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * See also {@link compose}
 *
 * @example
 * ```typescript
 * const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 * f(3, 4); // -(3^4) + 1
 * ```
 */
declare function pipe<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  ...funcs: [
    f1: (...args: TArgs) => R1,
    f2: (a: R1) => R2,
    f3: (a: R2) => R3,
    f4: (a: R3) => R4,
    f5: (a: R4) => R5,
    f6: (a: R5) => R6,
    f7: (a: R6) => R7,
    ...func: Array<(a: any) => any>,
    fnLast: (a: any) => TResult
  ]
): (...args: TArgs) => TResult
// fallback overload if number of piped functions greater than 7
declare function pipe<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7
): (...args: TArgs) => R7
declare function pipe<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6
): (...args: TArgs) => R6
declare function pipe<TArgs extends any[], R1, R2, R3, R4, R5>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5
): (...args: TArgs) => R5
declare function pipe<TArgs extends any[], R1, R2, R3, R4>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4
): (...args: TArgs) => R4
declare function pipe<TArgs extends any[], R1, R2, R3>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3
): (...args: TArgs) => R3
declare function pipe<TArgs extends any[], R1, R2>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2
): (...args: TArgs) => R2
declare function pipe<TArgs extends any[], R1>(
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R1

/**
 * Performs left-to-right function composition using transforming function. The first function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * See also {@link composeWith}, {@link pipe}
 *
 * @example
 * ```typescript
 * const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 * const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 * f(3, 4); // -(3^4) + 1
 * ```
 */
declare function pipeWith(
  transformer: (fn: (...args: any[]) => any, intermediatResult: any) => any
): <TArgs extends any[], TResult>(
  fns: AtLeastOneFunctionsFlow<TArgs, TResult>
) => (...args: TArgs) => TResult
declare function pipeWith<TArgs extends any[], TResult>(
  transformer: (fn: (...args: any[]) => any, intermediatResult: any) => any,
  fns: AtLeastOneFunctionsFlow<TArgs, TResult>
): (...args: TArgs) => TResult

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * See also {@link project}, {@link prop}, {@link props}
 *
 * @example
 * ```typescript
 * var getAges = R.pluck('age');
 * getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 * R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 * R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * ```
 */
declare function pluck<K extends PropertyKey>(
  prop: K extends Placeholder ? never : K
): {
  <U extends readonly unknown[] | Record<K, any>>(
    obj: Record<PropertyKey, U>
  ): U extends readonly (infer T)[]
    ? T[]
    : U extends Record<K, infer T>
    ? T[]
    : never
  <U extends readonly unknown[] | Record<K, any>>(
    list: U[]
  ): U extends readonly (infer T)[]
    ? T[]
    : U extends Record<K, infer T>
    ? T[]
    : never
}
declare function pluck<U>(
  __: Placeholder,
  obj: Record<PropertyKey, U>
): <K extends keyof U>(prop: K) => Array<U[K]>
declare function pluck<U>(
  __: Placeholder,
  list: readonly U[]
): <K extends keyof U>(prop: K) => Array<U[K]>
declare function pluck<K extends keyof U, U>(
  prop: K,
  obj: Record<PropertyKey, U>
): Array<U[K]>
declare function pluck<K extends keyof U, U>(
  prop: K,
  list: readonly U[]
): Array<U[K]>

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * See also {@link append}
 *
 * @example
 * ```typescript
 * R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 * ```
 */
declare function prepend<T>(el: T): (list: readonly T[]) => T[]
declare function prepend<T>(el: T, list: readonly T[]): T[]

/**
 * Multiplies together all the elements of a list.
 *
 * See also {@link reduce}
 *
 * @example
 * ```typescript
 * R.product([2,4,6,8,100,1]); //=> 38400
 * ```
 */
declare function product(list: readonly number[]): number

/**
 * Reasonable analog to SQL `select` statement.
 *
 * See also {@link pluck}, {@link props}, {@link prop}
 *
 * @example
 * ```typescript
 * const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 * const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 * const kids = [abby, fred];
 * R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 * ```
 */
declare function project<T, U>(
  props: readonly string[]
): (objs: readonly T[]) => U[]
declare function project<T, U>(
  props: readonly string[],
  objs: readonly T[]
): U[]

/**
 * Takes two functions as pre- and post- processors respectively for a third function,
 * i.e. `promap(f, g, h)(x) === g(h(f(x)))`.
 *
 * Dispatches to the `promap` method of the third argument, if present,
 * according to the [FantasyLand Profunctor spec](https://github.com/fantasyland/fantasy-land#profunctor).
 *
 * Acts as a transducer if a transformer is given in profunctor position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const decodeChar = R.promap(s => s.charCodeAt(), String.fromCharCode, R.add(-8))
 * const decodeString = R.promap(R.split(''), R.join(''), R.map(decodeChar))
 * decodeString("ziuli") //=> "ramda"
 * ```
 */
declare function promap<A, B>(
  pre: (value: A) => B
): <C, D>(post: (value: C) => D, fn: (value: B) => C) => (value: A) => D
declare function promap<A, B, C, D>(
  pre: (value: A) => B,
  post: (value: C) => D
): (fn: (value: B) => C) => (value: A) => D
declare function promap<A, B, C, D>(
  pre: (value: A) => B,
  post: (value: C) => D,
  fn: (value: B) => C
): (value: A) => D

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * See also {@link path}, {@link props}, {@link pluck}, {@link project}, {@link nth}
 *
 * @example
 * ```typescript
 * R.prop('x', {x: 100}); //=> 100
 * R.prop('x', {}); //=> undefined
 * R.prop(0, [100]); //=> 100
 * R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 * ```
 */
declare function prop<K extends PropertyKey>(
  prop: K extends Placeholder ? never : K
): <U extends Record<K, unknown>>(obj: U) => U[K]
// prop(__, obj)(key)
declare function prop<U>(
  __: Placeholder,
  obj: U
): <K extends keyof U>(prop: K) => U[K]
// prop(key, obj)
declare function prop<K extends keyof U, U>(prop: K, obj: U): U[K]

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq),
 * and test nested path property with [`R.pathEq`](#pathEq).
 *
 * See also {@link whereEq}, {@link pathEq}, {@link propSatisfies}, {@link equals}
 *
 * @example
 * ```typescript
 * const abby = {name: 'Abby', age: 7, hair: 'blond'};
 * const fred = {name: 'Fred', age: 12, hair: 'brown'};
 * const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 * const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 * const kids = [abby, fred, rusty, alois];
 * const hasBrownHair = R.propEq('brown', 'hair');
 * R.filter(hasBrownHair, kids); //=> [fred, rusty]
 * ```
 */
declare function propEq<T>(val: T): {
  <K extends PropertyKey>(name: K): (obj: Record<K, T>) => boolean
  <K extends PropertyKey>(name: K, obj: Record<K, T>): boolean
}
declare function propEq<T, K extends PropertyKey>(
  val: T,
  name: K
): (obj: Record<K, T>) => boolean
declare function propEq<K extends keyof U, U>(
  val: U[K],
  name: K,
  obj: U
): boolean

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * See also {@link is}, {@link propSatisfies}
 *
 * @example
 * ```typescript
 * R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 * R.propIs(Number, 'x', {x: 'foo'});    //=> false
 * R.propIs(Number, 'x', {});            //=> false
 * ```
 */
declare function propIs<C extends (...args: any[]) => any, K extends keyof any>(
  type: C,
  name: K,
  obj: any
): obj is Record<K, ReturnType<C>>
declare function propIs<
  C extends new (...args: any[]) => any,
  K extends keyof any
>(type: C, name: K, obj: any): obj is Record<K, InstanceType<C>>
declare function propIs<C extends (...args: any[]) => any, K extends keyof any>(
  type: C,
  name: K
): (obj: any) => obj is Record<K, ReturnType<C>>
declare function propIs<
  C extends new (...args: any[]) => any,
  K extends keyof any
>(type: C, name: K): (obj: any) => obj is Record<K, InstanceType<C>>
declare function propIs<C extends (...args: any[]) => any>(
  type: C
): {
  <K extends keyof any>(name: K, obj: any): obj is Record<K, ReturnType<C>>
  <K extends keyof any>(name: K): (obj: any) => obj is Record<K, ReturnType<C>>
}
declare function propIs<C extends new (...args: any[]) => any>(
  type: C
): {
  <K extends keyof any>(name: K, obj: any): obj is Record<K, InstanceType<C>>
  <K extends keyof any>(
    name: K
  ): (obj: any) => obj is Record<K, InstanceType<C>>
}

/**
 * Return the specified property of the given non-null object if the property
 * is present and it's value is not `null`, `undefined` or `NaN`.
 *
 * Otherwise the first argument is returned.
 *
 * @example
 * ```typescript
 * const alice = {
 *   name: 'ALICE',
 *   age: 101
 * };
 * const favorite = R.prop('favoriteLibrary');
 * const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 * favorite(alice);  //=> undefined
 * favoriteWithDefault(alice);  //=> 'Ramda'
 * ```
 */
declare function propOr<T>(val: T): {
  (p: string): <U, V>(obj: U) => V
  <U, V>(p: string, obj: U): V
}
declare function propOr<T>(val: T, p: string): <U, V>(obj: U) => V
declare function propOr<U>(
  __: Placeholder,
  p: string,
  obj: U
): <T, V>(val: T) => V
declare function propOr<T, U>(
  val: T,
  __: Placeholder,
  obj: U
): <V>(p: string) => V
declare function propOr<T, U, V>(val: T, p: string, obj: U): V

/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * See also {@link prop}, {@link pluck}, {@link project}
 *
 * @example
 * ```typescript
 * R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 * R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 * const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 * fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 * ```
 */
declare function props<P extends string, T>(
  ps: readonly P[]
): (obj: Record<P, T>) => T[]
declare function props<P extends string>(
  ps: readonly P[]
): <T>(obj: Record<P, T>) => T[]
declare function props<P extends string, T>(
  ps: readonly P[],
  obj: Record<P, T>
): T[]

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * See also {@link where}, {@link propEq}, {@link propIs}
 *
 * @example
 * ```typescript
 * R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 * ```
 */
declare function propSatisfies<P, K extends keyof any>(
  pred: (val: any) => val is P,
  name: K,
  obj: any
): obj is Record<K, P>
declare function propSatisfies<P, K extends keyof any>(
  pred: (val: any) => val is P,
  name: K
): (obj: any) => obj is Record<K, P>
declare function propSatisfies<P>(pred: (val: any) => val is P): {
  <K extends keyof any>(name: K, obj: any): obj is Record<K, P>
  <K extends keyof any>(name: K): (obj: any) => obj is Record<K, P>
}
declare function propSatisfies(
  pred: (val: any) => boolean,
  name: keyof any,
  obj: any
): boolean
declare function propSatisfies(
  pred: (val: any) => boolean,
  name: keyof any
): (obj: any) => boolean
declare function propSatisfies(
  pred: (val: any) => boolean
): Curry<(a: keyof any, b: any) => boolean>

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @example
 * ```typescript
 * R.range(1, 5);    //=> [1, 2, 3, 4]
 * R.range(50, 53);  //=> [50, 51, 52]
 * ```
 */
declare function range(from: number): (to: number) => number[]
declare function range(from: number, to: number): number[]

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * See also {@link reduced}, {@link addIndex}, {@link reduceRight}
 *
 * @example
 * ```typescript
 * R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 * //          -               -10
 * //         / \              / \
 * //        -   4           -6   4
 * //       / \              / \
 * //      -   3   ==>     -3   3
 * //     / \              / \
 * //    -   2           -1   2
 * //   / \              / \
 * //  0   1            0   1
 * ```
 */
declare function reduce<T, U>(
  f: (acc: U, elem: T) => U | Reduced<U>
): {
  // reduce(f)(acc)(list)
  (acc: U): (list: readonly T[]) => U
  // reduce(f)(__, list)(acc)
  (__: Placeholder, list: readonly T[]): (acc: U) => U
  // reduce(f)(acc, list)
  (acc: U, list: readonly T[]): U
}
// reduce(__, acc)
declare function reduce<U>(
  __: Placeholder,
  acc: U
): {
  // reduce(__, acc)(f)(list)
  <T>(f: (acc: U, elem: T) => U | Reduced<U>): (list: readonly T[]) => U
  // reduce(__, acc)(__, list)(f)
  <T>(
    __: Placeholder,
    list: readonly T[]
  ): (f: (acc: U, elem: T) => U | Reduced<U>) => U
  // reduce(__, acc)(f, list)
  <T>(f: (acc: U, elem: T) => U | Reduced<U>, list: readonly T[]): U
}
// reduce(f, acc)(list)
declare function reduce<T, U>(
  f: (acc: U, elem: T) => U | Reduced<U>,
  acc: U
): (list: readonly T[]) => U
// reduce(_, _, list)
declare function reduce<T>(
  __: Placeholder,
  __2: Placeholder,
  list: readonly T[]
): {
  // reduce(__, __, list)(f)(acc)
  <U>(f: (acc: U, elem: T) => U | Reduced<U>): (acc: U) => U
  // reduce(__, __, list)(__, acc)(f)
  <U>(__: Placeholder, acc: U): (f: (acc: U, elem: T) => U | Reduced<U>) => U
  // reduce(__, __, list)(f, acc)
  <U>(f: (acc: U, elem: T) => U | Reduced<U>, acc: U): U
}
// reduce(f, _, list)(acc)
declare function reduce<T, U>(
  f: (acc: U, elem: T) => U | Reduced<U>,
  __: Placeholder,
  list: readonly T[]
): (acc: U) => U
// reduce(__, acc, list)(f)
declare function reduce<T, U>(
  __: Placeholder,
  acc: U,
  list: readonly T[]
): (f: (acc: U, elem: T) => U | Reduced<U>) => U
// reduce(f, acc, list)
declare function reduce<T, U>(
  f: (acc: U, elem: T) => U | Reduced<U>,
  acc: U,
  list: readonly T[]
): U

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * The value function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to short circuit the iteration.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link groupBy}, {@link reduce}, {@link reduced}
 *
 * @example
 * ```typescript
 * const groupNames = (acc, {name}) => acc.concat(name)
 * const toGrade = ({score}) =>
 *   score < 65 ? 'F' :
 *   score < 70 ? 'D' :
 *   score < 80 ? 'C' :
 *   score < 90 ? 'B' : 'A'
 *
 * var students = [
 *   {name: 'Abby', score: 83},
 *   {name: 'Bart', score: 62},
 *   {name: 'Curt', score: 88},
 *   {name: 'Dora', score: 92},
 * ]
 *
 * reduceBy(groupNames, [], toGrade, students)
 * //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 * ```
 */
declare function reduceBy<T, TResult>(
  valueFn: (acc: TResult, elem: T) => TResult
): Curry<
  (
    a: TResult,
    b: (elem: T) => string,
    c: readonly T[]
  ) => { [index: string]: TResult }
>
declare function reduceBy<T, TResult>(
  valueFn: (acc: TResult, elem: T) => TResult,
  acc: TResult
): Curry<
  (a: (elem: T) => string, b: readonly T[]) => { [index: string]: TResult }
>
declare function reduceBy<T, TResult>(
  valueFn: (acc: TResult, elem: T) => TResult,
  acc: TResult,
  keyFn: (elem: T) => string
): (list: readonly T[]) => { [index: string]: TResult }
declare function reduceBy<T, TResult>(
  valueFn: (acc: TResult, elem: T) => TResult,
  acc: TResult,
  keyFn: (elem: T) => string,
  list: readonly T[]
): { [index: string]: TResult }

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * This optimization is available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`reduceBy`](#reduceBy)
 * - [`reduceRight`](#reduceRight)
 * - [`transduce`](#transduce)
 *
 * See also {@link reduce}, {@link reduceWhile}, {@link reduceBy}, {@link reduceRight}, {@link transduce}
 *
 * @example
 * ```typescript
 * R.reduce(
 *  (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *  [],
 *  [1, 2, 3, 4, 5]) // [1, 2, 3]
 * ```
 */
declare function reduced<T>(elem: T): Reduced<T>

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*. `reduceRight` may use [`reduced`](#reduced)
 * to short circuit the iteration.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 *
 * See also {@link reduce}, {@link addIndex}, {@link reduced}
 *
 * @example
 * ```typescript
 * R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 * //    -               -2
 * //   / \              / \
 * //  1   -            1   3
 * //     / \              / \
 * //    2   -     ==>    2  -1
 * //       / \              / \
 * //      3   -            3   4
 * //         / \              / \
 * //        4   0            4   0
 * ```
 */
declare function reduceRight<T, TResult>(
  fn: (elem: T, acc: TResult) => TResult
): (acc: TResult, list: readonly T[]) => TResult
declare function reduceRight<T, TResult>(
  fn: (elem: T, acc: TResult) => TResult,
  acc: TResult
): (list: readonly T[]) => TResult
declare function reduceRight<T, TResult>(
  fn: (elem: T, acc: TResult) => TResult,
  acc: TResult,
  list: readonly T[]
): TResult

/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator. `reduceWhile` may alternatively be short-circuited
 * via [`reduced`](#reduced).
 *
 * See also {@link reduce}, {@link reduced}
 *
 * @example
 * ```typescript
 * const isOdd = (acc, x) => x % 2 !== 0;
 * const xs = [1, 3, 5, 60, 777, 800];
 * R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 * const ys = [2, 4, 6]
 * R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 * ```
 */
declare function reduceWhile<T, TResult>(
  predicate: (acc: TResult, elem: T) => boolean
): Curry<
  (
    a: (acc: TResult, elem: T) => TResult,
    b: TResult,
    c: readonly T[]
  ) => TResult
>
declare function reduceWhile<T, TResult>(
  predicate: (acc: TResult, elem: T) => boolean,
  fn: (acc: TResult, elem: T) => TResult
): Curry<(a: TResult, b: readonly T[]) => TResult>
declare function reduceWhile<T, TResult>(
  predicate: (acc: TResult, elem: T) => boolean,
  fn: (acc: TResult, elem: T) => TResult,
  acc: TResult
): (list: readonly T[]) => TResult
declare function reduceWhile<T, TResult>(
  predicate: (acc: TResult, elem: T) => boolean,
  fn: (acc: TResult, elem: T) => TResult,
  acc: TResult,
  list: readonly T[]
): TResult

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * See also {@link filter}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isOdd = (n) => n % 2 !== 0;
 *
 * R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 * R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 * ```
 */
declare function reject<A, P extends A>(
  pred: (val: A) => val is P
): {
  <B extends A>(list: readonly B[]): Array<Exclude<B, P>>
  <B extends A>(dict: Record<string, B>): Record<string, Exclude<B, P>>
}
declare function reject<T>(
  pred: (value: T) => boolean
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: C) => C
declare function reject<A, B extends A, P extends A>(
  pred: (val: A) => val is P,
  list: readonly B[]
): Array<Exclude<B, P>>
declare function reject<A, B extends A, P extends A>(
  pred: (val: A) => val is P,
  dict: Record<string, B>
): Record<string, Exclude<B, P>>
declare function reject<T, C extends readonly T[] | Record<string, T>>(
  pred: (value: T) => boolean,
  collection: C
): C

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * See also {@link without}
 *
 * @example
 * ```typescript
 * R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 * ```
 */
declare function remove(start: number): {
  (count: number): <T>(list: readonly T[]) => T[]
  <T>(count: number, list: readonly T[]): T[]
}
declare function remove(
  start: number,
  count: number
): <T>(list: readonly T[]) => T[]
declare function remove<T>(
  start: number,
  count: number,
  list: readonly T[]
): T[]

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * See also {@link times}
 *
 * @example
 * ```typescript
 * R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 * const obj = {};
 * const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 * repeatedObjs[0] === repeatedObjs[1]; //=> true
 * ```
 */
declare function repeat<T>(a: T): (n: number) => T[]
declare function repeat<T>(a: T, n: number): T[]

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @example
 * ```typescript
 * R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 * R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 * // Use the "g" (global) flag to replace all occurrences:
 * R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 * ```
 */
declare function replace(
  pattern: RegExp | string
): (
  replacement: string | ((match: string, ...args: readonly any[]) => string)
) => (str: string) => string
declare function replace(
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: readonly any[]) => string)
): (str: string) => string
declare function replace(
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: readonly any[]) => string),
  str: string
): string

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @example
 * ```typescript
 * R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 * R.reverse([1, 2]);     //=> [2, 1]
 * R.reverse([1]);        //=> [1]
 * R.reverse([]);         //=> []
 *
 * R.reverse('abc');      //=> 'cba'
 * R.reverse('ab');       //=> 'ba'
 * R.reverse('a');        //=> 'a'
 * R.reverse('');         //=> ''
 * ```
 */
declare function reverse(str: string): string
declare function reverse<T>(list: readonly T[]): T[]

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link reduce}, {@link mapAccum}
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4];
 * const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * ```
 */
declare function scan<T, TResult>(
  fn: (acc: TResult, elem: T) => any
): {
  (acc: TResult): (list: readonly T[]) => TResult[]
  (acc: TResult, list: readonly T[]): TResult[]
}
declare function scan<T, TResult>(
  fn: (acc: TResult, elem: T) => any,
  acc: TResult
): (list: readonly T[]) => TResult[]
declare function scan<T, TResult>(
  fn: (acc: TResult, elem: T) => any,
  acc: TResult,
  list: readonly T[]
): TResult[]

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * See also {@link view}, {@link over}, {@link lens}, {@link lensIndex}, {@link lensProp}, {@link lensPath}
 *
 * @example
 * ```typescript
 * const xLens = R.lensProp('x');
 *
 * R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 * R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 * ```
 */
declare function set<S, A>(
  lens: Lens<S, A>
): {
  (a: A): (obj: S) => S
  (a: A, obj: S): S
}
declare function set<S, A>(lens: Lens<S, A>, a: A): (obj: S) => S
declare function set<S, A>(lens: Lens<S, A>, a: A, obj: S): S

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @example
 * ```typescript
 * R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 * R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 * R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 * R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 * R.slice(0, 3, 'ramda');                     //=> 'ram'
 * ```
 */
declare function slice(a: number): {
  (b: number, list: string): string
  <T>(b: number, list: readonly T[]): T[]
}
declare function slice(
  a: number,
  b: number
): {
  (list: string): string
  <T>(list: readonly T[]): T[]
}
declare function slice(a: number, b: number, list: string): string
declare function slice<T>(a: number, b: number, list: readonly T[]): T[]

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * See also {@link ascend}, {@link descend}
 *
 * @example
 * ```typescript
 * const diff = function(a, b) { return a - b; };
 * R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 * ```
 */
declare function sort<T>(
  fn: (a: T, b: T) => number
): (list: readonly T[]) => T[]
declare function sort<T>(fn: (a: T, b: T) => number, list: readonly T[]): T[]

/**
 * Sorts the list according to the supplied function.
 *
 * @example
 * ```typescript
 * const sortByFirstItem = R.sortBy(R.prop(0));
 * const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 * sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 * const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 * const alice = {
 *   name: 'ALICE',
 *   age: 101
 * };
 * const bob = {
 *   name: 'Bob',
 *   age: -10
 * };
 * const clara = {
 *   name: 'clara',
 *   age: 314.159
 * };
 * const people = [clara, bob, alice];
 * sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 * ```
 */
declare function sortBy<T>(fn: (a: T) => Ord): (list: readonly T[]) => T[]
declare function sortBy(fn: (a: any) => Ord): <T>(list: readonly T[]) => T[]
declare function sortBy<T>(fn: (a: T) => Ord, list: readonly T[]): T[]

/**
 * Sorts a list according to a list of comparators.
 *
 * See also {@link ascend}, {@link descend}
 *
 * @example
 * ```typescript
 * const alice = {
 *   name: 'alice',
 *   age: 40
 * };
 * const bob = {
 *   name: 'bob',
 *   age: 30
 * };
 * const clara = {
 *   name: 'clara',
 *   age: 40
 * };
 * const people = [clara, bob, alice];
 * const ageNameSort = R.sortWith([
 *   R.descend(R.prop('age')),
 *   R.ascend(R.prop('name'))
 * ]);
 * ageNameSort(people); //=> [alice, clara, bob]
 * ```
 */
declare function sortWith<T>(
  fns: Array<(a: T, b: T) => number>
): (list: readonly T[]) => T[]
declare function sortWith<T>(
  fns: Array<(a: T, b: T) => number>,
  list: readonly T[]
): T[]

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * See also {@link join}
 *
 * @example
 * ```typescript
 * const pathComponents = R.split('/');
 * R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 * R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 * ```
 */
declare function split(sep: string | RegExp): (str: string) => string[]
declare function split(sep: string | RegExp, str: string): string[]

/**
 * Splits a given list or string at a given index.
 *
 * @example
 * ```typescript
 * R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 * R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 * R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 * ```
 */
declare function splitAt(index: number): {
  <T>(list: readonly T[]): [T[], T[]]
  (list: string): [string, string]
}
declare function splitAt<T>(index: number, list: readonly T[]): [T[], T[]]
declare function splitAt(index: number, list: string): [string, string]

/**
 * Splits a collection into slices of the specified length.
 *
 * @example
 * ```typescript
 * R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 * R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 * ```
 */
declare function splitEvery(a: number): {
  (list: string): string[]
  <T>(list: readonly T[]): T[][]
}
declare function splitEvery(a: number, list: string): string[]
declare function splitEvery<T>(a: number, list: readonly T[]): T[][]

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @example
 * ```typescript
 * R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 * ```
 */
declare function splitWhen<T>(
  pred: (val: T) => boolean
): <U extends T>(list: readonly U[]) => [U[], U[]]
declare function splitWhen<T>(
  pred: (val: T) => boolean,
  list: readonly T[]
): [T[], T[]]

/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @example
 * ```typescript
 * R.splitWhenever(R.equals(2), [1, 2, 3, 2, 4, 5, 2, 6, 7]); //=> [[1], [3], [4, 5], [6, 7]]
 * ```
 */
declare function splitWhenever<T>(
  pred: (a: T) => boolean
): <U extends T>(list: U[]) => U[][]
declare function splitWhenever<T>(pred: (a: T) => boolean, list: T[]): T[][]

/**
 * Checks if a list starts with the provided sublist.
 *
 * Similarly, checks if a string starts with the provided substring.
 *
 * See also {@link endsWith}
 *
 * @example
 * ```typescript
 * R.startsWith('a', 'abc')                //=> true
 * R.startsWith('b', 'abc')                //=> false
 * R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 * R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 * ```
 */
declare function startsWith<T>(
  subList: readonly T[]
): (list: readonly T[]) => boolean
declare function startsWith(substr: string): (str: string) => boolean
declare function startsWith<T>(
  subList: readonly T[],
  list: readonly T[]
): boolean
declare function startsWith(substr: string, str: string): boolean

/**
 * Subtracts its second argument from its first argument.
 *
 * See also {@link add}
 *
 * @example
 * ```typescript
 * R.subtract(10, 8); //=> 2
 *
 * const minus5 = R.subtract(R.__, 5);
 * minus5(17); //=> 12
 *
 * const complementaryAngle = R.subtract(90);
 * complementaryAngle(30); //=> 60
 * complementaryAngle(72); //=> 18
 * ```
 */
declare function subtract(a: number): (b: number) => number
declare function subtract(__: Placeholder, b: number): (a: number) => number
declare function subtract(a: number, b: number): number

/**
 * Adds together all the elements of a list.
 *
 * See also {@link reduce}
 *
 * @example
 * ```typescript
 * R.sum([2,4,6,8,100,1]); //=> 121
 * ```
 */
declare function sum(list: readonly number[]): number

/**
 * Swap an item, at index `indexA` with another item, at index `indexB`, in an object or a list of elements.
 * A new result will be created containing the new elements order.
 *
 * @example
 * ```typescript
 * R.swap(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['c', 'b', 'a', 'd', 'e', 'f']
 * R.swap(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'b', 'c', 'd', 'e', 'a'] list rotation
 * R.swap('a', 'b', {a: 1, b: 2}); //=> {a: 2, b: 2}
 * R.swap(0, 2, 'foo'); //=> 'oof'
 * ```
 */
declare function swap(indexA: number): {
  // swap(indexA)(indexB)(list)
  (indexB: number): <T>(list: readonly T[]) => T[]
  // swap(indexA)(__, list)(indexB)
  <T>(__: Placeholder, list: readonly T[]): (indexB: number) => T[]
  // swap(indexA)(indexB, list)
  <T>(indexB: number, list: readonly T[]): T[]
}

// swap(__, indexB)
declare function swap(
  __: Placeholder,
  indexB: number
): {
  // swap(__, indexB)(indexA)(list)
  (indexA: number): <T>(list: readonly T[]) => T[]
  // swap(__, indexB)(__, list)(indexA)
  <T>(__2: Placeholder, list: readonly T[]): (indexA: number) => T[]
  // swap(__, indexB)(indexA, list)
  <T>(indexA: number, list: readonly T[]): T[]
}

// swap(indexA, indexB)(list)
declare function swap(
  indexA: number,
  indexB: number
): <T>(list: readonly T[]) => T[]

// swap(__, __, list)
declare function swap<T>(
  __: Placeholder,
  __2: Placeholder,
  list: readonly T[]
): {
  // swap(__, __, list)(indexA)(indexB)
  (indexA: number): (indexB: number) => T[]
  // swap(__, __, list)(__, indexB)(indexA)
  (__3: Placeholder, indexB: number): (indexA: number) => T[]
  // swap(__, __, list)(indexA, indexB)
  (indexA: number, indexB: number): T[]
}

// swap(indexA, __, list)(indexB)
declare function swap<T>(
  indexA: number,
  __: Placeholder,
  list: readonly T[]
): (indexB: number) => T[]

// swap(__, indexB, list)(indexA)
declare function swap<T>(
  __: Placeholder,
  indexB: number,
  list: readonly T[]
): (indexA: number) => T[]

// swap(indexA, indexB, list)
declare function swap<T>(
  indexA: number,
  indexB: number,
  list: readonly T[]
): T[]

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * See also {@link symmetricDifferenceWith}, {@link difference}, {@link differenceWith}
 *
 * @example
 * ```typescript
 * R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 * R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 * ```
 */
declare function symmetricDifference<T>(
  list: readonly T[]
): <T>(list: readonly T[]) => T[]
declare function symmetricDifference<T>(
  list1: readonly T[],
  list2: readonly T[]
): T[]

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * See also {@link symmetricDifference}, {@link difference}, {@link differenceWith}
 *
 * @example
 * ```typescript
 * const eqA = R.eqBy(R.prop('a'));
 * const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 * const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 * R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 * ```
 */
declare function symmetricDifferenceWith<T>(
  pred: (a: T, b: T) => boolean
): Curry<(a: readonly T[], b: readonly T[]) => T[]>

declare function symmetricDifferenceWith<T>(
  pred: (a: T, b: T) => boolean,
  list1: readonly T[],
  list2: readonly T[]
): T[]

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * See also {@link F}
 *
 * @example
 * ```typescript
 * R.T(); //=> true
 * ```
 */
declare function T(...args: unknown[]): true

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * See also {@link head}, {@link init}, {@link last}
 *
 * @example
 * ```typescript
 * R.tail([1, 2, 3]);  //=> [2, 3]
 * R.tail([1, 2]);     //=> [2]
 * R.tail([1]);        //=> []
 * R.tail([]);         //=> []
 *
 * R.tail('abc');  //=> 'bc'
 * R.tail('ab');   //=> 'b'
 * R.tail('a');    //=> ''
 * R.tail('');     //=> ''
 * ```
 */
declare function tail(list: string): string
// empty tuple - purposefully `never, They literally have no tail
declare function tail(list: readonly []): never
// length=1 tuples also return `never`. They literally have no tail
declare function tail<T>(list: readonly [T]): never
// non-empty tuples and array
// `infer Rest` only works on types like `readonly [1, '2', 3]` where you will get back `['2', 3]`
// else, if the type is `string[]`, you'll get back `string[]`
declare function tail<T extends readonly [...any]>(
  tuple: T
): T extends readonly [any, ...infer Rest] ? Rest : T

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * See also {@link drop}
 *
 * @example
 * ```typescript
 * R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 * R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 * R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.take(3, 'ramda');               //=> 'ram'
 *
 * const personnel = [
 *   'Dave Brubeck',
 *   'Paul Desmond',
 *   'Eugene Wright',
 *   'Joe Morello',
 *   'Gerry Mulligan',
 *   'Bob Bates',
 *   'Joe Dodge',
 *   'Ron Crotty'
 * ];
 *
 * const takeFive = R.take(5);
 * takeFive(personnel);
 * //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * ```
 */
declare function take(n: number): {
  (xs: string): string
  <T>(xs: readonly T[]): T[]
}
declare function take(n: number, xs: string): string
declare function take<T>(n: number, xs: readonly T[]): T[]

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * See also {@link dropLast}
 *
 * @example
 * ```typescript
 * R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 * R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 * R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.takeLast(3, 'ramda');               //=> 'mda'
 * ```
 */
declare function takeLast(n: number): {
  (xs: string): string
  <T>(xs: readonly T[]): T[]
}
declare function takeLast<T>(n: number, xs: readonly T[]): T[]
declare function takeLast(n: number, xs: string): string

/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * See also {@link dropLastWhile}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isNotOne = x => x !== 1;
 *
 * R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 * R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 * ```
 */
declare function takeLastWhile<T>(
  pred: (a: T) => boolean
): <T>(list: readonly T[]) => T[]
declare function takeLastWhile<T>(
  pred: (a: T) => boolean,
  list: readonly T[]
): T[]

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link dropWhile}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isNotFour = x => x !== 4;
 *
 * R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 * R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 * ```
 */
declare function takeWhile<T>(
  fn: (x: T) => boolean
): (list: readonly T[]) => T[]
declare function takeWhile<T>(fn: (x: T) => boolean, list: readonly T[]): T[]

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @example
 * ```typescript
 * const sayX = x => console.log('x is ' + x);
 * R.tap(sayX, 100); //=> 100
 * // logs 'x is 100'
 * ```
 */
declare function tap<T, R extends T = T>(
  fn: (a: T) => asserts a is R
): (value: T) => R
declare function tap<T>(fn: (a: T) => void): (value: T) => T
declare function tap<T, R extends T = T>(
  fn: (a: T) => asserts a is R,
  value: T
): R
declare function tap<T>(fn: (a: T) => void, value: T): T

/**
 * Determines whether a given string matches a given regular expression.
 *
 * See also {@link match}
 *
 * @example
 * ```typescript
 * R.test(/^x/, 'xyz'); //=> true
 * R.test(/^y/, 'xyz'); //=> false
 * ```
 */
declare function test(regexp: RegExp): (str: string) => boolean
declare function test(regexp: RegExp, str: string): boolean

/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * See also {@link partial}, {@link partialRight}
 *
 * @example
 * ```typescript
 * R.thunkify(R.identity)(42)(); //=> 42
 * R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 * ```
 */
declare function thunkify<F extends (...args: readonly any[]) => any>(
  fn: F
): Curry<(...args: Parameters<F>) => () => ReturnType<F>>

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * See also {@link repeat}
 *
 * @example
 * ```typescript
 * R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * ```
 */
declare function times<T>(fn: (i: number) => T): (n: number) => T[]
declare function times<T>(fn: (i: number) => T, n: number): T[]

/**
 * The lower case version of a string.
 *
 * See also {@link toUpper}
 *
 * @example
 * ```typescript
 * R.toLower('XYZ'); //=> 'xyz'
 * ```
 */
declare function toLower<S extends string>(str: S): Lowercase<S>
declare function toLower(str: string): string

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * See also {@link fromPairs}, {@link keys}, {@link values}
 *
 * @example
 * ```typescript
 * R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
declare function toPairs<O extends object>(
  obj: O
): Array<{ [key in keyof O]: [key, O[key]] }[keyof O]>

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @example
 * ```typescript
 * const F = function() { this.x = 'X'; };
 * F.prototype.y = 'Y';
 * const f = new F();
 * R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 * ```
 */
declare function toPairsIn<O extends object>(
  obj: O
): Array<{ [key in keyof O]: [key, O[key]] }[keyof O]>

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @example
 * ```typescript
 * R.toString(42); //=> '42'
 * R.toString('abc'); //=> '"abc"'
 * R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 * R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 * R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 * ```
 */
declare function toString(val: unknown): string

/**
 * The upper case version of a string.
 *
 * See also {@link toLower}
 *
 * @example
 * ```typescript
 * R.toUpper('abc'); //=> 'ABC'
 * ```
 */
declare function toUpper<S extends string = string>(str: S): Uppercase<S>
declare function toUpper(str: string): string

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * See also {@link reduce}, {@link reduced}, {@link into}
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4];
 * const transducer = R.compose(R.map(R.add(1)), R.take(2));
 * R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 * const isOdd = (x) => x % 2 !== 0;
 * const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 * R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 * ```
 */
declare function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[]
): (fn: (acc: V, val: U) => V, acc: V, list: readonly T[]) => V
declare function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
  fn: (acc: V, val: U) => V
): (acc: readonly T[], list: readonly T[]) => V
declare function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
  fn: (acc: V, val: U) => V,
  acc: readonly T[]
): (list: readonly T[]) => V
declare function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
  fn: (acc: V, val: U) => V,
  acc: V,
  list: readonly T[]
): V

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 * @example
 * ```typescript
 * R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 * R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * // If some of the rows are shorter than the following rows, their elements are skipped:
 * R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * ```
 */
declare function transpose<T>(list: readonly T[][]): T[][]

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * See also {@link sequence}
 *
 * @example
 * ```typescript
 * // Returns `Maybe.Nothing` if the given divisor is `0`
 * const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 * R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 * R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 *
 * // Using a Type Representative
 * R.traverse(Maybe, safeDiv(10), Right(4)); //=> Just(Right(2.5))
 * R.traverse(Maybe, safeDiv(10), Right(0)); //=> Nothing
 * R.traverse(Maybe, safeDiv(10), Left("X")); //=> Just(Left("X"))
 * ```
 */
declare function traverse<A, B>(
  of: (a: B) => B[]
): {
  (fn: (t: A) => B[]): (list: readonly A[]) => B[][]
  (fn: (t: A) => B[], list: readonly A[]): B[][]
}
declare function traverse<A, B>(
  of: (a: B) => B[],
  fn: (t: A) => B[]
): (list: readonly A[]) => B[][]
declare function traverse<A, B>(
  of: (a: B) => B[],
  fn: (t: A) => B[],
  list: readonly A[]
): B[][]

/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @example
 * ```typescript
 * R.trim('   xyz  '); //=> 'xyz'
 * R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 * ```
 */
declare function trim(str: string): string

/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @example
 * ```typescript
 * R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 * R.tryCatch(() => { throw 'foo'}, R.always('caught'))('bar') // =>
 * 'caught'
 * R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 * R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 * ```
 */
declare function tryCatch<F extends (...args: readonly any[]) => any>(
  tryer: F
): <RE = ReturnType<F>, E = unknown>(
  catcher: (error: E, ...args: Parameters$1<F>) => RE
) => F | (() => RE)
declare function tryCatch<
  F extends (...args: readonly any[]) => any,
  RE = ReturnType<F>,
  E = unknown
>(tryer: F, catcher: (error: E, ...args: Parameters$1<F>) => RE): F | (() => RE)

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @example
 * ```typescript
 * R.type({}); //=> "Object"
 * R.type(1); //=> "Number"
 * R.type(false); //=> "Boolean"
 * R.type('s'); //=> "String"
 * R.type(null); //=> "Null"
 * R.type([]); //=> "Array"
 * R.type(/[A-z]/); //=> "RegExp"
 * R.type(() => {}); //=> "Function"
 * R.type(undefined); //=> "Undefined"
 * ```
 */
declare function type(
  val: any
):
  | "Object"
  | "Number"
  | "Boolean"
  | "String"
  | "Null"
  | "Array"
  | "RegExp"
  | "Function"
  | "AsyncFunction"
  | "Undefined"
  | "Symbol"
  | "Error"
  | "Date"

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * See also {@link apply}
 *
 * @example
 * ```typescript
 * R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * ```
 */
declare function unapply<T>(
  fn: (args: readonly any[]) => T
): (...args: readonly any[]) => T

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * See also {@link binary}, {@link nAry}
 *
 * @example
 * ```typescript
 * const takesTwoArgs = function(a, b) {
 *   return [a, b];
 * };
 * takesTwoArgs.length; //=> 2
 * takesTwoArgs(1, 2); //=> [1, 2]
 *
 * const takesOneArg = R.unary(takesTwoArgs);
 * takesOneArg.length; //=> 1
 * // Only 1 argument is passed to the wrapped function
 * takesOneArg(1, 2); //=> [1, undefined]
 * ```
 */
declare function unary<T, R>(
  fn: (a: T, ...args: readonly any[]) => R
): (a: T) => R

/**
 * Returns a function of arity `n` from a (manually) curried function.
 * Note that, the returned function is actually a ramda style
 * curryied function, which can accept one or more arguments in each
 * function calling.
 *
 * See also {@link curry}, {@link curryN}
 *
 * @example
 * ```typescript
 * const addFour = a => b => c => d => a + b + c + d;
 *
 * const uncurriedAddFour = R.uncurryN(4, addFour);
 * uncurriedAddFour(1, 2, 3, 4); //=> 10
 * ```
 */
declare function uncurryN<T>(
  len: number
): (fn: (a: any) => any) => (...args: unknown[]) => T
declare function uncurryN<T>(
  len: number,
  fn: (a: any) => any
): (...args: unknown[]) => T

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @example
 * ```typescript
 * const f = n => n > 50 ? false : [-n, n + 10];
 * R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * ```
 */
declare function unfold<T, TResult>(
  fn: (seed: T) => [TResult, T] | false
): (seed: T) => TResult[]
declare function unfold<T, TResult>(
  fn: (seed: T) => [TResult, T] | false,
  seed: T
): TResult[]

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @example
 * ```typescript
 * R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 * ```
 */
declare function union<T>(as: readonly T[]): (bs: readonly T[]) => T[]
declare function union<T>(as: readonly T[], bs: readonly T[]): T[]

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. If an element exists
 * in both lists, the first element from the first list will be used.
 *
 * See also {@link union}
 *
 * @example
 * ```typescript
 * const l1 = [{a: 1}, {a: 2}];
 * const l2 = [{a: 1}, {a: 4}];
 * R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 * ```
 */
declare function unionWith<T>(
  pred: (a: T, b: T) => boolean
): Curry<(a: readonly T[], b: readonly T[]) => T[]>
declare function unionWith<T>(
  pred: (a: T, b: T) => boolean,
  list1: readonly T[],
  list2: readonly T[]
): T[]

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @example
 * ```typescript
 * R.uniq([1, 1, 2, 1]); //=> [1, 2]
 * R.uniq([1, '1']);     //=> [1, '1']
 * R.uniq([[42], [42]]); //=> [[42]]
 * ```
 */
declare function uniq<T>(list: readonly T[]): T[]

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 * ```
 */
declare function uniqBy<T, U>(fn: (a: T) => U): (list: readonly T[]) => T[]
declare function uniqBy<T, U>(fn: (a: T) => U, list: readonly T[]): T[]

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * const strEq = R.eqBy(String);
 * R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 * R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 * R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 * R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 * ```
 */
declare function uniqWith<T>(
  pred: (x: T, y: T) => boolean
): (list: readonly T[]) => T[]
declare function uniqWith<T>(
  pred: (x: T, y: T) => boolean,
  list: readonly T[]
): T[]

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * See also {@link ifElse}, {@link when}, {@link cond}
 *
 * @example
 * ```typescript
 * let safeInc = R.unless(R.isNil, R.inc);
 * safeInc(null); //=> null
 * safeInc(1); //=> 2
 * ```
 */
declare function unless<T, U>(
  pred: (a: T) => boolean,
  whenFalseFn: (a: T) => U
): (a: T) => T | U
declare function unless<T, U>(
  pred: (a: T) => boolean,
  whenFalseFn: (a: T) => U,
  a: T
): T | U

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * See also {@link flatten}, {@link chain}
 *
 * @example
 * ```typescript
 * R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 * R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 * ```
 */
declare function unnest<T extends readonly any[]>(list: T): UnNest<T>

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @example
 * ```typescript
 * R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 * ```
 */
declare function until<T, U>(
  pred: (val: T) => boolean,
  fn: (val: T) => U
): (init: U) => U
declare function until<T, U>(
  pred: (val: T) => boolean,
  fn: (val: T) => U,
  init: U
): U

/**
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @example
 * ```typescript
 * R.unwind('hobbies', {
 *   name: 'alice',
 *   hobbies: ['Golf', 'Hacking'],
 *   colors: ['red', 'green'],
 * });
 * // [
 * //   { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
 * //   { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
 * // ]
 * ```
 */
declare function unwind<O extends object>(
  __: Placeholder,
  obj: O
): {
  <K extends keyof O>(
    key: K
  ): O[K] extends Array<infer T> ? Array<Omit<O, K> & Record<K, T>> : [O]
}
declare function unwind<K extends keyof O, O>(
  key: K,
  obj: O
): O[K] extends Array<infer T> ? Array<Omit<O, K> & Record<K, T>> : [O]
declare function unwind<K extends PropertyKey>(
  key: K
): {
  <O extends Record<K, any>>(
    obj: O
  ): O[K] extends Array<infer T> ? Array<Omit<O, K> & Record<K, T>> : [O]
}

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * See also {@link adjust}
 *
 * @example
 * ```typescript
 * R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 * R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * ```
 */
declare function update<T>(index: number, value: T): (list: readonly T[]) => T[]
declare function update<T>(index: number, value: T, list: readonly T[]): T[]

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * See also {@link converge}
 *
 * @example
 * ```typescript
 * R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 * R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 * R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 * R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * ```
 */
declare function useWith<
  TArg1,
  TR1,
  TArg2,
  TR2,
  TArg3,
  TR3,
  TArg4,
  TR4,
  TArg5,
  TR5,
  TArg6,
  TR6,
  TArg7,
  TR7,
  TResult,
  RestFunctions extends Array<(...args: any[]) => any>,
  TArgs extends [
    TArg1,
    TArg2,
    TArg3,
    TArg4,
    TArg5,
    TArg6,
    TArg7,
    ...InputTypesOfFns<RestFunctions>
  ]
>(
  fn: (
    ...args: [
      TR1,
      TR2,
      TR3,
      TR4,
      TR5,
      TR6,
      TR7,
      ...ReturnTypesOfFns<RestFunctions>
    ]
  ) => TResult,
  transformers: [
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5,
    (arg: TArg6) => TR6,
    (arg: TArg7) => TR7,
    ...RestFunctions
  ]
): (...args: TArgs) => TResult
declare function useWith<
  TArg1,
  TR1,
  TArg2,
  TR2,
  TArg3,
  TR3,
  TArg4,
  TR4,
  TArg5,
  TR5,
  TArg6,
  TR6,
  TArg7,
  TR7,
  TResult
>(
  fn: (...args: [TR1, TR2, TR3, TR4, TR5, TR6, TR7] & { length: 7 }) => TResult,
  transformers: [
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5,
    (arg: TArg6) => TR6,
    (arg: TArg7) => TR7
  ]
): (...args: [TArg1, TArg2, TArg3, TArg4, TArg5, TArg7]) => TResult
declare function useWith<
  TArg1,
  TR1,
  TArg2,
  TR2,
  TArg3,
  TR3,
  TArg4,
  TR4,
  TArg5,
  TR5,
  TArg6,
  TR6,
  TResult
>(
  fn: (...args: [TR1, TR2, TR3, TR4, TR5, TR6] & { length: 6 }) => TResult,
  transformers: [
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5,
    (arg: TArg6) => TR6
  ]
): (...args: [TArg1, TArg2, TArg3, TArg4, TArg5, TArg6]) => TResult
declare function useWith<
  TArg1,
  TR1,
  TArg2,
  TR2,
  TArg3,
  TR3,
  TArg4,
  TR4,
  TArg5,
  TR5,
  TResult
>(
  fn: (...args: [TR1, TR2, TR3, TR4, TR5] & { length: 5 }) => TResult,
  transformers: [
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5
  ]
): (...args: [TArg1, TArg2, TArg3, TArg4, TArg5]) => TResult
declare function useWith<
  TArg1,
  TR1,
  TArg2,
  TR2,
  TArg3,
  TR3,
  TArg4,
  TR4,
  TResult
>(
  fn: (...args: [TR1, TR2, TR3, TR4] & { length: 4 }) => TResult,
  transformers: [
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4
  ]
): (...args: [TArg1, TArg2, TArg3, TArg4]) => TResult
declare function useWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TResult>(
  fn: (...args: [TR1, TR2, TR3] & { length: 3 }) => TResult,
  transformers: [(arg: TArg1) => TR1, (arg: TArg2) => TR2, (arg: TArg3) => TR3]
): (...args: [TArg1, TArg2, TArg3]) => TResult
declare function useWith<TArg1, TR1, TArg2, TR2, TResult>(
  fn: (...args: [TR1, TR2] & { length: 2 }) => TResult,
  transformers: [(arg: TArg1) => TR1, (arg: TArg2) => TR2]
): (...args: [TArg1, TArg2]) => TResult
declare function useWith<TArg1, TR1, TResult>(
  fn: (...args: [TR1]) => TResult,
  transformers: [(arg: TArg1) => TR1]
): (...args: [TArg1]) => TResult

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * See also {@link valuesIn}, {@link keys}, {@link toPairs}
 *
 * @example
 * ```typescript
 * R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 * ```
 */
declare function values<T extends object>(obj: T): ValueOfUnion<T>[]

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * See also {@link values}, {@link keysIn}
 *
 * @example
 * ```typescript
 * const F = function() { this.x = 'X'; };
 * F.prototype.y = 'Y';
 * const f = new F();
 * R.valuesIn(f); //=> ['X', 'Y']
 * ```
 */
declare function valuesIn<T>(obj: any): T[]

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * See also {@link set}, {@link over}, {@link lens}, {@link lensIndex}, {@link lensProp}, {@link lensPath}
 *
 * @example
 * ```typescript
 * const xLens = R.lensProp('x');
 *
 * R.view(xLens, {x: 1, y: 2});  //=> 1
 * R.view(xLens, {x: 4, y: 2});  //=> 4
 * ```
 */
declare function view<S, A>(lens: Lens<S, A>): (obj: S) => A
declare function view<S, A>(lens: Lens<S, A>, obj: S): A

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * See also {@link ifElse}, {@link unless}, {@link cond}
 *
 * @example
 * ```typescript
 * // truncate :: String -> String
 * const truncate = R.when(
 *   R.propSatisfies(R.gt(R.__, 10), 'length'),
 *   R.pipe(R.take(10), R.append('…'), R.join(''))
 * );
 * truncate('12345');         //=> '12345'
 * truncate('0123456789ABC'); //=> '0123456789…'
 * ```
 */
declare function when<T, U extends T, V>(
  pred: (a: T) => a is U,
  whenTrueFn: (a: U) => V
): (a: T) => T | V
declare function when<T, U>(
  pred: (a: T) => boolean,
  whenTrueFn: (a: T) => U
): (a: T) => T | U
declare function when<T, U extends T, V>(
  pred: (a: T) => a is U,
  whenTrueFn: (a: U) => V,
  a: T
): T | V
declare function when<T, U>(
  pred: (a: T) => boolean,
  whenTrueFn: (a: T) => U,
  a: T
): T | U

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * See also {@link propSatisfies}, {@link whereEq}
 *
 * @example
 * ```typescript
 * // pred :: Object -> Boolean
 * const pred = R.where({
 *   a: R.equals('foo'),
 *   b: R.complement(R.equals('bar')),
 *   x: R.gt(R.__, 10),
 *   y: R.lt(R.__, 20)
 * });
 *
 * pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 * pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 * pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 * pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 * pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 * ```
 */
declare function where<T>(spec: T): <U>(testObj: U) => boolean
declare function where<T, U>(spec: T, testObj: U): boolean

/**
 * Takes a spec object and a test object; each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `whereAny` returns true if at least one of the predicates return true,
 * false otherwise.
 *
 * `whereAny` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * See also {@link propSatisfies}, {@link where}
 *
 * @example
 * ```typescript
 * // pred :: Object -> Boolean
 * const pred = R.whereAny({
 *   a: R.equals('foo'),
 *   b: R.complement(R.equals('xxx')),
 *   x: R.gt(R.__, 10),
 *   y: R.lt(R.__, 20)
 * });
 *
 * pred({a: 'foo', b: 'xxx', x: 8, y: 34}); //=> true
 * pred({a: 'xxx', b: 'xxx', x: 9, y: 21}); //=> false
 * pred({a: 'bar', b: 'xxx', x: 10, y: 20}); //=> false
 * pred({a: 'foo', b: 'bar', x: 10, y: 20}); //=> true
 * pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> true
 * ```
 */
declare function whereAny<
  Spec extends Record<PropertyKey, (value: any) => boolean>
>(spec: Spec): <U extends Record<keyof Spec, any>>(testObj: U) => boolean
declare function whereAny<U>(
  __: Placeholder,
  testObj: U
): <Spec extends Partial<Record<keyof U, (value: any) => boolean>>>(
  spec: Spec
) => boolean
declare function whereAny<
  Spec extends Partial<Record<keyof U, (value: any) => boolean>>,
  U
>(spec: Spec, testObj: U): boolean

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * See also {@link propEq}, {@link where}
 *
 * @example
 * ```typescript
 * // pred :: Object -> Boolean
 * const pred = R.whereEq({a: 1, b: 2});
 *
 * pred({a: 1});              //=> false
 * pred({a: 1, b: 2});        //=> true
 * pred({a: 1, b: 2, c: 3});  //=> true
 * pred({a: 1, b: 1});        //=> false
 * ```
 */
declare function whereEq<T>(spec: T): <U>(obj: U) => boolean
declare function whereEq<T, U>(spec: T, obj: U): boolean

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}, {@link difference}, {@link remove}
 *
 * @example
 * ```typescript
 * R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 * ```
 */
declare function without<T>(
  list1: readonly T[] | readonly unknown[]
): (list2: readonly T[]) => T[]
declare function without<T>(list1: readonly unknown[], list2: readonly T[]): T[]

/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * See also {@link or}, {@link and}
 *
 * @example
 * ```typescript
 * R.xor(true, true); //=> false
 * R.xor(true, false); //=> true
 * R.xor(false, true); //=> true
 * R.xor(false, false); //=> false
 * ```
 */
declare function xor(a: any, b: any): boolean
declare function xor(a: any): (b: any) => boolean

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @example
 * ```typescript
 * R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * ```
 */
declare function xprod<K>(
  as: readonly K[]
): <V>(bs: readonly V[]) => Array<KeyValuePair<K, V>>
declare function xprod<K, V>(
  as: readonly K[],
  bs: readonly V[]
): Array<KeyValuePair<K, V>>

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @example
 * ```typescript
 * R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 */
declare function zip<K>(
  list1: readonly K[]
): <V>(list2: readonly V[]) => Array<KeyValuePair<K, V>>
declare function zip<K, V>(
  list1: readonly K[],
  list2: readonly V[]
): Array<KeyValuePair<K, V>>

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @example
 * ```typescript
 * R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 * ```
 */
declare function zipObj<K extends PropertyKey>(
  keys: readonly K[]
): <T>(values: readonly T[]) => { [P in K]: T }
declare function zipObj<T, K extends PropertyKey>(
  keys: readonly K[],
  values: readonly T[]
): { [P in K]: T }

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @example
 * ```typescript
 * const f = (x, y) => {
 *   // ...
 * };
 * R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 * //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * ```
 */
declare function zipWith<T, U, TResult>(
  fn: (x: T, y: U) => TResult
): (list1: readonly T[], list2: readonly U[]) => TResult[]
declare function zipWith<T, U, TResult>(
  fn: (x: T, y: U) => TResult,
  list1: readonly T[]
): (list2: readonly U[]) => TResult[]
declare function zipWith<T, U, TResult>(
  fn: (x: T, y: U) => TResult,
  list1: readonly T[],
  list2: readonly U[]
): TResult[]
