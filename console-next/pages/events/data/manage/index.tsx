import type { NextPage } from "next";
import { connect } from "react-redux";
import { ConnectInjectedProps } from "@/types";
import Main from "@/components/Main/Main";

import Container from "@/components/Services/Events/Container";
import LandingEventTriggers from "@/components/Services/Events/EventTriggers/Landing/EventTrigger";
const ManageEvents: NextPage<ConnectInjectedProps> = (props) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <Main {...props}>
      <Container>
        <LandingEventTriggers />
      </Container>
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
export default connect(mapStateToProps)(ManageEvents);
