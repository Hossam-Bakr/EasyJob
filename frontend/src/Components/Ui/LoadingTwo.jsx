import React from 'react'
import styles from './Loading.module.css';
import {faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingTwo = () => {
  return (
    <div className={styles.loading_two}>
      <FontAwesomeIcon className="fa-spin" icon={faSpinner}/>
    </div>
  )
}

export default LoadingTwo
