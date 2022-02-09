import { NextFunction, Request, Response } from 'express'
import { debug } from '../../lib/logger'
import { globalEnv } from '../app'

export const originUndefined = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { urlWhitelist } = globalEnv

  if (!req.headers.origin) {
    debug.error(
      'Hi, you are visiting the service locally? If this was a CORS the origin header should not be undefined',
    )
  }
  if (
    req.headers.host === 'localhost:8000' ||
    req.headers.host === 'localhost:443'
  ) {
    req.headers.origin = 'http://' + req.headers.host
  }
  if (urlWhitelist.includes(req.headers.host)) {
    req.headers.origin = 'https://' + req.headers.host
  }

  next()
}

export const corsOption = (
  allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:443',
  ],
) => {
  const { urlWhitelist, isTestEnvironment, isDevEnvironment } = globalEnv

  if (urlWhitelist) {
    for (const url of urlWhitelist) {
      allowedOrigins.push(url)
    }
  }

  return {
    origin: (origin: string, next: NextFunction) => {
      if (
        isTestEnvironment ||
        isDevEnvironment ||
        allowedOrigins.indexOf(origin) > -1
      ) {
        next()
      } else {
        const msg = `
              The CORS policy for this site does not allow 
              access from the specified Origin: ${origin}`
        debug.error(msg)
        next(Error(msg))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Access-Token',
    ],
    preflightContinue: false,
  }
}
