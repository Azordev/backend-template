export interface IEnvironment {
  appName: string
  appDescription: string
  appVersion: string
  port?: number | null
  portHttps?: number | null
  secretKey: string
  applyEncryption: boolean
  logLevel: string
  productionURL: string | null
  getCurrentEnvironment(): string
  isProductionEnvironment(): boolean
  isDevEnvironment(): boolean
  isTestEnvironment(): boolean
  isStagingEnvironment(): boolean
}

interface Environment {
  (env?: string): IEnvironment
}

export default Environment
