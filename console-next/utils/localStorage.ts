import globals from "../Globals";

const getWindow = () => (typeof window !== "undefined" ? window : undefined);

export const setLSItem = (key: string, data: string) => {
  getWindow()?.localStorage.setItem(key, data);
};

export const getLSItem = (key: string) => {
  if (!key) {
    return null;
  }

  return getWindow()?.localStorage.getItem(key);
};

export const getParsedLSItem = (key: string, defaultVal: any = null) => {
  const value = getLSItem(key);

  if (!value) {
    return defaultVal;
  }

  try {
    const jsonValue = JSON.parse(value);

    return jsonValue || defaultVal;
  } catch {
    return defaultVal;
  }
};

export const removeLSItem = (key: string) => {
  const value = getLSItem(key);

  if (!value) {
    return null;
  }

  getWindow()?.localStorage.removeItem(key);
};

type expiryValue = {
  value: string;
  expiry: number;
};

export const setLSItemWithExpiry = (key: string, data: string, ttl: number) => {
  const now = new Date();

  const item: expiryValue = {
    value: data,
    expiry: now.getTime() + ttl,
  };

  setLSItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = (key: string) => {
  const lsValue = getLSItem(key);
  if (!lsValue) {
    return null;
  }
  const item: expiryValue = JSON.parse(lsValue);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    getWindow()?.localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

export const listLSKeys = () => {
  return Object.keys(getWindow()?.localStorage);
};

export const LS_KEYS = {
  apiExplorerAdminSecretWasAdded: "apiExplorer:adminSecretHeaderWasAdded",
  apiExplorerConsoleGraphQLHeaders: "apiExplorer:graphiqlHeaders",
  apiExplorerEndpointSectionIsOpen: "apiExplorer:endpointSectionIsOpen",
  apiExplorerGraphiqlMode: "apiExplorer:graphiQLMode",
  apiExplorerHeaderSectionIsOpen: "apiExplorer:headersSectionIsOpen",
  consoleAdminSecret: "console:adminSecret",
  consoleLocalInfo: `console:localInfo:${globals.dataApiUrl}`,
  dataColumnsCollapsedKey: "data:collapsed",
  dataColumnsOrderKey: "data:order",
  dataPageSizeKey: "data:pageSize",
  derivedActions: "actions:derivedActions",
  graphiqlQuery: "graphiql:query",
  loveConsent: "console:loveIcon",
  oneGraphExplorerCodeExporterOpen: "graphiql:codeExporterOpen",
  oneGraphExplorerOpen: "graphiql:explorerOpen",
  oneGraphExplorerWidth: "graphiql:explorerWidth",
  proClick: "console:pro",
  rawSQLKey: "rawSql:sql",
  rawSqlStatementTimeout: "rawSql:rawSqlStatementTimeout",
  showConsoleOnboarding: "console:showConsoleOnboarding",
  versionUpdateCheckLastClosed: "console:versionUpdateCheckLastClosed",
};

export const clearGraphiqlLS = () => {
  Object.values(LS_KEYS).forEach((lsKey) => {
    if (lsKey.startsWith("graphiql:")) {
      getWindow()?.localStorage.removeItem(lsKey);
    }
  });
};
