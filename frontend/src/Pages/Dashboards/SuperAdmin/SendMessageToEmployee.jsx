import React, { useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { usersManageMent } from "../../../util/Http";
import { number, object, string } from "yup";

const SendMessageToEmployee = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [isUserIdExist, setIsUserIdExist] = useState(true);

  const { mutate } = useMutation({
    mutationFn: usersManageMent,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        if (data === "No user found with that ID") {
          setIsUserIdExist(false);
          return;
        }
        if (data.status === "success") {
          console.log(data);

          setResponseMessage({
            title: "Sent Successfully",
            content: "Email has been Sent Successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          setIsUserIdExist(true);
        } else {
          console.log("myelse", data);
          setResponseMessage({
            title: "Request Faild",
            content: "Email faild to be Sent please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Email faild to be Sent please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      if (error.message === "No user found with that ID") {
        setIsUserIdExist(false);
      }
      setResponseMessage({
        title: "Request Faild",
        content: "faild to be updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    userId: "",
    subject: "",
    message: "",
  };

  const validationSchema = object({
    userId: number()
      .min(1, "User Id must be more than zero")
      .required("User Id is required"),
    subject: string().required("Subject is required"),
    message: string()
      .min(20, "Message must be at least 20 characters")
      .required("Message is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    let data = { subject: values.subject, message: values.message };
    let userID = values.userId;

    mutate({
      type: `sendEmail/${userID}`,
      method: "post",
      formData: data,
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
              id="super_user_id_email_user"
              name="userId"
              placeholder="user ID"
              className="form-control"
            />
            <ErrorMessage name="userId" component={InputErrorMessage} />
            {!isUserIdExist && (
              <InputErrorMessage text="No user found with that ID" />
            )}
          </div>
          <div className="d-flex flex-column mb-5 position-relative">
            <Field
              type="text"
              id="super_user_subject"
              name="subject"
              placeholder="subject"
              className="form-control"
            />
            <ErrorMessage name="subject" component={InputErrorMessage} />
          </div>
          <div className="d-flex flex-column mb-5 position-relative">
            <Field
              as="textarea"
              id="super_user_message"
              name="message"
              rows="3"
              placeholder="Message"
              className="form-control"
            />
            <ErrorMessage name="message" component={InputErrorMessage} />
          </div>
          <div className={`${styles.button_group}`}>
            <button type="submit" className={styles.emp_btn}>
              Send Message
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SendMessageToEmployee;
