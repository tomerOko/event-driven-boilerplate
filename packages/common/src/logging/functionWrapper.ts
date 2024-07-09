import { LogStage, logStages } from '../typesAndConsts';

import { LogProps, addErrorToProps, formatLog, nativeLogger } from '.';

/**
 * very efficient function that wraps a function and logs the start, finish and error of the function.
 * automatically handles sync and async functions.
 * adds the function name, path, stage, error, userEmail (if signed) and additional data to the log.
 */
export const functionWrapper = <Z extends (...args: any[]) => any, X = ReturnType<Z>>(fn: () => X): X => {
  const log = formatLog({ stage: logStages.start });
  nativeLogger.verbose(log); //use native logger for efficiency
  try {
    const result = fn();
    if (result instanceof Promise) {
      return handleAsync(result, log) as X;
    } else {
      logFinish(log);
      return result;
    }
  } catch (error) {
    /** only catches sync errors */
    logError(log, error);
    throw error;
  }
};

const handleAsync = (promise: Promise<any>, log: LogProps) => {
  return new Promise((resolve, reject) => {
    promise
      .then((result) => {
        logFinish(log);
        resolve(result);
      })
      .catch((error) => {
        logError(log, error);
        reject(error);
      });
  });
};

const logFinish = (log: LogProps) => {
  nativeLogger.verbose(rebuildLogEfficiently(log, logStages.finish));
};

const logError = (log: LogProps, error: any) => {
  nativeLogger.error(rebuildLogEfficiently(log, logStages.error, error));
};

/**
 * the functionWrapper / functionWrapperNoSync wrap most of the functions in the project.
 * because of that we must keep them as efficient as possible.
 * the rebuildLogEfficiently function is used to build the log object once and then change only the relevant fields.
 */
const rebuildLogEfficiently = (props: LogProps, stage: LogStage, error?: any): LogProps => {
  props.message = props.message.replace(logStages.start, stage);
  if (error) {
    props.error = addErrorToProps(error);
  }
  return props;
};
