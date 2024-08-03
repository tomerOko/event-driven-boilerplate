import { createAsyncLocalStorage, setTransactionId } from './asyncStorage';
import { ProcessErrorHandling } from './errors';
import { initializeLoggers } from './logging';

export * from './asyncStorage';
export * from './errors';
export * from './jwt';
export * from './logging';
export * from './mongo';
export * from './rabbit';
export * from './typesAndConsts';
export * from './utils';
export * from './validations';

export const initializeCommonUtils = (isProd: boolean, serviceName: string) => {
  initializeLoggers(isProd);
  createAsyncLocalStorage();
  const serviceInitializationTime = new Date().toLocaleString('he-IL');
  setTransactionId(`${serviceName}_INITIALIZATION_${serviceInitializationTime}`);
  ProcessErrorHandling.setEventListeners();
};
