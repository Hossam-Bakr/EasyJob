import React from 'react';
import styles from './EmailField.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShare } from "@fortawesome/free-solid-svg-icons";

const EmailField = () => {
  return (
    <div className={`${styles.subscribe_container} form-control`}>
    <input type="text" placeholder="Get News & Updates" />
    <FontAwesomeIcon className={styles.send_icon} icon={faShare} />
  </div>
  )
}

export default EmailField
