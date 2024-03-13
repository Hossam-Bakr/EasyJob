import React from "react";
import styles from "./MainBtnThree.module.css";

const MainBtnThree = ({ type,text,onClick }) => {
  let btn_type = type === "white" ? styles.white_btn : styles.main_color_btn;
  let first_layer = type === "white" ? styles.first_layer1 : styles.first_layer2;
  let second_layer = type === "white" ? styles.second_layer1 : styles.second_layer2;
  let third_layer = type === "white" ? styles.third_layer1 : styles.third_layer2 ;

  return (
    <div onClick={onClick} className={`${btn_type} btn`}>
      <div className={first_layer}></div>
      <div className={second_layer}></div>
      <div className={third_layer}></div>
      <span className={styles.btn_text}>{text}</span>
    </div>
  );
};

export default MainBtnThree;
