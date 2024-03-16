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
import ResetPassword from "./ResetPassword";

const VerificationCode = (props) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [isRightEmail, setIsRightEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

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
          content: "Check Your email to reset password",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        setShowModal(true);
        props.onHide();
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
    resetCode: "",
    entityType: "user",
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      formData: values,
      type: "verifyPassResetCode",
    });
  };

  const validationSchema = object({
    resetCode: string().required("code is required"),
    entityType: string(),
  });

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modal_container}
      >
        <Modal.Body className={styles.modal_body}>
          <h4>Enter Code that Sent To Your Email</h4>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className={styles.verify_form}>
                <Field
                  type="text"
                  id="forgetPasswordEmail"
                  name="resetCode"
                  placeholer="######"
                />
                {isRightEmail && (
                  <InputErrorMessage text="there is no Account with this email !" />
                )}
                <ErrorMessage name="resetCode" component={InputErrorMessage} />
              </div>

              <div className="d-flex justify-content-end  align-items-center">
                <input
                  type="radio"
                  name="entityType"
                  className="btn-check"
                  id="entityTypeUser"
                  autoComplete="off"
                  value="user"
                />
                <label  className={`${styles.select_type} btn btn-outline-primary`} htmlFor="entityTypeUser">
                  <FontAwesomeIcon icon={faUser} />
                </label>

                <input
                  type="radio"
                  name="entityType"
                  className="btn-check"
                  id="entityTypeCompany"
                  autoComplete="off"
                  value="company"
                />
                <label
                   className={`${styles.select_type} btn btn-outline-primary`}
                  htmlFor="entityTypeCompany"
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
                    Verify
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

      <ResetPassword show={showModal} onHide={() => setShowModal(true)} />
    </>
  );
};

export default VerificationCode;
