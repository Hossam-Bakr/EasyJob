import React, { useEffect } from "react";
import styles from "./HomeMainBody.module.css";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faChartSimple,
  faCircleCheck,
  faCode,
  faDisplay,
  faHeadphonesSimple,
  faHelmetSafety,
  faPaintBrush,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import HomeTopEmployersSlider from "../../Components/Ui/HomeTopEmployersSlider";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";
import MainButtonTwo from "./../../Components/Ui/MainButtonTwo";
import HomeCitiesSliders from "../../Components/Ui/HomeCitiesSliders";
import find_job from "../../images/cvMan2.jpg";
import HomeTestimonalsSlider from "../../Components/Ui/HomeTestimonalsSlider";
import JobPost from "../../Components/Ui/JobPost";

const HomeMainBody = () => {
  const darkMode = useSelector((state) => state.mode.darkMode);
  const resumeCaptionClasses = !darkMode
    ? styles.resume_caption
    : styles.resume_caption_dark;

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
                <span className={styles.step_num}>01</span>
                <h5>Complete Your Profile</h5>
                <div className={styles.step_caption}>
                  <h5>Complete Your Profile</h5>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.circleCheck_icon}
                      />
                      create an account
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.circleCheck_icon}
                      />
                      fill your profile to find best job.
                    </li>
                  </ul>
                  <div className={`${styles.step_btn_div} px-2 mt-4`}>
                    <MainButtonTwo type="arrow" text="sign up" />
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
                <span className={styles.step_num}>02</span>
                <h5>Find Your Job</h5>
                <div className={styles.step_caption}>
                  <h5>Complete Your Profile</h5>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.circleCheck_icon}
                      />
                      search your job
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.circleCheck_icon}
                      />
                      apply for job
                    </li>
                  </ul>
                  <div className={`${styles.step_btn_div} px-2 mt-4`}>
                    <MainButtonTwo type="arrow" text="discover jobs" />
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
                <span className={styles.step_num}>03</span>
                <h5> Upload Your CV</h5>
                <div className={styles.step_caption}>
                  <h5>Complete Your Profile</h5>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.circleCheck_icon}
                      />
                      prepare your cv in pdf form
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.circleCheck_icon}
                      />
                      easily apload your cv
                    </li>
                  </ul>
                  <div className={`${styles.step_btn_div} px-2 mt-4`}>
                    <MainButtonTwo type="arrow" text="upload cv" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* resume caption section------------------------------------------------------------------- */}
      <section className={resumeCaptionClasses}>
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
                <img src={find_job} alt="man with laptop" />
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
                      icon={faCircleCheck}
                      className={styles.circleCheck_icon}
                    />
                    Search all the open positions on the web
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={styles.circleCheck_icon}
                    />
                    Get your own personalized salary estimate.
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={styles.circleCheck_icon}
                    />
                    Read reviews on over 600,000 companies worldwide.
                  </li>
                </ul>
                <div className="text-center">
                  <MainButtonTwo text="Start Finding Jobs" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* featured job section------------------------------------------------------------------- */}
      <section className={styles.fearured_job}>
        <SectionMainTitle title="Featured Job Offers" />
        <Container fluid="lg" className="pb-5">
          <Row>  

            <JobPost name='Yata' jobTitle='Nuclear Power Engineer' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L1' city='Cairo'/>
         
            <JobPost name='Blognation' jobTitle='Technical Writer' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L2' city='Giza'/>
         
            <JobPost name='Mynte' jobTitle='Frontend React Developer' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L3' city='Alex'/>
     
          <JobPost name='Voonder' jobTitle='Financial Advisor' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L4' city='Cairo'/>
          
          <JobPost name='Abata' jobTitle='Node Js| php developer' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L5' city='Tanta'/>
          <JobPost name='Abata' jobTitle='Node Js| php developer' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L5' city='Tanta'/>
          <JobPost name='Linktype' jobTitle='GIS Technical Architect' desc=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta.' logo='L6' city='Cairo'/>
          </Row>
          <div className="text-center">
            <MainButtonTwo text="View All Listing" />
          </div>
        </Container>
      </section>

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
          <MainButtonTwo text="All Job Offers " />
        </div>
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
          <MainButtonTwo text="All Categories " />
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
        <div
          className={`${styles.testimonials_first_circle_shape} d-flex justify-content-center align-items-center`}
        >
          <div
            className={`${styles.testimonials_second_circle_shape} d-flex justify-content-center align-items-center`}
          >
            <div
              className={`${styles.testimonials_third_circle_shape} d-flex justify-content-center align-items-center`}
            >
              <div className={styles.testimonials_fourth_circle_shape}></div>
            </div>
          </div>
        </div>
        <SectionMainTitle title="Testimonials" />
        <HomeTestimonalsSlider />
      </section>
    </>
  );
};

export default HomeMainBody;
