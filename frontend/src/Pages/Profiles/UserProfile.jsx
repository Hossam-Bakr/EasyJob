import React, { useEffect, useState } from "react";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import styles from "./UserProfile.module.css";
import ProfileSections from "../../Components/Ui/ProfileSections";
import { useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const userProfileData = useSelector((state) => state.profileInfo.data);
  const userProfileMainData = useSelector((state) => state.profileInfo.mainData);
  const [profileCover, setProfileCover] = useState(null);
  const [profileAvatar, setProfileAvatar] = useState(null);
  const params=useParams();

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
                tagline={userProfileData.tagline}
                city={userProfileData.city}
                country={userProfileData.country}
                gender={userProfileData.gender}
                jobTitles={userProfileData.jobTitles}
                openToWork={userProfileData.openToWork }
                github={userProfileData.github}
                stackOverflow={userProfileData.stackOverflow}
                twitter={userProfileData.twitter}
                linkedin={userProfileData.linkedIn}
                behance={userProfileData.behance}
                type="user"
              />
            </div>
            <ProfileSections
              phone={userProfileData.phone}
              email={userProfileMainData.email}
              url={params.userId}
              birthDate={userProfileData.birthDate}
              nationality={userProfileData.nationality}
              gender={userProfileData.gender}
              about={userProfileData.about}
              drivingLicense={userProfileData.drivingLicense}
              facebook={userProfileData.facebook}
              github={userProfileData.github}
              website={userProfileData.website}
              twitter={userProfileData.twitter}
              linkedin={userProfileData.linkedin}
              youtube={userProfileData.youtube}
              behance={userProfileData.behance}
              stackOverflow={userProfileData.stackOverflow}
              Experiences={userProfileData.Experiences}
              Education={userProfileData.Education}
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
