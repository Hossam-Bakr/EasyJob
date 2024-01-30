import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { companyActions } from "../../Store/companyNav-slice";
import styles from "./CompanyHome.module.css";
import MainButton from "./../../Components/Ui/MainButton";
import CountUpSection from "../../Components/Ui/CountUpSection";

import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import cvs from "../../images/discoverEmployees.jpg";
import hiring from "../../images/accepted.jpg";
import HomeTopEmployersSlider from "../../Components/Ui/HomeTopEmployersSlider";

const CompanyHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const navigateToCompanySignUpPage = () => {
    navigate("/company-register");
  };
  const navigateToPackages = () => {
    navigate("/packages");
  };

  useEffect(() => {
    AOS.init();
    dispatch(companyActions.changeNavState({
      changeCompany:true,
      changeNav:true
    }));
    return () => {
      dispatch(companyActions.changeNavState({
        changeCompany:false,
        changeNav:false
      }));
    };
  }, [dispatch]);

  const center = "d-flex justify-content-center align-items-center";

  return (
    <>
      <header className={styles.company_header}>
        <div className={styles.company_header_layer}>
          <div
            className={styles.capture}
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <h2>Find the best employees for your company</h2>
            <p className={styles.company_header_p}>
              Save yourself the trouble of choosing employees and leave it to us
            </p>
            <MainButton
              onClick={navigateToCompanySignUpPage}
              text="Get Started"
            />
          </div>
        </div>
        <a href="#firstSec">
          <div className={styles.scroll_down}>
            <div className={styles.small_circle}></div>
          </div>
        </a>
      </header>

      <section className={`${styles.first_sec} ${center}`} id="firstSec">
        <Container fluid>
          <Row>
            <Col md={7} className={center}>
              <div className={styles.first_sec_caption}>
                <h2>
                  Discover a World of Talent - Your Ultimate Hiring Solution
                </h2>
                <p>
                  Discover a world of talent and streamline your hiring process
                  with <span className="special_main_color">Easy Job</span>, the
                  ultimate solution for connecting companies with top
                  candidates. Unlock unlimited possibilities for your
                  organization and find the perfect fit for your team today.
                </p>
                <MainButton onClick={navigateToPackages} text="View Packages" />
              </div>
            </Col>
            <Col md={5} className={center}>
              <div className={styles.hiring_img}>
                <img src={cvs} alt="hiring employees" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${styles.sec_sec}`}>
        <CountUpSection />
      </section>

      <section className={`${styles.first_sec} ${center}`} id="firstSec">
        <Container fluid>
          <Row>
            <Col md={5} className={center}>
              <div className={styles.hiring_img}>
                <img src={hiring} alt="hiring employees" className="w-100" />
              </div>
            </Col>
            <Col md={7} className={center}>
              <div className={styles.first_sec_caption}>
                <h2>Discover a Wealth of Qualified Candidates</h2>
                <p>
                  We take pride in curating a diverse and extensive candidate
                  database, meticulously matching their skills, qualifications,
                  and experience with your specific requirements. With our vast
                  selection of candidates, you'll have the advantage of choosing
                  from a wide range of highly capable individuals ready to
                  contribute to your company's success. Streamline your
                  recruitment process and find your perfect match with us.
                </p>
                <MainButton
                  onClick={navigateToCompanySignUpPage}
                  text="Register Now"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={styles.fourth_sec}>
        <h2 className="text-center mb-5">Trusted By</h2>
        <HomeTopEmployersSlider type='two_rows'/>
      </section>
    </>
  );
};

export default CompanyHome;
