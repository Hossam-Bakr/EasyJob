import React from "react";
import SectionMainTitle from "../Ui/SectionMainTitle";
import { Col, Row } from "react-bootstrap";
import styles from "./EdietInfo.module.css";
import workExperiance from "../../images/workExperiance.png";
import YearsExperienceForm from "./YearsExperienceForm";
import WorkExperienceForm from "./WorkExperienceForm";

const UserExperience = ({totalYearsOfExperience }) => {
  return (
    <div>
      <SectionMainTitle title="User Experiences" />
      <Row className="mb-5" id="general">
        <Col md={6}>
          <div className={styles.seperate_form}>
            <YearsExperienceForm
              totalYearsOfExperience={totalYearsOfExperience}
            />
          </div>
          <div className={styles.seperate_form}>
            <WorkExperienceForm />
          </div>
        </Col>
        <Col md={6} className={styles.general_info_vector_container}>
          <div className={styles.general_info_vector}>
            <img src={workExperiance} alt="work Experiance" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserExperience;
