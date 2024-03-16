import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import signFormsHandler from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faUser,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import FloatingPopup from "./../../Components/Ui/FloatingPopup";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [isRightEmail, setIsRightEmail] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);
  const navigate=useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signFormsHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        setIsRightEmail(false);
        console.log(data);
        if (role && token) {
          dispatch(fetchProfileData(token, role));
        }
        setResponseMessage({
          title: "Sent Successfully",
          content: "your new Password saved successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        navigate("/login")
        props.onHide()
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your new Password faild to be reset please try again",
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
          content: "your new Password faild to be reset please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
  });

  const initialValues = {
    email: "",
    newPassword: "",
    entityType: "user"
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      formData: values,
      method:"put"
    });
  };

  const validationSchema = object({
    email: string().email("Email not valid").required("Email is required"),
    newPassword: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
      entityType:string()
  });

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal_container}
    >
      <Modal.Body className={styles.modal_body}>
        <h4>Enter Your New Password</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className={styles.field}>
              <label htmlFor="resetPasswordEmail">Email</label>
              <Field
                type="email"
                id="resetPasswordEmail"
                name="email"
                placeholder="example@gmail.com"
              />
              {isRightEmail && (
                <InputErrorMessage text="there is no Account with this email !" />
              )}
              <ErrorMessage name="email" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
            <label htmlFor="newPass">New Password</label>

              <Field
                type="password"
                id="newPass"
                name="newPassword"
              />
              <ErrorMessage name="newPassword" component={InputErrorMessage} />
            </div>

            <div className="d-flex justify-content-end  align-items-center">
              <input
                type="radio"
                name="entityType"
                className="btn-check"
                id="entityTypeUser2"
                autoComplete="off"
                value="user"
              />
              <label
                className={`${styles.select_type} btn btn-outline-primary`}
                htmlFor="entityTypeUser2"
              >
                <FontAwesomeIcon icon={faUser} />
              </label>

              <input
                type="radio"
                name="entityType"
                className="btn-check"
                id="entityTypeCompany2"
                autoComplete="off"
                value="company"
              />
              <label
                className={`${styles.select_type} btn btn-outline-primary`}
                htmlFor="entityTypeCompany2"
              >
                <FontAwesomeIcon icon={faBuilding} />
              </label>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3 px-2">
              {isPending ? (
                <button type="submit" className={styles.save_btn}>
                  <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                </button>
              ) : (
                <button className={styles.save_btn} type="submit">
                  Submit
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </Modal.Body>

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </Modal>
  );
};

export default ResetPassword;
