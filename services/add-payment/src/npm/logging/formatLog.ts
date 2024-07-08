import { getAuthDetails, getTransactionId } from '../asyncStorage/utils';
import { AppError } from '../errors/appError';
import { isAppError } from '../errors/utils';
import { isObject, isString } from '../utils/typeCheckers';

//TODO: clean this code?
/* needed data to build a log */
export type LogParams = {
  /**
   * we have a unified log formatting, the real 'message' is a string describing the function and the stage (see next prop) and presented as header in our log management tools.
   * the 'message' prop below, if provided, will be added as suffix.
   */
  message?: string;
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
   * dont print the function name and path in the log. default is false.
   */
  dontPrintFunctionName?: boolean;
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
  userEmail?: string;
  error?: any;
  additionalData?: Record<string, any>;
};

export const formatLog = (params: LogParams, stackDepth?: number): LogProps => {
  const currentStack = new Error().stack as string;
  const baseLogProps = getBaseLogProps(currentStack, stackDepth);

  const { message, stage, error, additionalData, dontPrintFunctionName } = params;

  const formattedMessage = formatMessage(baseLogProps.functionName, stage || 'custom', message);
  const props: LogProps = {
    message: dontPrintFunctionName && isString(message) ? formattedMessage : (message as string),
    ...baseLogProps,
  };
  addPropertiesAesthetically(props, error, additionalData);

  return props;
};

const getBaseLogProps = (stack: string, stackDepth?: number) => {
  const { functionName, path } = getFunctionName(stack, stackDepth);
  const result = {
    transaction_id: getTransactionId(),
    functionName,
    path,
  };
  return result;
};

export const getFunctionName = (stack: string, callerStackDepth = 3) => {
  try {
    const stackArray = stack?.split('\n') as string[];
    const stackRecord = stackArray[callerStackDepth].trim().split(' ');
    const functionName = stackRecord[1].replace('Object.', '');
    const path = stackRecord[2];
    return { functionName, path };
  } catch (error) {
    return { functionName: '', path: '' };
  }
};

export const formatMessage = (functionName: string, stage: string, message?: string): string => {
  const result = `Function: ${functionName} | Stage: ${stage} ${message ? '| ' + message : ''}`;
  return result;
};

const addPropertiesAesthetically = (props: LogProps, error: any, additionalData: Record<string, any> | undefined) => {
  /**
   * the next functions mainly check the values before adding a key value pair to the object
   * this way we avoid '... userData: undefined ...' in our logs.
   *  this this way the logs are more readable and esthetic.
   */
  addErrorToProps(props, error);
  addUserDetailsToProps(props);
  addAdditionalDataToProps(additionalData, props);
};

export const addErrorToProps = (log: LogProps, error?: any): void => {
  if (!error) return;
  const safeError = makeErrorSafe(error);
  if (isAppError(safeError)) {
    formatAppErrorAndAddToLog(error, log);
  } else {
    log.error = safeError;
  }
};

const makeErrorSafe = (error: any) => {
  if (isObject(error)) {
    return error;
  }
  if (typeof error === 'string') {
    return error;
  }
  return "error can't be logged because of it's format";
};

const formatAppErrorAndAddToLog = (error: AppError, log: LogProps) => {
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
  log.error = onlyRelevantPropertiesToLog;
};

const addUserDetailsToProps = (log: LogProps): void => {
  const authDetails = getAuthDetails();
  if (authDetails) {
    const { email } = authDetails;
    log.userEmail = email;
  }
};

const addAdditionalDataToProps = (additionalData: Record<string, any> | undefined, props: LogProps): void => {
  if (additionalData) {
    props.additionalData = additionalData;
  }
};
