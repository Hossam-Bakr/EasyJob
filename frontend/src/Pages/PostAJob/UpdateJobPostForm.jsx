import styles from "./JobForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MultiSelect from "../../Components/logic/SelectField";
import {
  cityOptions,
  convertCategoriesIntoList,
  countryOptions,
  titleOptions,
  yearsOptions,
} from "./../../Components/logic/Logic";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { getJobs } from "../../util/Http";
import { array, number, object, ref, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faYinYang } from "@fortawesome/free-solid-svg-icons";
import UpdateUserSkillsModal from "../../Components/Ui/UpdateUserSkillsModal";
import PostSkillBox from "../../Components/Ui/PostSkillBox";
import { Editor } from "@tinymce/tinymce-react";
import CompanyLocation from "../../Components/Maps/CompanyLocation";
import ConfirmModal from "../../Components/Ui/ConfirmModal";

const UpdateJobPostForm = ({
  job,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  onHide,
  id,
  refetch,
  call
}) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentCategoriesId, setCurrentCategoriesId] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  const [currentHideSalary, setCurrentHideSalary] = useState(true);
  const [currentSalaryRangeMin, setCurrentSalaryRangeMin] = useState("");
  const [currentSalaryRangeMax, setCurrentSalaryRangeMax] = useState("");
  const [currentMinExperience, setCurrentMinExperience] = useState(1);
  const [currentCareerLevel, setCurrentCareerLevel] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentOpenPositions, setCurrentOpenPositions] = useState(1);
  const [currentKeywords, setCurrentKeywords] = useState("");
  const [currentRequirements, setCurrentRequirements] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [OldLocation, setOldLocation] = useState([0, 0]);

  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [jobSkills, setJobSkills] = useState([]);
  const [myCategories, setMyCategories] = useState([]);
  const [editorError, setEditorError] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([0, 0]);
  const [positionLat, setPositionLat] = useState(0);
  const [positionLng, setPositionLng] = useState(0);

  const edietorRequirements = useRef(null);

  const companyToken = useSelector((state) => state.userInfo.token);
  const currentCategories = useSelector((state) => state.category.categories);

  const setPostionHandler = (p) => {
    setPositionLat(p.lat);
    setPositionLng(p.lng);
  };

  useEffect(() => {
    if (job) {
      if (job.Categories) {
        if (job.Categories.length > 0) {
          let updatedCategoriesId = [];
          job.Categories.map(
            (cat) => (updatedCategoriesId = [...updatedCategoriesId, cat.id])
          );
          setCurrentCategoriesId(updatedCategoriesId);
        }
      } else {
        setCurrentCategoriesId([]);
      }
    }
  }, [job]);

  useEffect(() => {
    if (job) {
      setCurrentTitle(job.title || "");
      setCurrentType(job.type || "");
      setCurrentWorkplace(job.workplace || "");
      setCurrentSalaryRangeMin(job.salaryRangeMin || "");
      setCurrentSalaryRangeMax(job.salaryRangeMax || "");
      setCurrentHideSalary(job.hideSalary || true);
      setCurrentMinExperience(job.minExperience || 1);
      setCurrentCareerLevel(job.careerLevel || "");
      setCurrentCountry(job.country || "");
      setCurrentCity(job.city || "");
      setJobSkills(job.RequiredSkills || []);
      setCurrentOpenPositions(job.openPositions || 1);
      setCurrentKeywords(job.keywords || "");
      setCurrentRequirements(job.requirements || "");
      setCurrentDescription(job.description || "");
      setOldLocation(job.location?.coordinates);
    }
  }, [job]);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    convertCategoriesIntoList(currentCategories, setMyCategories, "return__Id");
  }, [currentCategories]);

  const { mutate, isPending } = useMutation({
    mutationFn: getJobs,
    onSuccess: (data) => {
      if (data.status === "success") {
        console.log(data);
        if(refetch){
          refetch()
        }
        if(call){
          call()
        }
        setResponseMessage({
          title: "Updated Successfully",
          content: "Your Post has been updated Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        onHide()
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Your Post faild to be updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Post faild to be updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    title: currentTitle,
    categoriesId: currentCategoriesId,
    type: currentType,
    workplace: currentWorkplace,
    salaryRangeMin: currentSalaryRangeMin,
    salaryRangeMax: currentSalaryRangeMax,
    hideSalary: currentHideSalary,
    minExperience: currentMinExperience,
    careerLevel: currentCareerLevel,
    country: currentCountry,
    city: currentCity,
    requiredSkills: jobSkills,
    openPositions: currentOpenPositions,
    keywords: currentKeywords,
    requirements: currentRequirements,
    description: currentDescription,
    location: currentLocation,
  };

  const onSubmit = (values) => {
    if (!edietorRequirements.current) {
      setEditorError(true);
      return;
    }
    const transformedArray = jobSkills.map(skill => {
      if (skill.id !== undefined && skill.name !== undefined) {
          const newObj = {
              SkillId: skill.id,
              minLevel: skill.minLevel,
              minYearsOfExperience: skill.minYearsOfExperience
          };
          return newObj;
      } else {
          return skill;
      }
  });
  
    let updatedValues = {
      ...values,
      requiredSkills: transformedArray,
      requirements: edietorRequirements.current.getContent(),
      location: {
        type: "Point",
        coordinates: [positionLat, positionLng],
      },
    };
    console.log(updatedValues)
    mutate({
      type: `/${id}`,
      method: "patch",
      formData: updatedValues,
      token: companyToken,
    });
  };

  const validationSchema = object({
    title: string().required("job title is required"),
    categoriesId: array()
      .min(1, "You can't leave this blank.")
      .required("job category is required"),
    keywords: string()
      .required("Keywords are required")
      .test(
        "at-least-three-keywords",
        "At least three keywords are required, separated by commas",
        (value) => {
          if (!value) return false;
          const keywords = value.split(",").map((keyword) => keyword.trim());
          return keywords?.length >= 3;
        }
      ),
    description: string().required("description is required"),
    openPositions: number("Accept only numbers")
      .min(1, " openPositions cannot be zero or less")
      .required("openPositions is required"),
    salaryRangeMin: number("Accept only numbers")
      .min(1, " min salary cannot be zero or less")
      .required("salaryRangeMin is required"),
    salaryRangeMax: number()
      .min(ref("salaryRangeMin"), "max salary must be greater than min salary")
      .required("max salary is required"),
  });

  const savePostSkillDataToMainForm = (data) => {
    let updatedSkill = [...jobSkills, data];
    setJobSkills(updatedSkill);
  };

  const deleteSelectedSkill = (skillDetails) => {
    if (jobSkills) {
      let updatedSkillList = jobSkills.filter(
        (skill) => skill !== skillDetails
      );

      setJobSkills(updatedSkillList);
      setResponseMessage({
        title: "Deleted Successfully",
        content: "Your Skill Deleted Successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
    }
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
            <label htmlFor="postJobTitle">Job Title</label>
            <Field
              id="postJobTitle"
              name="title"
              isClearable={true}
              component={MultiSelect}
              options={titleOptions}
            />
            <ErrorMessage name="title" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="postJobCategories">Job Categoriesn</label>
            <div className={`${styles.select_category}`}>
              <Field
                name="categoriesId"
                id="postJobCategories"
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
                  <label htmlFor="postJobStudentActivity">
                    student-activity
                  </label>
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
              name="minExperience"
              isMulti={false}
              component={MultiSelect}
              options={yearsOptions}
            />

            <ErrorMessage name="minExperience" component={InputErrorMessage} />
          </div>

          <div className={`${styles.field} w-100`}>
            <label
              htmlFor="postJobSalaryRang"
              className="d-flex align-items-center"
            >
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
                <div className="position-relative">
                  <Field
                    type="text"
                    name="salaryRangeMin"
                    placeholder="e.g 8000"
                    id="postJobSalaryRang"
                  />
                  <ErrorMessage
                    name="salaryRangeMin"
                    component={InputErrorMessage}
                  />
                </div>

                <h6>to</h6>
                <div className="position-relative">
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
                  <span>EGP</span>/Per Month
                </span>
              </div>
            </div>
          </div>

          <div className={`${styles.field} w-100`}>
            <div className={styles.collection}>
              <div className={styles.field}>
                <label htmlFor="postJobCountry">Country</label>
                <Field
                  component={MultiSelect}
                  isMulti={false}
                  type="text"
                  name="country"
                  id="postJobCountry"
                  options={countryOptions}
                />
                <ErrorMessage name="country" component={InputErrorMessage} />
              </div>

              <div className={styles.field}>
                <label htmlFor="postJobCity">City</label>
                <Field
                  type="text"
                  name="city"
                  id="postJobCity"
                  options={cityOptions}
                  component={MultiSelect}
                  isMulti={false}
                />
                <ErrorMessage name="city" component={InputErrorMessage} />
              </div>
            </div>
          </div>

          <hr className="my-5" />

          <div className={styles.skill_field}>
            <div className={styles.add_skill_btn}>
              <FontAwesomeIcon
                onClick={() => setModalShow(true)}
                title="Add skill"
                icon={faSquarePlus}
              />
            </div>
            <Row className="gy-4 gx-5">
              {jobSkills?.length > 0 ? (
                jobSkills.map((skill, index) => (
                  <PostSkillBox
                    key={`${skill[Object.keys(skill)[0]]}${index}`}
                    id={`${skill[Object.keys(skill)[0]]}${index}`}
                    skillDetails={skill}
                    type="update"
                    deleteSelectedSkill={deleteSelectedSkill}
                  />
                ))
              ) : (
                <span>Start adding required skills To your job</span>
              )}
            </Row>
            <div className={`${styles.skill_color} d-flex`}>
              <div className="d-flex justify-content-center align-items-center mx-2">
                <div className={styles.red_circle}></div>{" "}
                <span className="mini_word">Entry</span>
              </div>
              <div className="d-flex justify-content-center align-items-center mx-2">
                <div className={styles.yellow_circle}></div>{" "}
                <span className="mini_word">Medium</span>
              </div>
              <div className="d-flex justify-content-center align-items-center mx-2">
                <div className={styles.green_circle}></div>{" "}
                <span className="mini_word">Expert</span>
              </div>
            </div>
          </div>

          <hr className="my-5" />

          <div className={styles.field}>
            <label htmlFor="postJobKeywords">Job Keywords</label>
            <Field
              type="text"
              id="postJobKeywords"
              name="keywords"
              placeholder="EX : Accuntant,math,Account,Excel"
            />
            <ErrorMessage name="keywords" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label
              htmlFor="postJobOpenPosition"
              className="d-flex align-items-center"
            >
              Open Positions
            </label>
            <div className={styles.field}>
              <div className={styles.SecondCollection}>
                <div>
                  <Field
                    type="number"
                    name="openPositions"
                    id="postJobOpenPosition"
                  />
                  <ErrorMessage
                    name="openPositions"
                    component={InputErrorMessage}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.field} ${styles.text_area_desc}`}>
            <label htmlFor="postJobDesc">Job Description</label>
            <Field
              as="textarea"
              id="postJobDesc"
              name="description"
              cols="30"
              rows="7"
              placeholder="write desc here"
            />
            <ErrorMessage name="description" component={InputErrorMessage} />
          </div>

          <hr className="my-5" />

          <div className={`${styles.field} w-100`}>
            <label> Requirments</label>
            <Editor
              apiKey={process.env.REACT_APP_Tiny_API_KEY}
              onInit={(_evt, editor) => (edietorRequirements.current = editor)}
              initialValue={`${currentRequirements}`}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            {editorError && (
              <InputErrorMessage text="Job requirements is required" />
            )}
          </div>

          <hr className="my-5" />

          <div className={`${styles.field} my-5 w-100`}>
            <label htmlFor="companyLocation">Choose Job's Location</label>
            <div className={styles.location_map}>
              <CompanyLocation
                currentLocation={OldLocation}
                setPostionHandler={setPostionHandler}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 px-2">
            <button className={`${styles.save_btn} bg-danger`} type="button" onClick={()=>setConfirmModalShow(true)}>
              Delete Post
            </button>
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Update Post
              </button>
            )}
          </div>
        </Form>
      </Formik>
      <UpdateUserSkillsModal
        savePostSkillDataToMainForm={savePostSkillDataToMainForm}
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        type={"postSkills"}
      />
      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        onHideAll={onHide}
        jobId={id}
        btnText="Delete"
        text="Are you sure you want to delete this job"
        type="deleteJob"
        refetch={refetch}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
      />
    </>
  );
};

export default UpdateJobPostForm;
