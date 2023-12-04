import React from 'react';
import styles from './Loading.module.css';
import Spinner from 'react-bootstrap/esm/Spinner';

const Loading = () => {
  return (
    <div className={styles.loading_body}>
        <Spinner/>
    </div>
  )
}

export default Loading
