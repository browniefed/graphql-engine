import type { NextPage } from "next";
import { connect } from "react-redux";
import { ConnectInjectedProps } from "@/types";
import Main from "@/components/Main/Main";

import dynamic from "next/dynamic";

const APIExplorer = dynamic(
  () => import("@/components/Services/ApiExplorer/Container"),
  {
    ssr: false,
  }
);

const Index: NextPage<ConnectInjectedProps> = (props) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <Main {...props}>
      <APIExplorer {...props} />
    </Main>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.main,
    header: state.header,
    // pathname: ownProps.location.pathname,
    currentSchema: state.tables.currentSchema,
    currentSource: state.tables.currentDataSource,
    metadata: state.metadata,
    console_opts: state.telemetry.console_opts,
    requestHeaders: state.tables.dataHeaders,
    schemaList: state.tables.schemaList,
    inconsistentInheritedRole:
      state.tables.modify.permissionsState.inconsistentInhertiedRole,
  };
};

export default connect(mapStateToProps)(Index);
