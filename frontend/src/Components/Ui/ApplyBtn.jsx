import React from "react";
import styles from "./ApplyBtn.module.css";

const ApplyBtn = ({ type,text }) => {
  let btnClasses = type==='white'?styles.apply_btn_white:styles.apply_btn_main_color
  return (
      <button className={btnClasses}>{text}</button>
  );
};

export default ApplyBtn;
