import React, { useState, useEffect } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { date, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import { ErrorMessage, Form, Formik, Field } from "formik";
import MultiSelect from "../logic/SelectField";

const UpdateWorkExperienceForm = ({
  title,
  type,
  category,
  description,
  startDate,
  endDate,
  organization,
  expId,
  onHide,
  setSecResponseMsg,
  setSecSuccess,
  setSecShowResponse,
}) => {

  const [myCategories,setMyCategories]=useState([])
  const [currentType, setCurrentType] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentOrganization, setCurrentOrganization] = useState("");
  const [currentstartDate, setCurrentstartDate] = useState("");
  const [currentendDate, setCurrentendDate] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    setCurrentType(type || "");
    setCurrentTitle(title || "");
    setCurrentCategory(category || "");
    setCurrentOrganization(organization || "");
    setCurrentstartDate(startDate || "");
    setCurrentendDate(endDate || "");
    setCurrentDescription(description || "");
  }, [
    title,
    type,
    category,
    description,
    startDate,
    endDate,
    organization,
  ]);

  const currentCategories = useSelector((state) => state.category.categories);

  useEffect(() => {
    if (currentCategories) {
      let categoryOptions = currentCategories.map((cat) => ({
        value: cat.name,
        label: cat.name
      }));
      setMyCategories(categoryOptions);
    }
  }, [currentCategories]);

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
          content: "Your Work Experience Updated successfully",
        });
        setSecSuccess(true);
        setSecShowResponse(true);
        onHide()
      } else {
        setSecResponseMsg({
          title: "Request Faild",
          content: "Your Work Experiences faild to be Updated please try again",
        });
        setSecSuccess(false);
        setSecShowResponse(true);
        onHide()
      }
    },
    onError: (error) => {
      console.log(error);
      setSecResponseMsg({
        title: "Request Faild",
        content: "Your Work Experiences faild to be Updated please try again",
      });
      setSecSuccess(false);
      setSecShowResponse(true);
      onHide()
    },
  });

  const initialValues = {
    type: currentType,
    title: currentTitle,
    category: currentCategory,
    organization: currentOrganization,
    startDate: currentstartDate,
    endDate: currentendDate,
    description: currentDescription,
  };

  const onSubmit = (values) => {
    const updatedValues = {
      type: values.type ? values.type : currentType,
      title: values.title ? values.title : currentTitle,
      category: values.category ? values.category : currentCategory,
      organization: values.organization
        ? values.organization
        : currentOrganization,
      startDate: values.startDate ? values.startDate : currentstartDate,
      endDate: values.endDate ? values.endDate : currentendDate,
      description: values.description ? values.description : currentDescription,
    };

    mutate({
      type: `experience/${expId}`,
      formData: updatedValues,
      token: token,
      role: "users",
    });
  };
  const today = new Date();
  const validationSchema = object({
    type: string().required("Experience type is required"),
    title: string().required("Job title is required"),
    category: string().required("Job category is required"),
    organization: string().required("organization name is required"),
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
      type: `experience/${expId}`,
      token: token,
      role: "users",
      method: "delete",
    });
    if (res.status === 204||res.data.status === "success") {
      setSecResponseMsg({
        title: "Deleted Successfully",
        content: "Your Work Experience Deleted successfully",
      });
      setSecSuccess(true);
      setSecShowResponse(true);
    } else {
      setSecResponseMsg({
        title: "Request Faild",
        content: "Your Work Experiences faild to be Deleted please try again",
      });
      setSecSuccess(false);
      setSecShowResponse(true);
    }
    if (role && token) {
      dispatch(fetchProfileData(token, role));
    }
    onHide();
  };
  
  const experianceOptions = [
    { value: "full-time", label: "full-time" },
    { value: "part-time", label: "part-time" },
    { value: "freelance/project", label: "freelance/project" },
    { value: "internship", label: "internship" },
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
          <div className={styles.field}>
            <label htmlFor="updatedExperiencetitle">Job title</label>
            <Field type="text" id="updatedExperiencetitle" name="title" />
            <ErrorMessage name="title" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
          <label htmlFor="updatedExperiencecategory">Job category</label>
            <Field
              id="updatedExperiencecategory"
              name="category"
              isMulti={false}
              component={MultiSelect}
              options={myCategories}
            />
            <ErrorMessage name="category" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="updatedExperienceorganization">Organization</label>
            <Field type="text" id="updatedExperienceorganization" name="organization" />
            <ErrorMessage name="organization" component={InputErrorMessage} />
          </div>

          <div className={styles.collection}>
            <div className={styles.field}>
              <label htmlFor="updatedExperiencestartDate">Start Date</label>
              <Field type="date" id="updatedExperiencestartDate" name="startDate" />
              <ErrorMessage name="startDate" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="updatedExperienceendDate">End Date</label>
              <Field type="date" id="updatedExperienceendDate" name="endDate" />
              <ErrorMessage name="endDate" component={InputErrorMessage} />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="updatedExperiencetype">Experience type</label>
            <Field
              id="updatedExperiencetype"
              name="type"
              isMulti={false}
              component={MultiSelect}
              options={experianceOptions}
            />
            <ErrorMessage name="type" component={InputErrorMessage} />
          </div>
          <div className={`${styles.field} ${styles.text_area_desc}`}>
            <Field
              as="textarea"
              id="updatedExperiencedescription"
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
                Update Now
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateWorkExperienceForm;
