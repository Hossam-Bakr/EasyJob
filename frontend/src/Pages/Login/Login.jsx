import React, { useEffect } from "react";
import styles from "./Login.module.css";
import logo from "../../images/mainLogo.png";
import vector from "../../images/loginVector.png";
import LoginForm from "./LoginForm";
import AOS from "aos";

const Login = () => {

  useEffect(() => {
    AOS.init();
  }, []);
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className={styles.user_login_container}>
      <div className={styles.layer}></div>
      <div
        className={styles.user_login_content}
        data-aos="zoom-in-up"
        data-aos-duration="800"
      >
        <div className={styles.user_login_caption}>
          <div className={styles.login_logo}>
            <img src={logo} alt="logo" />
          </div>
          <h3>Hello! Welcome back to Easy Job</h3>
          <div className={styles.caption_vector}>
            <img src={vector} alt="working on laptop vector" />
          </div>
        </div>
        <div className={styles.user_login_form}>
          <h3>Login</h3>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
