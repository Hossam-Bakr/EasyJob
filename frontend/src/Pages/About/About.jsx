import React from 'react'

import SubNavbar from '../../Components/Navs/SubNavbar';
import AboutHeader from '../../Components/About-Header/About-Header';
import styles from "./About.module.css";
import MainAccordion from '../../Components/Ui/MainAccordion';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faFileInvoice, faPen } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/esm/Container';

const About = () => {
  return (
    <div>
      <SubNavbar firstTab={"HOME"} secondTab={"ABOUT US"} thirdTab={"CONTACT US"} fourthTab={"SEARCH FOR JOBS"} />
      <AboutHeader />

      <section className={styles.numbersSpeeks}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              <h1>The numbers don't lie</h1>
            </div>
            <div className={styles.subTitle}>
              <p>About 800+ new jobs everyday</p>
            </div>
          </div>

          <div className={styles.elements}>
            <Row >
              <Col lg={3} md={6} sm={12} className={`${styles.element} ${styles.box_one_border}`}>
                <div className={styles.title}>
                  <h2>2.5M+</h2>
                </div>
                <div className={`${styles.subTitle} ${styles.mediumScreen}`}>
                  <p>Jobs Available</p>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12} className={`${styles.element} ${styles.box_two_border}`}>
                <div className={styles.title}>
                  <h2>189k+</h2>
                </div>
                <div className={`${styles.subTitle} ${styles.mediumScreen}`}>
                  <p>New Jobs This Week!</p>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12} className={`${styles.element} ${styles.box_three_border}`}>
                <div className={styles.title}>
                  <h2>289k+</h2>
                </div>
                <div className={`${styles.subTitle} ${styles.special_border}`}>
                  <p>Companies Hiring</p>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12} className={`${styles.element} ${styles.box_four_border}`}>
                <div className={styles.title}>
                  <h2>5M+</h2>
                </div>
                <div className={styles.subTitle}>
                  <p>Candidates</p>
                </div>
              </Col>
            </Row>
          </div>

        </div>
      </section>

      <section className={styles.description}>
        <div className={styles.descContainer}>
          <Row >
            <Col lg={6} md={12} className={styles.descTitle}>
              <h1 className={styles.accordionTitle}>We’ve been<br />
                helping customer <br />
                globally.</h1>
            </Col>


            <Col lg={6} md={12} className={styles.accordion_box}>
              <MainAccordion
                firstTitle={"Who we are?"}
                firstText={"We are forward-thinking company dedicated to transforming lives through meaningful employment opportunities"}
                secondTitle={"What’s our goal"}
                secondText={"At EasyJob, our mission is clear: we are committed to connecting talented individuals with the right job opportunities"}
                thirdTitle={"Our vision"}
                thirdText={"We envision a world where every individual has the opportunity to discover and pursue their dream career. We aspire to be the catalyst for positive change in the professional landscape, striving to create a future where talent meets opportunity seamlessly."}
              />
            </Col>
          </Row>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.secondHeader}>
          <div className={styles.line}></div>
          <div className={styles.secondTitle}>
            <h1>How it’s Work?</h1>
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.secondContainer}>
          <section className={styles.steps}>
            <Container fluid>
              <Row className="justify-content-center">
                <Col
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  <div className={styles.step_item}>
                    <FontAwesomeIcon icon={faCircleUser} className={styles.circleCheck_icon} />
                    <h5>Create Account</h5>
                    <div className={styles.step_caption}>
                      <div>
                        <h6>It’s very easy to open an account and start your journey.</h6>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center"
                  data-aos="fade-in"
                  data-aos-duration="1000"
                >
                  <div className={styles.step_item}>
                    <FontAwesomeIcon icon={faFileInvoice} className={styles.circleCheck_icon} />
                    <h5>Complete your profile</h5>
                    <div className={styles.step_caption}>
                      <div>
                        <h6>Complete your profile with all the info to get attention of client.</h6>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                >
                  <div className={styles.step_item}>
                    <FontAwesomeIcon icon={faPen} className={styles.circleCheck_icon} />
                    <h5>Apply job or hire</h5>
                    <div className={styles.step_caption}>
                      <div>
                        <h6>Apply & get your preferable jobs with all the requirements and get it.</h6>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

        </div>
      </section>


    </div>
  )
}

export default About
