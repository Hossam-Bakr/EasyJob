import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import UserMedia from "../../Components/EdietProfilesInfo/UserMedia";
import Loading from "../../Components/Ui/Loading";
import { useSelector } from "react-redux";
import UserGeneralInfo from "../../Components/EdietProfilesInfo/UserGeneralInfo";
import Links from "../../Components/EdietProfilesInfo/Links";
import UserExperience from "../../Components/EdietProfilesInfo/UserExperience";
import UserCareerInterests from "../../Components/EdietProfilesInfo/UserCareerInterests";
import UserEducation from "../../Components/EdietProfilesInfo/UserEducation";
import UserSkills from './../../Components/EdietProfilesInfo/UserSkills';
import UserCertifications from "../../Components/EdietProfilesInfo/UserCertifications";

const UserInfo = () => {
  const userProfileData = useSelector((state) => state.profileInfo.data);
  const defaultPage = useSelector(
    (state) => state.defaultEdiet.defaultEdietPage
  );

  console.log(userProfileData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {userProfileData ? (
        <Container>
          <Tabs
            defaultActiveKey={defaultPage}
            id="uncontrolled-tab-example"
            className="mb-5 mt-5"
            fill
          >
            <Tab eventKey="media" title="Media">
              <UserMedia
                gender={userProfileData.gender}
                cover={userProfileData.coverPhoto}
              />
            </Tab>
            <Tab eventKey="info" title="General Info">
              <UserGeneralInfo
                birthDate={userProfileData.birthDate}
                phone={userProfileData.phone}
                gender={userProfileData.gender}
                nationality={userProfileData.nationality}
                drivingLicense={userProfileData.drivingLicense}
                openToWork={userProfileData.openToWork}
                country={userProfileData.country}
                city={userProfileData.city}
                area={userProfileData.area}
                about={userProfileData.about}
                tagline={userProfileData.tagline}
              />
            </Tab>
            <Tab eventKey="contact" title="Contact Links">
              <Links
                facebook={userProfileData.facebook}
                stackOverflow={userProfileData.stackOverflow} //insta
                linkedIn={userProfileData.linkedIn}
                twitter={userProfileData.twitter}
                youtube={userProfileData.youtube}
                website={userProfileData.website}
                behance={userProfileData.behance}
                github={userProfileData.github} //vimeo
              />
            </Tab>
            <Tab eventKey="experience" title="Experience">
              <UserExperience
                totalYearsOfExperience={userProfileData.totalYearsOfExperience}
              />
            </Tab>
            <Tab eventKey="interests" title="Career Interests">
              <UserCareerInterests
                currentCareerLevel={userProfileData.currentCareerLevel}
                jobTitles={userProfileData.jobTitles}
                jobTypes={userProfileData.jobTypes}
                jobCategories={userProfileData.jobCategories} 
              />
            </Tab>
            <Tab eventKey="education" title="Education">
              <UserEducation 
              educationLevel={userProfileData.educationLevel}
              />
            </Tab>
            <Tab eventKey="skills" title="Skills">
              {/* language with skills */}
              <UserSkills
                Skills={userProfileData.Skills}
                languages={userProfileData.languages}
              />
            </Tab>
            <Tab eventKey="certifications" title="Certifications">
              <UserCertifications
                certifications={userProfileData.certifications}
              />
            </Tab>
          </Tabs>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserInfo;
