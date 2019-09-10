export type publicRuntimeConfig = {
  SLACK_CLIENT_ID: string;
  SLACK_REDIRECT_URI: string;
  SLACK_SCOPES: string;
};

export type serverRuntimeConfig = publicRuntimeConfig & {
  SLACK_CLIENT_SECRET: string;
  COURIER_AUTH_TOKEN: string;
  REDIRECT_SUCCESS: string;
  REDIRECT_ERROR: string;
};

type env = {
  publicRuntimeConfig: publicRuntimeConfig;
  serverRuntimeConfig: serverRuntimeConfig;
}

export default env;