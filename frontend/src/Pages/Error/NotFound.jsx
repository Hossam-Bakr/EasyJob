import React from 'react';
import styles from './NotFound.module.css';
import not_found_img from "../../images/404.jpg";

const NotFound = () => {
  return (
    <div className={styles.not_found_container}>
      <img src={not_found_img} alt="404 not found img" />
    </div>
  )
}

export default NotFound
