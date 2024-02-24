import React from "react";
import styles from "./EdietInfo.module.css";
import SectionMainTitle from "./../../Components/Ui/SectionMainTitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import updateInfo from "../../images/udateInfo.jpg";
import Loading from "../Ui/Loading";
import UserGeneralInfoForm from "./UserGeneralInfoForm";

const UserGeneralInfo = (props) => {
  return (
    <div>
    <SectionMainTitle title="Employee's General Info" />
    {props? (
      <Row className="mb-5" id="general">
        <Col md={6}>
          <UserGeneralInfoForm data={props}/>
        </Col>
        <Col md={6} className={styles.general_info_vector_container}>
          <div className={styles.general_info_vector}>
            <img src={updateInfo} alt="update Info" />
          </div>
        </Col>
      </Row>
    ) : (
      <Loading />
    )}
  </div>
  )
}

export default UserGeneralInfo
