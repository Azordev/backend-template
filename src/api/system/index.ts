import express from 'express'
import { authenticate } from '../../middlewares/auth'
import cache from '../../middlewares/cache'
import ping from '../../controllers/api.ping'
import status from '../../controllers/api.status'

const system = express.Router()

system.get('/ping', cache(10), ping)
system.get('/status', cache(1), authenticate, status)

export default system
