import React from 'react';
import styles from './GridButtons.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListUl,
    faTableCellsLarge,
  } from "@fortawesome/free-solid-svg-icons";


const GridButtons = ({setGrid,setList}) => {
  return (
    <div className={styles.veiw_controllers}>
    <FontAwesomeIcon onClick={setGrid} icon={faTableCellsLarge}/>
    <FontAwesomeIcon onClick={setList} icon={faListUl}/>
  </div>
  )
}

export default GridButtons
