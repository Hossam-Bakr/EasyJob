import React, { useEffect, useState } from "react";
import styles from "./JobPost.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEdit,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { formatedTimeHandler } from "../logic/Logic";
import { Link } from "react-router-dom";

const CurrentJobs = ({
    id,
    name,
    jobTitle,
    type,
    workplace,
    time,
}) => {


    const [formatedTime, setFormatedTime] = useState("");
  

    // const navigate = useNavigate();
  
    // const checkToNavigateJobDetails = () => {
    //   if (isLogin) {
    //     navigate(`/job-details/${id}`);
    //   } else {
    //     setModalShow(true);
    //   }
    // };
  
  
    useEffect(() => {
      AOS.init();
    }, []);
  
    useEffect(() => {
      if (time) {
        formatedTimeHandler(time, setFormatedTime);
      }
    }, [time]);


  return (
    <>
    <td className={`${styles.info_table} ${styles.table_cell}`}>
      {name}
    </td>
    <td className={` ${styles.table_cell}`}>{jobTitle}</td>
    <td className={` ${styles.table_cell} ${styles.type}`}>
      <span>
        {type} , {workplace}
      </span>
    </td>
    <td className={` ${styles.table_cell}`}>{formatedTime}</td>
    <td className={` ${styles.table_btn}`}>
      <FontAwesomeIcon title="preview" icon={faArrowRight} />
      <FontAwesomeIcon title="ediet" icon={faEdit} />
      <Link to={`/stages/${id}`}><FontAwesomeIcon title="stages" icon={faLayerGroup} /></Link>
    </td>
  </>
  )
}

export default CurrentJobs
