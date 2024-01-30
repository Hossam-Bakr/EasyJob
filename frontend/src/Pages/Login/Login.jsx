import React from 'react';
import styles from './Login.module.css';
import logo from '../../images/mainLogo.png';
import vector from "../../images/login vector.png";
import LoginForm from './LoginForm';

const Login = () => {

  return (
    <div className={styles.user_login_container}>
      <div className={styles.user_login_content}>
        <div className={styles.user_login_caption}>
          <div className={styles.login_logo}><img src={logo} alt="logo" /></div>
          <h3>Hello! Welcome back to Easy Job</h3>
          <div className={styles.caption_vector}>
           <img src={vector} alt="working on laptop vector" />
          </div>
        </div>
        <div className={styles.user_login_form}>
          <h3>Login</h3>
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

export default Login
