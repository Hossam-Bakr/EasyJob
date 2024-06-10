import React, { useEffect, useState } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, date } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Ui/Loading";
import FloatingPopup from "../Ui/FloatingPopup";
import fetchProfileData from "../../Store/profileInfo-actions";
import { cityChange, countryChange, countryOptions } from "../logic/Logic";
import Select from "react-select";
import MultiSelect from "../logic/SelectField";

const UserGeneralInfoForm = ({ data }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");

  const [newCityOptions, setNewCityOptions] = useState([]);
  const [areasOptions, setAreasOptions] = useState([]);

  const [formatedCityOptions, setFormatedCityOptions] = useState([]);
  const [formatedAreaOptions, setFormatedAreaOptions] = useState([]);

  const [currentAbout, setcurrentAbout] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentArea, setCurrentArea] = useState("");
  const [currentNationality, setCurrentNationality] = useState("");
  const [currentBirthDate, setCurrentBirthDate] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentGender, setCurrentGender] = useState("male");
  const [currentDrivingLicense, setCurrentDrivingLicense] = useState(false);
  const [currentOpenToWork, setCurrentOpenToWork] = useState(false);
  const [currentTagline, setCurrentTagline] = useState("");

  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);
    
  useEffect(() => {
    if (data) {
      setCurrentCountry(data.country || "");
      setCurrentCity(data.city || "");
      setCurrentArea(data.area || "");
      setCurrentNationality(data.nationality || "");
      setCurrentBirthDate(data.birthDate || "");
      setCurrentPhone(data.phone || "");
      setCurrentGender(data.gender || "male");
      setCurrentDrivingLicense(data.drivingLicense || false);
      setCurrentOpenToWork(data.openToWork || false);
      setcurrentAbout(data.about || "");
      setCurrentTagline(data.tagline || "");
    }
  }, [data]);

  const handleCountryChange = (e) => {
    let val = e.value;
    setNewCountry(val);
    countryChange(val, setNewCityOptions);
  };

  useEffect(() => {
    const cityOptions = newCityOptions.map((city) => ({
      value: city,
      label: city,
    }));
    setFormatedCityOptions(cityOptions);
  }, [newCityOptions]);

  const handleCityChange = (e) => {
    const val = e.value;
    setNewCity(val);
    cityChange(val, setAreasOptions);
  };

  useEffect(() => {
    const myAreasOptions = areasOptions.map((area) => ({
      value: area,
      label: area,
    }));
    setFormatedAreaOptions(myAreasOptions);
  }, [areasOptions]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);

        if (role && userToken) {
          dispatch(fetchProfileData(userToken, role));
        }

        setResponseMessage({
          title: "Edieted Successfully",
          content: "your Information updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your data faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your data faild to be uploaded please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    birthDate: currentBirthDate,
    phone: currentPhone,
    gender: currentGender,
    drivingLicense: currentDrivingLicense,
    country: currentCountry || newCountry,
    city: currentCity || newCity,
    area: currentArea,
    nationality: currentNationality,
    about: currentAbout,
    openToWork: currentOpenToWork,
    tagline:currentTagline
  };

  const onSubmit = (values) => {
    const updatedValues = {
      birthDate:
        values.birthDate.toString() !== ""
          ? values.birthDate.toString()
          : currentBirthDate,
      phone: values.phone !== "" ? values.phone : currentPhone,
      gender: values.gender !== "" ? values.gender : currentGender,
      drivingLicense:
        values.drivingLicense !== ""
          ? values.drivingLicense
          : currentDrivingLicense,
      openToWork:
        values.openToWork !== "" ? values.openToWork : currentOpenToWork,
      country: newCountry !== "" ? newCountry : currentCountry,
      city: newCity !== "" ? newCity : currentCity,
      area: values.area !== "" ? values.area : currentArea,
      nationality:
        values.nationality !== "" ? values.nationality : currentNationality,
      about: values.about !== "" ? values.about : currentAbout,
      tagline: values.tagline !== "" ? values.tagline : currentTagline,
    };
    
    mutate({
      type: "info",
      formData: updatedValues,
      token: userToken,
      role: "users",
    });
  };

  const today = new Date();

  const validationSchema = object({
    country: string().required("Country is required"),
    city: string().required("City is required"),
    nationality: string().required("Nationality is required"),
    area: string(),
    phone: string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
    birthDate: date()
      .test("minimumAge", "Must be at least 10 years old", function (value) {
        const selectedDate = new Date(value);
        const minimumAgeDate = new Date();
        minimumAgeDate.setFullYear(minimumAgeDate.getFullYear() - 10);
        return selectedDate <= minimumAgeDate;
      })
      .test("futureDate", "Future dates are not allowed", function (value) {
        const selectedDate = new Date(value);
        return selectedDate <= today;
      })
      .required("Birthdate is required"),
    about: string()
      .min(46, "At least 45 characters")
      .max(400, "About must be less than 400 characters")
      .required("About is required"),
      tagline: string().required("tagline is required")
  });

  return (
    <>
      {data ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form
            className={`${styles.general_info_form} ${styles.user_general_info}`}
          >
            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="userGeneraluserCountry">Country</label>
                <Select
                  name="country"
                  id="userGeneraluserCountry"
                  placeholder={currentCountry}
                  isMulti={false}
                  options={countryOptions}
                  onChange={(value) => handleCountryChange(value)}
                />
                <ErrorMessage name="country" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="userGeneraluserCity">City</label>
                <Select
                  name="city"
                  id="userGeneraluserCity"
                  placeholder={currentCity}
                  isMulti={false}
                  options={formatedCityOptions}
                  onChange={(value) => handleCityChange(value)}
                />
                <ErrorMessage name="city" component={InputErrorMessage} />
              </div>
            </div>

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="userGeneralnationality">Nationality</label>
                <Field
                  name="nationality"
                  id="userGeneralnationality"
                  isMulti={false}
                  component={MultiSelect}
                  placeholder={currentNationality}
                  options={countryOptions}
                />
                <ErrorMessage
                  name="nationality"
                  component={InputErrorMessage}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="userGeneralarea">Area</label>
                <Field
                  name="area"
                  id="userGeneralarea"
                  placeholder={currentArea}
                  isMulti={false}
                  component={MultiSelect}
                  options={formatedAreaOptions}
                />
                <ErrorMessage name="area" component={InputErrorMessage} />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="userGeneralbirthDate">BirthDate</label>
              <Field
                type="date"
                placeholder={currentBirthDate}
                className={data.birthDate ? "" : styles.empty_field}
                id="userGeneralbirthDate"
                name="birthDate"
              />
              <ErrorMessage name="birthDate" component={InputErrorMessage} />
            </div>
            <div className={styles.field}>
              <label htmlFor="userGeneraltagline">TagLine</label>
              <Field
                type="text"
                id="userGeneraltagline"
                name="tagline"
                className={data.tagline ? "" : styles.empty_field}
              />
              <ErrorMessage name="phone" component={InputErrorMessage} />
            </div>
            <div className={styles.field}>
              <label htmlFor="userGeneraluserPhone">Phone</label>
              <Field
                type="tel"
                id="userGeneraluserPhone"
                name="phone"
                className={data.phone ? "" : styles.empty_field}
              />
              <ErrorMessage name="phone" component={InputErrorMessage} />
            </div>
            <div className={styles.checks}>
              <div
                className={`${styles.check_field} form-check form-switch d-flex justify-content-between mb-4`}
              >
                <label className="form-check-label" htmlFor="userGeneralopenToWork">
                  Available for immediate hiring
                </label>
                <Field
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="userGeneralopenToWork"
                  name="openToWork"
                />
              </div>
              <div
                className={`${styles.check_field} form-check form-switch d-flex justify-content-between mb-4`}
              >
                <label className="form-check-label" htmlFor="userGeneraldrivingLicense">
                  Do you have a driving license?
                </label>
                <Field
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="userGeneraldrivingLicense"
                  name="drivingLicense"
                />
              </div>

              <div className="form-check form-check-inline">
                <Field
                  type="radio"
                  id="userGeneralmale"
                  name="gender"
                  value="male"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="userGeneralmale">
                  male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <Field
                  type="radio"
                  id="userGeneralfemale"
                  name="gender"
                  value="female"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="userGeneralfemale">
                  female
                </label>
              </div>
            </div>

            <div className={`${styles.field} ${styles.text_area_desc}`}>
              <Field
                as="textarea"
                placeholder={currentAbout ? currentAbout : "about"}
                id="userGeneralaboutInfo"
                name="about"
                cols="30"
                rows="7"
                className={data.about ? "" : styles.empty_field}
              />
              <ErrorMessage name="about" component={InputErrorMessage} />
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
      ) : (
        <Loading />
      )}
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default UserGeneralInfoForm;
