import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import RegisterForm from "./RegisterForm";
import vector from "../../images/register_vector.png";
import AOS from "aos";
const Register = () => {
  
  useEffect(() => {
    AOS.init();
  }, []);
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className={styles.register_container}>
      <div
        className={styles.register_content}
        data-aos="fade-in"
        data-aos-duration="800"
      >
        <div className={styles.register_form}>
          <h3>Sign Up</h3>
          <RegisterForm />
        </div>
        <div className={styles.register_caption}>
          <img src={vector} alt="register vector" />
          <p>
            create a new account for your company{" "}
            <Link to={"/company-register"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
