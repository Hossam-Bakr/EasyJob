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
            <div className={`${styles.element} ${styles.borderRight}`}>
              <div className={styles.title}>
                <h2>2.5M+</h2>
              </div>
              <div className={styles.subTitle}>
                <p>Jobs Available</p>
              </div>
            </div>
            <div className={`${styles.element} ${styles.borderRight}`}>
              <div className={styles.title}>
                <h2>189k+</h2>
              </div>
              <div className={styles.subTitle}>
                <p>New Jobs This Week!</p>
              </div>
            </div>
            <div className={`${styles.element} ${styles.borderRight}`}>
              <div className={styles.title}>
                <h2>289k+</h2>
              </div>
              <div className={styles.subTitle}>
                <p>Companies Hiring</p>
              </div>
            </div>
            <div className={styles.element}>
              <div className={styles.title}>
                <h2>5M+</h2>
              </div>
              <div className={styles.subTitle}>
                <p>Candidates</p>
              </div>
            </div>
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
