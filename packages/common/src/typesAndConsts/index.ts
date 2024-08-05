export type IdentificationHeaders = {
  ip: string;
  userAgent: string;
};

export type RequiredPick<type, fields extends keyof type> = Required<Pick<type, fields>> & type;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type KeysAndNestedKeysOf<T extends object> = {
  [Key in keyof T & (string | number)]: T[Key] extends Array<any> // if the current key is an array
    ? `${Key}.length` | `${Key}` // add the array and the length of the array to the keys
    : `${Key}` extends '_id' // if the current key is _id
    ? `${Key}` //only add the key (this is to avoid adding the object _id that have a nested reference to itself)
    : Required<T>[Key] extends object // if the current key is an object
    ? `${Key}` | `${Key}.${KeysAndNestedKeysOf<Required<T>[Key]>}` // add the object and the nested keys of the object to the keys
    : `${Key}`; // else simply add the key
}[keyof T & (string | number)];

export type NestedKeysOfObject<T extends object> = Exclude<KeysAndNestedKeysOf<T>, null | '_id'> | 'createdAt' | 'updatedAt';

export const headerNames = {
  accessToken: 'authorization',
  secretKey: 'authorization-secret-key',
  transactionId: 'x-transaction-id',
} as const;

/**
 * @example const obj = {a: 1, b: 'some'} as const;
 * type ObjValues = ObjectValues<typeof obj>;// type ObjValues = 1 | 'some'
 * @warning if the object is not 'as const' then the type will except anything
 */
export type ValuesOf<T> = T extends { [key: string]: infer V } ? V : never;

/**
 * @example const arr = [1, 'some'] as const;
 * type ArrValues = ArrayElements<typeof arr>;// type ArrValues = 1 | 'some'
 * @warning if the array is not 'as const' then the type will except anything
 */
export type ArrayElements<T> = T extends readonly (infer U)[] ? U : never;

export type HeaderName = ValuesOf<typeof headerNames>;

export const nodeEnvironments = {
  PROD: 'PROD',
  STAGING: 'STAGING',
  DEV: 'DEV',
  /** external development environment describes the scenario where the developer is running the container outside of the cluster and connected to the rest of the application through kubectl prot-farword */
  EXTERANL_DEV: 'EXTERANL_DEV',
  TEST: 'TEST',
  EXTERNAL_TEST: 'EXTERNAL_TEST',
} as const;

export type NodeEnvironment = keyof typeof nodeEnvironments;

export const logStages = {
  start: 'start',
  finish: 'finish',
  error: 'error',
} as const;

export type LogStage = keyof typeof logStages;
