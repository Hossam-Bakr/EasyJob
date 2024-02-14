import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import styles from "./CompanyAccountSettingForm.module.css";

const CompanyAccountSettingForm = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  // mutate,
  const { isPending } = useMutation({
    // mutationFn: signFormsHandler,
    onSuccess: (response) => {
      let res = response.data;
      if (res.status === "success") {
        setResponseMessage({
          title: "Saved Successfully",
          content: "your logo and cover updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your changes did not save please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your changes didnot save please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    // mutate({ type: "login", formData: values });
    console.log(values);
  };
  const validationSchema = object({
    currentPassword: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
    newPassword: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
    confirmPassword: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.setting_form_container}>
          <h3 className={styles.title}>Change Current Password</h3>
          <div className={styles.input_faild}>
            <label htmlFor="currentPassword">Current Password</label>
            <Field
              type="password"
              id="currentPassword"
              name="currentPassword"
            />
            <ErrorMessage
              name="currentPassword"
              component={InputErrorMessage}
            />
          </div>

          <div className={styles.input_faild}>
            <label htmlFor="newPassword">Change Password</label>
            <Field type="password" id="newPassword" name="newPassword" />
            <ErrorMessage name="newPassword" component={InputErrorMessage} />
          </div>

          <div className={styles.input_faild}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorMessage
              name="confirmPassword"
              component={InputErrorMessage}
            />
          </div>
          <div className="text-end">
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button type="submit" className={styles.save_btn}>
                Savge Changes
              </button>
            )}
          </div>
        </Form>
      </Formik>

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default CompanyAccountSettingForm;
