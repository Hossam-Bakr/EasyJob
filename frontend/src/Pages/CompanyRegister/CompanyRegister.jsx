import React from 'react';
import styles from './CompanyRegister.module.css';
import CompanyRegisterForm from './CompanyRegisterForm';
import { Link } from 'react-router-dom';

const CompanyRegister = () => {
  return (
    <div className={styles.company_register_container}>
        <div className={styles.company_register_caption}> 
          <div className={styles.company_register_caption_layer}></div>
          <div className={styles.company_register_caption_content}>
            <h3>Connect. Engage. Hire.</h3>
            <p>Discover Top Talent and Build Your Dream Team - Sign up as a one of our Top Employers</p>

            <p className={styles.sign_user_p}>create a new account as an employee <Link to={'/user-register'}>Sign Up</Link></p>
          </div>
        </div>
        <div className={styles.company_register_form}>
          <h3>Sign Up</h3>
          <CompanyRegisterForm/>
        </div>
    </div>
  )
}

export default CompanyRegister
