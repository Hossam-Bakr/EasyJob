import React, { useEffect } from "react";
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
import L1 from "../../images/logo/lg.png";
import L2 from "../../images/logo/huwawei.webp";
import L3 from "../../images/logo/amazon.png";
import L4 from "../../images/logo/we.png";
import L5 from "../../images/logo/etisalat2.png";
import L6 from "../../images/logo/etoile.png";
import L7 from "../../images/logo/msary.png";
import L8 from "../../images/logo/raya.webp";
import L9 from "../../images/logo/vodafone.png";
import L10 from "../../images/logo/orange.png";
import L11 from "../../images/logo/elaraby.png";
import L12 from "../../images/logo/concentrix.webp";
import L13 from "../../images/logo/talatmostafa.png";
import L14 from "../../images/logo/saintgobain.png";
import L15 from "../../images/logo/wadidegla.png";
import styles from "./JobPost.module.css";

const JobItem = ({
  logo,
  name,
  jobTitle,
  desc,
  country,
  city,
  full,
  part,
  remote,
  freelance,
  time,
  type,
  profile,
}) => {
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
    case "L7":
      companyLogo = L7;
      break;
    case "L8":
      companyLogo = L8;
      break;
    case "L9":
      companyLogo = L9;
      break;
    case "L10":
      companyLogo = L10;
      break;
    case "L11":
      companyLogo = L11;
      break;
    case "L12":
      companyLogo = L12;
      break;
    case "L13":
      companyLogo = L13;
      break;
    case "L14":
      companyLogo = L14;
      break;
    case "L15":
      companyLogo = L15;
      break;

    default:
      break;
  }

  return (
    <Col xl={12} className={styles.job_container}>
      <div data-aos="zoom-in-up" data-aos-duration="1000">
        <div className={styles.job}>
          <div className={styles.job_icons}>
            {profile ? (
              <>
                <FontAwesomeIcon
                  icon={faTrash}
                  title="Delete Job"
                  className={`${styles.bookmark_icon} mx-2`}
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
                src={companyLogo}
                alt="company logo"
                className={styles.company_logo}
              />
            </div>

            <div className="d-flex flex-column ms-3 mt-1">
              <span className={styles.job_name}>{name}</span>
              <span className="mini_word">{time}</span>
            </div>
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
              />
              {city}, {country}
            </span>
          </div>
          <div className="text-end w-100">
            {type === "saved" ? (
              <ApplyBtn type="white" text="Apply Now" />
            ) : (
              <ApplyBtn type="white" text="Cancel Request" />
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default JobItem;
