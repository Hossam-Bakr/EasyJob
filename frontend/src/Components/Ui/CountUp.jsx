import React from "react";
import styles from "./CountUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CountUp = () => {
  return (
    <>
      <div className={styles.countUp_container}>
        <Row className="w-100">
          <Col  sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon icon={faUsers} className={styles.countUp_icon} />
              <h3>717</h3>
              <p>Users</p>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon
                icon={faBuilding}
                className={styles.countUp_icon}
              />
              <h3>217</h3>
              <p>Companies</p>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon
                icon={faUserTie}
                className={styles.countUp_icon}
              />
              <h3>500</h3>
              <p>Candidates</p>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon
                icon={faBriefcase}
                className={styles.countUp_icon}
              />
              <h3>690</h3>
              <p>Jobs</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CountUp;
