import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import CompanyMedia from "../../Components/EdietProfilesInfo/CompanyMedia";
import CompanyGeneralInfo from "../../Components/EdietProfilesInfo/CompanyGeneralInfo";
import { useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";
import Links from './../../Components/EdietProfilesInfo/Links';

const CompanyInfo = () => {
  const defaultPage = useSelector(
    (state) => state.defaultEdiet.defaultEdietPage
  );
  const companyProfileData = useSelector((state) => state.profileInfo.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {companyProfileData ? (
        <Container>
          <Tabs
            defaultActiveKey={defaultPage||"media"}
            id="uncontrolled-tab-example"
            className="mb-5 mt-5"
            fill
          >
            <Tab eventKey="media" title="COMPANY MEDIA">
              <CompanyMedia logo={companyProfileData.logo} cover={companyProfileData.coverPhoto} />
            </Tab>
            <Tab eventKey="info" title="GENERAL INFORMATION">
              <CompanyGeneralInfo
                name={companyProfileData.Company.name}
                industry={companyProfileData.Company.industry}
                phone={companyProfileData.Company.phone}
                email={companyProfileData.Company.email}
                city={companyProfileData.city}
                country={companyProfileData.country}
                desc={companyProfileData.description}
                founded={companyProfileData.foundedYear}
                size={companyProfileData.size}
                location={companyProfileData.location}
              />
            </Tab>
            <Tab eventKey="contact" title="CONTACT LINKS">
              <Links
                facebook={companyProfileData.facebook}
                instagram={companyProfileData.instagram}
                linkedin={companyProfileData.linkedin}
                twitter={companyProfileData.twitter}
                youtube={companyProfileData.youtube}
                website={companyProfileData.website}
                behance={companyProfileData.behance}
                vimeo={companyProfileData.vimeo}
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

export default CompanyInfo;
