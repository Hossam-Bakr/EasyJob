import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import SignWithGoogle from './../../Components/Ui/SignWithGoogle';

const RegisterForm = () => {
  return (
    <form className={styles.register_form}>
      <div className={`${styles.name_faild} d-flex justify-content-between align-items-center my-3`}>
        <div className={`${styles.fname} d-flex flex-column me-2`}>
          <label htmlFor="fname">First Name</label>
          <input type="text" id='fname'/>
        </div>
        <div className={`${styles.lname} d-flex flex-column ms-2`}>
         <label htmlFor="lname">last Name</label>
         <input type="text" id='lname'  />
        </div>
      </div>
      <div className='d-flex flex-column my-3'>
        <label htmlFor="email">Email</label>
        <input type="email" id='email'  placeholder='example@gmail.com'  />
      </div>
      <div className='d-flex flex-column my-3'>
        <label htmlFor="Password">Password</label>
        <input type="password"  id='Password' placeholder='*********'  />
      </div>
      <button type='submit' className={styles.register_btn}>Register</button>
      <div>
        <span className='or_span'>or</span>
        <a href="google.com">
            <SignWithGoogle text='Register using google'/>
        </a>
      </div>
      <p className={styles.sign_company_p}>create a new account for your company <Link>Sign Up</Link></p>
    </form>
  )
}

export default RegisterForm
