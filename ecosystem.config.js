module.exports = {
  apps: [
    {
      name: 'REMILAK front',
      script: 'yarn',
      args: 'start -- -p 1213',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
