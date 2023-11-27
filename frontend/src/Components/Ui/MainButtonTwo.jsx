import React from "react";
import styles from "./MainButtonTwo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const MainButtonTwo = ({ text, type, onClick,role }) => {

  return (
    <>
      {type === "arrow" ? (
        <button
          onClick={onClick}
          className={styles.arrow_btn}
          type={role}
        >
          {text}
          <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
        </button>
      ) : (
        <button
          className={styles.start_btn}
          onClick={onClick}
          type={role}
        >
          <div className={styles.MainButton_layer}></div>
          {text}
        </button>
      )}
    </>
  );
};

export default MainButtonTwo;
