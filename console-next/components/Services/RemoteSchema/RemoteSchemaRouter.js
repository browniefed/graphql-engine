import React from "react";

import { RightContainer } from "../../Common/Layout/RightContainer";
import {
  remoteSchemaPageConnector,
  landingConnector,
  addConnector,
  editConnector,
  viewConnector,
  permissionsConnector,
} from ".";
import { FILTER_REMOTE_SCHEMAS } from "./Actions";

import { appPrefix } from "./constants";

const filterItem = (dispatch) => {
  return (dataList, searchVal) => {
    // form new schema
    const matchedTables = dataList.filter((data) => {
      return (
        data.name
          .toLowerCase()
          .indexOf(searchVal ? searchVal.toLowerCase() : "") !== -1
      );
    });
    dispatch({
      type: FILTER_REMOTE_SCHEMAS,
      data: {
        filtered: matchedTables,
        searchQuery: searchVal,
      },
    });
  };
};

const leftNavMapStateToProps = (state) => {
  return {
    ...state,
    dataList: state.metadata.metadataObject?.remote_schemas ?? [],
    isError: state.remoteSchemas.listData.isError,
    isRequesting: state.remoteSchemas.listData.isRequesting,
    filtered: [...state.remoteSchemas.listData.filtered],
    searchQuery: state.remoteSchemas.listData.searchQuery,
    viewRemoteSchema: state.remoteSchemas.listData.viewRemoteSchema,
    appPrefix,
  };
};

const leftNavMapDispatchToProps = (dispatch) => {
  return {
    filterItem: filterItem(dispatch),
  };
};

const getRemoteSchemaRouter = (connect) => {
  return null;
};

export default getRemoteSchemaRouter;
export { appPrefix };
