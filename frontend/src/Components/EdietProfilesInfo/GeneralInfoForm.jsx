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
import MultiSelect from "../logic/SelectField";
import { countryChange, countryOptions, sizeOptions } from "../logic/Logic";
import Select from "react-select";
import CompanyLocation from "../Maps/CompanyLocation";

const GeneralInfoForm = ({ data }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [newCityOptions, setNewCityOptions] = useState([]);
  const [formatedCityOptions, setFormatedCityOptions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentFounded, setCurrentFounded] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState([0,0]);

  const [positionLat, setPositionLat] = useState(0);
  const [positionLng, setPositionLng] = useState(0);

  const dispatch = useDispatch();

  const companyToken = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    if (data) {
      setCurrentCountry(data.country || "");
      setCurrentCity(data.city || "");
      setCurrentSize(data.size || "");
      setCurrentFounded(data.founded || "");
      setCurrentDescription(data.desc || "");
      setCurrentLocation(data.location?.coordinates);
    }
  }, [data]);

  const handleCountryChange = (e) => {
    let val = e.value;
    setChosenCountry(val);
    countryChange(val, setNewCityOptions);
  };
  const setPostionHandler = (p) => {
    setPositionLat(p.lat)
    setPositionLng(p.lng)
  };

  useEffect(() => {
    const cityOptions = newCityOptions.map((city) => ({
      value: city,
      label: city,
    }));
    setFormatedCityOptions(cityOptions);
  }, [newCityOptions]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);

        if (role && companyToken) {
          dispatch(fetchProfileData(companyToken, role));
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
    country: currentCountry || chosenCountry,
    city: currentCity,
    size: currentSize,
    foundedYear: currentFounded,
    description: currentDescription,
    location: currentLocation,
  };

  const onSubmit = (values) => {
    console.log(values);
    const updatedValues = {
      country: chosenCountry !== "" ? chosenCountry : currentCountry,
      city: values.city !== "" ? values.city : currentCity,
      size: values.size !== "" ? values.size : currentSize,
      foundedYear:
        values.foundedYear !== "" ? values.foundedYear : currentFounded,
      description:
        values.description !== "" ? values.description : currentDescription,
      location: (positionLat!==0&&positionLng!==0)? {
        type: "Point",
        coordinates:[positionLat,positionLng],
      } : currentLocation,
    };
    mutate({
      type: "info",
      formData: updatedValues,
      token: companyToken,
      role: "companies",
    });
  };

  const validationSchema = object({
    country: string()
      .matches(/^[A-Z]+/, "Country Start With Capital letter")
      .required("country is required"),
    city: string()
      .matches(/^[A-Z]+/, "City Start With Capital letter")
      .required("City is required"),
    foundedYear: string()
      .matches(/^[1-9][0-9]{3}$/, "Invalid year format")
      .test("future-year", "Future year not allowed", function (value) {
        if (value) {
          const currentYear = new Date().getFullYear();
          return parseInt(value, 10) <= currentYear;
        }
        return currentFounded;
      }),

    description: string().required("description is required"),
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
          <Form className={styles.general_info_form}>
            <div className={styles.field}>
              <label htmlFor="company_Name">Company Name</label>
              <Field
                type="text"
                value={data.name || ""}
                disabled
                className={styles.disabled_faild}
                id="company_Name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="company_Email">Email</label>
              <Field
                type="email"
                value={data.email || ""}
                disabled
                className={styles.disabled_faild}
                id="company_Email"
              />
            </div>

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="companyCountry">Country</label>
                <Select
                  type="text"
                  placeholder={currentCountry}
                  id="companyCountry"
                  name="country"
                  isMulti={false}
                  options={countryOptions}
                  onChange={(value) => handleCountryChange(value)}
                  className={data.country ? "" : styles.empty_field}
                />
                <ErrorMessage name="country" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="companyCity">City</label>
                <Field
                  type="text"
                  placeholder={currentCity}
                  id="companyCity"
                  name="city"
                  isMulti={false}
                  component={MultiSelect}
                  options={formatedCityOptions}
                  className={data.city ? "" : styles.empty_field}
                />
                <ErrorMessage name="city" component={InputErrorMessage} />
              </div>
            </div>

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="companySize">Size</label>
                <Field
                  type="text"
                  id="companySize"
                  name="size"
                  isMulti={false}
                  component={MultiSelect}
                  options={sizeOptions}
                  className={data.size ? "" : styles.empty_field}
                />
                <ErrorMessage name="size" component={InputErrorMessage} />
              </div>

              <div className={`${styles.field}`}>
                <label htmlFor="companyFounded">Founded</label>
                <Field
                  type="text"
                  id="companyFounded"
                  name="foundedYear"
                  className={`${data.founded ? "" : styles.empty_field} ${
                    styles.founded
                  } `}
                />
                <ErrorMessage
                  name="foundedYear"
                  component={InputErrorMessage}
                />
              </div>
            </div>

            <div className={`${styles.field} ${styles.text_area_desc}`}>
              <Field
                as="textarea"
                id="companyGeneraldescription"
                name="description"
                cols="30"
                rows="7"
                className={data.description ? "" : styles.empty_field}
              />
              <ErrorMessage name="description" component={InputErrorMessage} />
            </div>

            <div className={`${styles.field} my-5`}>
              <label htmlFor="companyLocation">
                Choose Your Main Location
              </label>
              <div className={styles.location_map}>
                <CompanyLocation currentLocation={currentLocation} setPostionHandler={setPostionHandler} />
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

export default GeneralInfoForm;
