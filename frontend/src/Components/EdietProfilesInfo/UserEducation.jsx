import React from "react";
import SectionMainTitle from "../Ui/SectionMainTitle";
import { Col, Row } from "react-bootstrap";
import styles from "./EdietInfo.module.css";
import workExperiance from "../../images/education.png";
import UserEducationForm from "./UserEducationForm";
import EducationLevel from "./EducationLevel";

const UserEducation = ({ educationLevel }) => {
  return (
    <div>
      <SectionMainTitle title="User Education" />
      <Row className="mb-5" id="general">
        <Col md={6}>
          <div className={styles.seperate_form}>
            <EducationLevel educationLevel={educationLevel} />
          </div>
          <div className={styles.seperate_form}>
            <UserEducationForm />
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

export default UserEducation;
