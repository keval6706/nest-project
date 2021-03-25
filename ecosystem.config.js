module.exports = {
  apps: [
    {
      name: 'Stagging_App',
      script: 'npm run start:prod',
      env: {
        NODE_ENV: 'stagging',
      },
    },
    {
      name: 'Prd_App',
      script: 'npm run start:prod',
      env: {
        NODE_ENV: 'prd',
      },
    },
  ],
};
