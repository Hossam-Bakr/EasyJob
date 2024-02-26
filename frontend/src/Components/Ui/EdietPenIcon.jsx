import React from 'react';
import styles from './EdietPenIcon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPencil } from '@fortawesome/free-solid-svg-icons';

const EdietPenIcon = ({onClick,text,color}) => {
  
  const penColorClass=color==="blue"?styles.penColorGray:'';
  
  return (
    <div onClick={onClick} className={`${styles.ediet_div} ${penColorClass}`}>
        <FontAwesomeIcon className={styles.ediet_pen_icon} icon={color==="blue"?faGear:faPencil}/>
        <span className={styles.ediet_span}>{text?text:"Ediet"}</span>
    </div>
  )
}

export default EdietPenIcon
