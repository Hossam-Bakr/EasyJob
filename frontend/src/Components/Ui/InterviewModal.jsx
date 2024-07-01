import React from "react";
import styles from "../EdietProfilesInfo/EdietInfoForm.module.css";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { date, object, string } from "yup";
import InputErrorMessage from "./InputErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { scheduleInterview } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

const InterviewModal = ({
  appId,
  onHide,
  show,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleInterview,
    onSuccess: (data) => {
        console.log("my data",data);
      if (data.status === "success") {
        setResponseMessage({
          title: "Scheduled Successfully",
          content: "your Interview Scheduled successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        onHide();
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your Interview faild to be Scheduled please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
        onHide();
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your Interview faild to be Scheduled please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      onHide();
    },
  });

  const initialValues = {
    interviewDate: "",
    interviewTime: "",
    address: "",
    notes: "",
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = object({
    interviewDate: date()
      .min(today, "Interview date cannot be in the past")
      .required("Interview date is required"),
    interviewTime: string()
      .matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, "Invalid time format")
      .required("Interview time is required"),
    address: string().required("Address is required"),
    notes: string(),
  });

  const onSubmit = (values) => {
    let updatedFormData = {
      applicationId: appId,
      interviewDate: `${values.interviewDate}`,
      interviewTime: `${values.interviewTime}`,
      address: values.address,
      notes: values.notes,
    };
    mutate({
      token: token,
      formData: updatedFormData,
    });
  };

  return (
    <>
      <Modal
        onHide={onHide}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modal_container}
      >
        <Modal.Header closeButton className={styles.modal_header}>
          <Modal.Title id="contained-modal-title-vcenter">
            Schedule Interview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className={styles.field}>
                <label htmlFor="interviewDate">interviewDate</label>
                <Field type="date" id="interviewDate" name="interviewDate" />
                <ErrorMessage
                  name="interviewDate"
                  component={InputErrorMessage}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="interviewTime">interviewTime</label>
                <Field type="time" id="interviewTime" name="interviewTime" />
                <ErrorMessage
                  name="interviewTime"
                  component={InputErrorMessage}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="address">address</label>
                <Field type="text" id="address" name="address" />
                <ErrorMessage name="address" component={InputErrorMessage} />
              </div>
              <div className={styles.field}>
                <label htmlFor="notes">notes</label>
                <Field type="text" id="notes" name="notes" />
                <ErrorMessage name="notes" component={InputErrorMessage} />
              </div>
              <div className="d-flex justify-content-end align-items-center mt-3 px-2">
                {isPending ? (
                  <button type="submit" className={styles.save_btn}>
                    <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                  </button>
                ) : (
                  <button className={styles.save_btn} type="submit">
                    Save Changes
                  </button>
                )}
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InterviewModal;
