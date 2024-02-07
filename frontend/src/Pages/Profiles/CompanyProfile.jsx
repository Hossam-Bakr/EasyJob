import React from "react";
import styles from "./CompanyProfile.module.css";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import CompanyProfileSections from "../../Components/Ui/CompanyProfileSections";


const CompanyProfile = () => {
  return (
    <>
      <div className={styles.profile_layer}></div>
      <Container fluid="xl" className={styles.profile_body}>
        <div className={styles.profile_header}>
          <ProfileHeader
            cover="c2"
            pic="p2"
            type="company"
            name="Huwawei"
            field="Information and communications technology (ICT)"
            city="Cairo"
            country="Egypt"
          />

            <div className="position-relative px-2">
             <CompanyProfileSections/>
            </div>
        </div>


      </Container>
    </>
  );
};

export default CompanyProfile;
