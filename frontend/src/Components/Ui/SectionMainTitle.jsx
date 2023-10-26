import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from './SectionMainTitle.module.css';

const SectionMainTitle = ({title}) => {
  return (
  <div className="d-flex justify-content-center align-items-center flex-column mb-5">
    <h3 className={styles.title}>
        {title}
    </h3>
        <FontAwesomeIcon icon={faCaretDown} className={styles.cartDown_icon} />
  </div>
  )
}

export default SectionMainTitle
