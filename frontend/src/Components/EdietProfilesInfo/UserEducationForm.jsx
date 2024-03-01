import React, { useState } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { array, date, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "./../Ui/FloatingPopup";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import MultiSelect from "../logic/SelectField";
import { degreeLevelOptions, fieldsOfStudy, gradeOptions, universities } from "../logic/Logic";

const UserEducationForm = () => {
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
          content: "Your Education Saved successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Your Education faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Education faild to be uploaded please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    school: "",
    degree: "",
    fieldsOfStudy: [],
    grade: "",
    startDate: "2000-01-01",
    endDate: "2001-01-01",
    description: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      type: "education",
      formData: values,
      token: token,
      role: "users",
      method: "post",
    });
  };

  const today = new Date();

  const validationSchema = object({
    school: string().required("University Name is required"),
    degree: string().required("Jyour degree is required"),
    fieldsOfStudy: array()
      .min(1, "You can't leave this blank.")
      .required("You can't leave this blank."),
    grade: string().required("your grade name is required"),
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
            <label htmlFor="degree">Degree Level </label>
            <Field
              id="degree"
              name="degree"
              isMulti={false}
              component={MultiSelect}
              options={degreeLevelOptions}
            />
            <ErrorMessage name="degree" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="school">University</label>
            <Field
              id="school"
              name="school"
              isClearable={true}
              component={MultiSelect}
              options={universities}
            />
            <ErrorMessage name="school" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="fieldsOfStudy">Fields of Study</label>
            <Field
              id="fieldsOfStudy"
              name="fieldsOfStudy"
              isCreatable={true}
              component={MultiSelect}
              options={fieldsOfStudy}
            />
            <ErrorMessage name="fieldsOfStudy" component={InputErrorMessage} />
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

          <div className={`${styles.field} mb-4`}>
            <label htmlFor="grade">Your Grade</label>
            <Field
              id="grade"
              name="grade"
              isMulti={false}
              component={MultiSelect}
              options={gradeOptions}
            />
            <ErrorMessage name="grade" component={InputErrorMessage} />
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
                Add Education
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

export default UserEducationForm;
