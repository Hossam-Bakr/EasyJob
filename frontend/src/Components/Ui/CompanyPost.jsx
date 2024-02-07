import React, { useEffect } from "react";
import styles from "./CompanyPost.module.css";
import Col from "react-bootstrap/esm/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import L1 from "../../images/logo/saintgobain.png";
import L2 from "../../images/logo/huwawei.webp";
import L3 from "../../images/logo/amazon.png";
import L4 from "../../images/logo/we.png";
import L5 from "../../images/logo/etisalat2.png";
import L6 from "../../images/logo/etoile.png";
import L7 from "../../images/logo/btech.png";
import L8 from "../../images/logo/msary.png";
import L9 from "../../images/logo/raya.webp";
import L10 from "../../images/logo/vodafone.png";
import L11 from "../../images/logo/orange.png";
import L12 from "../../images/logo/elaraby.png";
import L13 from "../../images/logo/concentrix.webp";
import L14 from "../../images/logo/talatmostafa.png";
import L15 from "../../images/logo/cairo.png";
import ApplyBtn from "./ApplyBtn";

const CompanyPost = ({ logo, name, industry, desc, country, city, grid }) => {
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

  let xlSize = grid ? 4 : 12;
  let lgSize = grid ? 6 : 12;
  let companyHeightClass = grid ? styles.grid_height : "";
  return (
    <>
      <Col lg={lgSize} xl={xlSize}>
        <div data-aos="zoom-in-up" data-aos-duration="1000">
          <div className={styles.job}>
            <div className={styles.job_icons}>
              <FontAwesomeIcon
                icon={faArrowRight}
                title="view"
                className={`${styles.eye_icon} mx-2`}
              />
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
                <span className="mini_word">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.location_icon}
                  />
                  {city}, {country}
                </span>
              </div>
            </div>

            <div className={companyHeightClass}>
              <h4>{industry}</h4>
              <p>{desc}</p>
            </div>
            <div className="text-center">
              <ApplyBtn text="Related Jobs" />
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CompanyPost;
