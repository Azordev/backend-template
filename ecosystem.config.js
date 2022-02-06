module.exports = {
  apps: [
    {
      name: 'azordev-server',
      script: './build/server/index.js',
      instances: '-1',
      exec_mode: 'cluster',
    },
  ],
}
