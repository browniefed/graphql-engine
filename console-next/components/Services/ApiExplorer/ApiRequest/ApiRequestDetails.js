import React, { Component } from "react";
import styles from "../ApiExplorer.module.scss";

class ApiRequestDetails extends Component {
  render() {
    return (
      <div className={styles.apiRequestWrapper + " " + styles.apiContentPadd}>
        <div className={styles.apiRequestheader}>{this.props.title}</div>
        <div className={styles.apiRequestContent}>{this.props.description}</div>
      </div>
    );
  }
}

// ApiRequestDetails.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };

export default ApiRequestDetails;
