import express from 'express'
import { authenticate } from '../../middlewares/auth'
import cache from '../../middlewares/cache'
import ping from '../../controllers/api.ping'
import status from '../../controllers/api.status'
import limiter from 'middlewares/limiter'

const system = express.Router()

system.get('/ping', cache(10), ping)
system.get('/status', cache(1), limiter, authenticate, status)

export default system
