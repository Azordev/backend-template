import express from 'express'
import middlewares from './middlewares'
import { Environment } from './environments'

export const globalEnv = Environment(process.env.NODE_ENV)
const app = express()

middlewares(app)

export default app
