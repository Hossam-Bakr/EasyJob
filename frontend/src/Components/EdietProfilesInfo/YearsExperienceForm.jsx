import React, { useState, useEffect } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { number, object } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "./../Ui/FloatingPopup";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import { totalYearsConversion } from "../logic/Logic";
import MultiSelect from "../logic/SelectField";

const YearsExperienceForm = ({ totalYearsOfExperience }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const [currentTotalYearsOfExperience, setCurrentTotalYearsOfExperience] =
    useState(0);
  const [convertingOfTotalYears, setConvertingOfTotalYears] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    if (totalYearsOfExperience) {
      setCurrentTotalYearsOfExperience(totalYearsOfExperience || 0);
    }
  }, [totalYearsOfExperience]);

  useEffect(() => {
    if (totalYearsOfExperience) {
      totalYearsConversion(
        currentTotalYearsOfExperience,
        setConvertingOfTotalYears
      );
    }
  }, [totalYearsOfExperience, currentTotalYearsOfExperience]);

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
          content: "your Experience Saved successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your Experiences faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your Experiences faild to be uploaded please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    totalYearsOfExperience: convertingOfTotalYears,
  };

  const onSubmit = (values) => {
    const updatedValues = {
      totalYearsOfExperience: values.totalYearsOfExperience?  values.totalYearsOfExperience: currentTotalYearsOfExperience,
    };

    mutate({
      type: "experience/total",
      formData: updatedValues,
      token: token,
      role: "users",
    });
  };

  const validationSchema = object({
    totalYearsOfExperience: number().required(
      "total years Of experience is required"
    ),
  });

  const yearsOptions = [
    { value: 0, label: "No Experience" },
    { value: 0.5, label: "less than year" },
    { value: 1, label: "1 year" },
    { value: 2, label: "2 years" },
    { value: 3, label: "3 years" },
    { value: 4, label: "4 years" },
    { value: 5, label: "5 years" },
    { value: 6, label: "6 years" },
    { value: 7, label: "7 years" },
    { value: 8, label: "8 years" },
    { value: 9, label: "9 years" },
    { value: 10, label: "10 years" },
    { value: 11, label: "11 years" },
    { value: 12, label: "12 years" },
    { value: 13, label: "13 years" },
    { value: 14, label: "14 years" },
    { value: 15, label: "15 years" },
    { value: 16, label: "+15 years" },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.general_info_form}>
          <div className={styles.field}>
            <label htmlFor="totalYears">Years of Experience</label>
            <Field
              id="totalYears"
              name="totalYearsOfExperience"
              isMulti={false}
              component={MultiSelect}
              placeholder={convertingOfTotalYears}
              options={yearsOptions}
            />

            <ErrorMessage
              name="totalYearsOfExperience"
              component={InputErrorMessage}
            />
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

export default YearsExperienceForm;
