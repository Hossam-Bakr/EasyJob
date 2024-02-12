import React from 'react';
import SectionMainTitle from '../Ui/SectionMainTitle';
import CompanyLinksForm from './CompanyLinksForm';
import { Col, Row } from 'react-bootstrap';
import styles from "./EdietInfo.module.css";
import social from "../../images/socialMedia.png";
import Loading from '../Ui/Loading';

const CompanyLinks = (props) => {
  return (
    <div>
    <SectionMainTitle title="Company General Info" />
    {props? (
      <Row className="mb-5" id="general">
        <Col md={6}>
          <CompanyLinksForm data={props}/>
        </Col>
        <Col md={6} className={styles.general_info_vector_container}>
          <div className={styles.general_info_vector}>
            <img src={social} alt="update Info" />
          </div>
        </Col>
      </Row>
    ) : (
      <Loading />
    )}
  </div>
  )
}

export default CompanyLinks
