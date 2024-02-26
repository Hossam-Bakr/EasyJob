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
import { cityChange, countryChange } from "../logic/Logic";

const UserGeneralInfoForm = ({ data }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });

  const [successResponse, setSuccessResponse] = useState(true);
  const [countryCities, setCountryCities] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newNationality, setNewNationality] = useState("");

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
    }
  }, [data]);

  useEffect(() => {
    if (currentCountry) {
      countryChange(currentCountry, setCountryCities);
    }
  }, [currentCountry]);

  useEffect(() => {
    if (currentCity) {
      cityChange(currentCity, setCityAreas);
    }
  }, [currentCity]);

  const handleCountryChange = (e) => {
    const val = e.target.value;
    setNewCountry(val);
    setCountryCities([]);
    countryChange(val, setCountryCities);
  };
  const handleCityChange = (e) => {
    const val = e.target.value;
    setNewCity(val);
    setCityAreas([]);
    cityChange(val, setCityAreas);
  };
  const handleAreaChange = (e) => {
    const val = e.target.value;
    setNewArea(val);
  };
  const handleNationalityChange = (e) => {
    const val = e.target.value;
    setNewNationality(val);
  };

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
    country: currentCountry,
    city: currentCity,
    area: currentArea,
    nationality: currentNationality,
    about: currentAbout,
    openToWork: currentOpenToWork,
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
      area: newArea !== "" ? newArea : currentArea,
      nationality:
      newNationality !== "" ? newNationality : currentNationality,
      about: values.about !== "" ? values.about : currentAbout,
    };
    console.log(updatedValues);
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
                <label htmlFor="userCountry">Country</label>
                <select
                  name="country"
                  id="userCountry"
                  className="form-select"
                  onChange={handleCountryChange}
                  defaultValue={currentCountry}
                >
                  <option
                    className={styles.select_title}
                    value={currentCountry}
                    disabled={currentCountry ? false : true}
                  >
                    {currentCountry ? currentCountry : "Country"}
                  </option>
                  {currentCountry !== "Egypt" && (
                    <option value="Egypt">Egypt</option>
                  )}
                  {currentCountry !== "UAE" && <option value="UAE">UAE</option>}
                  {currentCountry !== "SaudiArabia" && (
                    <option value="SaudiArabia">Saudi Arabia</option>
                  )}
                  {currentCountry !== "Kuwait" && (
                    <option value="Kuwait">Kuwait</option>
                  )}
                </select>
                <ErrorMessage name="country" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="userCity">City</label>
                <select
                  as="select"
                  name="city"
                  id="userCity"
                  className="form-select"
                  onChange={handleCityChange}
                  defaultValue={currentCity}
                >
                  <option
                    className={styles.select_title}
                    value={currentCity}
                    disabled={currentCity ? false : true}
                  >
                    {currentCity ? currentCity : "City"}{" "}
                  </option>
                  {countryCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="city" component={InputErrorMessage} />
              </div>
            </div>

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="nationality">Nationality</label>
                <select
                  name="nationality"
                  id="nationality"
                  className="form-select"
                  onChange={handleNationalityChange}
                  defaultValue={currentNationality}
                >
                  <option
                    className={styles.select_title}
                    value={currentNationality}
                    disabled={currentNationality ? false : true}
                  >
                    {currentNationality ? currentNationality : "Nationality"}
                  </option>
                  <option value="Egypt">Egypt</option>
                  <option value="UAE">UAE</option>
                  <option value="SaudiArabia">Saudi Arabia</option>
                  <option value="Kuwait">Kuwait</option>
                </select>
                <ErrorMessage
                  name="nationality"
                  component={InputErrorMessage}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="area">Area</label>
                <select
                  name="area"
                  id="area"
                  className="form-select"
                  onChange={handleAreaChange}
                  defaultValue={currentArea}
                >
                  <option
                    className={styles.select_title}
                    value={currentArea}
                    disabled={currentArea ? false : true}
                  >
                    {currentArea ? currentArea : "Area"}
                  </option>
                  {cityAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="area" component={InputErrorMessage} />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="birthDate">BirthDate</label>
              <Field
                type="date"
                placeholder={currentBirthDate}
                className={data.birthDate ? "" : styles.empty_field}
                id="birthDate"
                name="birthDate"
              />
              <ErrorMessage name="birthDate" component={InputErrorMessage} />
            </div>
            <div className={styles.field}>
              <label htmlFor="userPhone">Phone</label>
              <Field
                type="tel"
                id="userPhone"
                name="phone"
                className={data.phone ? "" : styles.empty_field}
              />
              <ErrorMessage name="phone" component={InputErrorMessage} />
            </div>
            <div className={styles.checks}>
              <div
                className={`${styles.check_field} form-check form-switch d-flex justify-content-between mb-4`}
              >
                <label className="form-check-label" htmlFor="openToWork">
                  Available for immediate hiring
                </label>
                <Field
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="openToWork"
                  name="openToWork"
                />
              </div>
              <div
                className={`${styles.check_field} form-check form-switch d-flex justify-content-between mb-4`}
              >
                <label className="form-check-label" htmlFor="drivingLicense">
                  Do you have a driving license?
                </label>
                <Field
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="drivingLicense"
                  name="drivingLicense"
                />
              </div>

              <div className="form-check form-check-inline">
                <Field
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="male">
                  male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <Field
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="female">
                  female
                </label>
              </div>
            </div>

            <div className={`${styles.field} ${styles.text_area_desc}`}>
              <Field
                as="textarea"
                placeholder={currentAbout ? currentAbout : "about"}
                id="aboutInfo"
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
