import * as React from "react";
import { connect } from "react-redux";
import generatedApiExplorer from "./ApiExplorer";

import TopBar from "./TopNav";

const ApiExplorer: React.FC = generatedApiExplorer(connect);

const Container: React.FC<any> = (props) => {
  const { location, children } = props;
  return (
    <>
      {/* <Helmet title="API Explorer | Hasura" /> */}
      <div id="left-bar">
        <TopBar location={location} />
      </div>
      <div id="right-bar">{children || <ApiExplorer {...props} />}</div>
    </>
  );
};

export default Container;
