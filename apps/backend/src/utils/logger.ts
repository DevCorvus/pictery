import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
  level: 'debug',
  defaultMeta: {},
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});
