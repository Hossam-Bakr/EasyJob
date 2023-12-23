import React from "react";
import styles from "./CompanyRegisterForm.module.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { useMutation } from "@tanstack/react-query";
import signFormsHandler from "../../util/Http";
import { object, string } from "yup";

const CompanyRegisterForm = () => {
  const { mutate } = useMutation({
    mutationFn: signFormsHandler,
    onSuccess:(response)=>{
      console.log(response)
   },
   onError:(error)=>{
      console.log(error)
   }

  });

  const initialValues = {
    name: "",
    email: "",
    description:"",
    password: "",
  };
  const onSubmit = (values) => {
    mutate({ type: "company/signup", formData: values });
  };
  const validationSchema = object({
    name: string()
      .min(3, "Company name should be at min 3 char")
      .max(20, "Company name should be at max 20 char")
      .required("Company name is required"),
      description: string(),
    email: string().email("Email not valid").required("Email is required"),
    password: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.register_form}>
        <div className="mb-4">
          <Field type="text" name="name" id="name" placeholder="Company Name" />
          <ErrorMessage name="name" component={InputErrorMessage} />
        </div>
        <div className="mb-4">
          <Field
            type="text"
            name="description"
            id="description"
            placeholder="description"
          />
          <ErrorMessage name="description" component={InputErrorMessage} />
        </div>
        <div className="mb-4">
          <Field type="email" name="email" id="email" placeholder="Email" />
          <ErrorMessage name="email" component={InputErrorMessage} />
        </div>
        <div className="mb-4">
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component={InputErrorMessage} />
        </div>
        <button className={styles.register_btn} type="submit">
          Sign Up
        </button>
        <div className="mt-2">
          <span className={styles.register_span}>
            Already have an account? <Link to="/login">sign in</Link>
          </span>
        </div>
      </Form>
    </Formik>
  );
};

export default CompanyRegisterForm;
