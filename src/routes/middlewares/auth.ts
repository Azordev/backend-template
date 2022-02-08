import jwt from 'jsonwebtoken'
import fs from 'fs'
import responses from '../../controllers/utils/responses'

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

export const verifyToken = (token, signOptions = { algorithm: 'RS256' }) => {
  const signOptionsWithDefaults = { ...defaultSignOptions, ...signOptions }

  try {
    const verified = jwt.verify(token, privateKey, signOptionsWithDefaults)

    return verified
  } catch (err) {
    return false
  }
}

export const decodeToken = (token) => {
  const decoded = jwt.decode(token, { complete: true })

  return decoded // returns null if token is invalid
}

export const authenticate = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      ...responses[401],
      message: 'No authorization token provided.',
    })
  }

  const token = authorization.split(' ')[1]
  const verified = verifyToken(token)

  if (!verified) {
    return res.status(401).json({
      ...responses[401],
      message: 'Invalid authorization token.',
    })
  }

  req.user = verified

  next()
}
