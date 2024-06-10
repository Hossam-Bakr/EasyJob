import React, { useState } from "react";
import styles from "./SearchField.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTruckLoading } from "@fortawesome/free-solid-svg-icons";

const SearchField = ({onSearch,text,isSearching}) => {

  const [searchInput,setSearchInput]=useState("");

  const saveSearchData=(e)=>{
    setSearchInput(e.target.value)
  }


  return (
    <form  onSubmit={(e)=>onSearch(e,searchInput)} className={`${styles.search_container} ms-auto`}>
      <input onChange={saveSearchData} type="search" placeholder={text} />
      <button type="submit" className={styles.search_icon}>
        {isSearching?<FontAwesomeIcon className="fa-spin" icon={faTruckLoading}/>:<FontAwesomeIcon title="search" icon={faSearch} />}
      </button>
    </form>
  );
};

export default SearchField;
