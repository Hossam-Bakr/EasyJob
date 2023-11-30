import React from 'react';
import styles from './SignWithGoogle.module.css';
import google from "../../images/google.png";

const SignWithGoogle = ({text}) => {
  return (
    <div className={styles.sign_with_google}>
        <img src={google} alt="google" />
        <span>{text}</span>
  </div>
  )
}

export default SignWithGoogle
