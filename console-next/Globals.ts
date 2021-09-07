/* eslint no-underscore-dangle: 0 */
import { SERVER_CONSOLE_MODE } from "./constants";
import { getFeaturesCompatibility } from "./helpers/versionUtils";
import { stripTrailingSlash } from "./components/Common/utils/urlUtils";
import { isEmpty } from "./components/Common/utils/jsUtils";
import { Nullable } from "./components/Common/utils/tsUtils";
import envVars from "@/injectWindowEnv";

type ConsoleType = "oss" | "cloud" | "pro" | "pro-cloud";

declare global {
  interface Window {
    __env: {
      nodeEnv: string;
      apiHost: string;
      apiPort: string;
      dataApiUrl: string;
      urlPrefix: string;
      adminSecret: string;
      isAdminSecretSet: boolean;
      consoleMode: string;
      enableTelemetry: boolean;
      assetsPath: string;
      serverVersion: string;
      consolePath: string;
      cliUUID: string;
      consoleId: Nullable<string>;
      herokuOAuthClientId: string;
      tenantID: Nullable<string>;
      projectID: Nullable<string>;
      userRole: Nullable<string>;
      cloudRootDomain: Nullable<string>;
      luxDataHost: Nullable<string>;
      consoleType: ConsoleType;
      eeMode: Nullable<string>;
    };
  }
  const CONSOLE_ASSET_VERSION: string;
}

const getWindow = () => (typeof window !== "undefined" ? window : undefined);

/* initialize globals */

const isProduction = envVars.nodeEnv !== "development";
const CONSOLE_ASSET_VERSION = process.env.CONSOLE_ASSET_VERSION;

const globals = {
  apiHost: envVars.apiHost,
  apiPort: envVars.apiPort,
  dataApiUrl: stripTrailingSlash(envVars.dataApiUrl), // overridden below if server mode
  urlPrefix: stripTrailingSlash(envVars.urlPrefix || "/"), // overridden below if server mode in production
  adminSecret: envVars.adminSecret || null, // gets updated after login/logout in server mode
  isAdminSecretSet:
    envVars.isAdminSecretSet || !isEmpty(envVars.adminSecret) || false,
  consoleMode: envVars.consoleMode || SERVER_CONSOLE_MODE,
  enableTelemetry: envVars.enableTelemetry,
  telemetryTopic: isProduction ? "console" : "console_test",
  assetsPath: envVars.assetsPath,
  serverVersion: envVars.serverVersion,
  consoleAssetVersion: CONSOLE_ASSET_VERSION, // set during console build
  featuresCompatibility: envVars.serverVersion
    ? getFeaturesCompatibility(envVars.serverVersion)
    : null,
  cliUUID: envVars.cliUUID,
  hasuraUUID: "",
  telemetryNotificationShown: false,
  isProduction,
  herokuOAuthClientId: envVars.herokuOAuthClientId,
  hasuraCloudTenantId: envVars.tenantID,
  hasuraCloudProjectId: envVars.projectID,
  cloudDataApiUrl: `${getWindow()?.location?.protocol}//data.${
    envVars.cloudRootDomain
  }`,
  luxDataHost: envVars.luxDataHost,
  userRole: undefined, // userRole is not applicable for the OSS console
  consoleType: envVars.consoleType,
  eeMode: envVars.eeMode === "true",
};
if (globals.consoleMode === SERVER_CONSOLE_MODE) {
  if (!envVars.dataApiUrl) {
    globals.dataApiUrl = stripTrailingSlash(getWindow()?.location?.href);
  }
  if (isProduction) {
    const consolePath = envVars.consolePath;
    if (consolePath) {
      let currentUrl = stripTrailingSlash(getWindow()?.location?.href);
      let slicePath = true;
      if (envVars.dataApiUrl) {
        currentUrl = stripTrailingSlash(envVars.dataApiUrl);
        slicePath = false;
      }
      const currentPath = stripTrailingSlash(getWindow()?.location?.pathname);

      // NOTE: perform the slice if not on team console
      // as on team console, we're using the server
      // endpoint directly to load the assets of the console
      if (slicePath) {
        globals.dataApiUrl = currentUrl.slice(
          0,
          currentUrl.lastIndexOf(consolePath)
        );
      }

      globals.urlPrefix = `${currentPath.slice(
        0,
        currentPath.lastIndexOf(consolePath)
      )}/console`;
    } else {
      const windowHostUrl = `${getWindow()?.location?.protocol}//${
        getWindow()?.location?.host
      }`;
      globals.dataApiUrl = windowHostUrl;
    }
  }
}

export default globals;
