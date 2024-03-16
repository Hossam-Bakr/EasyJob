import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import signFormsHandler from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "./../../Components/Ui/FloatingPopup";
import lock from "../../images/lock.jpg";
import { Link } from "react-router-dom";
import VerificationCode from "./VerificationCode";

const ForgetPassword = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [isRightEmail, setIsRightEmail] = useState(false);
  const [showModal,setShowModal]=useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: signFormsHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        setIsRightEmail(false);
        console.log(data);
        setResponseMessage({
          title: "Sent Successfully",
          content: "Check Your email to reset password",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        setShowModal(true)
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "faild to be send reset email please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      if (error.data.message === "account with this email not found") {
        setIsRightEmail(true);
      } else {
        setIsRightEmail(false);
        setResponseMessage({
          title: "Request Faild",
          content: "faild to be send reset email please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
  });

  const initialValues = {
    email: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      formData: values,
      type: "forgotPassword",
    });
  };

  const validationSchema = object({
    email: string().email("Email not valid").required("Email is required"),
  });

  return (
    <div className={styles.general_info_form}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          <div className={styles.form_header}>
            <div className={styles.lock_img}>
              <img src={lock} alt="lock" />
            </div>
            <h3>Having trouble logging in?</h3>
            <span className="mini_word">
              Enter your email and we will send you a password reset code
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="getPassEmail">Email</label>
            <Field
              type="email"
              id="getPassEmail"
              name="email"
              placeholder="example@gmail.com"
            />
            {isRightEmail && <InputErrorMessage text="there is no Account with this email !" />}
            <ErrorMessage name="email" component={InputErrorMessage} />
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3 px-2">
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Send Email
              </button>
            )}
          </div>
          <div className={styles.options}>
            <span className="or_span">or</span>

            <span className="mini_word">
              or you can create new account{" "}
              <Link to={"/user-register"}>Sign Up</Link>
            </span>
          </div>
        </Form>
      </Formik>

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
      <VerificationCode
        show={showModal}
        onHide={()=>setShowModal(true)}
      />
    </div>
  );
};

export default ForgetPassword;
