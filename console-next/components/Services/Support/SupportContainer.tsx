import React from "react";
import Link from "next/link";
import { RightContainer } from "../../Common/Layout/RightContainer";
import LeftContainer from "../../Common/Layout/LeftContainer/LeftContainer";
import PageContainer from "../../Common/Layout/PageContainer/PageContainer";

import styles from "../../Common/TableCommon/Table.module.scss";

const helmetTitle = "Support Forums | Hasura";

const LeftBar = () => (
  <LeftContainer>
    <ul>
      <li role="presentation" className={styles.active}>
        <Link className={styles.linkBorder} href="/support/forums/">
          Support Forums
        </Link>
      </li>
    </ul>
  </LeftContainer>
);

export const SupportContainer: React.FC = ({ children }) => {
  return (
    <PageContainer helmet={helmetTitle} leftContainer={<LeftBar />}>
      <RightContainer>{children}</RightContainer>
    </PageContainer>
  );
};
