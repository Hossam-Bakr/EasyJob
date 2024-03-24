import React from "react";

import styles from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceD20,
  faFilePdf,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDropbox,
  faDribbble,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import banner from "../../images/banner2.png";
import MainButtonTwo from "../Ui/MainButtonTwo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateToSignUpPage = () => {
    navigate("user-register");
  };

  return (
    <header className={styles.header}>
      <Row>
        <Col lg={5} xl={6}>
          <div
            className={styles.header_caption}
            data-aos="fade-in"
            data-aos-duration="1000"
          >
            <h1>
              Get your <span className="special_main_color">dream</span> job
              Easily.
            </h1>
            <h4>
              Find jobs, create trackable resumes and enrich your applications.
            </h4>
            <MainButtonTwo onClick={navigateToSignUpPage} text="Get Started" />
          </div>
        </Col>
        <Col
          lg={7}
          xl={6}
          className={`${styles.banner_container} d-flex justify-content-center position-relative`}
        >
          <div className={styles.big_circle_shape}>
            <div className={styles.small_circle_shape}></div>
          </div>
          <div className={styles.header_banner} >
            <img src={banner} alt="banner pic" className="w-100 h-100" />
          </div>
          <div className={styles.floating_box_one}>
            <FontAwesomeIcon className={styles.dice_icon} icon={faDiceD20} />
            <div className="mt-2 ms-2 text-center">
              <span>Every day</span>
              <h6>1000+ Jobs</h6>
            </div>
          </div>
          <div className={styles.floating_box_two}>
            <FontAwesomeIcon className={styles.pdf_icon} icon={faFilePdf} />
            <div className="mt-2 ms-2 text-center">
              <h6>Uploade CV</h6>
            </div>
          </div>
          <div className={styles.little_circle}>
            <div className={styles.little_circle_child}></div>
          </div>
          <FontAwesomeIcon className={styles.plus_icon} icon={faPlus} />
          <FontAwesomeIcon className={styles.dribbble_icon} icon={faDribbble} />
          <FontAwesomeIcon className={styles.dropbox_icon} icon={faDropbox} />
          <FontAwesomeIcon className={styles.github_icon} icon={faGithub} />
        </Col>
      </Row>
    </header>
  );
};

export default Header;
