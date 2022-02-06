import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { globalEnv } from '../server/app'
import { encrypt } from './crypto'
import logger from './logger'

function send(res: Response): void {
  const { isProductionEnvironment, applyEncryption, secretKey } = globalEnv
  let obj = {}

  obj = res.locals.data

  if (isProductionEnvironment()) {
    logger.info(JSON.stringify(obj, null, 2))
  }
  if (applyEncryption) {
    obj = encrypt(JSON.stringify(obj), secretKey)
  }

  res.status(StatusCodes.OK).send(obj)
}

function json(res: Response): void {
  const { isProductionEnvironment, applyEncryption, secretKey } = globalEnv
  let obj = {}

  obj = res.locals.data

  if (isProductionEnvironment()) {
    logger.info(JSON.stringify(obj, null, 2))
  }
  if (applyEncryption) {
    obj = encrypt(JSON.stringify(obj), secretKey)
  }

  res.status(StatusCodes.OK).json(obj)
}

export { send, json }
