import React from "react";
import { Link } from 'react-router-dom';
import styles from "./LoginForm.module.css";
import SignWithGoogle from "../../Components/Ui/SignWithGoogle";
// import  axios  from 'axios';

const LoginForm = () => {
  return (
    <form className={styles.login_form}>
      <div className={styles.user_input_faild}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          email="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div className={styles.user_input_faild}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
        />
      </div>
      <button type="submit" className={styles.login_btn}>
        Login
      </button>
      <div className={styles.form_options}>
        <div className={styles.remember_div}>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">remeber me</label>
        </div>
        <span>
          create new account? <Link to={'/register'}>Sign Up</Link>
        </span>
      </div>
      <span className='or_span'>or</span>
      <a href="google.com">
        <SignWithGoogle text='Sign in with google'/>
      </a>
      {/* note there is fake link */}
    </form>
  );
};

export default LoginForm;
