import { LogProps, addErrorToProps, formatLog, formatMessage } from './formatLog';
import { nativeLogger } from './logger';

/**
 * the functionWrapper / functionWrapperNoSync wrap most of the functions in the project.
 * because of that we must keep them as efficient as possible.
 * the rebuildLogEfficiently function is used to build the log object once and then change only the relevant fields.
 */
const rebuildLogEfficiently = (props: LogProps, stage: string, error?: any): LogProps => {
  const formattedMessage = formatMessage(props.functionName, stage);
  props.message = formattedMessage;
  addErrorToProps(props, error);
  return props;
};

export const functionWrapper = <Z extends (...args: any[]) => any, X = ReturnType<Z>>(fn: () => X): X => {
  const log = formatLog({ stage: 'start' });
  nativeLogger.verbose(log);
  try {
    const result = fn();
    if (result instanceof Promise) {
      return handleAsync(result, log) as X;
    } else {
      nativeLogger.verbose(rebuildLogEfficiently(log, 'finish'));
      return result;
    }
  } catch (error) {
    /** only catches sync errors */
    nativeLogger.error(rebuildLogEfficiently(log, 'error', error));
    throw error;
  }
};

const handleAsync = (promise: Promise<any>, log: LogProps) => {
  return new Promise((resolve, reject) => {
    promise
      .then((result) => {
        nativeLogger.verbose(rebuildLogEfficiently(log, 'finish'));
        resolve(result);
      })
      .catch((error) => {
        nativeLogger.error(rebuildLogEfficiently(log, 'error', error));
        reject(error);
      });
  });
};
