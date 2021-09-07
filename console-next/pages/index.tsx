import type { NextPage } from "next";
import { connect } from "react-redux";
import { ConnectInjectedProps } from "@/types";
import { getAdminSecret } from "@/components/Services/ApiExplorer/ApiRequest/utils";
import { useEffect } from "react";

const Index: NextPage<ConnectInjectedProps> = ({ dispatch }) => {
  useEffect(() => {
    console.log(getAdminSecret());
  }, []);
  return <div></div>;
};

export default connect()(Index);
