import React from "react";
import styles from "./MainButtonTwo.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MainButtonTwo = ({ text, type,onClick }) => {
  return (
    <>
      {type === "arrow" ? (
        <button onClick={onClick} className={styles.arrow_btn}>
          {text}
          <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#310761" }}
          className={styles.start_btn}
          onClick={onClick}
        >
          {text}
        </motion.button>
      )}
    </>
  );
};

export default MainButtonTwo;
