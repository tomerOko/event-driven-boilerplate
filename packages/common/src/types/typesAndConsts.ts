export type TokenPayload = {
  lastTimeVerified: Date;
  email: string;
  mobile: string;
  firstName: string | undefined;
  lastName: string | undefined;

  //authorization properties
  signedCurrentAgreementVersion: boolean | undefined;

  //jwt properties automatically added on sign (will have value in payload that was parsed from token)
  iat: number;
  exp: number;
};

export type IdentificationHeaders = {
  ip: string;
  userAgent: string;
};

//CONSTS AND THEIR TYPES
export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
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
