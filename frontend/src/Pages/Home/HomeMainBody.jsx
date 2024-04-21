import React, { useEffect } from "react";
import styles from "./HomeMainBody.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AOS from "aos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faChartSimple,
  faCode,
  faDisplay,
  faHeadphonesSimple,
  faHelmetSafety,
  faPaintBrush,
  faSquareArrowUpRight,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import HomeTopEmployersSlider from "../../Components/Ui/HomeTopEmployersSlider";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";
import MainButtonTwo from "./../../Components/Ui/MainButtonTwo";
import HomeCitiesSliders from "../../Components/Ui/HomeCitiesSliders";
import sec2_img from "../../images/sec2.jpg";

import HomeTestimonalsSlider from "../../Components/Ui/HomeTestimonalsSlider";
import VerticalSlider from "../../Components/Ui/VerticalSlider";
import CountUpSection from './../../Components/Ui/CountUpSection';
import { useNavigate } from "react-router-dom";
import HomeLatestJobs from "../../Components/Ui/HomeLatestJobs";

const HomeMainBody = () => {

  const navigate=useNavigate();

  const navigateToExplore =()=>{
    navigate("/jobs")
  }

  const navigateToCategories =()=>{
    navigate("/categories")
  }

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* top employers section------------------------------------------------------------------- */}
      <section className={styles.top_employers}>
        <HomeTopEmployersSlider />
      </section>

      {/* steps section------------------------------------------------------------------- */}
      <section className={styles.steps}>
        <SectionMainTitle title="Find Your Perfect Job With Few Steps" />
        <VerticalSlider/>
      </section>

      {/* resume caption section------------------------------------------------------------------- */}
      <section className={styles.resume_caption}>
        <div className={styles.resume_caption_container}>
          <div className={styles.resume_caption_circle}></div>
          <div className={styles.resume_caption_circle_two}></div>
          <Row>
            <Col
              lg={6}
              className="d-flex justify-content-center align-items-center"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className={styles.resume_caption_img}>
                <img src={sec2_img} alt="employees" className="w-100" />
              </div>
            </Col>
            <Col lg={6} data-aos="zoom-in-up" data-aos-duration="1000">
              <div className={styles.resume_caption_content}>
                <h2>Millions of Jobs.Find the one that suits you.</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi, ab!
                </p>
                <ul className="px-0 my-3">
                  <li>
                    <FontAwesomeIcon
                      icon={faSquareArrowUpRight}
                      className={styles.circleCheck_icon}
                    />
                    Search all the open positions on the web
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faSquareArrowUpRight}
                      className={styles.circleCheck_icon}
                    />
                    Get your own personalized salary estimate.
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faSquareArrowUpRight}
                      className={styles.circleCheck_icon}
                    />
                    Read reviews on over 600,000 companies worldwide.
                  </li>
                </ul>
                <div className="text-center">
                  <MainButtonTwo  onClick={navigateToExplore} text="Start Finding Jobs" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* featured job section------------------------------------------------------------------- */}

        <HomeLatestJobs/>

      {/* caption section------------------------------------------------------------------- */}
      <section className={styles.caption}>
        <div
          className="text-center px-5"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <h2>Discover Career Opportunities</h2>
          <p>
            We help candidates know whether they're qualified for a job - and
            allow you to see their match potential - giving you a better pool of
            qualified candidates to choose from.
          </p>
        </div>
        <div
          className="text-center"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <MainButtonTwo onClick={navigateToExplore} text="All Job Offers " />
        </div>
      </section>

      {/* CountUpSection section------------------------------------------------------------------- */}
      <section className={styles.countUp_section}>
        <CountUpSection/>
      </section>
      {/* categories section------------------------------------------------------------------- */}
      <section className={styles.categories}>
        <SectionMainTitle title="Search by Category" />
        <Row>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faDisplay}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Web Developer</h4>
                <span>+2000 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faPaintBrush}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Graphic Designer</h4>
                <span>+120 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faChartSimple}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Data Scientist</h4>
                <span>+100 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faHeadphonesSimple}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Call Center</h4>
                <span>+900 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faBullhorn}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Marketing</h4>
                <span>+31000 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faHelmetSafety}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Civil Engineer</h4>
                <span>+20 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faCode}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Software Engineer</h4>
                <span>+1000 oppurtunity</span>
              </div>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            className="d-flex justify-content-center"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className={styles.category}>
              <div className={styles.category_icon_div}>
                <FontAwesomeIcon
                  className={styles.category_icon}
                  icon={faUsers}
                />
              </div>
              <div className={styles.category_caption}>
                <h4>Human Resources</h4>
                <span>+8000 oppurtunity</span>
              </div>
            </div>
          </Col>
        </Row>
        <div
          className="text-center"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <MainButtonTwo onClick={navigateToCategories} text="All Categories " />
        </div>
      </section>
   
      {/* featured cities section------------------------------------------------------------------- */}
      <section className={styles.featured_cities}>
        <SectionMainTitle title="Featured Cities" />
        <HomeCitiesSliders />
      </section>

      {/* seperation_bg  section------------------------------------------------------------------- */}
      <section className={styles.seperation_bg}>
        <div className={styles.seperation_bg_layer}></div>
        <div className={styles.seperation_bg_caption}>
          <h2 data-aos="fade-in" data-aos-duration="1000">
            {" "}
            Work From Anywhere
          </h2>
          <p data-aos="fade-in" data-aos-duration="1000">
            Find your ideal work from home opportunity and enjoy the freedom,
            flexibility, and productivity of remote work. Embrace the future of
            work and unlock your true potential from the comfort of your own
            home.
          </p>
          <div
            className="text-center"
            data-aos="fade-in"
            data-aos-duration="1000"
          >
            <MainButtonTwo type="arrow" text="Discover Remote Jobs" />
          </div>
        </div>
      </section>

      {/* Testimonials section------------------------------------------------------------------- */}
      <section className={styles.Testimonials}>
        <SectionMainTitle title="Testimonials" />
        <HomeTestimonalsSlider />
      </section>
    </>
  );
};

export default HomeMainBody;
