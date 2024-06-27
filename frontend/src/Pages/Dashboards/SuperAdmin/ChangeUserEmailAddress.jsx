import React, { useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { usersManageMent } from "../../../util/Http";
import { number, object, string } from "yup";

const ChangeUserEmailAddress = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [isIdFound, setIsIdFound] = useState(true);
  const [isEmailError, setIsEmailError] = useState(false);

  const { mutate } = useMutation({
    mutationFn: usersManageMent,
    onSuccess: (data) => {
      console.log(data);

      if (data === "email is already exist") {
        setIsEmailError(true);
        return;
      }
      if (data) {
        if (data === "No user found with that ID") {
          setIsIdFound(false);
          return;
        }
        if (data.status === "success") {
          setIsEmailError(false);
          setIsIdFound(true);
          console.log(data);
          setResponseMessage({
            title: "Changed Successfully",
            content: "Email Address has been Changed Successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
        } else {
          console.log("myelse", data);
          setResponseMessage({
            title: "Request Faild",
            content: "faild to be Changed please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "faild to be Changed please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "faild to be Changed please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      setIsIdFound(true);
      setIsEmailError(false);
    },
  });

  const initialValues = {
    userId: "",
    email: "",
  };

  const validationSchema = object({
    userId: number()
      .min(1, "user Id must be more than zero")
      .required("user Id is required"),
    email: string().email("email not valid").required("email is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
    let updatedFormValue = { email: `${values.email}` };

    mutate({
      type: `changeEmail/${values.userId}`,
      method: "changeEmail",
      formData: updatedFormValue,
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.emp_form}>
          <div className="d-flex flex-column mb-5 position-relative">
            <Field
              type="number"
              id="super_user_id_changeEmail"
              name="userId"
              placeholder="user ID"
            />
            <ErrorMessage name="userId" component={InputErrorMessage} />
            {!isIdFound && (
              <InputErrorMessage text="No user found with that ID" />
            )}
          </div>
          <div className="d-flex flex-column mb-5 position-relative">
            <Field
              type="text"
              id="super_user_email"
              name="email"
              placeholder="something@examle.com"
            />
            <ErrorMessage name="email" component={InputErrorMessage} />
            {isEmailError && <InputErrorMessage text="email already exist!" />}
          </div>
          <div className={styles.emp_btn_div}>
            <button type="submit" className={styles.emp_btn}>
              Change Email
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ChangeUserEmailAddress;
