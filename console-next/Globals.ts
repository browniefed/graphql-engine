/* eslint no-underscore-dangle: 0 */
import { SERVER_CONSOLE_MODE } from "@/constants";
import { getFeaturesCompatibility } from "@/helpers/versionUtils";
import { stripTrailingSlash } from "@/components/Common/utils/urlUtils";
import { isEmpty } from "@/components/Common/utils/jsUtils";
import { Nullable } from "@/components/Common/utils/tsUtils";

type ConsoleType = "oss" | "cloud" | "pro" | "pro-cloud";

/* initialize globals */

const isProduction = process.env.NODE_ENV !== "development";

const globals = {
  apiHost: process.env?.apiHost,
  apiPort: process.env?.apiPort,
  dataApiUrl: stripTrailingSlash(process.env?.dataApiUrl), // overridden below if server mode
  urlPrefix: stripTrailingSlash(process.env?.urlPrefix || "/"), // overridden below if server mode in production
  adminSecret: process.env?.adminSecret || null, // gets updated after login/logout in server mode
  isAdminSecretSet:
    process.env?.isAdminSecretSet ||
    !isEmpty(process.env?.adminSecret) ||
    false,
  consoleMode: process.env?.consoleMode || process.env.SERVER_CONSOLE_MODE,
  enableTelemetry: process.env?.enableTelemetry,
  telemetryTopic: isProduction ? "console" : "console_test",
  assetsPath: process.env?.assetsPath,
  serverVersion: process.env?.serverVersion,
  consoleAssetVersion: process.env.CONSOLE_ASSET_VERSION, // set during console build
  featuresCompatibility: process.env?.serverVersion
    ? getFeaturesCompatibility(process.env?.serverVersion)
    : null,
  cliUUID: process.env?.cliUUID,
  hasuraUUID: "",
  telemetryNotificationShown: false,
  isProduction,
  herokuOAuthClientId: process.env?.herokuOAuthClientId,
  hasuraCloudTenantId: process.env?.tenantID,
  hasuraCloudProjectId: process.env?.projectID,
  // cloudDataApiUrl: `${window.location?.protocol}//data.${process.env?.cloudRootDomain}`,
  luxDataHost: process.env?.luxDataHost,
  userRole: undefined, // userRole is not applicable for the OSS console
  consoleType: process.env?.consoleType,
  eeMode: process.env?.eeMode === "true",
};
if (globals.consoleMode === process.env.SERVER_CONSOLE_MODE) {
  if (!process.env?.dataApiUrl) {
    // globals.dataApiUrl = stripTrailingSlash(window.location?.href);
  }
  // if (isProduction) {
  //   const consolePath = process.env?.consolePath;
  //   if (consolePath) {
  //     // let currentUrl = stripTrailingSlash(window.location?.href);
  //     let slicePath = true;
  //     if (process.env?.dataApiUrl) {
  //       // currentUrl = stripTrailingSlash(process.env?.dataApiUrl);
  //       slicePath = false;
  //     }
  //     const currentPath = stripTrailingSlash(window.location?.pathname);

  //     // NOTE: perform the slice if not on team console
  //     // as on team console, we're using the server
  //     // endpoint directly to load the assets of the console
  //     if (slicePath) {
  //       globals.dataApiUrl = currentUrl.slice(
  //         0,
  //         currentUrl.lastIndexOf(consolePath)
  //       );
  //     }

  //     globals.urlPrefix = `${currentPath.slice(
  //       0,
  //       currentPath.lastIndexOf(consolePath)
  //     )}/console`;
  //   } else {
  //     // const windowHostUrl = `${window.location?.protocol}//${window.location?.host}`;
  //     // globals.dataApiUrl = windowHostUrl;
  //   }
  // }
}

export default globals;
