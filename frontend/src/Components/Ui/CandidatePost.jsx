import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./CandidatePost.module.css";

import p1 from "../../images/p1.jpeg";
import p2 from "../../images/p2.jpeg";
import p3 from "../../images/p3.jpeg";
import p4 from "../../images/p4.jpg";
import p5 from "../../images/p5.jpeg";
import p6 from "../../images/p6.jpeg";
import p7 from "../../images/p7.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
  faEye,
  faGraduationCap,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const CandidatePost = ({
  pic,
  name,
  jobTitle,
  desc,
  city,
  level,
  age,
  available,
  full,
  part,
  remote,
  degree,
  department,
}) => {
  useEffect(() => {
    AOS.init();
  }, []);

  let employeePic = p1;

  switch (pic) {
    case "p1":
      employeePic = p1;
      break;
    case "p2":
      employeePic = p2;
      break;
    case "p3":
      employeePic = p3;
      break;
    case "p4":
      employeePic = p4;
      break;
    case "p5":
      employeePic = p5;
      break;
    case "p6":
      employeePic = p6;
      break;
    case "p7":
      employeePic = p7;
      break;

    default:
      break;
  }

  return (
    <Col xl={6} xxl={4} data-aos="zoom-in-up" data-aos-duration="1000">
      <div className={styles.candidate}>
        <div className={styles.header_icons}>
          <div title="view Cv" className={styles.cv_icon}>
            <span>CV</span>
          </div>
          <div className={`${styles.cv_icon} mx-2`} title="view Profile">
            <FontAwesomeIcon icon={faEye} className={styles.eye_icon} />
          </div>
        </div>

        <div className={`${styles.header_info} d-flex`}>
          <div className={styles.employee_pic}>
            <img src={employeePic} alt="company logo" />
            {available&&<div className={styles.active}></div>}
          </div>
          <div className="d-flex flex-column justify-content-center ms-2">
            <span className={styles.name}>{name}</span>
            <span className={styles.title}>{jobTitle}</span>

                <span className={styles.location}>
                <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.location_icon}
                />{" "}
                {city}
                </span>
        
          </div>
        </div>
        <p>{desc}</p>

        <div
          className={`${styles.info} d-flex justify-content-start align-items-center mb-1`}
        >
          {remote && <span>Remote</span>}
          {full && <span>Full Time</span>}
          {part && <span>Part Time</span>}
        </div>
        <div className="mt-3 d-flex flex-column">
                <span className={styles.degree}>
                <FontAwesomeIcon
                icon={faGraduationCap}
                className={styles.location_icon}
                />
                {degree}
            </span>
              <span className={styles.department}>({department})</span>
        </div>
        <div className={`${styles.candidate_footer} d-flex justify-content-between align-items-center mt-3`}>
        
         <span className={styles.level}> <FontAwesomeIcon icon={faBriefcase} className={styles.location_icon}/>{" "}{level}</span>
         <span className={styles.degree}>{age} years</span>
        </div>
      </div>
    </Col>
  );
};

export default CandidatePost;
