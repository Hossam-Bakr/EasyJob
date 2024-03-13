import React, { useEffect, useState } from "react";
import styles from "./EdietInfoForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserSkills } from "../../util/Http";
import fetchProfileData from "../../Store/profileInfo-actions";
import { useMutation } from "@tanstack/react-query";
import { number, object, string } from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import InputErrorMessage from "../Ui/InputErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

const UpdateUserSkillsForm = ({
  id,
  name,
  proficiency,
  onHide,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [currentSkillName, setCurrentSkillName] = useState("");
  const [currentSkillProf, setCurrentSkillProf] = useState(1);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    if (name && proficiency) {
      setCurrentSkillName(name || "");
      setCurrentSkillProf(proficiency.toString());
    }
  }, [name, proficiency]);

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
          content: "your Skill updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        onHide();
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your Skill faild to be updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your Skill faild to be updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    newName: currentSkillName,
    newProficiency: currentSkillProf,
  };

  const onSubmit = (values) => {
    const updatedValues = {
      newName: values.newName !== "" ? values.newName : currentSkillName,
      newProficiency: Number(values.newProficiency),
    };
    mutate({
      formData: updatedValues,
      token: token,
      method: "put",
      id:id
    });
  };

  const validationSchema = object({
    newName: string().required("Skill Name is required"),
    newProficiency: number(),
  });

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
            <label htmlFor="skillName">Skill Name</label>
            <Field
              type="text"
              id="skillName"
              name="newName"
              placeholder="ex: Digital Marketing"
            />
            <ErrorMessage name="newName" component={InputErrorMessage} />
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
                  name="newProficiency"
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
                  name="newProficiency"
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
                  name="newProficiency"
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
            <ErrorMessage name="newProficiency" component={InputErrorMessage} />
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3 px-2">
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Update Skill
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserSkillsForm;
