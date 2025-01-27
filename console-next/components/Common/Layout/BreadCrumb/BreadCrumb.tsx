import React, { ReactElement } from "react";
import Link from "next/link";
import styles from "../../TableCommon/Table.module.scss";

export type BreadCrumb = {
  url: string;
  title: string;
  prefix?: ReactElement;
};

type Props = {
  breadCrumbs: BreadCrumb[];
};

const BreadCrumb: React.FC<Props> = ({ breadCrumbs }) => {
  let bC = null;

  if (breadCrumbs && breadCrumbs.length > 0) {
    bC = breadCrumbs.map((b: BreadCrumb, i: number) => {
      let bCElem;

      const addArrow = () => (
        <React.Fragment key={i}>
          &nbsp;
          <i
            key={`${b.title}-arrow`}
            className="fa fa-angle-right"
            aria-hidden="true"
          />
          &nbsp;
        </React.Fragment>
      );

      const isLastElem = i === breadCrumbs.length - 1;

      if (!isLastElem) {
        bCElem = [
          <Link key={`bc-title-${b.title}`} href={`${b.url}`}>
            <a>
              {b.prefix} {b.title}
            </a>
          </Link>,
          addArrow(),
        ];
      } else {
        bCElem = (
          <span>
            {b.prefix} {b.title}
          </span>
        );
      }

      return <span key={i}>{bCElem}</span>;
    });
  }

  return <div className={styles.dataBreadCrumb}>You are here: {bC}</div>;
};

export default BreadCrumb;
