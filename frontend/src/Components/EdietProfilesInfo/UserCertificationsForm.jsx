import React, {useState } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { date, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "./../Ui/FloatingPopup";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";


const UserCertificationsForm = () => {

    const [showResponse, setShowResponse] = useState(false);
    const [responseMessage, setResponseMessage] = useState({
      title: "",
      content: "",
    });
    const [successResponse, setSuccessResponse] = useState(true);
  
    const dispatch = useDispatch();
  
    const token = useSelector((state) => state.userInfo.token);
    const role = useSelector((state) => state.userInfo.role);
  
    const { mutate, isPending } = useMutation({
      mutationFn: updateFormHandler,
      onSuccess: (data) => {
        if (data.data.status === "success") {
          console.log(data);
          if (role && token) {
            dispatch(fetchProfileData(token, role));
          }
          setResponseMessage({
            title: "Saved Successfully",
            content: "Your Certificate Saved successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
        } else {
          setResponseMessage({
            title: "Request Faild",
            content:
              "Your Certificate faild to be uploaded please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      },
      onError: (error) => {
        console.log(error);
        setResponseMessage({
          title: "Request Faild",
          content: "Your Certificate faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      },
    });
  
    const initialValues = {
      title: "",
      organization: "",
      issueDate: "2000-01-01",
      credentialID: "",
      credentialURL: "",
      description: "",
    };
  
    const onSubmit = (values) => {
      console.log(values);
      mutate({
        type: "certification",
        formData: values,
        token: token,
        role: "users",
        method: "post",
      });
    };
  
    const today = new Date();
  
    const validationSchema = object({
      title: string().required("title is required"),
      organization: string().required("organization name is required"),
      issueDate: date()
        .test("futureDate", "Future dates are not allowed", function (value) {
          const selectedDate = new Date(value);
          return selectedDate <= today;
        })
        .required("issueDate is required"),
        credentialID: string().required("credentialID is required"),
        credentialURL:string().url('Please enter a valid URL').required("credentialURL is required"),
        description: string()
    });


  return (
    <>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.general_info_form}>
        <div className={styles.field}>
          <label htmlFor="title">title</label>
          <Field
            type="text"
            id="title"
            name="title"
            placeholder="ex: Accountant Certificate"
          />
          <ErrorMessage name="title" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="organization">Organization</label>
          <Field
            type="text"
            id="organization"
            name="organization"
            placeholder="ex: Microsoft"
          />
          <ErrorMessage name="organization" component={InputErrorMessage} />
        </div>


          <div className={styles.field}>
            <label htmlFor="issueDate">issueDate</label>
            <Field type="date" id="issueDate" name="issueDate" />
            <ErrorMessage name="issueDate" component={InputErrorMessage} />
          </div>

        <div className={styles.field}>
          <label htmlFor="credentialURL">credential URL</label>
          <Field
            type="text"
            id="credentialURL"
            name="credentialURL"
            placeholder="ex: Accountant Certificate"
          />
          <ErrorMessage name="credentialURL" component={InputErrorMessage} />
        </div>
        <div className={styles.field}>
          <label htmlFor="credentialID">credential ID</label>
          <Field
            type="text"
            id="credentialID"
            name="credentialID"
            placeholder="ex: Accountant Certificate"
          />
          <ErrorMessage name="credentialID" component={InputErrorMessage} />
        </div>
        <div className={`${styles.field} ${styles.text_area_desc}`}>
          <Field
            as="textarea"
            placeholder="description"
            id="description"
            name="description"
            cols="30"
            rows="7"
          />
          <ErrorMessage name="description" component={InputErrorMessage} />
        </div>

        <div className="d-flex justify-content-end align-items-center mt-3 px-2">
          {isPending ? (
            <button type="submit" className={styles.save_btn}>
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button className={styles.save_btn} type="submit">
              Add Certificate
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
  )
}

export default UserCertificationsForm
