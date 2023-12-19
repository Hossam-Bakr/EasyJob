import React from 'react';
import styles from './CompanyRegisterForm.module.css';
import { Link } from 'react-router-dom';

const CompanyRegisterForm = () => {
  return (
    <form className={styles.register_form}>
      <div className='mb-4'>
         <input type='text' name='company' placeholder='Company Name'/>       
      </div>
      <div className='mb-4'>
         <input type='text' name='name' placeholder='Responsible Person'/>       
      </div>
      <div className='mb-4'>
         <input type='email' name='email' placeholder='Email'/>       
      </div>
      <div className='mb-4'>
         <input type='password' name='password' placeholder='Password'/>       
      </div>
      <div className='my-2'>
      <span className={styles.register_span}>Already have an account? <Link to='/login'>sign in</Link></span>
      </div>
      <button className={styles.register_btn} type='submit'>Sign Up</button>
    </form>
  )
}

export default CompanyRegisterForm
