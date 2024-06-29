import React, { useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { usersManageMent } from "../../../util/Http";
import { number, object } from "yup";

const OperationOnUsersForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [operationType, setOperationType] = useState("");
  const [isUserIdExist, setIsUserIdExist] = useState(true);

  const { mutate } = useMutation({
    mutationFn: usersManageMent,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        if(data==="No user found with that ID"){
            setIsUserIdExist(false)
            return;
        }    
        if (data.status === "success") {
          console.log(data);
          if (operationType === "delete") {
            setResponseMessage({
              title: "Deleted Successfully",
              content: "user has been Deleted Successfully",
            });
            setSuccessResponse(true);
            setShowResponse(true);
          } else if (operationType === "activate") {
            setResponseMessage({
              title: "Activate Successfully",
              content: "user has been Activated Successfully",
            });
            setSuccessResponse(true);
            setShowResponse(true);
          } else if (operationType === "deActivate") {
            setResponseMessage({
              title: "DeActivated Successfully",
              content: "user has been DeActivated Successfully",
            });
            setSuccessResponse(true);
            setShowResponse(true);
          }
          setOperationType("");
          setIsUserIdExist(true);
        } else {
          console.log("myelse", data);
          setResponseMessage({
            title: "Request Faild",
            content: "faild to be Updated please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "faild to be Updated please try again",
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
    userId:"",
  };

  const validationSchema = object({
    userId: number()
      .min(0, "user Id must be more than zero")
      .required("user Id is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    let userID=values.userId
    if (operationType === "delete") {
      mutate({
        type: `deleteUser/${userID}`,
        method: "delete",
        formData: "",
      });
    } else if (operationType === "activate") {
      mutate({
        type: `deactivateUser/${userID}`,
        method: "patch",
        formData: "",
      });
    } else if (operationType === "deActivate") {
      mutate({
        type: `activateUser/${userID}`,
        method: "patch",
        formData: "",
      });
    }
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
              id="super_user_id_operations"
              name="userId"
              placeholder="user ID"
              className="form-control"

            />
            <ErrorMessage name="userId" component={InputErrorMessage} />
            {!isUserIdExist && (
              <InputErrorMessage text="No user found with that ID" />
            )}
          </div>
          <div className={`${styles.button_group}`}>
            <button
              type="submit"
              onClick={() => setOperationType("activate")}
              className={`${styles.emp_btn} mx-2`}
            >
              Activate
            </button>
            <button
              type="submit"
              onClick={() => setOperationType("deActivate")}
              className={`${styles.emp_btn_deActivate} mx-2`}
            >
              DeActivate
            </button>
            <button
              type="submit"
              onClick={() => setOperationType("delete")}
              className={`${styles.emp_btn_delete} mx-2`}
            >
              Delete
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default OperationOnUsersForm;
