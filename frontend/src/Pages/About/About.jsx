import React, { useEffect } from "react";
import styles from "./About.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import EasyJobLocation from "../../Components/Maps/EasyJobLocation";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";
import begad from "../../images/begad.jpeg";
import hossam from "../../images/hossam.jpeg";
import ammar from "../../images/ammar.jpeg";
import bassam from "../../images/bassam.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import CountUpSection from "../../Components/Ui/CountUpSection";
import AOS from "aos";


const About = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <header className={styles.about_header}>
        <div className={styles.header_layer}></div>
      </header>

      <div className={styles.about_title} data-aos="zoom-in" data-aos-duration="1000">
        <h1>Easy Job Company</h1>
        <p className="mt-3">
          Welcome to Easy Job, the ultimate platform connecting job seekers and
          employers. We streamline the hiring process, providing a user-friendly
          interface for candidates to explore a wide range of job opportunities.
          Our extensive network of employers offers diverse roles across various
          industries. Join us today and let Easy Job be your gateway to success.
          Discover your dream career or find exceptional talent effortlessly.
          Experience the power of Easy Job and take the next step towards
          professional fulfillment. Your journey starts here!
        </p>
      </div>


      <section className="my-5">
        <SectionMainTitle title="Our Team Members" />
        <Container fluid>
          <Row className="gy-5">
            <Col lg={6}>
              <div className={styles.memeber}>
                <div className={styles.member_header}>
                  <div className={styles.member_title}>
                    <h4>Begad Sayed</h4>
                    <span>Frontend Developer</span>
                  </div>
                  <p className="mini_word">
                    Student at Faculty of Engineering, Al-Azhar University, work
                    as Frontend end Developer | React JS
                  </p>
                  <div className={styles.icons}>
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faGithub} />
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </div>

                <div className={styles.img_side}>
                  <div className={styles.member_img}>
                    <img src={begad} alt="begad" />
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className={`${styles.memeber} ${styles.member_right}`}>
                <div className={styles.member_header}>
                  <div className={styles.member_title}>
                    <h4>Hossam Hassan</h4>
                    <span>Backend Developer</span>
                  </div>
                  <p className="mini_word">
                    Student at Faculty of Engineering, Al-Azhar University, work
                    as Backend Developer | Node JS
                  </p>
                  <div className={styles.icons}>
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faGithub} />
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </div>

                <div className={styles.img_side}>
                  <div className={styles.member_img}>
                    <img src={hossam} alt="hossam" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className={styles.memeber}>
                <div className={styles.member_header}>
                  <div className={styles.member_title}>
                    <h4>Bassam Hafez</h4>
                    <span>Frontend Developer</span>
                  </div>
                  <p className="mini_word">
                    Student at Faculty of Engineering, Al-Azhar University, work
                    as Frontend end Developer | React JS
                  </p>
                  <div className={styles.icons}>
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faGithub} />
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </div>

                <div className={styles.img_side}>
                  <div className={styles.member_img}>
                    <img src={bassam} alt="bassam" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${styles.memeber} ${styles.member_right}`}>
                <div className={styles.member_header}>
                  <div className={styles.member_title}>
                    <h4>Ammar Yasser</h4>
                    <span>Backend Developer</span>
                  </div>
                  <p className="mini_word">
                    Student at Faculty of Engineering, Al-Azhar University, work
                    as Backend Developer | Node JS
                  </p>
                  <div className={styles.icons}>
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faGithub} />
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </div>

                <div className={styles.img_side}>
                  <div className={styles.member_img}>
                    <img src={ammar} alt="ammar" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={styles.counter}>
        <CountUpSection />
      </section>

      <section className="my-5 py-5">
        <section className={` ${styles.ourLocation}`}>
          <SectionMainTitle title="The company's main headquarters" />
          <EasyJobLocation myPosition={[30.0880301565236, 31.21248902756294]} />
        </section>
      </section>
    </>
  );
};

export default About;
