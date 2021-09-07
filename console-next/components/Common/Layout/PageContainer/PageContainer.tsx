import React from "react";
import styles from "@/css/Common.module.scss";

interface PageContainerProps extends React.ComponentProps<"div"> {
  helmet: string;
  leftContainer: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  helmet,
  leftContainer,
  children,
}) => {
  return (
    <>
      {/* <Helmet title={helmet} /> */}
      <div
        className={`${styles.wd20} ${styles.align_left} ${styles.height100}`}
      >
        {leftContainer}
      </div>
      <div className={styles.wd80}>{children}</div>
    </>
  );
};

export default PageContainer;
