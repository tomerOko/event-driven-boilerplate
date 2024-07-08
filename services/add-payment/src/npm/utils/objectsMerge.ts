export const objectMerge = (firstPriority: Record<string, any>, secondPriority: Record<string, any>) => {
  const firstPriorityClean = removeEmptyFields(firstPriority);
  const secondPriorityClean = removeEmptyFields(secondPriority);
  const result = { ...secondPriorityClean, ...firstPriorityClean };
  return result;
};

const removeEmptyFields = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null) {
      delete obj[key];
    }
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};
