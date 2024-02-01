import React, { useEffect, useState } from "react";
import styles from "./JobPost.module.css";
import Col from "react-bootstrap/esm/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEye,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import L1 from "../../images/1.png";
import L2 from "../../images/2.png";
import L3 from "../../images/3.png";
import L4 from "../../images/4.png";
import L5 from "../../images/5.png";
import L6 from "../../images/6.png";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import LoginAlertModal from "./LoginAlertModal";

const JobPost = ({
  logo,
  name,
  jobTitle,
  desc,
  city,
  full,
  part,
  remote,
  freelance,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  // const navigate=useNavigate();

  const checkToNavigateJobDetails = () => {
    if (isLogin) {
      console.log("logged in")
    } else {
      setModalShow(true);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);

  let companyLogo = L1;

  switch (logo) {
    case "L1":
      companyLogo = L1;
      break;
    case "L2":
      companyLogo = L2;
      break;
    case "L3":
      companyLogo = L3;
      break;
    case "L4":
      companyLogo = L4;
      break;
    case "L5":
      companyLogo = L5;
      break;
    case "L6":
      companyLogo = L6;
      break;

    default:
      break;
  }

  return (
    <>
      <Col lg={6} xl={4} data-aos="zoom-in-up" data-aos-duration="1000">
        <div className={styles.job} onClick={checkToNavigateJobDetails}>
          <div className={styles.job_icons}>
            <FontAwesomeIcon
              onClick={checkToNavigateJobDetails}
              icon={faBookmark}
              title="save"
              className={`${styles.bookmark_icon} mx-2`}
            />
            <FontAwesomeIcon
              onClick={checkToNavigateJobDetails}
              icon={faEye}
              title="view"
              className={`${styles.eye_icon} mx-2`}
            />
          </div>
          <div className="d-flex mb-3 mt-2">
            <img
              src={companyLogo}
              alt="company logo"
              className={styles.company_logo}
            />
            <span className="ms-3 mt-3">{name}</span>
          </div>
          <h4>{jobTitle}</h4>
          <p>{desc}</p>
          <div
            className={`${styles.info} d-flex justify-content-evenly align-items-center`}
          >
            {remote && <span>Remote</span>}
            {full && <span>Full Time</span>}
            {part && <span>Part Time</span>}
            {freelance && <span>Freelance</span>}
            <span>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={styles.location_icon}
              />{" "}
              {city}
            </span>
          </div>
        </div>
      </Col>
      <LoginAlertModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default JobPost;
