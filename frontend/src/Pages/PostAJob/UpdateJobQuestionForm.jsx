import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styles from "../../Components/EdietProfilesInfo/EdietInfoForm.module.css";
import { object, string } from "yup";
import MultiSelect from "../../Components/logic/SelectField";
import { jobQuestionType } from "../../Components/logic/Logic";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updateJobQuestion } from "../../util/Http";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

const UpdateJobQuestionForm = ({
  questionText,
  type,
  questionId,
  jobId,
  onHide,
  refetch,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const token = useSelector((state) => state.userInfo.token);

  const { mutate, isPending } = useMutation({
    mutationFn: updateJobQuestion,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        setResponseMessage({
          title: "Updated Successfully",
          content: "your Job Question Updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        refetch()
        onHide()
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your Job Question faild to be Updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your Job Question faild to be Updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    type:type||"text",
    questionText:questionText||"",
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      formData: values,
      token: token,
      jobId:jobId,
      questionId:questionId,
    });
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
        enableReinitialize
      >
        <Form className={styles.general_info_form}>
          <div className={styles.field}>
            <label htmlFor="updateAnswerType">Answer Type</label>
            <Field
              type="text"
              id="updateAnswerType"
              name="type"
              component={MultiSelect}
              options={jobQuestionType}
            />
            <ErrorMessage name="type" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="updateQuestionText">questionText</label>
            <Field type="text" id="updateQuestionText" name="questionText" />
            <ErrorMessage name="questionText" component={InputErrorMessage} />
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3 px-2">
            {isPending ? (
              <button className={styles.save_btn} type="button">
                <FontAwesomeIcon icon={faYinYang} className="fa-spin"/>
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Update Question
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateJobQuestionForm;
