import moment from 'moment';
import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

const logroot = process.env.LOG_ROOT || 'log/';
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const level = process.env.LOG_LEVEL || (isDevelopmentEnv ? 'debug' : 'info');

function getLabel(callingModule: { filename: string; }) {
  if (typeof callingModule === 'string') {
    return callingModule;
  }

  const parts = callingModule.filename.split(path.sep);
  return `${parts[parts.length - 2]}/${parts.pop()}`;
}

module.exports = function getLoggerForModule(callingModule: any) {
  const transports = [
    new winston.transports.Console(),
    new (winston.transports.DailyRotateFile)({
      level,
      filename: 'stonks_combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: logroot
    }),
    new (winston.transports.DailyRotateFile)({
      level: 'error',
      filename: 'stonks_error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: logroot
    })
  ];

  const logger = winston.createLogger({
    level,
    exitOnError: false,
    format: winston.format.combine(
      winston.format.label({ label: getLabel(callingModule), message: false }),
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.printf(info => `${moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')} ${info.level} [${info.label}]: ${info.message}`)
    ),
    transports
  });

  return logger;
};
