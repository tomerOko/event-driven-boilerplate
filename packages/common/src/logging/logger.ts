import winston, { format } from 'winston';
import { consoleFormat } from 'winston-console-format';

import { LogParams, formatLog } from './formatLog';

/* BUILD NATIVE WINSTON LOGGER */
/**
 * mostly visual configurations for the console output - set color, line breaks, indentation, time stamp, etc.
 */

// Formatter for console output
const localFormat = winston.format.combine(
  format.colorize({ all: ENVs.log.chillColoring ? false : true }),
  format.padLevels(),
  consoleFormat({
    showMeta: true,
    metaStrip: ['timestamp', 'service'],
    inspectOptions: {
      depth: Infinity,
      colors: true,
      breakLength: ENVs.log.breakLength,
      maxArrayLength: Infinity,
      compact: Infinity,
    },
  }),
);

// JSON Formatter for production
const jsonFormat = format.combine(format.errors({ stack: true }), format.timestamp(), format.json());

// Setting up transports
const consoleTransportProps = { format: isDevelopment ? localFormat : jsonFormat };
const transports = [new winston.transports.Console(consoleTransportProps)];

/**
 * a Winston.js logger with our specific settings
 * only used in special cases where the 'logger' might be problematic
 * due to early stages of initialization or efficiency issues
 */
const nativeLogger = winston.createLogger({
  level: ENVs.log.level || (isDevelopment ? 'debug' : 'info'),
  levels: winston.config.npm.levels,
  format: format.combine(format.timestamp(), format.ms(), format.errors({ stack: true }), format.splat(), format.json()),
  transports,
});

/* CUSTOMIZE THE LOGGER */
/**
 * more content oriented configurations for the console output - add transactionId, function name, path, user details, etc.
 * generally, in order to keep our logs understandable and traceable, each location in the
 * code that logs anything should send 'LogParams' to the logger, then the logger
 * build full 'LogProps' object and logs it (see the 'formatLog' function below).
 * of course, there are some exceptions, so the 'native' logger functions are still available
 * by sending the logger any other type of arguments (see the 'logLevelFactory' function below)
 */
const logLevels = ['error', 'warn', 'help', 'data', 'info', 'debug', 'prompt', 'verbose', 'input', 'silly', 'http'] as const;

type LogLevel = (typeof logLevels)[number];

interface CustomLeveledLogMethod {
  (props: LogParams): void;
}

const logLevelFactory = (level: LogLevel) => {
  const leveledLogMethod: CustomLeveledLogMethod = (params) => {
    const log = formatLog(params, 5);
    nativeLogger[level](log);
  };
  return leveledLogMethod;
};

/**
 * this logger is equal to our 'nativeLogger' (see jsDoc) but with specific additional formatting and properties.
 *
 * transactionId, function name and path, error formatting (if error provided), and user details - are all added.
 */
const logger = {} as Record<LogLevel, CustomLeveledLogMethod>;
logLevels.forEach((level) => {
  logger[level] = logLevelFactory(level);
});

export { logger, nativeLogger };
