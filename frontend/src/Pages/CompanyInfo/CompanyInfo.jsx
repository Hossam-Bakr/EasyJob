import React from "react";
import styles from "./CompanyInfo.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import logo from "../../images/logo/huwawei.webp";
import cover from "../../images/companyCover.jpg"
import Container from "react-bootstrap/Container";
import SectionMainTitle from './../../Components/Ui/SectionMainTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CompanyInfo = () => {
  return (
      <Container className={styles.company_info_container}>
        <Tabs
          defaultActiveKey="media"
          id="uncontrolled-tab-example"
          className="mb-5"
          fill
        >
          <Tab eventKey="media" title="COMPANY MEDIA">
            <div className={`${styles.logo_section} d-flex flex-column align-items-center my-5 `}>
              <SectionMainTitle title="Company Logo"/>
              <div className={styles.company_old_logo}>
                <img src={logo} alt="logo" />
              </div>
              <div className="d-flex mt-4">
                <button className={`${styles.change_logo_btn} me-4`}>Change logo</button>
                <button className={`${styles.delete_btn}`}><FontAwesomeIcon icon={faTrash}/> Delete</button>
              </div>
              <span className="mini_word mt-4">
                maximum size of 5 MB. Logo Recommended aspect ratio of 1:1
              </span>
            </div>

            <div className={`${styles.cover_section} d-flex flex-column align-items-center my-5`}>
              <SectionMainTitle title="Company Cover"/>
              <div className={styles.company_old_cover}>
                <img src={cover} alt="company cover" />
              </div>
              <div className="d-flex mt-4">
                <button className={`${styles.change_logo_btn} me-4`}>Change Cover</button>
                <button className={`${styles.delete_btn}`}><FontAwesomeIcon icon={faTrash}/> Delete</button>
              </div>
              <span className="mini_word mt-4 text-center px-5">
               By selecting and submitting a cover photo, you confirm that you possess the necessary rights to distribute this image and that it complies with the terms outlined in the user agreement. Uploading a cover photo plays a crucial role in establishing and differentiating your brand.
              </span>
            </div>
          </Tab>
          <Tab eventKey="info" title="GENERAL INFORMATION">
            <div>
             <SectionMainTitle title="Company General Info"/>
    
            </div>
          </Tab>
          <Tab eventKey="contact" title="CONTACT LINKS">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Container>
  );
};

export default CompanyInfo;
