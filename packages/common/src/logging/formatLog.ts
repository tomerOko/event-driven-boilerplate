import { getAuthenticatedID, getTransactionId } from '../asyncStorage/utils';
import { AppError } from '../errors/appError';
import { isAppError } from '../errors/utils';
import { isObject } from '../utils/typeCheckers';

//TODO: clean this code?
/* needed data to build a log */
export type LogParams = {
  /**
   * optional. will be added to the default log message as a suffix.
   */
  messageSuffix?: string;
  /**
   * will be added to the log header. default is 'customLog'.
   */
  stage?: string;
  /**
   * will be added to the log as 'error' key (only if it is an object or a string, other types will be ignored)
   */
  error?: any;
  /**
   * will be added to the log as 'additionalData' key.
   */
  additionalData?: Record<string, any>;
  /**
   * custom messages replacing the default message and avoiding the addition of function name, stage, path and massage suffix in the log
   */
  customMessage?: string;
};

/**
 * [LogParams] type means array with one item inside. and the type of that item LogParams.
 */
export const isLogParams = (params: any): params is [LogParams] => {
  const item = params[0];
  return (
    params?.length === 1 &&
    item &&
    isObject(item) &&
    !item.transaction_id &&
    (item.message || item.stage || item.error || item.additionalData)
  );
};

/* log data that will actually will be printed (the logger stringify it by default)*/
export type LogProps = {
  transaction_id: string | null;
  functionName: string;
  path: string;
  message: string;
  userID?: string;
  error?: any;
  additionalData?: Record<string, any>;
};

export const formatLog = (params: LogParams): LogProps => {
  const { customMessage, messageSuffix, stage, error, additionalData } = params;

  const result: Partial<LogProps> = {};
  result.transaction_id = getTransactionId();
  result.additionalData = additionalData;
  result.error = addErrorToProps(error);
  result.userID = getAuthenticatedID() || undefined;

  if (customMessage) {
    result.message = customMessage;
  } else {
    const currentStack = new Error().stack as string;
    const { functionName, path } = getFunctionNameAndPath(currentStack);
    result.functionName = functionName;
    result.path = path;
    const formattedMessage = `Function: ${functionName} | Stage: ${stage} ${messageSuffix ? `| ${messageSuffix}` : ''}`;
    result.message = formattedMessage;
  }

  clearUndefinedValues(result);
  return result as LogProps;
};

const clearUndefinedValues = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
};

export const getFunctionNameAndPath = (stack: string) => {
  try {
    const stackArray = stack?.split('\n') as string[];
    let stackRecord = stackArray[3].trim().split(' ');
    if (!stackRecord[2]) {
      stackRecord = stackArray[8].trim().split(' ');
    }
    const functionName = stackRecord[1].replace('Object.', '');
    const path = stackRecord[2];
    return { functionName, path };
  } catch (error) {
    return { functionName: 'not found', path: 'not found' };
  }
};

export const addErrorToProps = (error?: any): any => {
  if (isAppError(error)) {
    return handleAppError(error);
  } else {
    return error;
  }
};

const handleAppError = (error: AppError) => {
  const { errorCode, errorData, isOperational } = error;
  /**
   * delete native error from the structured AppError to avoid printing the hole stack to the console on every function in the error bubbling.
   * additionally, the stack will be presented in the logs anyway (every function in the stack is wrapped by the function wrapper..)
   */
  if (errorData?.error) {
    delete errorData.error;
  }
  const onlyRelevantPropertiesToLog = {
    errorCode,
    errorData,
    isOperational,
  };
  return onlyRelevantPropertiesToLog;
};
