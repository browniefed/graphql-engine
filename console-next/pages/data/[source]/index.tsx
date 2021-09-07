import type { NextPage } from "next";
import { connect } from "react-redux";
import { ConnectInjectedProps } from "@/types";
import Main from "@/components/Main/Main";

import { PageContainer } from "@/components/Services/Data/index";
import DataSourceContainer from "@/components/Services/Data/DataSourceContainer";

const Data: NextPage<ConnectInjectedProps> = (props) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <Main {...props}>
      <PageContainer>
        <DataSourceContainer></DataSourceContainer>
      </PageContainer>
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

export default connect(mapStateToProps)(Data);
