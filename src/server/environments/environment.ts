import * as fs from 'fs'
import { config as configDotenv } from 'dotenv'
import * as path from 'path'
import { EnvironmentFile, Environments } from './environment.constant'
import Environment from './environment.interface'
import { generateSecretKey } from '../../lib/crypto'
import { name, version, description } from '../../../package.json'

const Environment: Environment = (env = 'local') => {
  const appName = name || 'azordev-backend'
  const appDescription = description || 'Server Backend'
  const appVersion = version || '0.1.0'
  const rootPath: string = path.resolve(__dirname, '../../../')
  const envUrls = process.env.URL_WHITELIST
  const urlWhitelist: string[] = envUrls ? JSON.parse(envUrls) : []
  let envPath: string

  switch (env) {
    case Environments.PRODUCTION:
      envPath = path.resolve(rootPath, EnvironmentFile.PRODUCTION)
      break
    case Environments.TEST:
      envPath = path.resolve(rootPath, EnvironmentFile.TEST)
      break
    case Environments.DEV:
    case Environments.QA:
    case Environments.STAGING:
      envPath = path.resolve(rootPath, EnvironmentFile.STAGING)
      break
    case Environments.LOCAL:
      envPath = path.resolve(rootPath, EnvironmentFile.LOCAL)
      break
    default:
      envPath = path.resolve(rootPath, EnvironmentFile.LOCAL)
  }

  if (!fs.existsSync(envPath)) {
    throw new Error(`${envPath} file is missing in root directory`)
  }

  configDotenv({ path: envPath })

  const port = Number(process.env.PORT) || 8000
  const portHttps = Number(process.env.PORT_HTTPS) || 443
  const secretKey: string = generateSecretKey()
  const applyEncryption = process.env.APPLY_ENCRYPTION === 'true'
  const logLevel = process.env.LOG_LEVEL || 'debug'
  const getCurrentEnvironment = (): string => {
    let environment: string = process.env.NODE_ENV || Environments.DEV

    if (!environment) {
      environment = Environments.LOCAL
    }

    switch (environment) {
      case Environments.PRODUCTION:
        return Environments.PRODUCTION
      case Environments.TEST:
        return Environments.TEST
      case Environments.DEV:
      case Environments.QA:
      case Environments.STAGING:
        return Environments.STAGING
      case Environments.LOCAL:
      default:
        return Environments.LOCAL
    }
  }

  const isProductionEnvironment = (): boolean =>
    getCurrentEnvironment() === Environments.PRODUCTION

  const isDevEnvironment = (): boolean =>
    getCurrentEnvironment() === Environments.DEV ||
    getCurrentEnvironment() === Environments.LOCAL

  const isTestEnvironment = (): boolean =>
    getCurrentEnvironment() === Environments.TEST

  const isStagingEnvironment = (): boolean =>
    getCurrentEnvironment() === Environments.STAGING

  return {
    appName,
    appDescription,
    appVersion,
    port,
    portHttps,
    secretKey,
    applyEncryption,
    logLevel,
    urlWhitelist,
    getCurrentEnvironment,
    isProductionEnvironment,
    isDevEnvironment,
    isTestEnvironment,
    isStagingEnvironment,
  }
}

export default Environment
