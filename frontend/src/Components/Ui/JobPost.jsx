import React,{useEffect} from 'react';
import styles from './JobPost.module.css';
import Col from 'react-bootstrap/esm/Col';
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faEye,
    faLocationDot
  } from "@fortawesome/free-solid-svg-icons";

  import L1 from "../../images/1.png";
  import L2 from "../../images/2.png";
  import L3 from "../../images/3.png";
  import L4 from "../../images/4.png";
  import L5 from "../../images/5.png";
  import L6 from "../../images/6.png";

const JobPost = ({logo,name,jobTitle,desc,city,full,part,remote,freelance}) => {

    useEffect(() => {
        AOS.init();
      }, []);
      
      let companyLogo=L1;

      switch (logo) {
        case 'L1':
            companyLogo=L1
            break;
        case 'L2':
            companyLogo=  L2
            break;
        case 'L3':
            companyLogo=L3  
            break;
        case "L4":
            companyLogo=L4 
            break;
        case 'L5':
            companyLogo=L5
            break;
        case 'L6':
            companyLogo=L6
            break;
      
        default:
            break;
      }

  return (
    <Col sm={6} lg={4} data-aos="zoom-in-up" data-aos-duration="1000">
           <div className={styles.job}>
                <div className="d-flex justify-content-between mb-3">
                  <div className='d-flex'>
                    <img
                      src={companyLogo}
                      alt="company logo"
                      className={styles.company_logo}
                    />
                    <span className='ms-3 mt-3'>{name}</span>
                  </div>
                
                  <div className="d-flex justify-content-center align-items-center">
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
                  </div>
                </div>
                
                <h4>{jobTitle}</h4>
                <p>
                 {desc}
                </p>
                <div
                  className={`${styles.info} d-flex justify-content-evenly align-items-center`}
                >
                  {remote&&<span>Remote</span>}
                  {full&&<span>Full Time</span>}
                  {part&&<span>Part Time</span>}
                  {freelance&&<span>Freelance</span>}
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
  )
}

export default JobPost
