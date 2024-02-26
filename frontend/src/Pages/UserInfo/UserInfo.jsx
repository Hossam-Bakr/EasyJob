import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import UserMedia from "../../Components/EdietProfilesInfo/UserMedia";
import Loading from "../../Components/Ui/Loading";
import { useSelector } from "react-redux";
import UserGeneralInfo from "../../Components/EdietProfilesInfo/UserGeneralInfo";
import Links from "../../Components/EdietProfilesInfo/Links";

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
            <Tab eventKey="media" title="COMPANY MEDIA">
              <UserMedia
                gender={userProfileData.gender}
                cover={userProfileData.coverPhoto}
              />
            </Tab>
            <Tab eventKey="info" title="GENERAL INFORMATION">
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
              />
            </Tab>
            <Tab eventKey="contact" title="CONTACT LINKS">
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
          </Tabs>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserInfo;
