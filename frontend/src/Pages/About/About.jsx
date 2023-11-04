import React from 'react'

import SubNavbar from '../../Components/Navs/SubNavbar';
import AboutHeader from '../../Components/About-Header/About-Header';
import styles from "./About.module.css";
import MainAccordion from '../../Components/Ui/MainAccordion';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

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
                firstText={"Our founders Dustin Moskovitz and Justin lorem Rosenstein met while leading Engineering teams at Facebook quesi. Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
                secondTitle={"What’s our goal"}
                secondText={"Our founders Dustin Moskovitz and Justin lorem Rosenstein met while leading Engineering teams at Facebook quesi. Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
                thirdTitle={"Our vision"} 
                thirdText={"Our founders Dustin Moskovitz and Justin lorem Rosenstein met while leading Engineering teams at Facebook quesi. Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
              />
            </Col>
          </Row>
        </div>
      </section>

    </div>
  )
}

export default About
