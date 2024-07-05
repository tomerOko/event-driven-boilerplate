export const isObject = (value: any): value is Record<string, any> => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};

export const isString = (value: any): value is string => typeof value === 'string';

export const isNumber = (value: any): value is number => typeof value === 'number';

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isDate = (value: any): value is Date => value instanceof Date;

export const isEmpty = (value: any): value is undefined => !value && value !== 0 && value !== false;
