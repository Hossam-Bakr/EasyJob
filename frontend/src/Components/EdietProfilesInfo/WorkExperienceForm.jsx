import React, { useState } from "react";
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

const WorkExperienceForm = ({ Experiences, UserId }) => {
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
          content: "Your Work Experience Saved successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content:
            "Your Work Experiences faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Work Experiences faild to be uploaded please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    type: "",
    title: "",
    category: "",
    organization: "",
    startDate: "2000-01-01",
    endDate: "2001-01-01",
    description: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      type: "experience",
      formData: values,
      token: token,
      role: "users",
      method: "post",
    });
  };

  const today = new Date();

  const validationSchema = object({
    type: string().required("Experience type is required"),
    title: string().required("Job title is required"),
    category: string().required("Job category is required"),
    organization: string().required("organization name is required"),
    startDate: date()
      .test("futureDate", "Future dates are not allowed", function (value) {
        const selectedDate = new Date(value);
        return selectedDate <= today;
      })
      .required("start date is required"),
    endDate: date()
      .when(
        "startDate",
        (startDate, schema) =>
          startDate && schema.min(startDate, "end date greater than Start !")
      )
      .required("end date is required"),
    description: string(),
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
            <label htmlFor="title">Job title</label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="ex: Accountant"
            />
            <ErrorMessage name="title" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Job category</label>
            <Field
              as="select"
              id="category"
              className="form-select"
              name="category"
            >
              {/* get all categories from api */}
              <option value="" disabled>
                Category
              </option>
              <option value="Banking">Banking</option>
              <option value="Software Engineering">Software Engineering</option>
            </Field>
            <ErrorMessage name="category" component={InputErrorMessage} />
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

          <div className={styles.collection}>
            <div className={styles.field}>
              <label htmlFor="startDate">Start Date</label>
              <Field type="date" id="startDate" name="startDate" />
              <ErrorMessage name="startDate" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="endDate">End Date</label>
              <Field type="date" id="endDate" name="endDate" />
              <ErrorMessage name="endDate" component={InputErrorMessage} />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="type">Experience type</label>
            <Field as="select" id="type" className="form-select" name="type">
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="freelance/project">freelance/project</option>
              <option value="internship">Internship</option>
              <option value="volunteering">Volunteering</option>
              <option value="student-activity">Student Activity</option>
            </Field>
            <ErrorMessage name="type" component={InputErrorMessage} />
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
                Add Experiance
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

export default WorkExperienceForm;
