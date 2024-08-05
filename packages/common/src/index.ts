import { UtilsState, UtilsStateParams } from './shared/utilsState';

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

export const initializeCommonUtils = (params: UtilsStateParams) => {
  UtilsState.setParams(params);
  initializeLoggers();
  createAsyncLocalStorage();
  const serviceInitializationTime = new Date().toLocaleString('he-IL');
  setTransactionId(`${params.SERVICE_NAME}_INITIALIZATION_${serviceInitializationTime}`);
  ProcessErrorHandling.setEventListeners();
};
