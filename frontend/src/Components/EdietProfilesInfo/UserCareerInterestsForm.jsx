import React, { useState, useEffect } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { array, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "./../Ui/FloatingPopup";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MultiSelect from "../logic/SelectField";
// import { colourOptions } from "../data";

const UserCareerInterestsForm = ({
  currentCareerLevel,
  jobTitles,
  jobTypes,
  jobCategories,
}) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const [currentCareerLevelState, setCurrentCareerLevelState] = useState("");
  const [currentJobTypes, setCurrenJobTypes] = useState([]);
  const [currentJobTitles, setCurrentJobTitles] = useState([]);
  const [currentJobCategories, setCurrentJobCategories] = useState([]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    setCurrentCareerLevelState(currentCareerLevel || "not specified");
    setCurrenJobTypes(jobTitles || []);
    setCurrentJobTitles(jobTypes || []);
    setCurrentJobCategories(jobCategories || []);
  }, [currentCareerLevel, jobTitles, jobTypes, jobCategories]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        if (role && token) {
          dispatch(fetchProfileData(token, role));
        }
        setResponseMessage({
          title: "Updated Successfully",
          content: "your Interests updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your Interests faild to be updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your Interests faild to be updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  let initialValues = {
    currentCareerLevel: currentCareerLevelState,
    jobTitles: currentJobTitles,
    jobTypes: currentJobTypes,
    jobCategories: currentJobCategories,
  };

  const onSubmit = (values) => {
    console.log(values);
    let updatedValues = {
      currentCareerLevel:
        values.currentCareerLevel !== ""
          ? values.currentCareerLevel
          : currentCareerLevelState,
      jobTitles:
        values.jobTitles.length !== 0 ? values.jobTitles : currentJobTitles,
      jobTypes:
        values.jobTypes.length !== 0 ? values.jobTypes : currentJobTypes,
      jobCategories:
        values.jobCategories.length !== 0
          ? values.jobCategories
          : currentJobCategories,
    };
    mutate({
      type: "interests",
      formData: updatedValues,
      token: token,
      role: "users",
    });
  };

  const validationSchema = object({
    currentCareerLevel: string(),
    jobTitles: array()
      .min(1, "You can't leave this blank.")
      .required("You can't leave this blank."),
    jobCategories: array()
      .min(1, "You can't leave this blank.")
      .required("job category is required"),
    jobTypes: array(),
  });

  const titleOptions = [
    //get titles from backend here
    { value: "frontend-developer", label: "frontend developer" },
    { value: "backend-developer", label: "backend developer" },
    { value: "accountant", label: "accountant" },
    { value: "fullstack-developer", label: "fullstack developer" },
  ];
  const categoryOptions = [

    
    //get category from backend here
    { value: "software Engineering", label: "software Engineering" },
    { value: "Banking", label: "Banking" },
    { value: "Accounting", label: "Accounting" },
    { value: "Sports", label: "Sports" },
  ];
  const typsOptions = [
    //get category from backend here
    { value: "full-time", label: "full-time" },
    { value: "part-time", label: "part-time" },
    { value: "internship", label: "internship" },
    { value: "freelance/project", label: "freelance/project" },
    { value: "volunteering", label: "volunteering" },
    { value: "student-activity", label: "student-activity" },
  ];
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form className={styles.general_info_form}>
          <div className={`${styles.field} ${styles.checks_group}`}>
            <h4 className="my-4">Current Career Level</h4>
            <Row
              className={`${styles.select_group} gy-2`}
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <Col className="d-flex justify-content-center" sm={6} md={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="currentCareerLevel"
                  id="currentCareerLevel1"
                  value="student"
                  autoComplete="off"
                />
                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="currentCareerLevel1"
                >
                  Student
                </label>
              </Col>

              <Col className="d-flex justify-content-center" sm={6} md={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="currentCareerLevel"
                  id="currentCareerLevel2"
                  value="entry"
                  autoComplete="off"
                />

                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="currentCareerLevel2"
                >
                  Entry Level
                </label>
              </Col>
              <Col className="d-flex justify-content-center" sm={6} md={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="currentCareerLevel"
                  id="currentCareerLevel3"
                  autoComplete="off"
                  value="experienced"
                />

                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="currentCareerLevel3"
                >
                  Experienced
                </label>
              </Col>
              <Col className="d-flex justify-content-center" sm={6} md={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="currentCareerLevel"
                  id="currentCareerLevel4"
                  autoComplete="off"
                  value="manager"
                />

                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="currentCareerLevel4"
                >
                  Manager
                </label>
              </Col>
              <Col className="d-flex justify-content-center" sm={6} md={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="currentCareerLevel"
                  id="currentCareerLevel5"
                  autoComplete="off"
                  value="senior"
                />
                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="currentCareerLevel5"
                >
                  Senior Management
                </label>
              </Col>

              <Col className="d-flex justify-content-center" sm={6} md={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="currentCareerLevel"
                  id="currentCareerLevel6"
                  autoComplete="off"
                  value="not specified"
                />
                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="currentCareerLevel6"
                >
                  Not Specified
                </label>
              </Col>
            </Row>
            <ErrorMessage
              name="currentCareerLevel"
              component={InputErrorMessage}
            />
          </div>

          <div className={styles.checks_group}>
            <div className={styles.field}>
              <h4 className="my-4">Typs of Job you are open to</h4>
              <div className={`${styles.select_category}`}>
                <Field
                  name="jobTypes"
                  isMulti={true}
                  component={MultiSelect}
                  options={typsOptions}
                />
              </div>

              <ErrorMessage name="jobTypes" component={InputErrorMessage} />
            </div>
            <div className={styles.field}>
              <h4 className="my-4">
                Job Titles that Describe What You Are Looking for
              </h4>
              <div className={`${styles.select_category}`}>
                <Field
                  name="jobTitles"
                  isMulti={true}
                  component={MultiSelect}
                  options={titleOptions}
                />
              </div>

              <ErrorMessage name="jobTitles" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <h4 className="my-4">Job Categories You Are Interested in</h4>
              <div className={`${styles.select_category}`}>
                <Field
                  name="jobCategories"
                  isMulti={true}
                  component={MultiSelect}
                  options={categoryOptions}
                />
              </div>
              <ErrorMessage
                name="jobCategories"
                component={InputErrorMessage}
              />
            </div>
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
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default UserCareerInterestsForm;
