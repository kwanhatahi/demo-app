import * as winston from 'winston';

const config = {
  levels: {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
  },
  colors: {
      fatal: 'red',
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue',
      ging: 'red'
  },
};
winston.addColors(config.colors);
export const logger: any = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.splat(),
    winston.format.printf(
      info => `${info.level} ${info.timestamp} ${info.message}`,
    )
  ),
  transports: [new winston.transports.Console()],
  level: 'debug'
});
