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
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getJobsDetails } from "../../util/Http";

const CurrentJobs = ({
  jobId,
  job,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  refetch
}) => {

  const[showModal,setShowModal]=useState();
  const navigate = useNavigate();


  const token = useSelector((state) => state.userInfo.token);

  const { data, refetch:call } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: () => getJobsDetails({ jobId, token }),
    enabled: !!jobId,
  });
  
  useEffect(() => {
    if (jobId) {
      call();
    }
  }, [jobId, token, call]);


  useEffect(() => {
    AOS.init();
  }, []);

  const navigateToJobDetails = () => {
    navigate(`/preview-job/${jobId}`);
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
        <Link to={`/stages/${jobId}`}>
          <FontAwesomeIcon title="stages" icon={faLayerGroup} />
        </Link>
      </td>
      <UpdateJobModal
        onHide={()=>setShowModal(false)}
        show={showModal}
        jobId={jobId}
        data={data}
        call={call}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        refetch={refetch}
      />
    </>
  );
};

export default CurrentJobs;
