import { NextFunction, Request } from 'express'
import memoryCache from 'memory-cache'

const memCache = new memoryCache.Cache()
const cache = (durationSeconds: number) => {
  return (req: Request, res, next: NextFunction) => {
    const key = '__express__' + req.originalUrl || req.url
    const cacheContent = memCache.get(key)

    if (cacheContent) {
      res.send(cacheContent)
    } else {
      res.SendCopy = res.send

      res.send = (body) => {
        memCache.put(key, body, durationSeconds * 1000)
        return res.SendCopy(body)
      }

      next()
    }
  }
}

export default cache
