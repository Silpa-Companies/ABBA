
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model client_profile
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type client_profile = $Result.DefaultSelection<Prisma.$client_profilePayload>
/**
 * Model clinician_profile
 * 
 */
export type clinician_profile = $Result.DefaultSelection<Prisma.$clinician_profilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PatientStatus: {
  DRAFT: 'DRAFT',
  UNDER_REVIEW: 'UNDER_REVIEW',
  MATCHED: 'MATCHED',
  ACTIVE: 'ACTIVE'
};

export type PatientStatus = (typeof PatientStatus)[keyof typeof PatientStatus]


export const modality_type: {
  in_person: 'in_person',
  telehealth: 'telehealth',
  hybrid: 'hybrid'
};

export type modality_type = (typeof modality_type)[keyof typeof modality_type]

}

export type PatientStatus = $Enums.PatientStatus

export const PatientStatus: typeof $Enums.PatientStatus

export type modality_type = $Enums.modality_type

export const modality_type: typeof $Enums.modality_type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Client_profiles
 * const client_profiles = await prisma.client_profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Client_profiles
   * const client_profiles = await prisma.client_profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.client_profile`: Exposes CRUD operations for the **client_profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Client_profiles
    * const client_profiles = await prisma.client_profile.findMany()
    * ```
    */
  get client_profile(): Prisma.client_profileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinician_profile`: Exposes CRUD operations for the **clinician_profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinician_profiles
    * const clinician_profiles = await prisma.clinician_profile.findMany()
    * ```
    */
  get clinician_profile(): Prisma.clinician_profileDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    client_profile: 'client_profile',
    clinician_profile: 'clinician_profile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "client_profile" | "clinician_profile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      client_profile: {
        payload: Prisma.$client_profilePayload<ExtArgs>
        fields: Prisma.client_profileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.client_profileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.client_profileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>
          }
          findFirst: {
            args: Prisma.client_profileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.client_profileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>
          }
          findMany: {
            args: Prisma.client_profileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>[]
          }
          create: {
            args: Prisma.client_profileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>
          }
          createMany: {
            args: Prisma.client_profileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.client_profileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>[]
          }
          delete: {
            args: Prisma.client_profileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>
          }
          update: {
            args: Prisma.client_profileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>
          }
          deleteMany: {
            args: Prisma.client_profileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.client_profileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.client_profileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>[]
          }
          upsert: {
            args: Prisma.client_profileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$client_profilePayload>
          }
          aggregate: {
            args: Prisma.Client_profileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient_profile>
          }
          groupBy: {
            args: Prisma.client_profileGroupByArgs<ExtArgs>
            result: $Utils.Optional<Client_profileGroupByOutputType>[]
          }
          count: {
            args: Prisma.client_profileCountArgs<ExtArgs>
            result: $Utils.Optional<Client_profileCountAggregateOutputType> | number
          }
        }
      }
      clinician_profile: {
        payload: Prisma.$clinician_profilePayload<ExtArgs>
        fields: Prisma.clinician_profileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.clinician_profileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.clinician_profileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>
          }
          findFirst: {
            args: Prisma.clinician_profileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.clinician_profileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>
          }
          findMany: {
            args: Prisma.clinician_profileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>[]
          }
          create: {
            args: Prisma.clinician_profileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>
          }
          createMany: {
            args: Prisma.clinician_profileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.clinician_profileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>[]
          }
          delete: {
            args: Prisma.clinician_profileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>
          }
          update: {
            args: Prisma.clinician_profileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>
          }
          deleteMany: {
            args: Prisma.clinician_profileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.clinician_profileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.clinician_profileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>[]
          }
          upsert: {
            args: Prisma.clinician_profileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clinician_profilePayload>
          }
          aggregate: {
            args: Prisma.Clinician_profileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinician_profile>
          }
          groupBy: {
            args: Prisma.clinician_profileGroupByArgs<ExtArgs>
            result: $Utils.Optional<Clinician_profileGroupByOutputType>[]
          }
          count: {
            args: Prisma.clinician_profileCountArgs<ExtArgs>
            result: $Utils.Optional<Clinician_profileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    client_profile?: client_profileOmit
    clinician_profile?: clinician_profileOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Clinician_profileCountOutputType
   */

  export type Clinician_profileCountOutputType = {
    assigned_clients: number
  }

  export type Clinician_profileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_clients?: boolean | Clinician_profileCountOutputTypeCountAssigned_clientsArgs
  }

  // Custom InputTypes
  /**
   * Clinician_profileCountOutputType without action
   */
  export type Clinician_profileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinician_profileCountOutputType
     */
    select?: Clinician_profileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Clinician_profileCountOutputType without action
   */
  export type Clinician_profileCountOutputTypeCountAssigned_clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: client_profileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model client_profile
   */

  export type AggregateClient_profile = {
    _count: Client_profileCountAggregateOutputType | null
    _avg: Client_profileAvgAggregateOutputType | null
    _sum: Client_profileSumAggregateOutputType | null
    _min: Client_profileMinAggregateOutputType | null
    _max: Client_profileMaxAggregateOutputType | null
  }

  export type Client_profileAvgAggregateOutputType = {
    communication_level: number | null
    social_interaction_level: number | null
    sensory_level: number | null
  }

  export type Client_profileSumAggregateOutputType = {
    communication_level: number | null
    social_interaction_level: number | null
    sensory_level: number | null
  }

  export type Client_profileMinAggregateOutputType = {
    id: string | null
    status: $Enums.PatientStatus | null
    first_name: string | null
    last_name: string | null
    dob: Date | null
    phone: string | null
    email: string | null
    gender_identity: string | null
    pronouns: string | null
    emergency_name: string | null
    emergency_phone: string | null
    reason_for_care: string | null
    treatment_goals: string | null
    communication_level: number | null
    social_interaction_level: number | null
    sensory_level: number | null
    location: string | null
    telehealth_link: string | null
    preferred_language: string | null
    therapist_gender_pref: string | null
    preferred_modality: $Enums.modality_type | null
    insurance_provider: string | null
    insurance_plan: string | null
    insurance_id: string | null
    clinician_name: string | null
    created_at: Date | null
    updated_at: Date | null
    clinician_id: string | null
  }

  export type Client_profileMaxAggregateOutputType = {
    id: string | null
    status: $Enums.PatientStatus | null
    first_name: string | null
    last_name: string | null
    dob: Date | null
    phone: string | null
    email: string | null
    gender_identity: string | null
    pronouns: string | null
    emergency_name: string | null
    emergency_phone: string | null
    reason_for_care: string | null
    treatment_goals: string | null
    communication_level: number | null
    social_interaction_level: number | null
    sensory_level: number | null
    location: string | null
    telehealth_link: string | null
    preferred_language: string | null
    therapist_gender_pref: string | null
    preferred_modality: $Enums.modality_type | null
    insurance_provider: string | null
    insurance_plan: string | null
    insurance_id: string | null
    clinician_name: string | null
    created_at: Date | null
    updated_at: Date | null
    clinician_id: string | null
  }

  export type Client_profileCountAggregateOutputType = {
    id: number
    status: number
    first_name: number
    last_name: number
    dob: number
    phone: number
    email: number
    gender_identity: number
    pronouns: number
    emergency_name: number
    emergency_phone: number
    reason_for_care: number
    presenting_issues: number
    treatment_goals: number
    goal_areas: number
    communication_level: number
    social_interaction_level: number
    sensory_level: number
    location: number
    telehealth_link: number
    preferred_language: number
    therapist_gender_pref: number
    preferred_modality: number
    available_time_slots: number
    availability_blocks: number
    insurance_provider: number
    insurance_plan: number
    insurance_id: number
    clinician_name: number
    created_at: number
    updated_at: number
    clinician_id: number
    _all: number
  }


  export type Client_profileAvgAggregateInputType = {
    communication_level?: true
    social_interaction_level?: true
    sensory_level?: true
  }

  export type Client_profileSumAggregateInputType = {
    communication_level?: true
    social_interaction_level?: true
    sensory_level?: true
  }

  export type Client_profileMinAggregateInputType = {
    id?: true
    status?: true
    first_name?: true
    last_name?: true
    dob?: true
    phone?: true
    email?: true
    gender_identity?: true
    pronouns?: true
    emergency_name?: true
    emergency_phone?: true
    reason_for_care?: true
    treatment_goals?: true
    communication_level?: true
    social_interaction_level?: true
    sensory_level?: true
    location?: true
    telehealth_link?: true
    preferred_language?: true
    therapist_gender_pref?: true
    preferred_modality?: true
    insurance_provider?: true
    insurance_plan?: true
    insurance_id?: true
    clinician_name?: true
    created_at?: true
    updated_at?: true
    clinician_id?: true
  }

  export type Client_profileMaxAggregateInputType = {
    id?: true
    status?: true
    first_name?: true
    last_name?: true
    dob?: true
    phone?: true
    email?: true
    gender_identity?: true
    pronouns?: true
    emergency_name?: true
    emergency_phone?: true
    reason_for_care?: true
    treatment_goals?: true
    communication_level?: true
    social_interaction_level?: true
    sensory_level?: true
    location?: true
    telehealth_link?: true
    preferred_language?: true
    therapist_gender_pref?: true
    preferred_modality?: true
    insurance_provider?: true
    insurance_plan?: true
    insurance_id?: true
    clinician_name?: true
    created_at?: true
    updated_at?: true
    clinician_id?: true
  }

  export type Client_profileCountAggregateInputType = {
    id?: true
    status?: true
    first_name?: true
    last_name?: true
    dob?: true
    phone?: true
    email?: true
    gender_identity?: true
    pronouns?: true
    emergency_name?: true
    emergency_phone?: true
    reason_for_care?: true
    presenting_issues?: true
    treatment_goals?: true
    goal_areas?: true
    communication_level?: true
    social_interaction_level?: true
    sensory_level?: true
    location?: true
    telehealth_link?: true
    preferred_language?: true
    therapist_gender_pref?: true
    preferred_modality?: true
    available_time_slots?: true
    availability_blocks?: true
    insurance_provider?: true
    insurance_plan?: true
    insurance_id?: true
    clinician_name?: true
    created_at?: true
    updated_at?: true
    clinician_id?: true
    _all?: true
  }

  export type Client_profileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which client_profile to aggregate.
     */
    where?: client_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of client_profiles to fetch.
     */
    orderBy?: client_profileOrderByWithRelationInput | client_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: client_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` client_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` client_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned client_profiles
    **/
    _count?: true | Client_profileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Client_profileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Client_profileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Client_profileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Client_profileMaxAggregateInputType
  }

  export type GetClient_profileAggregateType<T extends Client_profileAggregateArgs> = {
        [P in keyof T & keyof AggregateClient_profile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient_profile[P]>
      : GetScalarType<T[P], AggregateClient_profile[P]>
  }




  export type client_profileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: client_profileWhereInput
    orderBy?: client_profileOrderByWithAggregationInput | client_profileOrderByWithAggregationInput[]
    by: Client_profileScalarFieldEnum[] | Client_profileScalarFieldEnum
    having?: client_profileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Client_profileCountAggregateInputType | true
    _avg?: Client_profileAvgAggregateInputType
    _sum?: Client_profileSumAggregateInputType
    _min?: Client_profileMinAggregateInputType
    _max?: Client_profileMaxAggregateInputType
  }

  export type Client_profileGroupByOutputType = {
    id: string
    status: $Enums.PatientStatus
    first_name: string | null
    last_name: string | null
    dob: Date | null
    phone: string | null
    email: string | null
    gender_identity: string | null
    pronouns: string | null
    emergency_name: string | null
    emergency_phone: string | null
    reason_for_care: string | null
    presenting_issues: string[]
    treatment_goals: string | null
    goal_areas: string[]
    communication_level: number | null
    social_interaction_level: number | null
    sensory_level: number | null
    location: string | null
    telehealth_link: string | null
    preferred_language: string | null
    therapist_gender_pref: string | null
    preferred_modality: $Enums.modality_type
    available_time_slots: Date[]
    availability_blocks: string[]
    insurance_provider: string | null
    insurance_plan: string | null
    insurance_id: string | null
    clinician_name: string | null
    created_at: Date
    updated_at: Date
    clinician_id: string | null
    _count: Client_profileCountAggregateOutputType | null
    _avg: Client_profileAvgAggregateOutputType | null
    _sum: Client_profileSumAggregateOutputType | null
    _min: Client_profileMinAggregateOutputType | null
    _max: Client_profileMaxAggregateOutputType | null
  }

  type GetClient_profileGroupByPayload<T extends client_profileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Client_profileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Client_profileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Client_profileGroupByOutputType[P]>
            : GetScalarType<T[P], Client_profileGroupByOutputType[P]>
        }
      >
    >


  export type client_profileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    first_name?: boolean
    last_name?: boolean
    dob?: boolean
    phone?: boolean
    email?: boolean
    gender_identity?: boolean
    pronouns?: boolean
    emergency_name?: boolean
    emergency_phone?: boolean
    reason_for_care?: boolean
    presenting_issues?: boolean
    treatment_goals?: boolean
    goal_areas?: boolean
    communication_level?: boolean
    social_interaction_level?: boolean
    sensory_level?: boolean
    location?: boolean
    telehealth_link?: boolean
    preferred_language?: boolean
    therapist_gender_pref?: boolean
    preferred_modality?: boolean
    available_time_slots?: boolean
    availability_blocks?: boolean
    insurance_provider?: boolean
    insurance_plan?: boolean
    insurance_id?: boolean
    clinician_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    clinician_id?: boolean
    assigned_clinician?: boolean | client_profile$assigned_clinicianArgs<ExtArgs>
  }, ExtArgs["result"]["client_profile"]>

  export type client_profileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    first_name?: boolean
    last_name?: boolean
    dob?: boolean
    phone?: boolean
    email?: boolean
    gender_identity?: boolean
    pronouns?: boolean
    emergency_name?: boolean
    emergency_phone?: boolean
    reason_for_care?: boolean
    presenting_issues?: boolean
    treatment_goals?: boolean
    goal_areas?: boolean
    communication_level?: boolean
    social_interaction_level?: boolean
    sensory_level?: boolean
    location?: boolean
    telehealth_link?: boolean
    preferred_language?: boolean
    therapist_gender_pref?: boolean
    preferred_modality?: boolean
    available_time_slots?: boolean
    availability_blocks?: boolean
    insurance_provider?: boolean
    insurance_plan?: boolean
    insurance_id?: boolean
    clinician_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    clinician_id?: boolean
    assigned_clinician?: boolean | client_profile$assigned_clinicianArgs<ExtArgs>
  }, ExtArgs["result"]["client_profile"]>

  export type client_profileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    first_name?: boolean
    last_name?: boolean
    dob?: boolean
    phone?: boolean
    email?: boolean
    gender_identity?: boolean
    pronouns?: boolean
    emergency_name?: boolean
    emergency_phone?: boolean
    reason_for_care?: boolean
    presenting_issues?: boolean
    treatment_goals?: boolean
    goal_areas?: boolean
    communication_level?: boolean
    social_interaction_level?: boolean
    sensory_level?: boolean
    location?: boolean
    telehealth_link?: boolean
    preferred_language?: boolean
    therapist_gender_pref?: boolean
    preferred_modality?: boolean
    available_time_slots?: boolean
    availability_blocks?: boolean
    insurance_provider?: boolean
    insurance_plan?: boolean
    insurance_id?: boolean
    clinician_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    clinician_id?: boolean
    assigned_clinician?: boolean | client_profile$assigned_clinicianArgs<ExtArgs>
  }, ExtArgs["result"]["client_profile"]>

  export type client_profileSelectScalar = {
    id?: boolean
    status?: boolean
    first_name?: boolean
    last_name?: boolean
    dob?: boolean
    phone?: boolean
    email?: boolean
    gender_identity?: boolean
    pronouns?: boolean
    emergency_name?: boolean
    emergency_phone?: boolean
    reason_for_care?: boolean
    presenting_issues?: boolean
    treatment_goals?: boolean
    goal_areas?: boolean
    communication_level?: boolean
    social_interaction_level?: boolean
    sensory_level?: boolean
    location?: boolean
    telehealth_link?: boolean
    preferred_language?: boolean
    therapist_gender_pref?: boolean
    preferred_modality?: boolean
    available_time_slots?: boolean
    availability_blocks?: boolean
    insurance_provider?: boolean
    insurance_plan?: boolean
    insurance_id?: boolean
    clinician_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    clinician_id?: boolean
  }

  export type client_profileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "first_name" | "last_name" | "dob" | "phone" | "email" | "gender_identity" | "pronouns" | "emergency_name" | "emergency_phone" | "reason_for_care" | "presenting_issues" | "treatment_goals" | "goal_areas" | "communication_level" | "social_interaction_level" | "sensory_level" | "location" | "telehealth_link" | "preferred_language" | "therapist_gender_pref" | "preferred_modality" | "available_time_slots" | "availability_blocks" | "insurance_provider" | "insurance_plan" | "insurance_id" | "clinician_name" | "created_at" | "updated_at" | "clinician_id", ExtArgs["result"]["client_profile"]>
  export type client_profileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_clinician?: boolean | client_profile$assigned_clinicianArgs<ExtArgs>
  }
  export type client_profileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_clinician?: boolean | client_profile$assigned_clinicianArgs<ExtArgs>
  }
  export type client_profileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_clinician?: boolean | client_profile$assigned_clinicianArgs<ExtArgs>
  }

  export type $client_profilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "client_profile"
    objects: {
      assigned_clinician: Prisma.$clinician_profilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.PatientStatus
      first_name: string | null
      last_name: string | null
      dob: Date | null
      phone: string | null
      email: string | null
      gender_identity: string | null
      pronouns: string | null
      emergency_name: string | null
      emergency_phone: string | null
      reason_for_care: string | null
      presenting_issues: string[]
      treatment_goals: string | null
      goal_areas: string[]
      communication_level: number | null
      social_interaction_level: number | null
      sensory_level: number | null
      location: string | null
      telehealth_link: string | null
      preferred_language: string | null
      therapist_gender_pref: string | null
      preferred_modality: $Enums.modality_type
      available_time_slots: Date[]
      availability_blocks: string[]
      insurance_provider: string | null
      insurance_plan: string | null
      insurance_id: string | null
      clinician_name: string | null
      created_at: Date
      updated_at: Date
      clinician_id: string | null
    }, ExtArgs["result"]["client_profile"]>
    composites: {}
  }

  type client_profileGetPayload<S extends boolean | null | undefined | client_profileDefaultArgs> = $Result.GetResult<Prisma.$client_profilePayload, S>

  type client_profileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<client_profileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Client_profileCountAggregateInputType | true
    }

  export interface client_profileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['client_profile'], meta: { name: 'client_profile' } }
    /**
     * Find zero or one Client_profile that matches the filter.
     * @param {client_profileFindUniqueArgs} args - Arguments to find a Client_profile
     * @example
     * // Get one Client_profile
     * const client_profile = await prisma.client_profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends client_profileFindUniqueArgs>(args: SelectSubset<T, client_profileFindUniqueArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client_profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {client_profileFindUniqueOrThrowArgs} args - Arguments to find a Client_profile
     * @example
     * // Get one Client_profile
     * const client_profile = await prisma.client_profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends client_profileFindUniqueOrThrowArgs>(args: SelectSubset<T, client_profileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client_profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {client_profileFindFirstArgs} args - Arguments to find a Client_profile
     * @example
     * // Get one Client_profile
     * const client_profile = await prisma.client_profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends client_profileFindFirstArgs>(args?: SelectSubset<T, client_profileFindFirstArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client_profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {client_profileFindFirstOrThrowArgs} args - Arguments to find a Client_profile
     * @example
     * // Get one Client_profile
     * const client_profile = await prisma.client_profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends client_profileFindFirstOrThrowArgs>(args?: SelectSubset<T, client_profileFindFirstOrThrowArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Client_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {client_profileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Client_profiles
     * const client_profiles = await prisma.client_profile.findMany()
     * 
     * // Get first 10 Client_profiles
     * const client_profiles = await prisma.client_profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const client_profileWithIdOnly = await prisma.client_profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends client_profileFindManyArgs>(args?: SelectSubset<T, client_profileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client_profile.
     * @param {client_profileCreateArgs} args - Arguments to create a Client_profile.
     * @example
     * // Create one Client_profile
     * const Client_profile = await prisma.client_profile.create({
     *   data: {
     *     // ... data to create a Client_profile
     *   }
     * })
     * 
     */
    create<T extends client_profileCreateArgs>(args: SelectSubset<T, client_profileCreateArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Client_profiles.
     * @param {client_profileCreateManyArgs} args - Arguments to create many Client_profiles.
     * @example
     * // Create many Client_profiles
     * const client_profile = await prisma.client_profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends client_profileCreateManyArgs>(args?: SelectSubset<T, client_profileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Client_profiles and returns the data saved in the database.
     * @param {client_profileCreateManyAndReturnArgs} args - Arguments to create many Client_profiles.
     * @example
     * // Create many Client_profiles
     * const client_profile = await prisma.client_profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Client_profiles and only return the `id`
     * const client_profileWithIdOnly = await prisma.client_profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends client_profileCreateManyAndReturnArgs>(args?: SelectSubset<T, client_profileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client_profile.
     * @param {client_profileDeleteArgs} args - Arguments to delete one Client_profile.
     * @example
     * // Delete one Client_profile
     * const Client_profile = await prisma.client_profile.delete({
     *   where: {
     *     // ... filter to delete one Client_profile
     *   }
     * })
     * 
     */
    delete<T extends client_profileDeleteArgs>(args: SelectSubset<T, client_profileDeleteArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client_profile.
     * @param {client_profileUpdateArgs} args - Arguments to update one Client_profile.
     * @example
     * // Update one Client_profile
     * const client_profile = await prisma.client_profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends client_profileUpdateArgs>(args: SelectSubset<T, client_profileUpdateArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Client_profiles.
     * @param {client_profileDeleteManyArgs} args - Arguments to filter Client_profiles to delete.
     * @example
     * // Delete a few Client_profiles
     * const { count } = await prisma.client_profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends client_profileDeleteManyArgs>(args?: SelectSubset<T, client_profileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Client_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {client_profileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Client_profiles
     * const client_profile = await prisma.client_profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends client_profileUpdateManyArgs>(args: SelectSubset<T, client_profileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Client_profiles and returns the data updated in the database.
     * @param {client_profileUpdateManyAndReturnArgs} args - Arguments to update many Client_profiles.
     * @example
     * // Update many Client_profiles
     * const client_profile = await prisma.client_profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Client_profiles and only return the `id`
     * const client_profileWithIdOnly = await prisma.client_profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends client_profileUpdateManyAndReturnArgs>(args: SelectSubset<T, client_profileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client_profile.
     * @param {client_profileUpsertArgs} args - Arguments to update or create a Client_profile.
     * @example
     * // Update or create a Client_profile
     * const client_profile = await prisma.client_profile.upsert({
     *   create: {
     *     // ... data to create a Client_profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client_profile we want to update
     *   }
     * })
     */
    upsert<T extends client_profileUpsertArgs>(args: SelectSubset<T, client_profileUpsertArgs<ExtArgs>>): Prisma__client_profileClient<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Client_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {client_profileCountArgs} args - Arguments to filter Client_profiles to count.
     * @example
     * // Count the number of Client_profiles
     * const count = await prisma.client_profile.count({
     *   where: {
     *     // ... the filter for the Client_profiles we want to count
     *   }
     * })
    **/
    count<T extends client_profileCountArgs>(
      args?: Subset<T, client_profileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Client_profileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client_profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Client_profileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Client_profileAggregateArgs>(args: Subset<T, Client_profileAggregateArgs>): Prisma.PrismaPromise<GetClient_profileAggregateType<T>>

    /**
     * Group by Client_profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {client_profileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends client_profileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: client_profileGroupByArgs['orderBy'] }
        : { orderBy?: client_profileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, client_profileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClient_profileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the client_profile model
   */
  readonly fields: client_profileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for client_profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__client_profileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assigned_clinician<T extends client_profile$assigned_clinicianArgs<ExtArgs> = {}>(args?: Subset<T, client_profile$assigned_clinicianArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the client_profile model
   */
  interface client_profileFieldRefs {
    readonly id: FieldRef<"client_profile", 'String'>
    readonly status: FieldRef<"client_profile", 'PatientStatus'>
    readonly first_name: FieldRef<"client_profile", 'String'>
    readonly last_name: FieldRef<"client_profile", 'String'>
    readonly dob: FieldRef<"client_profile", 'DateTime'>
    readonly phone: FieldRef<"client_profile", 'String'>
    readonly email: FieldRef<"client_profile", 'String'>
    readonly gender_identity: FieldRef<"client_profile", 'String'>
    readonly pronouns: FieldRef<"client_profile", 'String'>
    readonly emergency_name: FieldRef<"client_profile", 'String'>
    readonly emergency_phone: FieldRef<"client_profile", 'String'>
    readonly reason_for_care: FieldRef<"client_profile", 'String'>
    readonly presenting_issues: FieldRef<"client_profile", 'String[]'>
    readonly treatment_goals: FieldRef<"client_profile", 'String'>
    readonly goal_areas: FieldRef<"client_profile", 'String[]'>
    readonly communication_level: FieldRef<"client_profile", 'Int'>
    readonly social_interaction_level: FieldRef<"client_profile", 'Int'>
    readonly sensory_level: FieldRef<"client_profile", 'Int'>
    readonly location: FieldRef<"client_profile", 'String'>
    readonly telehealth_link: FieldRef<"client_profile", 'String'>
    readonly preferred_language: FieldRef<"client_profile", 'String'>
    readonly therapist_gender_pref: FieldRef<"client_profile", 'String'>
    readonly preferred_modality: FieldRef<"client_profile", 'modality_type'>
    readonly available_time_slots: FieldRef<"client_profile", 'DateTime[]'>
    readonly availability_blocks: FieldRef<"client_profile", 'String[]'>
    readonly insurance_provider: FieldRef<"client_profile", 'String'>
    readonly insurance_plan: FieldRef<"client_profile", 'String'>
    readonly insurance_id: FieldRef<"client_profile", 'String'>
    readonly clinician_name: FieldRef<"client_profile", 'String'>
    readonly created_at: FieldRef<"client_profile", 'DateTime'>
    readonly updated_at: FieldRef<"client_profile", 'DateTime'>
    readonly clinician_id: FieldRef<"client_profile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * client_profile findUnique
   */
  export type client_profileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * Filter, which client_profile to fetch.
     */
    where: client_profileWhereUniqueInput
  }

  /**
   * client_profile findUniqueOrThrow
   */
  export type client_profileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * Filter, which client_profile to fetch.
     */
    where: client_profileWhereUniqueInput
  }

  /**
   * client_profile findFirst
   */
  export type client_profileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * Filter, which client_profile to fetch.
     */
    where?: client_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of client_profiles to fetch.
     */
    orderBy?: client_profileOrderByWithRelationInput | client_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for client_profiles.
     */
    cursor?: client_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` client_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` client_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of client_profiles.
     */
    distinct?: Client_profileScalarFieldEnum | Client_profileScalarFieldEnum[]
  }

  /**
   * client_profile findFirstOrThrow
   */
  export type client_profileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * Filter, which client_profile to fetch.
     */
    where?: client_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of client_profiles to fetch.
     */
    orderBy?: client_profileOrderByWithRelationInput | client_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for client_profiles.
     */
    cursor?: client_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` client_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` client_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of client_profiles.
     */
    distinct?: Client_profileScalarFieldEnum | Client_profileScalarFieldEnum[]
  }

  /**
   * client_profile findMany
   */
  export type client_profileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * Filter, which client_profiles to fetch.
     */
    where?: client_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of client_profiles to fetch.
     */
    orderBy?: client_profileOrderByWithRelationInput | client_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing client_profiles.
     */
    cursor?: client_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` client_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` client_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of client_profiles.
     */
    distinct?: Client_profileScalarFieldEnum | Client_profileScalarFieldEnum[]
  }

  /**
   * client_profile create
   */
  export type client_profileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * The data needed to create a client_profile.
     */
    data?: XOR<client_profileCreateInput, client_profileUncheckedCreateInput>
  }

  /**
   * client_profile createMany
   */
  export type client_profileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many client_profiles.
     */
    data: client_profileCreateManyInput | client_profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * client_profile createManyAndReturn
   */
  export type client_profileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * The data used to create many client_profiles.
     */
    data: client_profileCreateManyInput | client_profileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * client_profile update
   */
  export type client_profileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * The data needed to update a client_profile.
     */
    data: XOR<client_profileUpdateInput, client_profileUncheckedUpdateInput>
    /**
     * Choose, which client_profile to update.
     */
    where: client_profileWhereUniqueInput
  }

  /**
   * client_profile updateMany
   */
  export type client_profileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update client_profiles.
     */
    data: XOR<client_profileUpdateManyMutationInput, client_profileUncheckedUpdateManyInput>
    /**
     * Filter which client_profiles to update
     */
    where?: client_profileWhereInput
    /**
     * Limit how many client_profiles to update.
     */
    limit?: number
  }

  /**
   * client_profile updateManyAndReturn
   */
  export type client_profileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * The data used to update client_profiles.
     */
    data: XOR<client_profileUpdateManyMutationInput, client_profileUncheckedUpdateManyInput>
    /**
     * Filter which client_profiles to update
     */
    where?: client_profileWhereInput
    /**
     * Limit how many client_profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * client_profile upsert
   */
  export type client_profileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * The filter to search for the client_profile to update in case it exists.
     */
    where: client_profileWhereUniqueInput
    /**
     * In case the client_profile found by the `where` argument doesn't exist, create a new client_profile with this data.
     */
    create: XOR<client_profileCreateInput, client_profileUncheckedCreateInput>
    /**
     * In case the client_profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<client_profileUpdateInput, client_profileUncheckedUpdateInput>
  }

  /**
   * client_profile delete
   */
  export type client_profileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    /**
     * Filter which client_profile to delete.
     */
    where: client_profileWhereUniqueInput
  }

  /**
   * client_profile deleteMany
   */
  export type client_profileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which client_profiles to delete
     */
    where?: client_profileWhereInput
    /**
     * Limit how many client_profiles to delete.
     */
    limit?: number
  }

  /**
   * client_profile.assigned_clinician
   */
  export type client_profile$assigned_clinicianArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    where?: clinician_profileWhereInput
  }

  /**
   * client_profile without action
   */
  export type client_profileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
  }


  /**
   * Model clinician_profile
   */

  export type AggregateClinician_profile = {
    _count: Clinician_profileCountAggregateOutputType | null
    _min: Clinician_profileMinAggregateOutputType | null
    _max: Clinician_profileMaxAggregateOutputType | null
  }

  export type Clinician_profileMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    bio: string | null
    location: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Clinician_profileMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    bio: string | null
    location: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Clinician_profileCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    bio: number
    specialties: number
    available_time_slots: number
    location: number
    languages: number
    preferred_modality: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Clinician_profileMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    bio?: true
    location?: true
    created_at?: true
    updated_at?: true
  }

  export type Clinician_profileMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    bio?: true
    location?: true
    created_at?: true
    updated_at?: true
  }

  export type Clinician_profileCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    bio?: true
    specialties?: true
    available_time_slots?: true
    location?: true
    languages?: true
    preferred_modality?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Clinician_profileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clinician_profile to aggregate.
     */
    where?: clinician_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clinician_profiles to fetch.
     */
    orderBy?: clinician_profileOrderByWithRelationInput | clinician_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: clinician_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clinician_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clinician_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned clinician_profiles
    **/
    _count?: true | Clinician_profileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Clinician_profileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Clinician_profileMaxAggregateInputType
  }

  export type GetClinician_profileAggregateType<T extends Clinician_profileAggregateArgs> = {
        [P in keyof T & keyof AggregateClinician_profile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinician_profile[P]>
      : GetScalarType<T[P], AggregateClinician_profile[P]>
  }




  export type clinician_profileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: clinician_profileWhereInput
    orderBy?: clinician_profileOrderByWithAggregationInput | clinician_profileOrderByWithAggregationInput[]
    by: Clinician_profileScalarFieldEnum[] | Clinician_profileScalarFieldEnum
    having?: clinician_profileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Clinician_profileCountAggregateInputType | true
    _min?: Clinician_profileMinAggregateInputType
    _max?: Clinician_profileMaxAggregateInputType
  }

  export type Clinician_profileGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    bio: string | null
    specialties: string[]
    available_time_slots: Date[]
    location: string
    languages: string[]
    preferred_modality: $Enums.modality_type[]
    created_at: Date
    updated_at: Date
    _count: Clinician_profileCountAggregateOutputType | null
    _min: Clinician_profileMinAggregateOutputType | null
    _max: Clinician_profileMaxAggregateOutputType | null
  }

  type GetClinician_profileGroupByPayload<T extends clinician_profileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Clinician_profileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Clinician_profileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Clinician_profileGroupByOutputType[P]>
            : GetScalarType<T[P], Clinician_profileGroupByOutputType[P]>
        }
      >
    >


  export type clinician_profileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    specialties?: boolean
    available_time_slots?: boolean
    location?: boolean
    languages?: boolean
    preferred_modality?: boolean
    created_at?: boolean
    updated_at?: boolean
    assigned_clients?: boolean | clinician_profile$assigned_clientsArgs<ExtArgs>
    _count?: boolean | Clinician_profileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinician_profile"]>

  export type clinician_profileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    specialties?: boolean
    available_time_slots?: boolean
    location?: boolean
    languages?: boolean
    preferred_modality?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["clinician_profile"]>

  export type clinician_profileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    specialties?: boolean
    available_time_slots?: boolean
    location?: boolean
    languages?: boolean
    preferred_modality?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["clinician_profile"]>

  export type clinician_profileSelectScalar = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    specialties?: boolean
    available_time_slots?: boolean
    location?: boolean
    languages?: boolean
    preferred_modality?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type clinician_profileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "first_name" | "last_name" | "bio" | "specialties" | "available_time_slots" | "location" | "languages" | "preferred_modality" | "created_at" | "updated_at", ExtArgs["result"]["clinician_profile"]>
  export type clinician_profileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_clients?: boolean | clinician_profile$assigned_clientsArgs<ExtArgs>
    _count?: boolean | Clinician_profileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type clinician_profileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type clinician_profileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $clinician_profilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "clinician_profile"
    objects: {
      assigned_clients: Prisma.$client_profilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      first_name: string
      last_name: string
      bio: string | null
      specialties: string[]
      available_time_slots: Date[]
      location: string
      languages: string[]
      preferred_modality: $Enums.modality_type[]
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["clinician_profile"]>
    composites: {}
  }

  type clinician_profileGetPayload<S extends boolean | null | undefined | clinician_profileDefaultArgs> = $Result.GetResult<Prisma.$clinician_profilePayload, S>

  type clinician_profileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<clinician_profileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Clinician_profileCountAggregateInputType | true
    }

  export interface clinician_profileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['clinician_profile'], meta: { name: 'clinician_profile' } }
    /**
     * Find zero or one Clinician_profile that matches the filter.
     * @param {clinician_profileFindUniqueArgs} args - Arguments to find a Clinician_profile
     * @example
     * // Get one Clinician_profile
     * const clinician_profile = await prisma.clinician_profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends clinician_profileFindUniqueArgs>(args: SelectSubset<T, clinician_profileFindUniqueArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinician_profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {clinician_profileFindUniqueOrThrowArgs} args - Arguments to find a Clinician_profile
     * @example
     * // Get one Clinician_profile
     * const clinician_profile = await prisma.clinician_profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends clinician_profileFindUniqueOrThrowArgs>(args: SelectSubset<T, clinician_profileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinician_profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clinician_profileFindFirstArgs} args - Arguments to find a Clinician_profile
     * @example
     * // Get one Clinician_profile
     * const clinician_profile = await prisma.clinician_profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends clinician_profileFindFirstArgs>(args?: SelectSubset<T, clinician_profileFindFirstArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinician_profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clinician_profileFindFirstOrThrowArgs} args - Arguments to find a Clinician_profile
     * @example
     * // Get one Clinician_profile
     * const clinician_profile = await prisma.clinician_profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends clinician_profileFindFirstOrThrowArgs>(args?: SelectSubset<T, clinician_profileFindFirstOrThrowArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinician_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clinician_profileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinician_profiles
     * const clinician_profiles = await prisma.clinician_profile.findMany()
     * 
     * // Get first 10 Clinician_profiles
     * const clinician_profiles = await prisma.clinician_profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinician_profileWithIdOnly = await prisma.clinician_profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends clinician_profileFindManyArgs>(args?: SelectSubset<T, clinician_profileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinician_profile.
     * @param {clinician_profileCreateArgs} args - Arguments to create a Clinician_profile.
     * @example
     * // Create one Clinician_profile
     * const Clinician_profile = await prisma.clinician_profile.create({
     *   data: {
     *     // ... data to create a Clinician_profile
     *   }
     * })
     * 
     */
    create<T extends clinician_profileCreateArgs>(args: SelectSubset<T, clinician_profileCreateArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinician_profiles.
     * @param {clinician_profileCreateManyArgs} args - Arguments to create many Clinician_profiles.
     * @example
     * // Create many Clinician_profiles
     * const clinician_profile = await prisma.clinician_profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends clinician_profileCreateManyArgs>(args?: SelectSubset<T, clinician_profileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinician_profiles and returns the data saved in the database.
     * @param {clinician_profileCreateManyAndReturnArgs} args - Arguments to create many Clinician_profiles.
     * @example
     * // Create many Clinician_profiles
     * const clinician_profile = await prisma.clinician_profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinician_profiles and only return the `id`
     * const clinician_profileWithIdOnly = await prisma.clinician_profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends clinician_profileCreateManyAndReturnArgs>(args?: SelectSubset<T, clinician_profileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinician_profile.
     * @param {clinician_profileDeleteArgs} args - Arguments to delete one Clinician_profile.
     * @example
     * // Delete one Clinician_profile
     * const Clinician_profile = await prisma.clinician_profile.delete({
     *   where: {
     *     // ... filter to delete one Clinician_profile
     *   }
     * })
     * 
     */
    delete<T extends clinician_profileDeleteArgs>(args: SelectSubset<T, clinician_profileDeleteArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinician_profile.
     * @param {clinician_profileUpdateArgs} args - Arguments to update one Clinician_profile.
     * @example
     * // Update one Clinician_profile
     * const clinician_profile = await prisma.clinician_profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends clinician_profileUpdateArgs>(args: SelectSubset<T, clinician_profileUpdateArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinician_profiles.
     * @param {clinician_profileDeleteManyArgs} args - Arguments to filter Clinician_profiles to delete.
     * @example
     * // Delete a few Clinician_profiles
     * const { count } = await prisma.clinician_profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends clinician_profileDeleteManyArgs>(args?: SelectSubset<T, clinician_profileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinician_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clinician_profileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinician_profiles
     * const clinician_profile = await prisma.clinician_profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends clinician_profileUpdateManyArgs>(args: SelectSubset<T, clinician_profileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinician_profiles and returns the data updated in the database.
     * @param {clinician_profileUpdateManyAndReturnArgs} args - Arguments to update many Clinician_profiles.
     * @example
     * // Update many Clinician_profiles
     * const clinician_profile = await prisma.clinician_profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinician_profiles and only return the `id`
     * const clinician_profileWithIdOnly = await prisma.clinician_profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends clinician_profileUpdateManyAndReturnArgs>(args: SelectSubset<T, clinician_profileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinician_profile.
     * @param {clinician_profileUpsertArgs} args - Arguments to update or create a Clinician_profile.
     * @example
     * // Update or create a Clinician_profile
     * const clinician_profile = await prisma.clinician_profile.upsert({
     *   create: {
     *     // ... data to create a Clinician_profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinician_profile we want to update
     *   }
     * })
     */
    upsert<T extends clinician_profileUpsertArgs>(args: SelectSubset<T, clinician_profileUpsertArgs<ExtArgs>>): Prisma__clinician_profileClient<$Result.GetResult<Prisma.$clinician_profilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinician_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clinician_profileCountArgs} args - Arguments to filter Clinician_profiles to count.
     * @example
     * // Count the number of Clinician_profiles
     * const count = await prisma.clinician_profile.count({
     *   where: {
     *     // ... the filter for the Clinician_profiles we want to count
     *   }
     * })
    **/
    count<T extends clinician_profileCountArgs>(
      args?: Subset<T, clinician_profileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Clinician_profileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinician_profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Clinician_profileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Clinician_profileAggregateArgs>(args: Subset<T, Clinician_profileAggregateArgs>): Prisma.PrismaPromise<GetClinician_profileAggregateType<T>>

    /**
     * Group by Clinician_profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clinician_profileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends clinician_profileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: clinician_profileGroupByArgs['orderBy'] }
        : { orderBy?: clinician_profileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, clinician_profileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinician_profileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the clinician_profile model
   */
  readonly fields: clinician_profileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for clinician_profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__clinician_profileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assigned_clients<T extends clinician_profile$assigned_clientsArgs<ExtArgs> = {}>(args?: Subset<T, clinician_profile$assigned_clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$client_profilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the clinician_profile model
   */
  interface clinician_profileFieldRefs {
    readonly id: FieldRef<"clinician_profile", 'String'>
    readonly first_name: FieldRef<"clinician_profile", 'String'>
    readonly last_name: FieldRef<"clinician_profile", 'String'>
    readonly bio: FieldRef<"clinician_profile", 'String'>
    readonly specialties: FieldRef<"clinician_profile", 'String[]'>
    readonly available_time_slots: FieldRef<"clinician_profile", 'DateTime[]'>
    readonly location: FieldRef<"clinician_profile", 'String'>
    readonly languages: FieldRef<"clinician_profile", 'String[]'>
    readonly preferred_modality: FieldRef<"clinician_profile", 'modality_type[]'>
    readonly created_at: FieldRef<"clinician_profile", 'DateTime'>
    readonly updated_at: FieldRef<"clinician_profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * clinician_profile findUnique
   */
  export type clinician_profileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * Filter, which clinician_profile to fetch.
     */
    where: clinician_profileWhereUniqueInput
  }

  /**
   * clinician_profile findUniqueOrThrow
   */
  export type clinician_profileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * Filter, which clinician_profile to fetch.
     */
    where: clinician_profileWhereUniqueInput
  }

  /**
   * clinician_profile findFirst
   */
  export type clinician_profileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * Filter, which clinician_profile to fetch.
     */
    where?: clinician_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clinician_profiles to fetch.
     */
    orderBy?: clinician_profileOrderByWithRelationInput | clinician_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clinician_profiles.
     */
    cursor?: clinician_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clinician_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clinician_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clinician_profiles.
     */
    distinct?: Clinician_profileScalarFieldEnum | Clinician_profileScalarFieldEnum[]
  }

  /**
   * clinician_profile findFirstOrThrow
   */
  export type clinician_profileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * Filter, which clinician_profile to fetch.
     */
    where?: clinician_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clinician_profiles to fetch.
     */
    orderBy?: clinician_profileOrderByWithRelationInput | clinician_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clinician_profiles.
     */
    cursor?: clinician_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clinician_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clinician_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clinician_profiles.
     */
    distinct?: Clinician_profileScalarFieldEnum | Clinician_profileScalarFieldEnum[]
  }

  /**
   * clinician_profile findMany
   */
  export type clinician_profileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * Filter, which clinician_profiles to fetch.
     */
    where?: clinician_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clinician_profiles to fetch.
     */
    orderBy?: clinician_profileOrderByWithRelationInput | clinician_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing clinician_profiles.
     */
    cursor?: clinician_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clinician_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clinician_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clinician_profiles.
     */
    distinct?: Clinician_profileScalarFieldEnum | Clinician_profileScalarFieldEnum[]
  }

  /**
   * clinician_profile create
   */
  export type clinician_profileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * The data needed to create a clinician_profile.
     */
    data: XOR<clinician_profileCreateInput, clinician_profileUncheckedCreateInput>
  }

  /**
   * clinician_profile createMany
   */
  export type clinician_profileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many clinician_profiles.
     */
    data: clinician_profileCreateManyInput | clinician_profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * clinician_profile createManyAndReturn
   */
  export type clinician_profileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * The data used to create many clinician_profiles.
     */
    data: clinician_profileCreateManyInput | clinician_profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * clinician_profile update
   */
  export type clinician_profileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * The data needed to update a clinician_profile.
     */
    data: XOR<clinician_profileUpdateInput, clinician_profileUncheckedUpdateInput>
    /**
     * Choose, which clinician_profile to update.
     */
    where: clinician_profileWhereUniqueInput
  }

  /**
   * clinician_profile updateMany
   */
  export type clinician_profileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update clinician_profiles.
     */
    data: XOR<clinician_profileUpdateManyMutationInput, clinician_profileUncheckedUpdateManyInput>
    /**
     * Filter which clinician_profiles to update
     */
    where?: clinician_profileWhereInput
    /**
     * Limit how many clinician_profiles to update.
     */
    limit?: number
  }

  /**
   * clinician_profile updateManyAndReturn
   */
  export type clinician_profileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * The data used to update clinician_profiles.
     */
    data: XOR<clinician_profileUpdateManyMutationInput, clinician_profileUncheckedUpdateManyInput>
    /**
     * Filter which clinician_profiles to update
     */
    where?: clinician_profileWhereInput
    /**
     * Limit how many clinician_profiles to update.
     */
    limit?: number
  }

  /**
   * clinician_profile upsert
   */
  export type clinician_profileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * The filter to search for the clinician_profile to update in case it exists.
     */
    where: clinician_profileWhereUniqueInput
    /**
     * In case the clinician_profile found by the `where` argument doesn't exist, create a new clinician_profile with this data.
     */
    create: XOR<clinician_profileCreateInput, clinician_profileUncheckedCreateInput>
    /**
     * In case the clinician_profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<clinician_profileUpdateInput, clinician_profileUncheckedUpdateInput>
  }

  /**
   * clinician_profile delete
   */
  export type clinician_profileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
    /**
     * Filter which clinician_profile to delete.
     */
    where: clinician_profileWhereUniqueInput
  }

  /**
   * clinician_profile deleteMany
   */
  export type clinician_profileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clinician_profiles to delete
     */
    where?: clinician_profileWhereInput
    /**
     * Limit how many clinician_profiles to delete.
     */
    limit?: number
  }

  /**
   * clinician_profile.assigned_clients
   */
  export type clinician_profile$assigned_clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client_profile
     */
    select?: client_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client_profile
     */
    omit?: client_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: client_profileInclude<ExtArgs> | null
    where?: client_profileWhereInput
    orderBy?: client_profileOrderByWithRelationInput | client_profileOrderByWithRelationInput[]
    cursor?: client_profileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Client_profileScalarFieldEnum | Client_profileScalarFieldEnum[]
  }

  /**
   * clinician_profile without action
   */
  export type clinician_profileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clinician_profile
     */
    select?: clinician_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clinician_profile
     */
    omit?: clinician_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clinician_profileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Client_profileScalarFieldEnum: {
    id: 'id',
    status: 'status',
    first_name: 'first_name',
    last_name: 'last_name',
    dob: 'dob',
    phone: 'phone',
    email: 'email',
    gender_identity: 'gender_identity',
    pronouns: 'pronouns',
    emergency_name: 'emergency_name',
    emergency_phone: 'emergency_phone',
    reason_for_care: 'reason_for_care',
    presenting_issues: 'presenting_issues',
    treatment_goals: 'treatment_goals',
    goal_areas: 'goal_areas',
    communication_level: 'communication_level',
    social_interaction_level: 'social_interaction_level',
    sensory_level: 'sensory_level',
    location: 'location',
    telehealth_link: 'telehealth_link',
    preferred_language: 'preferred_language',
    therapist_gender_pref: 'therapist_gender_pref',
    preferred_modality: 'preferred_modality',
    available_time_slots: 'available_time_slots',
    availability_blocks: 'availability_blocks',
    insurance_provider: 'insurance_provider',
    insurance_plan: 'insurance_plan',
    insurance_id: 'insurance_id',
    clinician_name: 'clinician_name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    clinician_id: 'clinician_id'
  };

  export type Client_profileScalarFieldEnum = (typeof Client_profileScalarFieldEnum)[keyof typeof Client_profileScalarFieldEnum]


  export const Clinician_profileScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    bio: 'bio',
    specialties: 'specialties',
    available_time_slots: 'available_time_slots',
    location: 'location',
    languages: 'languages',
    preferred_modality: 'preferred_modality',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Clinician_profileScalarFieldEnum = (typeof Clinician_profileScalarFieldEnum)[keyof typeof Clinician_profileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PatientStatus'
   */
  export type EnumPatientStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientStatus'>
    


  /**
   * Reference to a field of type 'PatientStatus[]'
   */
  export type ListEnumPatientStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'modality_type'
   */
  export type Enummodality_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'modality_type'>
    


  /**
   * Reference to a field of type 'modality_type[]'
   */
  export type ListEnummodality_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'modality_type[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type client_profileWhereInput = {
    AND?: client_profileWhereInput | client_profileWhereInput[]
    OR?: client_profileWhereInput[]
    NOT?: client_profileWhereInput | client_profileWhereInput[]
    id?: UuidFilter<"client_profile"> | string
    status?: EnumPatientStatusFilter<"client_profile"> | $Enums.PatientStatus
    first_name?: StringNullableFilter<"client_profile"> | string | null
    last_name?: StringNullableFilter<"client_profile"> | string | null
    dob?: DateTimeNullableFilter<"client_profile"> | Date | string | null
    phone?: StringNullableFilter<"client_profile"> | string | null
    email?: StringNullableFilter<"client_profile"> | string | null
    gender_identity?: StringNullableFilter<"client_profile"> | string | null
    pronouns?: StringNullableFilter<"client_profile"> | string | null
    emergency_name?: StringNullableFilter<"client_profile"> | string | null
    emergency_phone?: StringNullableFilter<"client_profile"> | string | null
    reason_for_care?: StringNullableFilter<"client_profile"> | string | null
    presenting_issues?: StringNullableListFilter<"client_profile">
    treatment_goals?: StringNullableFilter<"client_profile"> | string | null
    goal_areas?: StringNullableListFilter<"client_profile">
    communication_level?: IntNullableFilter<"client_profile"> | number | null
    social_interaction_level?: IntNullableFilter<"client_profile"> | number | null
    sensory_level?: IntNullableFilter<"client_profile"> | number | null
    location?: StringNullableFilter<"client_profile"> | string | null
    telehealth_link?: StringNullableFilter<"client_profile"> | string | null
    preferred_language?: StringNullableFilter<"client_profile"> | string | null
    therapist_gender_pref?: StringNullableFilter<"client_profile"> | string | null
    preferred_modality?: Enummodality_typeFilter<"client_profile"> | $Enums.modality_type
    available_time_slots?: DateTimeNullableListFilter<"client_profile">
    availability_blocks?: StringNullableListFilter<"client_profile">
    insurance_provider?: StringNullableFilter<"client_profile"> | string | null
    insurance_plan?: StringNullableFilter<"client_profile"> | string | null
    insurance_id?: StringNullableFilter<"client_profile"> | string | null
    clinician_name?: StringNullableFilter<"client_profile"> | string | null
    created_at?: DateTimeFilter<"client_profile"> | Date | string
    updated_at?: DateTimeFilter<"client_profile"> | Date | string
    clinician_id?: UuidNullableFilter<"client_profile"> | string | null
    assigned_clinician?: XOR<Clinician_profileNullableScalarRelationFilter, clinician_profileWhereInput> | null
  }

  export type client_profileOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    gender_identity?: SortOrderInput | SortOrder
    pronouns?: SortOrderInput | SortOrder
    emergency_name?: SortOrderInput | SortOrder
    emergency_phone?: SortOrderInput | SortOrder
    reason_for_care?: SortOrderInput | SortOrder
    presenting_issues?: SortOrder
    treatment_goals?: SortOrderInput | SortOrder
    goal_areas?: SortOrder
    communication_level?: SortOrderInput | SortOrder
    social_interaction_level?: SortOrderInput | SortOrder
    sensory_level?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    telehealth_link?: SortOrderInput | SortOrder
    preferred_language?: SortOrderInput | SortOrder
    therapist_gender_pref?: SortOrderInput | SortOrder
    preferred_modality?: SortOrder
    available_time_slots?: SortOrder
    availability_blocks?: SortOrder
    insurance_provider?: SortOrderInput | SortOrder
    insurance_plan?: SortOrderInput | SortOrder
    insurance_id?: SortOrderInput | SortOrder
    clinician_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    clinician_id?: SortOrderInput | SortOrder
    assigned_clinician?: clinician_profileOrderByWithRelationInput
  }

  export type client_profileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: client_profileWhereInput | client_profileWhereInput[]
    OR?: client_profileWhereInput[]
    NOT?: client_profileWhereInput | client_profileWhereInput[]
    status?: EnumPatientStatusFilter<"client_profile"> | $Enums.PatientStatus
    first_name?: StringNullableFilter<"client_profile"> | string | null
    last_name?: StringNullableFilter<"client_profile"> | string | null
    dob?: DateTimeNullableFilter<"client_profile"> | Date | string | null
    phone?: StringNullableFilter<"client_profile"> | string | null
    email?: StringNullableFilter<"client_profile"> | string | null
    gender_identity?: StringNullableFilter<"client_profile"> | string | null
    pronouns?: StringNullableFilter<"client_profile"> | string | null
    emergency_name?: StringNullableFilter<"client_profile"> | string | null
    emergency_phone?: StringNullableFilter<"client_profile"> | string | null
    reason_for_care?: StringNullableFilter<"client_profile"> | string | null
    presenting_issues?: StringNullableListFilter<"client_profile">
    treatment_goals?: StringNullableFilter<"client_profile"> | string | null
    goal_areas?: StringNullableListFilter<"client_profile">
    communication_level?: IntNullableFilter<"client_profile"> | number | null
    social_interaction_level?: IntNullableFilter<"client_profile"> | number | null
    sensory_level?: IntNullableFilter<"client_profile"> | number | null
    location?: StringNullableFilter<"client_profile"> | string | null
    telehealth_link?: StringNullableFilter<"client_profile"> | string | null
    preferred_language?: StringNullableFilter<"client_profile"> | string | null
    therapist_gender_pref?: StringNullableFilter<"client_profile"> | string | null
    preferred_modality?: Enummodality_typeFilter<"client_profile"> | $Enums.modality_type
    available_time_slots?: DateTimeNullableListFilter<"client_profile">
    availability_blocks?: StringNullableListFilter<"client_profile">
    insurance_provider?: StringNullableFilter<"client_profile"> | string | null
    insurance_plan?: StringNullableFilter<"client_profile"> | string | null
    insurance_id?: StringNullableFilter<"client_profile"> | string | null
    clinician_name?: StringNullableFilter<"client_profile"> | string | null
    created_at?: DateTimeFilter<"client_profile"> | Date | string
    updated_at?: DateTimeFilter<"client_profile"> | Date | string
    clinician_id?: UuidNullableFilter<"client_profile"> | string | null
    assigned_clinician?: XOR<Clinician_profileNullableScalarRelationFilter, clinician_profileWhereInput> | null
  }, "id">

  export type client_profileOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    gender_identity?: SortOrderInput | SortOrder
    pronouns?: SortOrderInput | SortOrder
    emergency_name?: SortOrderInput | SortOrder
    emergency_phone?: SortOrderInput | SortOrder
    reason_for_care?: SortOrderInput | SortOrder
    presenting_issues?: SortOrder
    treatment_goals?: SortOrderInput | SortOrder
    goal_areas?: SortOrder
    communication_level?: SortOrderInput | SortOrder
    social_interaction_level?: SortOrderInput | SortOrder
    sensory_level?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    telehealth_link?: SortOrderInput | SortOrder
    preferred_language?: SortOrderInput | SortOrder
    therapist_gender_pref?: SortOrderInput | SortOrder
    preferred_modality?: SortOrder
    available_time_slots?: SortOrder
    availability_blocks?: SortOrder
    insurance_provider?: SortOrderInput | SortOrder
    insurance_plan?: SortOrderInput | SortOrder
    insurance_id?: SortOrderInput | SortOrder
    clinician_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    clinician_id?: SortOrderInput | SortOrder
    _count?: client_profileCountOrderByAggregateInput
    _avg?: client_profileAvgOrderByAggregateInput
    _max?: client_profileMaxOrderByAggregateInput
    _min?: client_profileMinOrderByAggregateInput
    _sum?: client_profileSumOrderByAggregateInput
  }

  export type client_profileScalarWhereWithAggregatesInput = {
    AND?: client_profileScalarWhereWithAggregatesInput | client_profileScalarWhereWithAggregatesInput[]
    OR?: client_profileScalarWhereWithAggregatesInput[]
    NOT?: client_profileScalarWhereWithAggregatesInput | client_profileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"client_profile"> | string
    status?: EnumPatientStatusWithAggregatesFilter<"client_profile"> | $Enums.PatientStatus
    first_name?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    dob?: DateTimeNullableWithAggregatesFilter<"client_profile"> | Date | string | null
    phone?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    email?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    gender_identity?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    pronouns?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    emergency_name?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    emergency_phone?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    reason_for_care?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    presenting_issues?: StringNullableListFilter<"client_profile">
    treatment_goals?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    goal_areas?: StringNullableListFilter<"client_profile">
    communication_level?: IntNullableWithAggregatesFilter<"client_profile"> | number | null
    social_interaction_level?: IntNullableWithAggregatesFilter<"client_profile"> | number | null
    sensory_level?: IntNullableWithAggregatesFilter<"client_profile"> | number | null
    location?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    telehealth_link?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    preferred_language?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    therapist_gender_pref?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    preferred_modality?: Enummodality_typeWithAggregatesFilter<"client_profile"> | $Enums.modality_type
    available_time_slots?: DateTimeNullableListFilter<"client_profile">
    availability_blocks?: StringNullableListFilter<"client_profile">
    insurance_provider?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    insurance_plan?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    insurance_id?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    clinician_name?: StringNullableWithAggregatesFilter<"client_profile"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"client_profile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"client_profile"> | Date | string
    clinician_id?: UuidNullableWithAggregatesFilter<"client_profile"> | string | null
  }

  export type clinician_profileWhereInput = {
    AND?: clinician_profileWhereInput | clinician_profileWhereInput[]
    OR?: clinician_profileWhereInput[]
    NOT?: clinician_profileWhereInput | clinician_profileWhereInput[]
    id?: UuidFilter<"clinician_profile"> | string
    first_name?: StringFilter<"clinician_profile"> | string
    last_name?: StringFilter<"clinician_profile"> | string
    bio?: StringNullableFilter<"clinician_profile"> | string | null
    specialties?: StringNullableListFilter<"clinician_profile">
    available_time_slots?: DateTimeNullableListFilter<"clinician_profile">
    location?: StringFilter<"clinician_profile"> | string
    languages?: StringNullableListFilter<"clinician_profile">
    preferred_modality?: Enummodality_typeNullableListFilter<"clinician_profile">
    created_at?: DateTimeFilter<"clinician_profile"> | Date | string
    updated_at?: DateTimeFilter<"clinician_profile"> | Date | string
    assigned_clients?: Client_profileListRelationFilter
  }

  export type clinician_profileOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrderInput | SortOrder
    specialties?: SortOrder
    available_time_slots?: SortOrder
    location?: SortOrder
    languages?: SortOrder
    preferred_modality?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    assigned_clients?: client_profileOrderByRelationAggregateInput
  }

  export type clinician_profileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: clinician_profileWhereInput | clinician_profileWhereInput[]
    OR?: clinician_profileWhereInput[]
    NOT?: clinician_profileWhereInput | clinician_profileWhereInput[]
    first_name?: StringFilter<"clinician_profile"> | string
    last_name?: StringFilter<"clinician_profile"> | string
    bio?: StringNullableFilter<"clinician_profile"> | string | null
    specialties?: StringNullableListFilter<"clinician_profile">
    available_time_slots?: DateTimeNullableListFilter<"clinician_profile">
    location?: StringFilter<"clinician_profile"> | string
    languages?: StringNullableListFilter<"clinician_profile">
    preferred_modality?: Enummodality_typeNullableListFilter<"clinician_profile">
    created_at?: DateTimeFilter<"clinician_profile"> | Date | string
    updated_at?: DateTimeFilter<"clinician_profile"> | Date | string
    assigned_clients?: Client_profileListRelationFilter
  }, "id">

  export type clinician_profileOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrderInput | SortOrder
    specialties?: SortOrder
    available_time_slots?: SortOrder
    location?: SortOrder
    languages?: SortOrder
    preferred_modality?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: clinician_profileCountOrderByAggregateInput
    _max?: clinician_profileMaxOrderByAggregateInput
    _min?: clinician_profileMinOrderByAggregateInput
  }

  export type clinician_profileScalarWhereWithAggregatesInput = {
    AND?: clinician_profileScalarWhereWithAggregatesInput | clinician_profileScalarWhereWithAggregatesInput[]
    OR?: clinician_profileScalarWhereWithAggregatesInput[]
    NOT?: clinician_profileScalarWhereWithAggregatesInput | clinician_profileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"clinician_profile"> | string
    first_name?: StringWithAggregatesFilter<"clinician_profile"> | string
    last_name?: StringWithAggregatesFilter<"clinician_profile"> | string
    bio?: StringNullableWithAggregatesFilter<"clinician_profile"> | string | null
    specialties?: StringNullableListFilter<"clinician_profile">
    available_time_slots?: DateTimeNullableListFilter<"clinician_profile">
    location?: StringWithAggregatesFilter<"clinician_profile"> | string
    languages?: StringNullableListFilter<"clinician_profile">
    preferred_modality?: Enummodality_typeNullableListFilter<"clinician_profile">
    created_at?: DateTimeWithAggregatesFilter<"clinician_profile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"clinician_profile"> | Date | string
  }

  export type client_profileCreateInput = {
    id?: string
    status?: $Enums.PatientStatus
    first_name?: string | null
    last_name?: string | null
    dob?: Date | string | null
    phone?: string | null
    email?: string | null
    gender_identity?: string | null
    pronouns?: string | null
    emergency_name?: string | null
    emergency_phone?: string | null
    reason_for_care?: string | null
    presenting_issues?: client_profileCreatepresenting_issuesInput | string[]
    treatment_goals?: string | null
    goal_areas?: client_profileCreategoal_areasInput | string[]
    communication_level?: number | null
    social_interaction_level?: number | null
    sensory_level?: number | null
    location?: string | null
    telehealth_link?: string | null
    preferred_language?: string | null
    therapist_gender_pref?: string | null
    preferred_modality?: $Enums.modality_type
    available_time_slots?: client_profileCreateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileCreateavailability_blocksInput | string[]
    insurance_provider?: string | null
    insurance_plan?: string | null
    insurance_id?: string | null
    clinician_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    assigned_clinician?: clinician_profileCreateNestedOneWithoutAssigned_clientsInput
  }

  export type client_profileUncheckedCreateInput = {
    id?: string
    status?: $Enums.PatientStatus
    first_name?: string | null
    last_name?: string | null
    dob?: Date | string | null
    phone?: string | null
    email?: string | null
    gender_identity?: string | null
    pronouns?: string | null
    emergency_name?: string | null
    emergency_phone?: string | null
    reason_for_care?: string | null
    presenting_issues?: client_profileCreatepresenting_issuesInput | string[]
    treatment_goals?: string | null
    goal_areas?: client_profileCreategoal_areasInput | string[]
    communication_level?: number | null
    social_interaction_level?: number | null
    sensory_level?: number | null
    location?: string | null
    telehealth_link?: string | null
    preferred_language?: string | null
    therapist_gender_pref?: string | null
    preferred_modality?: $Enums.modality_type
    available_time_slots?: client_profileCreateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileCreateavailability_blocksInput | string[]
    insurance_provider?: string | null
    insurance_plan?: string | null
    insurance_id?: string | null
    clinician_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    clinician_id?: string | null
  }

  export type client_profileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    assigned_clinician?: clinician_profileUpdateOneWithoutAssigned_clientsNestedInput
  }

  export type client_profileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    clinician_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type client_profileCreateManyInput = {
    id?: string
    status?: $Enums.PatientStatus
    first_name?: string | null
    last_name?: string | null
    dob?: Date | string | null
    phone?: string | null
    email?: string | null
    gender_identity?: string | null
    pronouns?: string | null
    emergency_name?: string | null
    emergency_phone?: string | null
    reason_for_care?: string | null
    presenting_issues?: client_profileCreatepresenting_issuesInput | string[]
    treatment_goals?: string | null
    goal_areas?: client_profileCreategoal_areasInput | string[]
    communication_level?: number | null
    social_interaction_level?: number | null
    sensory_level?: number | null
    location?: string | null
    telehealth_link?: string | null
    preferred_language?: string | null
    therapist_gender_pref?: string | null
    preferred_modality?: $Enums.modality_type
    available_time_slots?: client_profileCreateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileCreateavailability_blocksInput | string[]
    insurance_provider?: string | null
    insurance_plan?: string | null
    insurance_id?: string | null
    clinician_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    clinician_id?: string | null
  }

  export type client_profileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type client_profileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    clinician_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type clinician_profileCreateInput = {
    id?: string
    first_name: string
    last_name: string
    bio?: string | null
    specialties?: clinician_profileCreatespecialtiesInput | string[]
    available_time_slots?: clinician_profileCreateavailable_time_slotsInput | Date[] | string[]
    location?: string
    languages?: clinician_profileCreatelanguagesInput | string[]
    preferred_modality?: clinician_profileCreatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: Date | string
    updated_at?: Date | string
    assigned_clients?: client_profileCreateNestedManyWithoutAssigned_clinicianInput
  }

  export type clinician_profileUncheckedCreateInput = {
    id?: string
    first_name: string
    last_name: string
    bio?: string | null
    specialties?: clinician_profileCreatespecialtiesInput | string[]
    available_time_slots?: clinician_profileCreateavailable_time_slotsInput | Date[] | string[]
    location?: string
    languages?: clinician_profileCreatelanguagesInput | string[]
    preferred_modality?: clinician_profileCreatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: Date | string
    updated_at?: Date | string
    assigned_clients?: client_profileUncheckedCreateNestedManyWithoutAssigned_clinicianInput
  }

  export type clinician_profileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: clinician_profileUpdatespecialtiesInput | string[]
    available_time_slots?: clinician_profileUpdateavailable_time_slotsInput | Date[] | string[]
    location?: StringFieldUpdateOperationsInput | string
    languages?: clinician_profileUpdatelanguagesInput | string[]
    preferred_modality?: clinician_profileUpdatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    assigned_clients?: client_profileUpdateManyWithoutAssigned_clinicianNestedInput
  }

  export type clinician_profileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: clinician_profileUpdatespecialtiesInput | string[]
    available_time_slots?: clinician_profileUpdateavailable_time_slotsInput | Date[] | string[]
    location?: StringFieldUpdateOperationsInput | string
    languages?: clinician_profileUpdatelanguagesInput | string[]
    preferred_modality?: clinician_profileUpdatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    assigned_clients?: client_profileUncheckedUpdateManyWithoutAssigned_clinicianNestedInput
  }

  export type clinician_profileCreateManyInput = {
    id?: string
    first_name: string
    last_name: string
    bio?: string | null
    specialties?: clinician_profileCreatespecialtiesInput | string[]
    available_time_slots?: clinician_profileCreateavailable_time_slotsInput | Date[] | string[]
    location?: string
    languages?: clinician_profileCreatelanguagesInput | string[]
    preferred_modality?: clinician_profileCreatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type clinician_profileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: clinician_profileUpdatespecialtiesInput | string[]
    available_time_slots?: clinician_profileUpdateavailable_time_slotsInput | Date[] | string[]
    location?: StringFieldUpdateOperationsInput | string
    languages?: clinician_profileUpdatelanguagesInput | string[]
    preferred_modality?: clinician_profileUpdatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clinician_profileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: clinician_profileUpdatespecialtiesInput | string[]
    available_time_slots?: clinician_profileUpdateavailable_time_slotsInput | Date[] | string[]
    location?: StringFieldUpdateOperationsInput | string
    languages?: clinician_profileUpdatelanguagesInput | string[]
    preferred_modality?: clinician_profileUpdatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type EnumPatientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusFilter<$PrismaModel> | $Enums.PatientStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Enummodality_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.modality_type | Enummodality_typeFieldRefInput<$PrismaModel>
    in?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummodality_typeFilter<$PrismaModel> | $Enums.modality_type
  }

  export type DateTimeNullableListFilter<$PrismaModel = never> = {
    equals?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    has?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    hasEvery?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    hasSome?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type Clinician_profileNullableScalarRelationFilter = {
    is?: clinician_profileWhereInput | null
    isNot?: clinician_profileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type client_profileCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    dob?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gender_identity?: SortOrder
    pronouns?: SortOrder
    emergency_name?: SortOrder
    emergency_phone?: SortOrder
    reason_for_care?: SortOrder
    presenting_issues?: SortOrder
    treatment_goals?: SortOrder
    goal_areas?: SortOrder
    communication_level?: SortOrder
    social_interaction_level?: SortOrder
    sensory_level?: SortOrder
    location?: SortOrder
    telehealth_link?: SortOrder
    preferred_language?: SortOrder
    therapist_gender_pref?: SortOrder
    preferred_modality?: SortOrder
    available_time_slots?: SortOrder
    availability_blocks?: SortOrder
    insurance_provider?: SortOrder
    insurance_plan?: SortOrder
    insurance_id?: SortOrder
    clinician_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    clinician_id?: SortOrder
  }

  export type client_profileAvgOrderByAggregateInput = {
    communication_level?: SortOrder
    social_interaction_level?: SortOrder
    sensory_level?: SortOrder
  }

  export type client_profileMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    dob?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gender_identity?: SortOrder
    pronouns?: SortOrder
    emergency_name?: SortOrder
    emergency_phone?: SortOrder
    reason_for_care?: SortOrder
    treatment_goals?: SortOrder
    communication_level?: SortOrder
    social_interaction_level?: SortOrder
    sensory_level?: SortOrder
    location?: SortOrder
    telehealth_link?: SortOrder
    preferred_language?: SortOrder
    therapist_gender_pref?: SortOrder
    preferred_modality?: SortOrder
    insurance_provider?: SortOrder
    insurance_plan?: SortOrder
    insurance_id?: SortOrder
    clinician_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    clinician_id?: SortOrder
  }

  export type client_profileMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    dob?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gender_identity?: SortOrder
    pronouns?: SortOrder
    emergency_name?: SortOrder
    emergency_phone?: SortOrder
    reason_for_care?: SortOrder
    treatment_goals?: SortOrder
    communication_level?: SortOrder
    social_interaction_level?: SortOrder
    sensory_level?: SortOrder
    location?: SortOrder
    telehealth_link?: SortOrder
    preferred_language?: SortOrder
    therapist_gender_pref?: SortOrder
    preferred_modality?: SortOrder
    insurance_provider?: SortOrder
    insurance_plan?: SortOrder
    insurance_id?: SortOrder
    clinician_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    clinician_id?: SortOrder
  }

  export type client_profileSumOrderByAggregateInput = {
    communication_level?: SortOrder
    social_interaction_level?: SortOrder
    sensory_level?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumPatientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusWithAggregatesFilter<$PrismaModel> | $Enums.PatientStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPatientStatusFilter<$PrismaModel>
    _max?: NestedEnumPatientStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Enummodality_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.modality_type | Enummodality_typeFieldRefInput<$PrismaModel>
    in?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummodality_typeWithAggregatesFilter<$PrismaModel> | $Enums.modality_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummodality_typeFilter<$PrismaModel>
    _max?: NestedEnummodality_typeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Enummodality_typeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel> | null
    has?: $Enums.modality_type | Enummodality_typeFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    hasSome?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type Client_profileListRelationFilter = {
    every?: client_profileWhereInput
    some?: client_profileWhereInput
    none?: client_profileWhereInput
  }

  export type client_profileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type clinician_profileCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrder
    specialties?: SortOrder
    available_time_slots?: SortOrder
    location?: SortOrder
    languages?: SortOrder
    preferred_modality?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type clinician_profileMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type clinician_profileMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type client_profileCreatepresenting_issuesInput = {
    set: string[]
  }

  export type client_profileCreategoal_areasInput = {
    set: string[]
  }

  export type client_profileCreateavailable_time_slotsInput = {
    set: Date[] | string[]
  }

  export type client_profileCreateavailability_blocksInput = {
    set: string[]
  }

  export type clinician_profileCreateNestedOneWithoutAssigned_clientsInput = {
    create?: XOR<clinician_profileCreateWithoutAssigned_clientsInput, clinician_profileUncheckedCreateWithoutAssigned_clientsInput>
    connectOrCreate?: clinician_profileCreateOrConnectWithoutAssigned_clientsInput
    connect?: clinician_profileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPatientStatusFieldUpdateOperationsInput = {
    set?: $Enums.PatientStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type client_profileUpdatepresenting_issuesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type client_profileUpdategoal_areasInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type Enummodality_typeFieldUpdateOperationsInput = {
    set?: $Enums.modality_type
  }

  export type client_profileUpdateavailable_time_slotsInput = {
    set?: Date[] | string[]
    push?: Date | string | Date[] | string[]
  }

  export type client_profileUpdateavailability_blocksInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type clinician_profileUpdateOneWithoutAssigned_clientsNestedInput = {
    create?: XOR<clinician_profileCreateWithoutAssigned_clientsInput, clinician_profileUncheckedCreateWithoutAssigned_clientsInput>
    connectOrCreate?: clinician_profileCreateOrConnectWithoutAssigned_clientsInput
    upsert?: clinician_profileUpsertWithoutAssigned_clientsInput
    disconnect?: clinician_profileWhereInput | boolean
    delete?: clinician_profileWhereInput | boolean
    connect?: clinician_profileWhereUniqueInput
    update?: XOR<XOR<clinician_profileUpdateToOneWithWhereWithoutAssigned_clientsInput, clinician_profileUpdateWithoutAssigned_clientsInput>, clinician_profileUncheckedUpdateWithoutAssigned_clientsInput>
  }

  export type clinician_profileCreatespecialtiesInput = {
    set: string[]
  }

  export type clinician_profileCreateavailable_time_slotsInput = {
    set: Date[] | string[]
  }

  export type clinician_profileCreatelanguagesInput = {
    set: string[]
  }

  export type clinician_profileCreatepreferred_modalityInput = {
    set: $Enums.modality_type[]
  }

  export type client_profileCreateNestedManyWithoutAssigned_clinicianInput = {
    create?: XOR<client_profileCreateWithoutAssigned_clinicianInput, client_profileUncheckedCreateWithoutAssigned_clinicianInput> | client_profileCreateWithoutAssigned_clinicianInput[] | client_profileUncheckedCreateWithoutAssigned_clinicianInput[]
    connectOrCreate?: client_profileCreateOrConnectWithoutAssigned_clinicianInput | client_profileCreateOrConnectWithoutAssigned_clinicianInput[]
    createMany?: client_profileCreateManyAssigned_clinicianInputEnvelope
    connect?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
  }

  export type client_profileUncheckedCreateNestedManyWithoutAssigned_clinicianInput = {
    create?: XOR<client_profileCreateWithoutAssigned_clinicianInput, client_profileUncheckedCreateWithoutAssigned_clinicianInput> | client_profileCreateWithoutAssigned_clinicianInput[] | client_profileUncheckedCreateWithoutAssigned_clinicianInput[]
    connectOrCreate?: client_profileCreateOrConnectWithoutAssigned_clinicianInput | client_profileCreateOrConnectWithoutAssigned_clinicianInput[]
    createMany?: client_profileCreateManyAssigned_clinicianInputEnvelope
    connect?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
  }

  export type clinician_profileUpdatespecialtiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type clinician_profileUpdateavailable_time_slotsInput = {
    set?: Date[] | string[]
    push?: Date | string | Date[] | string[]
  }

  export type clinician_profileUpdatelanguagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type clinician_profileUpdatepreferred_modalityInput = {
    set?: $Enums.modality_type[]
    push?: $Enums.modality_type | $Enums.modality_type[]
  }

  export type client_profileUpdateManyWithoutAssigned_clinicianNestedInput = {
    create?: XOR<client_profileCreateWithoutAssigned_clinicianInput, client_profileUncheckedCreateWithoutAssigned_clinicianInput> | client_profileCreateWithoutAssigned_clinicianInput[] | client_profileUncheckedCreateWithoutAssigned_clinicianInput[]
    connectOrCreate?: client_profileCreateOrConnectWithoutAssigned_clinicianInput | client_profileCreateOrConnectWithoutAssigned_clinicianInput[]
    upsert?: client_profileUpsertWithWhereUniqueWithoutAssigned_clinicianInput | client_profileUpsertWithWhereUniqueWithoutAssigned_clinicianInput[]
    createMany?: client_profileCreateManyAssigned_clinicianInputEnvelope
    set?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    disconnect?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    delete?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    connect?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    update?: client_profileUpdateWithWhereUniqueWithoutAssigned_clinicianInput | client_profileUpdateWithWhereUniqueWithoutAssigned_clinicianInput[]
    updateMany?: client_profileUpdateManyWithWhereWithoutAssigned_clinicianInput | client_profileUpdateManyWithWhereWithoutAssigned_clinicianInput[]
    deleteMany?: client_profileScalarWhereInput | client_profileScalarWhereInput[]
  }

  export type client_profileUncheckedUpdateManyWithoutAssigned_clinicianNestedInput = {
    create?: XOR<client_profileCreateWithoutAssigned_clinicianInput, client_profileUncheckedCreateWithoutAssigned_clinicianInput> | client_profileCreateWithoutAssigned_clinicianInput[] | client_profileUncheckedCreateWithoutAssigned_clinicianInput[]
    connectOrCreate?: client_profileCreateOrConnectWithoutAssigned_clinicianInput | client_profileCreateOrConnectWithoutAssigned_clinicianInput[]
    upsert?: client_profileUpsertWithWhereUniqueWithoutAssigned_clinicianInput | client_profileUpsertWithWhereUniqueWithoutAssigned_clinicianInput[]
    createMany?: client_profileCreateManyAssigned_clinicianInputEnvelope
    set?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    disconnect?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    delete?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    connect?: client_profileWhereUniqueInput | client_profileWhereUniqueInput[]
    update?: client_profileUpdateWithWhereUniqueWithoutAssigned_clinicianInput | client_profileUpdateWithWhereUniqueWithoutAssigned_clinicianInput[]
    updateMany?: client_profileUpdateManyWithWhereWithoutAssigned_clinicianInput | client_profileUpdateManyWithWhereWithoutAssigned_clinicianInput[]
    deleteMany?: client_profileScalarWhereInput | client_profileScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedEnumPatientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusFilter<$PrismaModel> | $Enums.PatientStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnummodality_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.modality_type | Enummodality_typeFieldRefInput<$PrismaModel>
    in?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummodality_typeFilter<$PrismaModel> | $Enums.modality_type
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumPatientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusWithAggregatesFilter<$PrismaModel> | $Enums.PatientStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPatientStatusFilter<$PrismaModel>
    _max?: NestedEnumPatientStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnummodality_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.modality_type | Enummodality_typeFieldRefInput<$PrismaModel>
    in?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.modality_type[] | ListEnummodality_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummodality_typeWithAggregatesFilter<$PrismaModel> | $Enums.modality_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummodality_typeFilter<$PrismaModel>
    _max?: NestedEnummodality_typeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type clinician_profileCreateWithoutAssigned_clientsInput = {
    id?: string
    first_name: string
    last_name: string
    bio?: string | null
    specialties?: clinician_profileCreatespecialtiesInput | string[]
    available_time_slots?: clinician_profileCreateavailable_time_slotsInput | Date[] | string[]
    location?: string
    languages?: clinician_profileCreatelanguagesInput | string[]
    preferred_modality?: clinician_profileCreatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type clinician_profileUncheckedCreateWithoutAssigned_clientsInput = {
    id?: string
    first_name: string
    last_name: string
    bio?: string | null
    specialties?: clinician_profileCreatespecialtiesInput | string[]
    available_time_slots?: clinician_profileCreateavailable_time_slotsInput | Date[] | string[]
    location?: string
    languages?: clinician_profileCreatelanguagesInput | string[]
    preferred_modality?: clinician_profileCreatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type clinician_profileCreateOrConnectWithoutAssigned_clientsInput = {
    where: clinician_profileWhereUniqueInput
    create: XOR<clinician_profileCreateWithoutAssigned_clientsInput, clinician_profileUncheckedCreateWithoutAssigned_clientsInput>
  }

  export type clinician_profileUpsertWithoutAssigned_clientsInput = {
    update: XOR<clinician_profileUpdateWithoutAssigned_clientsInput, clinician_profileUncheckedUpdateWithoutAssigned_clientsInput>
    create: XOR<clinician_profileCreateWithoutAssigned_clientsInput, clinician_profileUncheckedCreateWithoutAssigned_clientsInput>
    where?: clinician_profileWhereInput
  }

  export type clinician_profileUpdateToOneWithWhereWithoutAssigned_clientsInput = {
    where?: clinician_profileWhereInput
    data: XOR<clinician_profileUpdateWithoutAssigned_clientsInput, clinician_profileUncheckedUpdateWithoutAssigned_clientsInput>
  }

  export type clinician_profileUpdateWithoutAssigned_clientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: clinician_profileUpdatespecialtiesInput | string[]
    available_time_slots?: clinician_profileUpdateavailable_time_slotsInput | Date[] | string[]
    location?: StringFieldUpdateOperationsInput | string
    languages?: clinician_profileUpdatelanguagesInput | string[]
    preferred_modality?: clinician_profileUpdatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clinician_profileUncheckedUpdateWithoutAssigned_clientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: clinician_profileUpdatespecialtiesInput | string[]
    available_time_slots?: clinician_profileUpdateavailable_time_slotsInput | Date[] | string[]
    location?: StringFieldUpdateOperationsInput | string
    languages?: clinician_profileUpdatelanguagesInput | string[]
    preferred_modality?: clinician_profileUpdatepreferred_modalityInput | $Enums.modality_type[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type client_profileCreateWithoutAssigned_clinicianInput = {
    id?: string
    status?: $Enums.PatientStatus
    first_name?: string | null
    last_name?: string | null
    dob?: Date | string | null
    phone?: string | null
    email?: string | null
    gender_identity?: string | null
    pronouns?: string | null
    emergency_name?: string | null
    emergency_phone?: string | null
    reason_for_care?: string | null
    presenting_issues?: client_profileCreatepresenting_issuesInput | string[]
    treatment_goals?: string | null
    goal_areas?: client_profileCreategoal_areasInput | string[]
    communication_level?: number | null
    social_interaction_level?: number | null
    sensory_level?: number | null
    location?: string | null
    telehealth_link?: string | null
    preferred_language?: string | null
    therapist_gender_pref?: string | null
    preferred_modality?: $Enums.modality_type
    available_time_slots?: client_profileCreateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileCreateavailability_blocksInput | string[]
    insurance_provider?: string | null
    insurance_plan?: string | null
    insurance_id?: string | null
    clinician_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type client_profileUncheckedCreateWithoutAssigned_clinicianInput = {
    id?: string
    status?: $Enums.PatientStatus
    first_name?: string | null
    last_name?: string | null
    dob?: Date | string | null
    phone?: string | null
    email?: string | null
    gender_identity?: string | null
    pronouns?: string | null
    emergency_name?: string | null
    emergency_phone?: string | null
    reason_for_care?: string | null
    presenting_issues?: client_profileCreatepresenting_issuesInput | string[]
    treatment_goals?: string | null
    goal_areas?: client_profileCreategoal_areasInput | string[]
    communication_level?: number | null
    social_interaction_level?: number | null
    sensory_level?: number | null
    location?: string | null
    telehealth_link?: string | null
    preferred_language?: string | null
    therapist_gender_pref?: string | null
    preferred_modality?: $Enums.modality_type
    available_time_slots?: client_profileCreateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileCreateavailability_blocksInput | string[]
    insurance_provider?: string | null
    insurance_plan?: string | null
    insurance_id?: string | null
    clinician_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type client_profileCreateOrConnectWithoutAssigned_clinicianInput = {
    where: client_profileWhereUniqueInput
    create: XOR<client_profileCreateWithoutAssigned_clinicianInput, client_profileUncheckedCreateWithoutAssigned_clinicianInput>
  }

  export type client_profileCreateManyAssigned_clinicianInputEnvelope = {
    data: client_profileCreateManyAssigned_clinicianInput | client_profileCreateManyAssigned_clinicianInput[]
    skipDuplicates?: boolean
  }

  export type client_profileUpsertWithWhereUniqueWithoutAssigned_clinicianInput = {
    where: client_profileWhereUniqueInput
    update: XOR<client_profileUpdateWithoutAssigned_clinicianInput, client_profileUncheckedUpdateWithoutAssigned_clinicianInput>
    create: XOR<client_profileCreateWithoutAssigned_clinicianInput, client_profileUncheckedCreateWithoutAssigned_clinicianInput>
  }

  export type client_profileUpdateWithWhereUniqueWithoutAssigned_clinicianInput = {
    where: client_profileWhereUniqueInput
    data: XOR<client_profileUpdateWithoutAssigned_clinicianInput, client_profileUncheckedUpdateWithoutAssigned_clinicianInput>
  }

  export type client_profileUpdateManyWithWhereWithoutAssigned_clinicianInput = {
    where: client_profileScalarWhereInput
    data: XOR<client_profileUpdateManyMutationInput, client_profileUncheckedUpdateManyWithoutAssigned_clinicianInput>
  }

  export type client_profileScalarWhereInput = {
    AND?: client_profileScalarWhereInput | client_profileScalarWhereInput[]
    OR?: client_profileScalarWhereInput[]
    NOT?: client_profileScalarWhereInput | client_profileScalarWhereInput[]
    id?: UuidFilter<"client_profile"> | string
    status?: EnumPatientStatusFilter<"client_profile"> | $Enums.PatientStatus
    first_name?: StringNullableFilter<"client_profile"> | string | null
    last_name?: StringNullableFilter<"client_profile"> | string | null
    dob?: DateTimeNullableFilter<"client_profile"> | Date | string | null
    phone?: StringNullableFilter<"client_profile"> | string | null
    email?: StringNullableFilter<"client_profile"> | string | null
    gender_identity?: StringNullableFilter<"client_profile"> | string | null
    pronouns?: StringNullableFilter<"client_profile"> | string | null
    emergency_name?: StringNullableFilter<"client_profile"> | string | null
    emergency_phone?: StringNullableFilter<"client_profile"> | string | null
    reason_for_care?: StringNullableFilter<"client_profile"> | string | null
    presenting_issues?: StringNullableListFilter<"client_profile">
    treatment_goals?: StringNullableFilter<"client_profile"> | string | null
    goal_areas?: StringNullableListFilter<"client_profile">
    communication_level?: IntNullableFilter<"client_profile"> | number | null
    social_interaction_level?: IntNullableFilter<"client_profile"> | number | null
    sensory_level?: IntNullableFilter<"client_profile"> | number | null
    location?: StringNullableFilter<"client_profile"> | string | null
    telehealth_link?: StringNullableFilter<"client_profile"> | string | null
    preferred_language?: StringNullableFilter<"client_profile"> | string | null
    therapist_gender_pref?: StringNullableFilter<"client_profile"> | string | null
    preferred_modality?: Enummodality_typeFilter<"client_profile"> | $Enums.modality_type
    available_time_slots?: DateTimeNullableListFilter<"client_profile">
    availability_blocks?: StringNullableListFilter<"client_profile">
    insurance_provider?: StringNullableFilter<"client_profile"> | string | null
    insurance_plan?: StringNullableFilter<"client_profile"> | string | null
    insurance_id?: StringNullableFilter<"client_profile"> | string | null
    clinician_name?: StringNullableFilter<"client_profile"> | string | null
    created_at?: DateTimeFilter<"client_profile"> | Date | string
    updated_at?: DateTimeFilter<"client_profile"> | Date | string
    clinician_id?: UuidNullableFilter<"client_profile"> | string | null
  }

  export type client_profileCreateManyAssigned_clinicianInput = {
    id?: string
    status?: $Enums.PatientStatus
    first_name?: string | null
    last_name?: string | null
    dob?: Date | string | null
    phone?: string | null
    email?: string | null
    gender_identity?: string | null
    pronouns?: string | null
    emergency_name?: string | null
    emergency_phone?: string | null
    reason_for_care?: string | null
    presenting_issues?: client_profileCreatepresenting_issuesInput | string[]
    treatment_goals?: string | null
    goal_areas?: client_profileCreategoal_areasInput | string[]
    communication_level?: number | null
    social_interaction_level?: number | null
    sensory_level?: number | null
    location?: string | null
    telehealth_link?: string | null
    preferred_language?: string | null
    therapist_gender_pref?: string | null
    preferred_modality?: $Enums.modality_type
    available_time_slots?: client_profileCreateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileCreateavailability_blocksInput | string[]
    insurance_provider?: string | null
    insurance_plan?: string | null
    insurance_id?: string | null
    clinician_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type client_profileUpdateWithoutAssigned_clinicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type client_profileUncheckedUpdateWithoutAssigned_clinicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type client_profileUncheckedUpdateManyWithoutAssigned_clinicianInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender_identity?: NullableStringFieldUpdateOperationsInput | string | null
    pronouns?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_phone?: NullableStringFieldUpdateOperationsInput | string | null
    reason_for_care?: NullableStringFieldUpdateOperationsInput | string | null
    presenting_issues?: client_profileUpdatepresenting_issuesInput | string[]
    treatment_goals?: NullableStringFieldUpdateOperationsInput | string | null
    goal_areas?: client_profileUpdategoal_areasInput | string[]
    communication_level?: NullableIntFieldUpdateOperationsInput | number | null
    social_interaction_level?: NullableIntFieldUpdateOperationsInput | number | null
    sensory_level?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    telehealth_link?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_language?: NullableStringFieldUpdateOperationsInput | string | null
    therapist_gender_pref?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_modality?: Enummodality_typeFieldUpdateOperationsInput | $Enums.modality_type
    available_time_slots?: client_profileUpdateavailable_time_slotsInput | Date[] | string[]
    availability_blocks?: client_profileUpdateavailability_blocksInput | string[]
    insurance_provider?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_plan?: NullableStringFieldUpdateOperationsInput | string | null
    insurance_id?: NullableStringFieldUpdateOperationsInput | string | null
    clinician_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}