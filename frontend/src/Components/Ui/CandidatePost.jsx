import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import LoginAlertModal from "./LoginAlertModal";
import Col from "react-bootstrap/esm/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./CandidatePost.module.css";

import noAvatar from "../../images/noAvatarMale.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faEye,
  // faGraduationCap,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { calculateAge } from "../logic/Logic";

const CandidatePost = ({
  id,
  avatar,
  name,
  tagline,
  desc,
  city,
  country,
  currentCareerLevel,
  openToWork,
  jobTypes,
  birthDate,
  // degree,
  // department,
  grid,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [age, setAge] = useState(20);

  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);
  const emp_pic = isLogin ? styles.employee_pic : styles.employee_pic_blur;
  const navigate=useNavigate();


  useEffect(() => {
    if (avatar) {
      const avatarURL = `http://127.0.0.1:3000/users/${avatar}`;
      setProfileAvatar(avatarURL);
    }
  }, [avatar]);

  useEffect(()=>{
    if(birthDate){
      calculateAge(birthDate,setAge)
    }
  },[birthDate])

  const checkNavigateToCandidateProfile = () => {
    if (isLogin && role==="company") {
     navigate(`/userProfile/${id}`)
    } else {
      setModalShow(true);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);


  let xxlSize = grid ? 4 : 12;
  let xlSize = grid ? 6 : 12;
  let lgSize = grid ? 6 : 12;

  return (
    <>
      <Col lg={lgSize} xl={xlSize} xxl={xxlSize}>
        <div data-aos="zoom-in-up" data-aos-duration="1000">
          <div
            className={styles.candidate}
          >
            <div className={styles.header_icons}>
              <div
                className={styles.cv_icon}
                title="download Cv"
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
                <img src={profileAvatar?profileAvatar:noAvatar} alt="company logo" />
                {openToWork && <div className={styles.active}></div>}
              </div>
              <div className="d-flex flex-column justify-content-center ms-2">
                <span className={styles.name}>
                  {isLogin ? name : "Hidden Name"}
                </span>
                <span className={styles.title}>{tagline}</span>

                <span className={styles.location}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.location_icon}
                  />{" "}
                  {city}, {country}
                </span>
              </div>
            </div>
            <div className={styles.f}>
            <p >{desc}</p>

            </div>

            <div
              className={`${styles.info} d-flex justify-content-start align-items-center mb-1`}
            >
              {jobTypes?.map((type)=><span key={type}>{type}</span>)}
            </div>
            {/* <div className={`${styles.education_sec} mt-3 d-flex flex-column`}>
              <div className="d-flex">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className={styles.location_icon}
                />
                <span className={styles.degree}>{degree}</span>
              </div>
              <span className={styles.department}>({department})</span>
            </div> */}
            <div
              className={`${styles.candidate_footer} d-flex justify-content-between align-items-center mt-3`}
            >
              <span className={styles.level}>
                {" "}
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className={styles.location_icon}
                />{" "}
                {currentCareerLevel}
              </span>
              <span className={styles.degree}>{age} years</span>
            </div>
          </div>
        </div>
      </Col>
      <LoginAlertModal show={modalShow} onHide={() => setModalShow(false)} type="company" />
    </>
  );
};

export default CandidatePost;
