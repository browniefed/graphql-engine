import { CLI_CONSOLE_MODE } from "@/constants";

const serverEnvVars = {
  dataApiUrl: process.env.NEXT_PUBLIC_DATA_API_URL,
  isAdminSecretSet: process.env.NEXT_PUBLIC_IS_ADMIN_SECRET_SET,
  consoleMode: process.env.NEXT_PUBLIC_CONSOLE_MODE,
  nodeEnv: process.env.NODE_ENV,
  serverVersion: process.env.NEXT_PUBLIC_SERVER_VERSION,
  urlPrefix: process.env.NEXT_PUBLIC_URL_PREFIX,
  consolePath: process.env.NEXT_PUBLIC_CONSOLE_PATH,
  enableTelemetry: process.env.NEXT_PUBLIC_ENABLE_TELEMETRY,
  assetsPath: process.env.NEXT_PUBLIC_ASSETS_PATH,
  assetsVersion: process.env.NEXT_PUBLIC_ASSETS_VERSION,
  cdnAssets: process.env.NEXT_PUBLIC_CDN_ASSETS,
  herokuOAuthClientId: process.env.NEXT_PUBLIC_HEROKU_OAUTH_CLIENT_ID || "",
  tenantID: process.env.NEXT_PUBLIC_HASURA_CLOUD_TENANT_ID || "",
  projectID: process.env.NEXT_PUBLIC_HASURA_CLOUD_PROJECT_ID || "",
  cloudRootDomain: process.env.NEXT_PUBLIC_HASURA_CLOUD_ROOT_DOMAIN,
  consoleType: process.env.NEXT_PUBLIC_HASURA_CONSOLE_TYPE,
};

const cliEnvVars = {
  apiPort: process.env.NEXT_PUBLIC_API_PORT,
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
  dataApiUrl: process.env.NEXT_PUBLIC_DATA_API_URL,
  adminSecret: process.env.NEXT_PUBLIC_ADMIN_SECRET,
  consoleMode: process.env.NEXT_PUBLIC_CONSOLE_MODE,
  nodeEnv: process.env.NODE_ENV,
  enableTelemetry: process.env.NEXT_PUBLIC_ENABLE_TELEMETRY,
  assetsPath: process.env.NEXT_PUBLIC_ASSETS_PATH,
  assetsVersion: process.env.NEXT_PUBLIC_ASSETS_VERSION,
  serverVersion: process.env.NEXT_PUBLIC_SERVER_VERSION,
  cdnAssets: process.env.NEXT_PUBLIC_CDN_ASSETS,
  herokuOAuthClientId: process.env.NEXT_PUBLIC_HEROKU_OAUTH_CLIENT_ID || "",
  tenantID: process.env.NEXT_PUBLIC_HASURA_CLOUD_TENANT_ID || "",
  projectID: process.env.NEXT_PUBLIC_HASURA_CLOUD_PROJECT_ID || "",
  cloudRootDomain: process.env.NEXT_PUBLIC_HASURA_CLOUD_ROOT_DOMAIN,
};

const envVars =
  process.env.NEXT_PUBLIC_CONSOLE_MODE === CLI_CONSOLE_MODE
    ? cliEnvVars
    : serverEnvVars;

if (typeof window !== "undefined") {
  window.__env = envVars;
}

export default envVars;
