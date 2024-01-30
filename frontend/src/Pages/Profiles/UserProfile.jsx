import React from "react";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <>
      <div className={styles.profile_layer}></div>
      <Container fluid="lg" className={styles.profile_body}>
        <ProfileHeader cover="c1" pic="p1" />
      </Container>
    </>
  );
};

export default UserProfile;
