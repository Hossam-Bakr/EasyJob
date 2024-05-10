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
import { Link, useNavigate } from "react-router-dom";
import UpdateJobModal from "../../Pages/PostAJob/UpdateJobModal";

const CurrentJobs = ({
  id,
  job,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {

  const[showModal,setShowModal]=useState();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const navigateToJobDetails = () => {
    navigate(`/job-details/${id}`);
  };

  return (
    <>
      <td className={`${styles.info_table} ${styles.table_cell}`}>
        <FontAwesomeIcon
          className="special_main_color me-3"
          icon={faArrowRight}
        />
        {job?.title}
      </td>
      <td className={` ${styles.table_cell} ${styles.type}`}>
        <span>
          {job?.country} , {job?.city}
        </span>
      </td>
      <td className={` ${styles.table_btn}`}>
        <FontAwesomeIcon
          onClick={navigateToJobDetails}
          title="preview"
          icon={faArrowRight}
        />
        <FontAwesomeIcon title="ediet" icon={faEdit} onClick={()=>setShowModal(true)} />
        <Link to={`/stages/${id}`}>
          <FontAwesomeIcon title="stages" icon={faLayerGroup} />
        </Link>
      </td>
      <UpdateJobModal
        onHide={()=>setShowModal(false)}
        show={showModal}
        id={id}
        job={job}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
      />
    </>
  );
};

export default CurrentJobs;
