import React from "react";
import SectionMainTitle from "../Ui/SectionMainTitle";
import { Col, Row } from "react-bootstrap";
import styles from "./EdietInfo.module.css";
import certificate from "../../images/certificate.png";
import UserCertificationsForm from "./UserCertificationsForm";

const UserCertifications = () => {
  return (
    <div>
    <SectionMainTitle title="User Experiences" />
    <Row className="mb-5" id="general">
      <Col md={6}>
        <div>
          <UserCertificationsForm />
        </div>
      </Col>
      <Col md={6} className={styles.general_info_vector_container}>
        <div className={styles.general_info_vector}>
          <img src={certificate} alt="work Experiance" />
        </div>
      </Col>
    </Row>
  </div>
  )
}

export default UserCertifications
