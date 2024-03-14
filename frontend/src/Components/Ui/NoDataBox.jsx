import React from 'react';
import styles from "./NoDataBox.module.css";
import noData from "../../images/noData.jpg";
import cerificate from "../../images/licence.svg";
import lang from "../../images/lang.svg";
import education from "../../images/education.svg";
import workex from "../../images/workex.svg";
import summary from "../../images/summary.svg";
import skills from "../../images/skills.svg";

import { Link } from 'react-router-dom';

const NoDataBox = ({path,text,type,imgSize}) => {


  let imgSrc=noData;
  switch (type) {
    case "about":
      imgSrc=summary
      break;
    case "certificate":
      imgSrc=cerificate
      break;
    case "language":
      imgSrc=lang
      break;
    case "education":
      imgSrc=education
      break;
    case "skills":
      imgSrc=skills
      break;
    case "workex":
      imgSrc=workex
      break;
    case "contact":
      imgSrc=summary
      break;
    default:
      imgSrc=noData
      break;
  }

  const imgClasses=imgSize==="small"?styles.no_data_small:styles.no_data
  return (
    <div className="d-flex flex-column align-items-center p-5">
    <div className={imgClasses}>
      <img src={imgSrc} alt="noData" />
    </div>
    <span className="mini_word">
      {text}{" "}
      <Link to={path}>here</Link>
    </span>
  </div>
  )
}

export default NoDataBox
