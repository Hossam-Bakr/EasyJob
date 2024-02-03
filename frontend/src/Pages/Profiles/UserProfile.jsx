import React from "react";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import styles from "./UserProfile.module.css";
import ProfileSections from "../../Components/Ui/ProfileSections";

const UserProfile = () => {
  return (
    <>
      <div className={styles.profile_layer}></div>
      <Container fluid="lg" className={styles.profile_body}>
        <div className={styles.profile_header}>
         <ProfileHeader cover="c1" pic="p1" />
        </div>
        <ProfileSections/>
      </Container>
    </>
  );
};

export default UserProfile;
