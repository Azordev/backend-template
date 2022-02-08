import { existsSync, mkdirSync } from 'fs'
import { loggers as addCategory, format, transports, Logger } from 'winston'

const logDir = 'logs'
const level = 'debug'

if (!existsSync(logDir)) {
  mkdirSync(logDir)
}

const logger: Logger = addCategory.add('default', {
  level: level,
  format: format.combine(
    format((info) => {
      info.level = info.level.toUpperCase()
      return info
    })(),
    format.colorize({ all: true }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm',
    }),
    format.align(),
    format.splat(),
    format.printf((info) => {
      const { timestamp, label, level, group, message, ...args } = info

      return `${timestamp}${label ? ` [${label}] ` : ' '}[${level}]:${
        group ? ` [${group}] ` : ' '
      }${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
      }`
    }),
  ),
  transports: [new transports.Console()],
  exitOnError: false,
})

export const debug = addCategory.add('error', {
  format: format.combine(format.simple(), format.colorize({ all: false })),
  transports: [
    new transports.File({
      filename: `${logDir}/server.log`,
      maxsize: 1024000, // 1MB
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${logDir}/exceptions.log`,
      maxsize: 5242880, // 1MB
      maxFiles: 5,
    }),
  ],
})

export const stream = {
  write: (message) => {
    logger.info(message)
  },
}

export default logger
