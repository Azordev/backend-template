import { NextFunction, Request, Response } from 'express'
import memoryCache from 'memory-cache'

const memCache = new memoryCache.Cache()
const cache = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = '__express__' + req.originalUrl || req.url
    const cacheContent = memCache.get(key)

    if (cacheContent) {
      res.send(cacheContent)
    } else {
      const resSendCopy = res.send

      res.send = (
        body: typeof res.send,
      ): Response<any, Record<string, any>> => {
        memCache.put(key, body, duration * 1000)
        return resSendCopy(body)
      }

      next()
    }
  }
}

export default cache
