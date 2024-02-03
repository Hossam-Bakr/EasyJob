import React from 'react';
import styles from './EdietPenIcon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const EdietPenIcon = ({onClick}) => {
  return (
    <div onClick={onClick} className={styles.ediet_div}>
        <FontAwesomeIcon className={styles.ediet_pen_icon} icon={faPencil}/>
        <span className={styles.ediet_span}>Ediet</span>
    </div>
  )
}

export default EdietPenIcon
