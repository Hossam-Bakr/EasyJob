import React from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { number, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { getUserSkills } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import { Col, Row } from "react-bootstrap";

const UserSkillsForm = ({
    setShowResponse,
    setResponseMessage,
    setSuccessResponse,
}) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  const { mutate, isPending } = useMutation({
    mutationFn: getUserSkills,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        if (role && token) {
          dispatch(fetchProfileData(token, role));
        }
        setResponseMessage({
          title: "Added Successfully",
          content: "Your Skill has been Added successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Your Skill faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Skill faild to be uploaded please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    name: "",
    proficiency: 1,
  };

  const onSubmit = (values) => {
    const updatedValues={
      name:values.name,
      proficiency:Number(values.proficiency),
    }
    console.log(updatedValues);
    mutate({
      formData: updatedValues,
      token: token,
      method: "post",
    });
  };

  const validationSchema = object({
    name: string().required("Skill Name is required"),
    proficiency:number()
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.general_info_form}>
          <div className={styles.field}>
            <label htmlFor="skillName">Skill Name</label>
            <Field
              type="text"
              id="skillName"
              name="name"
              placeholder="ex: Digital Marketing"
            />
            <ErrorMessage name="name" component={InputErrorMessage} />
          </div>
          <div className={`${styles.field} ${styles.checks_group}`}>
            <h4 className="my-4">Choose Skill Level</h4>
            <Row
              className={`${styles.select_group} gy-2`}
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <Col className="d-flex justify-content-center" md={6} lg={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="proficiency"
                  id="prof1"
                  value="1"
                  autoComplete="off"
                  checked 
                />
                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="prof1"
                >
                   Entry Level
                </label>
              </Col>

              <Col className="d-flex justify-content-center" md={6} lg={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="proficiency"
                  id="prof2"
                  value="2"
                  autoComplete="off"
                />

                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="prof2"
                >
                  Mid Level
                </label>
              </Col>
              <Col className="d-flex justify-content-center" md={6} lg={4}>
                <Field
                  type="radio"
                  className="btn-check"
                  name="proficiency"
                  id="prof3"
                  autoComplete="off"
                  value="3"
                />

                <label
                  className={`${styles.career_label} btn btn-outline-primary`}
                  htmlFor="prof3"
                >
                  Experienced
                </label>
              </Col>
            </Row>
            <ErrorMessage
              name="proficiency"
              component={InputErrorMessage}
            />
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3 px-2">
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Add Skill
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UserSkillsForm;
