module.exports = {
  apps: [
    {
      name: 'azordev-server',
      script: './build/src/server/index.js',
      max_memory_restart: `${process.env.WEB_MEMORY || 512}M`,
      instances: process.env.WEB_CONCURRENCY || -1,
      exec_mode: 'cluster',
      source_map_support: false,
    },
  ],
}
