/**
 * extracts a value from a nested object or array using a path (as string)
 * @param obj the object to get the value from
 * @param path the path to the value, including keys and indexes separated by dots
 * @returns whatever value is at the end of the path
 */
export const getNestedValue = (obj: Array<any> | Record<string, any>, path: string): any => {
  const keys = path.split('.');
  let value = obj;

  for (const key of keys) {
    if (Array.isArray(value)) {
      value = value[parseInt(key)];
    } else {
      value = value[key];
    }
  }
  return value;
};
