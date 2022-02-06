import * as os from 'os'
import { globalEnv } from '../../server/app'

export const appInformation = () => {
  return {
    name: globalEnv.appName,
    version: globalEnv.version,
    description: globalEnv.description,
  }
}

export const serverInformation = () => {
  return {
    cpus: os.cpus(),
    network: os.networkInterfaces(),
    os: {
      platform: os.platform(),
      version: os.release(),
      totalMemory: os.totalmem(),
      uptime: os.uptime(),
    },
    currentUser: os.userInfo(),
  }
}
