import React from 'react';
import styles from './MainButton.module.css';

const MainButton = ({text,onClick,type}) => {

    const classes=type==='white'?styles.MainButton_white:styles.MainButton;

  return (
    <button onClick={onClick} className={classes}>
        <div className={styles.MainButton_layer}></div>
        {text}
    </button>
  )
}

export default MainButton
