import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import styles from './RegisterForm.module.css';
import SignWithGoogle from './../../Components/Ui/SignWithGoogle';
import { useMutation } from '@tanstack/react-query';
import signFormsHandler from './../../util/Http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons';


const RegisterForm = () => {

  const [isEmailError, setIsEmailError] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signFormsHandler,
  
    onSuccess: (response) => {
      if (response.data.status === 'success') {
        setIsEmailError(false);
        navigate('/login');
      }
      else {
        alert('sorry something went wrong please try again later!');
        console.log(response)
      }
    },
    onError(error) {
      console.log(error)
      if (error.status === 500) {
        if (error.data.message === 'connection <monitor> to 15.185.166.107:27017 timed out') {
          setIsEmailError(false);
          alert('sorry! time out please check your network or try again later');
        }
        else {
          setIsEmailError(true);
        }
      }
      else {
        alert('sorry something went wrong please try again later!');
      }
    }
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    mutate({ type: "user/signup", formData: values });
  };
  const validationSchema = object({
    firstName: string().min(3, "first name should be at min 3 char").max(20, "first name should be at max 20 char").required("first name is required"),
    lastName: string().min(3, "last name should be at min 3 char").max(20, "last name should be at max 20 char").required("first name is required"),
    email: string().email("email not valid").required("email is required"),
    password: string().min(5, "Min 5 characters").required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, 'Must contain at least one lowercase character')
      .matches(/[0-9]+/, 'Must contain at least one number'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.register_form}>
        <div className={`${styles.name_faild} d-flex justify-content-between align-items-center mb-5`}>
          <div className={`${styles.fname} d-flex flex-column me-2 position-relative`}>
            <Field type="text" id='firstName' name='firstName' placeholder="First Name" />
            <ErrorMessage name='firstName' component={InputErrorMessage} />
          </div>
          <div className={`${styles.lname} d-flex flex-column ms-2 position-relative `}>
            <Field type="text" id='lastName' name='lastName' placeholder="last Name" />
            <ErrorMessage name='lastName' component={InputErrorMessage} />
          </div>
        </div>
        <div className='d-flex flex-column mb-5 position-relative'>
          <Field type="email" id='email' name='email' placeholder='Email' />
          <ErrorMessage name='email' component={InputErrorMessage} />
          {isEmailError && <InputErrorMessage text='email already exist!' />}
        </div>
        <div className='d-flex flex-column mb-5 position-relative'>
          <Field type="password" id='Password' name='password' placeholder='Password' />
          <ErrorMessage name='password' component={InputErrorMessage} />
        </div>
        {isPending ? <button type='submit' className={styles.register_btn}><FontAwesomeIcon className='fa-spin' icon={faYinYang} /></button> : <button type='submit' className={styles.register_btn}>Register</button>}
        <div>
          <span className='or_span'>or</span>
          <a href="google.com">
            <SignWithGoogle text='Register using google' />
          </a>
        </div>
        <p className={styles.sign_company_p}>create a new account for your company <Link to={'/company-register'}>Sign Up</Link></p>
      </Form>
    </Formik>
  )
}

export default RegisterForm
