import rateLimit from 'express-rate-limit'
import versionController from './versions'
import system from './system'
import { debug } from '../lib/logger'

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

const api = (server) => {
  try {
    server.use('/', system)
    server.use('/api', versionController)
    server.use('/api', limiter)
    return server
  } catch (error) {
    debug.error(error)
    process.exit(1)
  }
}

export default api
