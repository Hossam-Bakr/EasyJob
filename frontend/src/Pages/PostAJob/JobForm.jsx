import styles from "./JobForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MultiSelect from "../../Components/logic/SelectField";
import Select from "react-select";
import {
    Cities,
  cityOptions,
  convertCategoriesIntoList,
  countryOptions,
  yearsOfExpr,
  yearsOptions,
} from "./../../Components/logic/Logic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { postJob } from "../../util/Http";
import { array, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

const JobForm = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const [myCategories, setMyCategories] = useState([]);

  const companyToken = useSelector((state) => state.userInfo.token);
  const currentCategories = useSelector((state) => state.category.categories);

  useEffect(() => {
    convertCategoriesIntoList(currentCategories, setMyCategories, "return__Id");
  }, [currentCategories]);

  const { mutate, isPending } = useMutation({
    mutationFn: postJob,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);

        setResponseMessage({
          title: "Added Successfully",
          content: "Your Post Added Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Your Posta faild to be added please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Posta faild to be added please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });
  const initialValues = {
    title: "",
    categoriesId: [],
    type: "full-time",
    workplace: "office",
    salaryRangeMin: "",
    salaryRangeMax: "",
    hideSalary: true,
    minExperience: 3,
    careerLevel: "student",
    country: "",
    city: "",
    openPositions: 1,
    keywords: "", //ask ammar here
    description: "",
    requirements: "",
    location: { type: "Point", coordinates: [25.2048, 55.2708] },
    requiredSkills: [],
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate({
      type: "info",
      formData: values,
      token: companyToken,
    });
  };

  const validationSchema = object({
    title: string().required("job title is required"),
    categoriesId: array()
      .min(1, "You can't leave this blank.")
      .required("job category is required"),
    country: string()
      .matches(/^[A-Z]+/, "Country Start With Capital letter")
      .required("country is required"),
    city: string()
      .matches(/^[A-Z]+/, "City Start With Capital letter")
      .required("City is required"),
    description: string().required("description is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      <Form className={styles.general_info_form}>
        <div className={styles.field}>
          <label htmlFor="postJobTitle">Job Title</label>
          <Field
            type="text"
            id="postJobTitle"
            name="title"
            placeholder="Ex : Accountant"
          />
          <ErrorMessage name="title" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <h4 className="my-4">Job Categories You Are Interested in</h4>
          <div className={`${styles.select_category}`}>
            <Field
              name="categoriesId"
              isMulti={true}
              component={MultiSelect}
              options={myCategories}
            />
          </div>
          <ErrorMessage name="categoriesId" component={InputErrorMessage} />
        </div>

        <hr className="my-5" />

        <div className={`${styles.field} w-100`}>
          <label>Job Type</label>
          <Row
            role="group"
            aria-labelledby="checkbox-group"
            className="gy-3 justify-content-center"
          >
            <Col sm={6} md={3}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="type"
                  value="full-time"
                  id="postJobFulltime"
                />{" "}
                <label htmlFor="postJobFulltime">Full Time</label>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="type"
                  value="part-time"
                  id="postJobParttime"
                />{" "}
                <label htmlFor="postJobParttime">Part Time</label>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="type"
                  value="freelance/project"
                  id="postJobFreelanceProject"
                />{" "}
                <label htmlFor="postJobFreelanceProject">
                  freelance/project
                </label>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="type"
                  value="internship"
                  id="postJobInternship"
                />{" "}
                <label htmlFor="postJobInternship">Internship</label>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="type"
                  value="volunteering"
                  id="postJobVolunteering"
                />{" "}
                <label htmlFor="postJobVolunteering">volunteering</label>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="type"
                  value="student-activity"
                  id="postJobStudentActivity"
                />{" "}
                <label htmlFor="postJobStudentActivity">student-activity</label>
              </div>
            </Col>
          </Row>
        </div>

        <hr className="my-5" />

        <div className={`${styles.field} w-100`}>
          <label>Workplace</label>
          <Row
            role="group"
            aria-labelledby="checkbox-group"
            className="gy-3 justify-content-center"
          >
            <Col sm={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="workplace"
                  value="office"
                  id="onSite"
                />
                <label htmlFor="onSite">On Site</label>
              </div>
            </Col>
            <Col sm={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="workplace"
                  value="remote"
                  id="postJobRemote"
                />
                <label htmlFor="postJobRemote">Remotely</label>
              </div>
            </Col>
            <Col sm={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="workplace"
                  value="hybrid"
                  id="postJobHybrid"
                />
                <label htmlFor="postJobHybrid">Hybrid</label>
              </div>
            </Col>
          </Row>
        </div>

        <hr className="my-5" />

        <div className={`${styles.field} w-100`}>
          <label>Career Level</label>
          <Row
            role="group"
            aria-labelledby="checkbox-group"
            className="gy-3 justify-content-center"
          >
            <Col sm={6} md={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="careerLevel"
                  value="student"
                  id="postJobStudent"
                />{" "}
                <label htmlFor="postJobStudent">Student</label>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="careerLevel"
                  value="entry level"
                  id="postJobEntryLevel"
                />{" "}
                <label htmlFor="postJobEntryLevel">Entry Level</label>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="careerLevel"
                  value="experienced/senior"
                  id="postJobExperienced"
                />{" "}
                <label htmlFor="postJobExperienced">Experienced/senior</label>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="careerLevel"
                  value="manager/lead"
                  id="postJobManager"
                />{" "}
                <label htmlFor="postJobManager">manager/lead</label>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className={styles.check_Box}>
                <Field
                  type="radio"
                  className={styles.radio_input}
                  name="careerLevel"
                  value="executive"
                  id="postJobExecutive"
                />{" "}
                <label htmlFor="postJobExecutive">Executive</label>
              </div>
            </Col>
          </Row>
        </div>

        <hr className="my-5" />

        <div className={styles.field}>
          <label htmlFor="totalYears">Years of Experience</label>
          <Field
            id="totalYears"
            name="totalYearsOfExperience"
            isMulti={false}
            component={MultiSelect}
            options={yearsOptions}
          />

          <ErrorMessage
            name="totalYearsOfExperience"
            component={InputErrorMessage}
          />
        </div>

        <div className={`${styles.field} w-100`}>
          <label htmlFor="location" className="d-flex align-items-center">
            Salary Range
            <div className={`${styles.SecondCollection}`}>
              <span className="mini_word  d-flex align-items-center px-2">
                ({" "}
                <Field
                  type="checkbox"
                  name="hideSalary"
                  id="hideSalary"
                  className="ms-1"
                />
                <label htmlFor="hideSalary" className="mx-1">
                  Hide Salary
                </label>
                )
              </span>
            </div>
          </label>
          <div className={styles.field}>
            <div className={styles.SecondCollection}>
              <div>
                <Field
                  type="text"
                  name="salaryRangeMin"
                  placeholder="e.g 8000"
                />
                <ErrorMessage
                  name="salaryRangeMin"
                  component={InputErrorMessage}
                />
              </div>

              <h6>to</h6>
              <div>
                <Field
                  type="text"
                  name="salaryRangeMax"
                  placeholder="e.g 12000"
                />
                <ErrorMessage
                  name="salaryRangeMax"
                  component={InputErrorMessage}
                />
              </div>

              <span>
                <span className="text-success">$</span>/Per Month
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.field} w-100`}>
          <div className={styles.collection}>
            <div className={styles.field}>
              <label htmlFor="country">Country</label>
              <Select
                type="text"
                placeholder="Egypt"
                id="city"
                options={countryOptions}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="companyCity">City</label>
              <Select
                type="text"
                placeholder="Cairo"
                id="companyCity"
                options={cityOptions}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center mt-3 px-2">
          {isPending ? (
            <button type="submit" className={styles.save_btn}>
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button className={styles.save_btn} type="submit">
              Post The Job
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default JobForm;
