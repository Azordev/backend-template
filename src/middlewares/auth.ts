import jwt from 'jsonwebtoken'
import fs from 'fs'
import { NextFunction, Request, Response } from 'express'
import sendResponse from '../controllers/utils/responses'

const privateKey =
  fs.readFileSync('./azordev-RS256.key', 'utf8') || process.env.SECRET_KEY
const defaultSignOptions = {
  issuer: 'azordev',
  subject: 'azordev',
  audience: 'azordev',
  expiresIn: '1h',
  algorithm: 'RS256',
}

export const createToken = (
  payload,
  signOptions = { algorithm: 'RS256', expiresIn: '1h' },
) => {
  const signOptionsWithDefaults = { ...defaultSignOptions, ...signOptions }
  const token = jwt.sign(payload, privateKey, signOptionsWithDefaults)

  return token
}

export const verifyToken = (
  token: string | string[],
  signOptions = { algorithm: 'RS256' },
) => {
  const signOptionsWithDefaults = { ...defaultSignOptions, ...signOptions }

  try {
    const verified = jwt.verify(token, privateKey, signOptionsWithDefaults)

    return verified
  } catch (err) {
    return false
  }
}

export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token, { complete: true })

  return decoded // returns null if token is invalid
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { headers } = req
  const token = headers['x-access-token']

  if (!token) {
    return sendResponse(res, 401, [], 'No authorization token provided.')
  }

  const verified = verifyToken(token)

  if (!verified) {
    return sendResponse(res, 401, [], 'Invalid authorization token.')
  }

  res.locals.user = verified

  next()
}
