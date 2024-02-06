import React from "react";
import styles from "./SearchField.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchField = () => {
  return (
    <form className={`${styles.search_container} ms-auto`}>
      <input type="text" id="search" placeholder="Search here.." />
      <button type="submit" className={styles.search_icon}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchField;
