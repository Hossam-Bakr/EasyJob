import React, { useEffect } from "react";
import styles from "./CompanyRegister.module.css";
import CompanyRegisterForm from "./CompanyRegisterForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { companyActions } from "../../Store/companyNav-slice";
import AOS from "aos";

const CompanyRegister = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      companyActions.changeNavState({
        changeCompany: false,
        changeNav: true,
      })
    );
    return () => {
      dispatch(
        companyActions.changeNavState({
          changeCompany: false,
          changeNav: false,
        })
      );
    };
  }, [dispatch]);
  return (
    <div className={styles.company_register_container}>
      <div className={styles.company_register_caption}>
        <div className={styles.company_register_caption_layer}></div>
        <div
          className={styles.company_register_caption_content}
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <h3>Empower Your Recruitment</h3>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.circleCheck_icon}
              />
              Unlock Your Company's Potential
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.circleCheck_icon}
              />
              Join Our Network of Top Employers
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.circleCheck_icon}
              />
              Discover Talent, Build Your Dream Team
            </li>
          </ul>
          <div className={styles.sign_user_p}>
            <p>
              create a new account as an employee{" "}
              <Link to={"/user-register"}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className={styles.company_register_form}

      >
        <h3>Sign Up</h3>
        <div className={styles.register_form} data-aos="fade-left"
        data-aos-duration="1000">
        <CompanyRegisterForm />

        </div>
        <div className={styles.bubble}></div>

        <div className={styles.small_bubble_one}></div>
        <div className={styles.small_bubble_two}></div>
      </div>
    </div>
  );
};

export default CompanyRegister;
