import { debug } from '../lib/logger'
import versionController from './versions'
import system from './system'
import limiter from '../middlewares/limiter'

const api = (app: Express.Application) => {
  try {
    app.use('/', system)
    app.use('/api', versionController)
    app.use('/api', limiter)
    return app
  } catch (error) {
    debug.error(error)
    process.exit(1)
  }
}

export default api
