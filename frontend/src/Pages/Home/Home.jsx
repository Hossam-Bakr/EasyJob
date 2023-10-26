import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Components/Header/Header";
import HomeTopEmployersSlider from "../../Components/Ui/HomeTopEmployersSlider";
import styles from "./Home.module.css";
import typing from "../../images/Typing.png";
import searchJob from "../../images/searching.png";
import resume from "../../images/upload cv.png";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";

const Home = () => {
  return (
    <>
      <Header />
      <section className={styles.top_employers}>
        <h3>Top Employers</h3>
        <HomeTopEmployersSlider />
      </section>

      <section className={styles.steps}>
        <SectionMainTitle title='Find Your Perfect Job With Few Steps'/>
        <Container>
          <Row>
            <Col sm={4}>
              <div className={styles.step_item}>
                <div className={styles.step_item_img}>
                  <h5>Complete Your Profile</h5>
                  <img src={searchJob} alt="form" />
                </div>
                <ul>
                  <li><FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheck_icon} /> create an account</li>
                  <li>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheck_icon} /> fill your profile info to find best job.
                  </li>
                </ul>
                <div className="text-end px-2 mt-4">
                  <button className={styles.step_btn}>Sign Up <FontAwesomeIcon icon={faArrowRight} className='ms-3'/></button>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className={styles.step_item}>
                <div className={styles.step_item_img}>
                  <h5>Find Your Dream Job</h5>
                  <img src={typing} alt="form" />
                </div>

                <ul>
                  <li> <FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheck_icon} /> search your job</li>
                  <li> <FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheck_icon} /> apply for job</li>
                </ul>
                <div className="text-end px-2 mt-4">
                  <button className={styles.step_btn}>Search Job <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></button>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className={styles.step_item}>
                <div className={styles.step_item_img}>
                  <h5> Upload Your CV</h5>

                  <img src={resume} alt="form" />
                </div>
                <ul>
                  <li> <FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheck_icon} /> prepare your cv in pdf form</li>
                  <li> <FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheck_icon} /> easily apload your cv</li>
                </ul>
                <div className="text-end px-2 mt-4">
                  <button className={styles.step_btn}>Upload CV <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className={styles.location}>
      <div className={styles.main_title}>
         <h2>Jobs bt Location</h2>
        <span>Find your favourite jobs and get the benefits of yourself</span>
      </div>
    </section> */}
    </>
  );
};

export default Home;
