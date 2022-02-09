import { NextFunction, Request } from 'express'
import memoryCache from 'memory-cache'

const memCache = new memoryCache.Cache()
const cache = (duration: number) => {
  return (req: Request, res, next: NextFunction) => {
    const key = '__express__' + req.originalUrl || req.url
    const cacheContent = memCache.get(key)

    if (cacheContent) {
      res.send(cacheContent)
    } else {
      res.SendCopy = res.send

      res.send = (body) => {
        memCache.put(key, body, duration * 1000)
        return res.SendCopy(body)
      }

      next()
    }
  }
}

export default cache
