module.exports = {
  apps: [
    {
      name: 'frontendAdmin-toys',
      script: '.output/server/index.mjs',
      env: {
        PORT: 3001
      }
    }
  ]
}; 