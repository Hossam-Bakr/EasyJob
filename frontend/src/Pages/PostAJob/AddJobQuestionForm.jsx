import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styles from "../../Components/EdietProfilesInfo/EdietInfoForm.module.css";
import { object, string } from "yup";
import MultiSelect from "../../Components/logic/SelectField";
import { jobQuestionType } from "../../Components/logic/Logic";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";

const AddJobQuestionForm = ({
  onHide,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  saveQuestionIntoModal,
}) => {
  const initialValues = {
    type: "text",
    questionText: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    if (values.questionText !== "" && values.type !== "") {
      setResponseMessage({
        title: "Added Successfully",
        content: "your Job Question Added successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
      saveQuestionIntoModal(values);
      onHide();
    } else {
      setResponseMessage({
        title: "Request Faild",
        content: "your Job Question faild to be Added please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    }
  };

  const validationSchema = object({
    type: string().required("job type is required"),
    questionText: string().required("questionText is required"),
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
            <label htmlFor="answerType">Answer Type</label>
            <Field
              type="text"
              id="answerType"
              name="type"
              component={MultiSelect}
              options={jobQuestionType}
            />
            <ErrorMessage name="type" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="questionText">questionText</label>
            <Field
              type="text"
              id="questionText"
              name="questionText"
            />
            <ErrorMessage name="questionText" component={InputErrorMessage} />
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3 px-2">
            <button className={styles.save_btn} type="submit">
              Add Question
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddJobQuestionForm;
