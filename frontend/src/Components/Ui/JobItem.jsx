import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookmark,
  faEye,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import ApplyBtn from "./ApplyBtn";
import styles from "./JobPost.module.css";
import noLogo from "../../images/noLogo.jpg";
import { formatedTimeHandler } from "../logic/Logic";
import { useDispatch } from "react-redux";
import { savedJobActions } from "../../Store/savedJobs-slice";
import FloatingPopup from "./FloatingPopup";

const JobItem = ({
  id,
  logo,
  name,
  jobTitle,
  req,
  country,
  city,
  workplace,
  time,
  type,
  formatType,
  profile,
  setResponseMessage,
  setSuccessResponse,
  setShowResponse
}) => {
  const [formatedTime,setFormatedTime]=useState("");
  const [jobCompanyLogo, setJobCompanyLogo] = useState(null);

  const dispatch=useDispatch();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if(time){
      formatedTimeHandler(time,setFormatedTime)
    }
  }, [time]);


  useEffect(() => {
    setJobCompanyLogo(null)
      if (logo) {
        const compLogo = `http://127.0.0.1:3000/companies/${logo}`;
        setJobCompanyLogo(compLogo);
      }

  }, [logo]);

  const deleteJob=()=>{
    dispatch(savedJobActions.deleteJob(id))
    setResponseMessage({
      title: "Deleted Successfully",
      content: "Your Job Deleted From Saved Jobs successfully",
    });
    setSuccessResponse(true);
    setShowResponse(true);
  }


  return (
    <>
    <Col xl={12} className={styles.job_container}>
      <div data-aos="zoom-in-up" data-aos-duration="1000">
        <div className={styles.job}>
          <div className={styles.job_icons}>
            {profile ? (
              <>
                <FontAwesomeIcon
                  onClick={deleteJob}
                  icon={faTrash}
                  title="Delete Job"
                  className={`${styles.bookmark_icon} mx-2`
                }
                />
                <FontAwesomeIcon
                  icon={faArrowRight}
                  title="preview"
                  className={`${styles.eye_icon} mx-2`}
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faBookmark}
                  title="save"
                  className={`${styles.bookmark_icon} mx-2`}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  title="view"
                  className={`${styles.eye_icon} mx-2`}
                />
              </>
            )}
          </div>

          <div className={styles.header_container}>
            <div className={styles.logo_div}>
              <img
                //jobCompanyLogo
                src={noLogo}
                alt="company logo"
                className={styles.company_logo}
              />
            </div>

            <div className="d-flex flex-column ms-3 mt-1">
              <span className={styles.job_name}>{name?name:"Company Name"}</span>
              <span className="mini_word">{formatedTime}</span>
            </div>
          </div>
          <h4>{jobTitle}</h4>
          <p>{req}</p>
          <div
            className={`${styles.info} d-flex justify-content-evenly align-items-center`}
          >
            {workplace && <span>{workplace}</span>}
            {type && <span>{type}</span>}
            <span>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={styles.location_icon}
              />
              {city}, {country}
            </span>
          </div>
          <div className="text-end w-100">
            {formatType === "saved" ? (
              <ApplyBtn formatType="white" text="Apply Now" />
            ) : (
              <ApplyBtn formatType="white" text="Cancel Request" />
            )}
          </div>
        </div>
      </div>
    </Col>

    </>

  );
};

export default JobItem;