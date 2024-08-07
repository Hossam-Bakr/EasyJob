import React, { useState, useEffect } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { array, date, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import { ErrorMessage, Form, Formik, Field } from "formik";
import MultiSelect from "../logic/SelectField";
import {
  degreeLevelOptions,
  fieldsOfStudy as myFields,
  gradeOptions,
  universities,
} from "../logic/Logic";
// import CreatableSelect from "react-select/creatable";

const UpdateEducationForm = ({
  itemId,
  grade,
  school,
  degree,
  startDate,
  endDate,
  fieldsOfStudy,
  description,
  displayName,
  onHide,
  setSecResponseMsg,
  setSecSuccess,
  setSecShowResponse,
}) => {

  const [currentSchool, setCurrentSchool] = useState("");
  const [currentDegree, setCurrentDegree] = useState("");
  const [currentGrade, setCurrentGrade] = useState("");
  const [currentFieldsOfStudy, setcurrentFieldsOfStudy] = useState([]);
  const [currentstartDate, setCurrentstartDate] = useState("");
  const [currentendDate, setCurrentendDate] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentDisplayName, setCurrentDisplayName] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    setCurrentSchool(school || "");
    setCurrentDegree(degree || "");
    setCurrentGrade(grade || "");
    setcurrentFieldsOfStudy(fieldsOfStudy || []);
    setCurrentstartDate(startDate || "");
    setCurrentendDate(endDate || "");
    setCurrentDescription(description || "");
    setCurrentDisplayName(displayName || "");

  }, [school, degree, grade, fieldsOfStudy, startDate, endDate, description,displayName]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        if (role && token) {
          dispatch(fetchProfileData(token, role));
        }
        setSecResponseMsg({
          title: "Saved Successfully",
          content: "Your Education Saved successfully",
        });
        setSecSuccess(true);
        setSecShowResponse(true);
        onHide();
      } else {
        setSecResponseMsg({
          title: "Request Faild",
          content: "Your Education faild to be uploaded please try again",
        });
        setSecSuccess(false);
        setSecShowResponse(true);
        onHide();
      }
    },
    onError: (error) => {
      console.log(error);
      setSecResponseMsg({
        title: "Request Faild",
        content: "Your Education faild to be uploaded please try again",
      });
      setSecSuccess(false);
      setSecShowResponse(true);
      onHide();
    },
  });

  const initialValues = {
    school: currentSchool,
    degree: currentDegree,
    displayName:currentDisplayName,
    fieldsOfStudy: currentFieldsOfStudy,
    grade: currentGrade,
    startDate: currentstartDate,
    endDate: currentendDate,
    description: currentDescription,
  };

  const onSubmit = (values) => {
    const updatedValues = {
      school: values.school ? values.school : currentSchool,
      degree: values.degree ? values.degree : currentDegree,
      displayName: values.displayName ? values.displayName : currentDisplayName,
      grade: values.grade ? values.grade : currentGrade,
      fieldsOfStudy: values.fieldsOfStudy
        ? values.fieldsOfStudy
        : currentFieldsOfStudy,
      startDate: values.startDate ? values.startDate : currentstartDate,
      endDate: values.endDate ? values.endDate : currentendDate,
      description: values.description ? values.description : currentDescription,
    };
    mutate({
      type: `education/${itemId}`,
      formData: updatedValues,
      token: token,
      role: "users",
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

  const handleDeleteFormData = async() => {
    const res = await updateFormHandler({
      type: `education/${itemId}`,
      token: token,
      role: "users",
      method: "delete",
    });
    if (res.status === 204||res.data.status === "success") {
      setSecResponseMsg({
        title: "Deleted Successfully",
        content: "Your Education Deleted successfully",
      });
      setSecSuccess(true);
      setSecShowResponse(true);
    } else {
      setSecResponseMsg({
        title: "Request Faild",
        content: "Your Education faild to be Deleted please try again",
      });
      setSecSuccess(false);
      setSecShowResponse(true);
    }
    if (role && token) {
      dispatch(fetchProfileData(token, role));
      console.log("role",role)
      console.log("token",token)
    }
    onHide();
  };


  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form className={styles.general_info_form}>
          <div className={styles.field}>
            <label htmlFor="updatedEducationdegree">Degree Level </label>
            <Field
              id="updatedEducationdegree"
              name="degree"
              isMulti={false}
              component={MultiSelect}
              options={degreeLevelOptions}
            />
            <ErrorMessage name="degree" component={InputErrorMessage} />
          </div>
          <div className={styles.field}>
            <label htmlFor="updatedEducationdisplayName">Degree Display Name </label>
            <Field
              type="text"
              id="updatedEducationdisplayName"
              name="displayName"
              placeholder="ex: Bachelor of Science in Civil Engineering "
            />
            <ErrorMessage name="displayName" component={InputErrorMessage} />
          </div>
          <div className={styles.field}>
            <label htmlFor="updatedEducationschool">School</label>
            <Field
              id="updatedEducationschool"
              name="school"
              isMulti={false}
              isClearable={true}
              component={MultiSelect}
              options={universities}
              val={{value:currentSchool,label:currentSchool}}
            />
            <ErrorMessage name="school" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="updatedEducationfieldsOfStudy">Fields of Study</label>
            <Field
              id="updatedEducationfieldsOfStudy"
              name="fieldsOfStudy"
              isCreatable={true}
              component={MultiSelect}
              options={myFields}
              val={currentFieldsOfStudy.map((filed)=>{return{value:filed,label:filed}})}
              update={true}
            />
            <ErrorMessage name="fieldsOfStudy" component={InputErrorMessage} />
          </div>

          <div className={styles.collection}>
            <div className={styles.field}>
              <label htmlFor="updatedEducationstartDate">Start Date</label>
              <Field type="date" id="updatedEducationstartDate" name="startDate" />
              <ErrorMessage name="startDate" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="updatedEducationendDate">End Date</label>
              <Field type="date" id="updatedEducationendDate" name="endDate" />
              <ErrorMessage name="endDate" component={InputErrorMessage} />
            </div>
          </div>

          <div className={`${styles.field} mb-4`}>
            <label htmlFor="updatedEducationgrade">Your Grade</label>
            <Field
              id="updatedEducationgrade"
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
              id="updatedEducationdesc"
              name="description"
              cols="30"
              rows="7"
            />
            <ErrorMessage name="description" component={InputErrorMessage} />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 px-2">
          <button
              type="button"
              className={styles.delete_btn}
              onClick={handleDeleteFormData}
            >
              Delete
            </button>
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
    </>
  );
};

export default UpdateEducationForm;
