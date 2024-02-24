import React from 'react';
import styles from "./NoDataBox.module.css";
import noData from "../../images/noData.jpg";
import { Link } from 'react-router-dom';

const NoDataBox = ({path,text}) => {
  return (
    <div className="d-flex flex-column align-items-center p-5">
    <div className={styles.no_data}>
      <img src={noData} alt="noData" />
    </div>
    <span className="mini_word">
      {text}{" "}
      <Link to={path}>here</Link>
    </span>
  </div>
  )
}

export default NoDataBox
