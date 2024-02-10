import React from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Ui/Loading";

const GeneralInfoForm = ({ data }) => {
  const currentCountry = data.country || "";
  const currentCity = data.city || "";
  const currentSize = data.size || "";
  const currentFounded = data.founded || "";
  const currentDescription = data.desc || "";
  const currentLocation = data.location || {
    type: "Point",
    coordinates: [0, 0],
  };

  const companyToken = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        navigate("/company-profile");
      } else {
        alert("something went wronge please try again");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const initialValues = {
    country: currentCountry,
    city: currentCity,
    size: currentSize,
    foundedYear: currentFounded,
    description: currentDescription,
    location: currentLocation,
  };

  const onSubmit = (values) => {
    mutate({ type: "info", formData: values, companyToken: companyToken });
  };

  const validationSchema = object({
    country: string().matches(/^[A-Z]+/, "Country Start With Capital letter"),
    city: string().matches(/^[A-Z]+/, "Country Start With Capital letter"),
    foundedYear: string()
      .matches(/^[1-9][0-9]{3}$/, "Invalid year format")
      .test("future-year", "Future year not allowed", function (value) {
        if (value) {
          const currentYear = new Date().getFullYear();
          return parseInt(value, 10) <= currentYear;
        }
        return currentFounded;
      }),

    description: string(),
  });

  return (
    <>
      {data ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className={styles.general_info_form}>
            <div className={styles.field}>
              <label htmlFor="companyName">Company Name</label>
              <Field
                type="text"
                value={data.name || ""}
                disabled
                className={styles.disabled_faild}
                id="companyName"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="companyEmail">Email</label>
              <Field
                type="email"
                value={data.email || ""}
                disabled
                className={styles.disabled_faild}
                id="companyEmail"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="companyIndustry">Industry</label>
              <Field
                type="text"
                value={data.industry || ""}
                disabled
                className={styles.disabled_faild}
                id="companyIndustry"
              />
            </div>

            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="companyCountry">Country</label>
                <Field
                  type="text"
                  placeholder={currentCountry}
                  id="companyCountry"
                  name="country"
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
                  placeholder={currentSize}
                  id="companySize"
                  name="size"
                  className={data.size ? "" : styles.empty_field}
                />
                <ErrorMessage name="size" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="companyFounded">Founded</label>
                <Field
                  type="text"
                  placeholder={currentFounded}
                  id="companyFounded"
                  name="foundedYear"
                  className={data.founded ? "" : styles.empty_field}
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
                placeholder={currentDescription || "description"}
                id="description"
                name="description"
                cols="30"
                rows="7"
                className={data.founded ? "" : styles.empty_field}
              />
              <ErrorMessage name="description" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="companyLocation">Location</label>
              <Field
                type="text"
                id="companyLocation"
                name="location"
                className={data.location ? "" : styles.empty_field}
              />
              <ErrorMessage name="location" component={InputErrorMessage} />
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
    </>
  );
};

export default GeneralInfoForm;

// {/* <div className={styles.field}>
// <label htmlFor="companyPhone">Phone</label>
// <Field
//   type="tel"
//   placeholder={data.phone}
//   id="companyPhone"
//   name="companyPhone"
// />
// <ErrorMessage name="companyPhone" component={InputErrorMessage} />
// </div> */}
