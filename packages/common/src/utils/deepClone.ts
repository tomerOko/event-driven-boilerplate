/**
 * keep the original object immutable (return copy not a pointer).
 * keep only primitive values or objects / array (including multiple level nesting)
 * containing primitive values.
 * removes all functions including prototype, maps, etc..
 * not using loadash for type safety
 */
export const deepClone = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result = JSON.parse(JSON.stringify(obj));
  return result;
};
