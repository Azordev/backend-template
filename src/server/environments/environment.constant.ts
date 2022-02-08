enum Environments {
  LOCAL = 'local',
  PRODUCTION = 'production',
  DEV = 'dev',
  TEST = 'test',
  QA = 'qa',
  STAGING = 'staging',
}

enum EnvironmentFile {
  LOCAL = '.env',
  PRODUCTION = '.env',
  DEV = '.env.staging',
  TEST = '.env.test',
  QA = '.env.staging',
  STAGING = '.env.staging',
}

export { Environments, EnvironmentFile }
