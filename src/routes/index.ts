import { debug } from '../lib/logger'
import versionController from './api/versions'
import system from './api/system'
import limiter from './middlewares/limiter'

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
