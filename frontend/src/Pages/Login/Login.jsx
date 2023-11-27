import React from 'react';
import styles from './Login.module.css';
import logo from '../../images/logoNav.png';
import vector from "../../images/login vector.png"
import google from "../../images/google.png";
import { Link } from 'react-router-dom';

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
          <form>
            <div className={styles.user_input_faild}>
              <label htmlFor="email">Email</label>
              <input type='email' id='email' email='email' placeholder='example@gmail.com'/>
            </div>
            <div className={styles.user_input_faild}>
              <label htmlFor="password">Password</label>
              <input type='password' id='password' name='password' placeholder='********'/>
            </div>
            <button type='submit' className={styles.login_btn}>Login</button>
            <div className={styles.form_options}>
              <div className={styles.remember_div}>
                <input type="checkbox" id='rememberMe' />
                <label htmlFor="rememberMe">remeber me</label>
              </div>
              <span>have an account? <Link>Sign Up</Link></span>
            </div>
            <span className={styles.or_span}>or</span>
            <a href="google.com"><div className={styles.sign_with_google}> <img src={google} alt="google" /><span>Sign in with google</span> </div></a>   {/* note here is fake link */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
