const publicRuntimeConfig = {
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
  SLACK_REDIRECT_URI: process.env.SLACK_REDIRECT_URI || 'https://trycourier.ngrok.io/api/oauth',
  SLACK_SCOPES: process.env.SLACK_SCOPES || 'bot,im:write'
};

module.exports = {
  publicRuntimeConfig,
  serverRuntimeConfig: Object.assign(publicRuntimeConfig, {
    COURIER_AUTH_TOKEN: process.env.COURIER_AUTH_TOKEN,
    REDIRECT_ERROR: process.env.REDIRECT_ERROR,
    REDIRECT_SUCCESS: process.env.REDIRECT_SUCCESS,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET
  })
};