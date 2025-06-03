import { useEffect, useState } from "react";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import styles from "./UserProfile.module.css";
import ProfileSections from "../../Components/Ui/ProfileSections";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";
import { useParams } from "react-router-dom";
import fetchVisitProfileData from "../../Store/visitProfile-actions";

const VisiteEmployeeProfile = () => {
    // userProfile
    const visitProfileData=useSelector((state)=>state.visitProfile.data);
    const token = useSelector((state) => state.userInfo.token);
    const [profileCover, setProfileCover] = useState(null);
    const [profileAvatar, setProfileAvatar] = useState(null);
    const params=useParams();
    const role="user";
    const dispatch = useDispatch();


    useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(fetchVisitProfileData(token,role,params.userId))
    }, [dispatch,token,role,params.userId]);

    useEffect(() => {
      if (visitProfileData?.userProfile?.coverPhoto) {
        const coverPhotoURL = `http://127.0.0.1:3000/users/${visitProfileData?.userProfile?.coverPhoto}`;
        setProfileCover(coverPhotoURL);
      }
  
      if (visitProfileData?.userProfile?.avatar) {
        const avatarURL = `http://127.0.0.1:3000/users/${visitProfileData?.userProfile?.avatar}`;
        setProfileAvatar(avatarURL);
      }
    }, [visitProfileData]);
    
  return (
    <>
    {visitProfileData ? (
      <>
        <div className={styles.profile_layer}></div>
        <Container fluid="xl" className={styles.profile_body}>
          <div className={styles.profile_header}>
            <ProfileHeader
              cover={profileCover}
              pic={profileAvatar}
              firstName={visitProfileData.user?.firstName}
              lastName={visitProfileData.user?.lastName}
              tagline={visitProfileData.userProfile?.tagline}
              city={visitProfileData.userProfile?.city}
              country={visitProfileData.userProfile?.country}
              gender={visitProfileData.userProfile?.gender}
              jobTitles={visitProfileData.userProfile?.jobTitles}
              openToWork={visitProfileData.userProfile?.openToWork }
              github={visitProfileData.userProfile?.github}
              stackOverflow={visitProfileData.userProfile?.stackOverflow}
              twitter={visitProfileData.userProfile?.twitter}
              linkedin={visitProfileData.userProfile?.linkedIn}
              behance={visitProfileData.userProfile?.behance}
              type="user"
              isMyProfile={false}
            />
          </div>
          <ProfileSections
            phone={visitProfileData.userProfile?.phone}
            email={visitProfileData.user?.email}
            url={params.userId}
            birthDate={visitProfileData.userProfile?.birthDate}
            nationality={visitProfileData.userProfile?.nationality}
            gender={visitProfileData.userProfile?.gender}
            about={visitProfileData.userProfile?.about}
            drivingLicense={visitProfileData.userProfile?.drivingLicense}
            facebook={visitProfileData.userProfile?.facebook}
            github={visitProfileData.userProfile?.github}
            website={visitProfileData.userProfile?.website}
            twitter={visitProfileData.userProfile?.twitter}
            linkedin={visitProfileData.userProfile?.linkedin}
            youtube={visitProfileData.userProfile?.youtube}
            behance={visitProfileData.userProfile?.behance}
            stackOverflow={visitProfileData.userProfile?.stackOverflow}
            Experiences={visitProfileData.userProfile?.Experiences}
            Education={visitProfileData.userProfile?.Education}
            Skills={visitProfileData.userProfile?.Skills}
            languages={visitProfileData.userProfile?.languages}
            certifications={visitProfileData.userProfile?.Certifications}
            isMyProfile={false}
          />
        </Container>
      </>
    ) : (
      <Loading />
    )}
  </>
  )
}

export default VisiteEmployeeProfile
