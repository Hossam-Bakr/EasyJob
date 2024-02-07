import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import LoginAlertModal from "./LoginAlertModal";
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
  grid,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const emp_pic = isLogin ? styles.employee_pic : styles.employee_pic_blur;
  // const navigate=useNavigate();

  const checkNavigateToCandidateProfile = () => {
    if (isLogin) {
      console.log("is logged pass");
    } else {
      setModalShow(true);
    }
  };

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

  let xxlSize = grid ? 4 : 12;
  let xlSize = grid ? 6 : 12;
  let lgSize = grid ? 6 : 12;

  return (
    <>
      <Col lg={lgSize} xl={xlSize} xxl={xxlSize}>
        <div data-aos="zoom-in-up" data-aos-duration="1000">
          <div
            className={styles.candidate}
            onClick={checkNavigateToCandidateProfile}
          >
            <div className={styles.header_icons}>
              <div
                className={styles.cv_icon}
                title="view Cv"
                onClick={checkNavigateToCandidateProfile}
              >
                <span>CV</span>
              </div>
              <div
                className={`${styles.cv_icon} mx-2`}
                title="view Profile"
                onClick={checkNavigateToCandidateProfile}
              >
                <FontAwesomeIcon icon={faEye} className={styles.eye_icon} />
              </div>
            </div>
            <div className={`${styles.header_info} d-flex`}>
              <div className={emp_pic}>
                <img src={employeePic} alt="company logo" />
                {available && <div className={styles.active}></div>}
              </div>
              <div className="d-flex flex-column justify-content-center ms-2">
                <span className={styles.name}>
                  {isLogin ? name : "Hidden Name"}
                </span>
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
            <div className={`${styles.education_sec} mt-3 d-flex flex-column`}>
              <div className="d-flex">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className={styles.location_icon}
                />
                <span className={styles.degree}>{degree}</span>
              </div>
              <span className={styles.department}>({department})</span>
            </div>
            <div
              className={`${styles.candidate_footer} d-flex justify-content-between align-items-center mt-3`}
            >
              <span className={styles.level}>
                {" "}
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className={styles.location_icon}
                />{" "}
                {level}
              </span>
              <span className={styles.degree}>{age} years</span>
            </div>
          </div>
        </div>
      </Col>
      <LoginAlertModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default CandidatePost;
