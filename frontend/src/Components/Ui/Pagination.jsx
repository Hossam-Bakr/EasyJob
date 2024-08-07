import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Pagination.module.css";

const Pagination = ({ setPageNum,maxPageNum }) => {
  const [isActive, setIsActive] = useState(1);

  const hanldeActivePage = (num) => {
    if (isActive < 1 || num < 1) {
      setIsActive(1);
      setPageNum(1);
      return;
    }
    if(isActive>maxPageNum||num>maxPageNum){
      setIsActive(maxPageNum);
      setPageNum(maxPageNum);
      return;
    }
    setIsActive(num);
    setPageNum(num);
  };

  return (
    <div
      className={`${styles.pages} m-auto d-flex justify-content-evenly align-items-center mb-1 mt-5 w-75 px-2`}
    >
      <div
        className={`${styles.page_arrow} ${styles.arrow_left}`}
        onClick={() => hanldeActivePage(isActive - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div
        onClick={() => hanldeActivePage(1)}
        className={`${styles.page_num} ${styles.hidden_item_on_mobile2} ${
          isActive === 1 ? styles.active_num : ""
        }`}
      >
        <h5>1</h5>
      </div>
      <div
        onClick={() => hanldeActivePage(2)}
        className={`${styles.page_num} ${styles.hidden_item_on_mobile2}  ${
          isActive === 2 ? styles.active_num : ""
        }`}
      >
        <h5>2</h5>
      </div>
      <div
        onClick={() => hanldeActivePage(3)}
        className={`${styles.page_num} ${styles.hidden_item_on_mobile} ${
          isActive === 3 ? styles.active_num : ""
        }`}
      >
        <h5>3</h5>
      </div>
      <div
        onClick={() => hanldeActivePage(4)}
        className={`${styles.page_num} ${styles.hidden_item_on_mobile} ${
          isActive === 4 ? styles.active_num : ""
        }`}
      >
        <h5>4</h5>
      </div>
      <div
        onClick={() => hanldeActivePage(5)}
        className={`${styles.page_num} ${styles.hidden_item_on_mobile} ${
          isActive === 5 ? styles.active_num : ""
        }`}
      >
        <h5>5</h5>
      </div>

      <div
        className={`${styles.page_arrow}  ${styles.arrow_right}`}
        onClick={() => hanldeActivePage(isActive + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};

export default Pagination;
