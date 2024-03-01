import React, { useEffect, useState } from "react";
import styles from "./CompanyRegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { useMutation } from "@tanstack/react-query";
import signFormsHandler from "../../util/Http";
import { object, string } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import MultiSelect from "../../Components/logic/SelectField";

const CompanyRegisterForm = () => {
  const [isEmailError, setIsEmailError] = useState(false);
  const [myIndustry, setMyIndustry] = useState(null);
  
  const navigate = useNavigate();

  const currentIndustries = useSelector((state) => state.category.industries);

  useEffect(() => {
    if (currentIndustries) {
      let industryOptions = currentIndustries.map((indust) => ({
        value: indust.id,
        label: indust.name
      }));
      setMyIndustry(industryOptions);
    }
  }, [currentIndustries]);

  const { mutate, isPending } = useMutation({
    mutationFn: signFormsHandler,

    onSuccess: (response) => {
      if (response.data.status === "success") {
        console.log(response);
        setIsEmailError(false);
        navigate("/login");
      } else {
        alert("sorry something went wrong please try again later!");
        console.log(response);
      }
    },

    onError: (error) => {
      console.log(error);
      if (error.status === 500) {
        if (
          error.data.message ===
          "connection <monitor> to 15.185.166.107:27017 timed out"
        ) {
          setIsEmailError(false);
          alert("sorry! time out please check your network or try again later");
        } else {
          setIsEmailError(true);
        }
      } else {
        alert("sorry something went wrong please try again later!");
        console.log(error);
      }
    },
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    industryId: "",
  };
  const onSubmit = (values) => {
    mutate({ type: "company/signup", formData: values });
  };
  const validationSchema = object({
    name: string()
      .min(3, "Company name should be at min 3 char")
      .max(20, "Company name should be at max 20 char")
      .required("Company name is required"),
    email: string().email("Email not valid").required("Email is required"),
    password: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
    phone: string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number")
      .required("phone is required"),
    industryId: string().required("Industry is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.register_form}>
        <div className={`${styles.field} mb-4`}>
          <Field type="text" name="name" id="name" placeholder="Company Name" />
          <ErrorMessage name="name" component={InputErrorMessage} />
        </div>
        <div className={`${styles.field} mb-4`}>
          <Field type="email" name="email" id="email" placeholder="Email" />
          <ErrorMessage name="email" component={InputErrorMessage} />
          {isEmailError && <InputErrorMessage text="email already exist!" />}
        </div>
        <div className={`${styles.field} mb-4`}>
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component={InputErrorMessage} />
        </div>
        <div className={`${styles.field} mb-4`}>
          <Field type="tel" name="phone" id="phone" placeholder="phone" />
          <ErrorMessage name="phone" component={InputErrorMessage} />
        </div>

        <div className={`${styles.select_industry} mb-4`}>
          <Field
            name="industryId"
            placeholder="industry"
            isMulti={false}
            component={MultiSelect}
            options={myIndustry}
          />
          <ErrorMessage name="industryId" component={InputErrorMessage} />
        </div>

        {isPending ? (
          <button className={styles.register_btn}>
            <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
          </button>
        ) : (
          <button type="submit" className={styles.register_btn}>
            Register
          </button>
        )}
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
