import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import CompanyLinks from "../../Components/EdietProfilesInfo/CompanyLinks";
import UserMedia from "../../Components/EdietProfilesInfo/UserMedia";
import Loading from "../../Components/Ui/Loading";
import { useSelector } from "react-redux";
import UserGeneralInfo from "../../Components/EdietProfilesInfo/UserGeneralInfo";

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
                birthDate= {userProfileData.birthDate}
                phone= {userProfileData.phone}
                gender= {userProfileData.gender}
                nationality={userProfileData.nationality}
                drivingLicense= {userProfileData.drivingLicense}
                country={userProfileData.country}
                city= {userProfileData.city}
                area= {userProfileData.area}
              />
            </Tab>
            <Tab eventKey="contact" title="CONTACT LINKS">
              <CompanyLinks />
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
