import winston, { format } from 'winston';
import { consoleFormat } from 'winston-console-format';

import { UtilsState } from '../shared/utilsState';

import { LogParams, formatLog } from './formatLog';

/* mostly visual configurations for the console output - set color, line breaks, indentation, time stamp, etc.*/

//TODO: check if 'levels: winston.config.npm.levels' is needed in the native logger props
//TODO: what is the difference between 'format.timestamp' and 'metaStrip: ['timestamp']'?
//TODO: can we only specify formats in the 'format' array and not in the 'transports' array?

const formats = {
  dev: [
    format.colorize({ all: false }),
    format.padLevels(),
    consoleFormat({
      showMeta: true,
      metaStrip: ['timestamp', 'service'],
      inspectOptions: {
        depth: Infinity,
        colors: true,
        breakLength: 100,
        maxArrayLength: Infinity,
        compact: Infinity,
      },
    }),
  ],
  prod: [format.errors({ stack: true }), format.timestamp(), format.json()],
  common: [format.ms(), format.splat()],
};

const logLevels = ['error', 'warn', 'help', 'data', 'info', 'debug', 'prompt', 'verbose', 'input', 'silly', 'http'] as const;

type LogLevel = (typeof logLevels)[number];

interface CustomLeveledLogMethod {
  (props: LogParams): void;
}

const logLevelFactory = (logger: winston.Logger, level: LogLevel) => {
  const leveledLogMethod: CustomLeveledLogMethod = (params: LogParams) => {
    const log = formatLog(params);
    logger[level](log);
  };
  return leveledLogMethod;
};

export let nativeLogger: winston.Logger;
export let logger: Record<LogLevel, CustomLeveledLogMethod>;

export const initializeLoggers = () => {
  const isProd = UtilsState.getIsProd();
  const chosenFormat = isProd ? formats.prod : formats.dev;
  const consoleTransportOptions = { format: format.combine(...chosenFormat) };
  const transports = [new winston.transports.Console(consoleTransportOptions)];

  /**
   * only used in special cases where the 'logger' might be problematic
   * due to early stages of initialization or efficiency issues
   */
  nativeLogger = winston.createLogger({
    level: isProd ? 'info' : 'debug',
    format: format.combine(...formats.common),
    transports,
  });

  /**
   * this logger have additional formatting and properties.
   * transactionId
   * logging location (function name and path)
   * error formatting (if error provided)
   * request sender details
   */
  logger = {} as Record<LogLevel, CustomLeveledLogMethod>;
  logLevels.forEach((level) => {
    logger[level] = logLevelFactory(nativeLogger, level);
  });
  return { logger, nativeLogger };
};
