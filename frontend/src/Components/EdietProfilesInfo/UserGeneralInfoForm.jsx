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

const UserGeneralInfoForm = ({ data }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
//   const [countryCities, setCountryCities] = useState([]);

  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentArea, setCurrentArea] = useState("");
  const [currentNationality, setCurrentNationality] = useState("");
  const [currentBirthDate, setCurrentBirthDate] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentGender, setCurrentGender] = useState("male");
  const [currentDrivingLicense, setCurrentDrivingLicense] = useState(false);

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

  const validationSchema = object({
    country: string()
      .matches(/^[A-Za-z]+$/, "Country must start with a letter")
      .required("Country is required"),
    city: string()
      .matches(/^[A-Za-z]+$/, "City must start with a letter")
      .required("City is required"),
    phone: string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
  });

//   const handleCountryChange = (e) => {
//     console.log(e.target.value)
//     setCountryCities([]);
//     switch (e.target.value) {
//       case "Egypt":
//         setCountryCities([
//           "Cairo",
//           "Alexandria",
//           "Giza",
//           "Shubra El-Kheima",
//           "Port Said",
//           "Suez",
//           "Luxor",
//           "Aswan",
//           "Tanta",
//           "Mansoura",
//           "Fayyum",
//           "Zagazig",
//           "Ismailia",
//           "Minya",
//           "Damanhur",
//           "Beni Suef",
//           "Sohag",
//           "Hurghada",
//           "6th of October City",
//           "Shibin El Kom",
//           "Banha",
//           "Kafr el-Sheikh",
//           "Arish",
//           "10th of Ramadan City",
//           "Bilbais",
//           "Marsa Matruh",
//           "Idfu",
//           "Mit Ghamr",
//         ]);
//         break;
//       case "UAE":
//         setCountryCities([
//           "Dubai",
//           "Abu Dhabi",
//           "Sharjah",
//           "Al Ain",
//           "Ajman",
//           "Ras Al Khaimah",
//           "Fujairah",
//           "Umm Al Quwain",
//         ]);
//         break;
//       case "SaudiArabia":
//         setCountryCities([
//           "Riyadh",
//           "Jeddah",
//           "Mecca",
//           "Medina",
//           "Dammam",
//           "Tabuk",
//           "Buraidah",
//           "Khobar",
//           "Abha",
//           "Taif",
//           "Khamis Mushait",
//           "Hail",
//           "Najran",
//           "Yanbu",
//           "Al Qatif",
//           "Jubail",
//           "Al-Kharj",
//           "Qurayyat",
//           "Ahsa",
//           "Dhahran",
//         ]);
//         break;
//       case "Kuwait":
//         setCountryCities([
//           "Kuwait City",
//           "Al Ahmadi",
//           "Hawalli",
//           "Salmiya",
//           "Al Farwaniyah",
//           "Fahaheel",
//           "Jahra",
//           "Al Shuwaikh",
//           "Sabah as Salim",
//           "Salwa",
//           "Al Jahra",
//         ]);
//         break;

//       default:
//         setCountryCities([]);
//         break;
//     }
//   };

  return (
    <>
      {data ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form className={styles.general_info_form}>
            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  //   value={data.name || ""}
                  id="firstName"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  //   value={data.email || ""}
                  id="lastName"
                />
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

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="userCountry">Country</label>
                <Field
                  as="select"
                  name="country"
                  id="userCountry"
                //   onChange={handleCountryChange}
                >
                  <option value="Egypt">Egypt</option>
                  <option value="UAE">UAE</option>
                  <option value="SaudiArabia">Saudi Arabia</option>
                  <option value="Kuwait">Kuwait</option>
                </Field>
                <ErrorMessage name="country" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="userCity">City</label>
                <Field as="select" name="city" id="userCity">
                  {/* {countryCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))} */}
                </Field>
                <ErrorMessage name="city" component={InputErrorMessage} />
              </div>
            </div>

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="nationality">Nationality</label>
                <Field
                  type="text"
                  placeholder={currentNationality}
                  id="nationality"
                  name="nationality"
                  className={data.nationality ? "" : styles.empty_field}
                />
                <ErrorMessage
                  name="nationality"
                  component={InputErrorMessage}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="area">Area</label>
                <Field
                  type="text"
                  placeholder={currentArea}
                  id="area"
                  name="area"
                  className={data.area ? "" : styles.empty_field}
                />
                <ErrorMessage name="area" component={InputErrorMessage} />
              </div>
            </div>

            <div>
              <h6>Gender</h6>
              <Field type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male">male</label>
              <Field type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female">female</label>
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
            <div className={`${styles.field} ${styles.text_area_desc}`}>
              <Field
                as="textarea"
                // placeholder={currentDescription}
                id="about info"
                name="about"
                cols="30"
                rows="7"
                // className={data.about ? "" : styles.empty_field}
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
