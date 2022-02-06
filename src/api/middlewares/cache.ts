import memoryCache from 'memory-cache'

const memCache = new memoryCache.Cache()
const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url
    const cacheContent = memCache.get(key)

    if (cacheContent) {
      res.send(cacheContent)
    } else {
      res.sendResponse = res.send

      res.send = (body) => {
        memCache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }

      next()
    }
  }
}

export default cache
