import { authenticate } from '../middlewares/auth'
import express from 'express'
import cache from '../middlewares/cache'
import ping from './ping'
import status from './status'

const system = express.Router()

system.get('/ping', cache(10), ping)
system.get('/status', authenticate, status)

export default system
