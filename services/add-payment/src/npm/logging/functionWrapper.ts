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

export const functionWrapper = async <Z extends (...args: any[]) => Promise<any>, X = ReturnType<Z>>(fn: () => X): Promise<X> => {
  const log = formatLog({ stage: 'start' });
  try {
    nativeLogger.verbose(log);
    const result = await fn();
    nativeLogger.verbose(rebuildLogEfficiently(log, 'finish'));
    return result;
  } catch (error: any) {
    nativeLogger.error(rebuildLogEfficiently(log, 'error', error));
    throw error;
  }
};

export const functionWrapperNoSync = <Z extends (...args: any[]) => any, X = ReturnType<Z>>(fn: () => X): X => {
  const log = formatLog({ stage: 'start' });
  try {
    nativeLogger.verbose(log);
    const result = fn();
    nativeLogger.verbose(rebuildLogEfficiently(log, 'finish'));
    return result;
  } catch (error) {
    nativeLogger.error(rebuildLogEfficiently(log, 'error', error));
    throw error;
  }
};
