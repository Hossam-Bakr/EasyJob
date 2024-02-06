import React from "react";
import styles from "./CompanyProfile.module.css";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import ProfileSections from "../../Components/Ui/ProfileSections";

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
            field="information and communications technology (ICT)"
            city="Cairo"
            country="Egypt"
          />
        </div>
        <ProfileSections />
      </Container>
    </>
  );
};

export default CompanyProfile;
