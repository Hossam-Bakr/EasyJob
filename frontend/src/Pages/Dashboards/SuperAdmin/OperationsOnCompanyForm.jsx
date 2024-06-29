import React, { useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { companiesManageMent } from "../../../util/Http";
import { number, object } from "yup";

const OperationsOnCompanyForm = ({
    setShowResponse,
    setResponseMessage,
    setSuccessResponse,
  }) => {

    const [operationType, setOperationType] = useState("");
    const [isUserIdExist, setIsUserIdExist] = useState(true);
  
    const { mutate } = useMutation({
      mutationFn: companiesManageMent,
      onSuccess: (data) => {
        console.log(data);
        if (data) {
          if(data==="No company found with that ID"){
              setIsUserIdExist(false)
              return;
          }    
          if (data.status === "success") {
            console.log(data);
             if (operationType === "activate") {
              setResponseMessage({
                title: "Activate Successfully",
                content: "company has been Activated Successfully",
              });
              setSuccessResponse(true);
              setShowResponse(true);
            } else if (operationType === "deActivate") {
              setResponseMessage({
                title: "DeActivated Successfully",
                content: "company has been DeActivated Successfully",
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
        if (error.message === "No company found with that ID") {
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
        companyId:"",
    };
  
    const validationSchema = object({
        companyId: number()
        .min(0, "company Id must be more than zero")
        .required("companyer Id is required"),
    });
 
    const onSubmit = (values) => {
        console.log("jjkkk")
      console.log(values);
      let compannyID=values.companyId
        if (operationType === "activate") {
        mutate({
          type: `deactivate/${compannyID}`,
          method: "patch",
          formData: "",
        });
      } else if (operationType === "deActivate") {
        mutate({
          type: `activate/${compannyID}`,
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
            id="super_company_id_operations"
            name="companyId"
            placeholder="company ID"
            className="form-control"

          />
          <ErrorMessage name="companyId" component={InputErrorMessage} />
          {!isUserIdExist && (
            <InputErrorMessage text="No company found with that ID" />
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
        </div>
      </Form>
    </Formik>
  </>
  )
}

export default OperationsOnCompanyForm
