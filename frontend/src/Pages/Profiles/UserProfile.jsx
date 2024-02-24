import React, { useEffect, useState } from "react";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import styles from "./UserProfile.module.css";
import ProfileSections from "../../Components/Ui/ProfileSections";
import { useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";

const UserProfile = () => {
  const userProfileData = useSelector((state) => state.profileInfo.data);
  const userProfileMainData = useSelector((state) => state.profileInfo.mainData);
  const [profileCover, setProfileCover] = useState(null);
  const [profileAvatar, setProfileAvatar] = useState(null);

  useEffect(() => {
    if (userProfileData?.coverPhoto) {
      const coverPhotoURL = `http://127.0.0.1:3000/users/${userProfileData.coverPhoto}`;
      setProfileCover(coverPhotoURL);
    }

    if (userProfileData?.avatar) {
      const avatarURL = `http://127.0.0.1:3000/users/${userProfileData.avatar}`;
      setProfileAvatar(avatarURL);
    }
  }, [userProfileData]);

  return (
    <>
      {userProfileData ? (
        <>
          <div className={styles.profile_layer}></div>
          <Container fluid="xl" className={styles.profile_body}>
            <div className={styles.profile_header}>
              <ProfileHeader
                cover={profileCover}
                pic={profileAvatar}
                firstName={userProfileMainData.firstName}
                lastName={userProfileMainData.lastName}
                city={userProfileData.city}
                country={userProfileData.country}
                gender={userProfileData.gender}
                jobTitles={userProfileData.jobTitles}
                github={userProfileData.github}
                stackOverflow={userProfileData.stackOverflow}
                twitter={userProfileData.twitter}
                linkedin={userProfileData.linkedin}
                behance={userProfileData.behance}
                type="user"
              />
            </div>
            <ProfileSections
              phone={userProfileData.phone}
              email={userProfileMainData.email}
              // url={userProfileData.}
              birthDate={userProfileData.birthDate}
              nationality={userProfileData.nationality}
              gender={userProfileData.gender}
              about={userProfileData.about}
            
            />
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserProfile;
