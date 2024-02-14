import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import styles from "./CompanyAccountSettingForm.module.css";
const CompanyAccountSettingFormTwo = () => {
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
          content: "your changes didnot save please try again",
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
    newEmail: "",
    confirmEmail: "",
  };

  const onSubmit = (values) => {
    // mutate({ type: "login", formData: values });
    console.log(values);
  };
  const validationSchema = object({
    newEmail: string().email("Email not valid").required("Email is required"),
    confirmEmail: string()
      .email("Email not valid")
      .required("Email is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.setting_form_container}>
          <h3 className={styles.title}>Change Current Email</h3>
          <div className={styles.input_faild}>
            <label htmlFor="newEmail">New Email</label>
            <Field
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="example@gmail.com"
            />
            <ErrorMessage name="newEmail" component={InputErrorMessage} />
          </div>
          <div className={styles.input_faild}>
            <label htmlFor="confirmEmail">Confirm New Email</label>
            <Field type="email" id="confirmEmail" name="confirmEmail" />
            <ErrorMessage name="confirmEmail" component={InputErrorMessage} />
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

export default CompanyAccountSettingFormTwo;
