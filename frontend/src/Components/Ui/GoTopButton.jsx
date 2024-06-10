import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./GoTopButton.module.css";

const GoTopButton = () => {
  const [isButtonShow, setISButtonShow] = useState(false);

  const goUp = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 300) {
        setISButtonShow(true);
      } else {
        setISButtonShow(false);
      }
    });
  }, []);

  return (
    <>
        <button onClick={goUp} className={`${styles.up_button} ${isButtonShow?styles.up_button_show:styles.up_button_hidden}`}>
          <FontAwesomeIcon icon={faArrowCircleUp} />
        </button>
    </>
  );
};

export default GoTopButton;
