import React, { useEffect, useState } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
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
    nationality: currentNationality,
    drivingLicense: currentDrivingLicense,
    country: currentCountry,
    city: currentCity,
    area: currentArea,
    about: currentAbout,
    openToWork: currentOpenToWork,
  };

  const onSubmit = (values) => {
    const updatedValues = {
      birthDate:
        values.birthDate !== "" ? values.birthDate.toSring() : currentBirthDate,

      phone: values.phone !== "" ? values.phone : currentPhone,
      gender: values.gender !== "" ? values.gender : currentGender,
      nationality:
        values.nationality !== "" ? values.nationality : currentNationality,
      drivingLicense:
        values.drivingLicense !== ""
          ? values.drivingLicense
          : currentDrivingLicense,
      country: values.country !== "" ? values.country : currentCountry,
      city: values.city !== "" ? values.city : currentCity,
      area: values.area !== "" ? values.area : currentArea,
    };
    mutate({
      type: "info",
      formData: updatedValues,
      token: userToken,
      role: "users",
    });
  };

  const validationSchema = object().shape({
    country: string().required("Country is required"),
    city: string().required("City is required"),
    phone: string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
  });

const handleCountryChange=(e)=>{
  setCountryCities([]);
  countryChange(e,setCountryCities)
}
const handleCityChange=(e)=>{
  setCityAreas([])
  cityChange(e,setCityAreas)
}

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

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="userCountry">Country</label>
                <Field
                  as="select"
                  name="country"
                  id="userCountry"
                  className="form-select"
                  onChange={handleCountryChange}
                  value={currentCountry}
                >
                  <option disabled>Country</option>
                  <option value="Egypt">Egypt</option>
                  <option value="UAE">UAE</option>
                  <option value="SaudiArabia">Saudi Arabia</option>
                  <option value="Kuwait">Kuwait</option>
                </Field>
                <ErrorMessage name="country" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="userCity">City</label>
                <Field
                  as="select"
                  name="city"
                  id="userCity"
                  className="form-select"
                  onChange={handleCityChange}
                  value={currentCountry}
                >
                  <option disabled>City</option>
                  {countryCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="city" component={InputErrorMessage} />
              </div>
            </div>

            <div className={styles.collection}>
            <div className={styles.field}>
                <label htmlFor="nationality">Nationality</label>
                <Field
                  as="select"
                  name="nationality"
                  id="nationality"
                  className="form-select"
                >
                  <option disabled>Nationality</option>
                  <option value="Egypt">Egypt</option>
                  <option value="UAE">UAE</option>
                  <option value="SaudiArabia">Saudi Arabia</option>
                  <option value="Kuwait">Kuwait</option>
                </Field>
                <ErrorMessage name="nationality" component={InputErrorMessage} />
              </div>
              



              <div className={styles.field}>
                <label htmlFor="area">Area</label>
                <Field
                  as="select"
                  name="area"
                  id="area"
                  className="form-select"
                >
                  <option disabled>Area</option>
                  {cityAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="area" component={InputErrorMessage} />
              </div>
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
                <input
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
                <input
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
                id="about info"
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
