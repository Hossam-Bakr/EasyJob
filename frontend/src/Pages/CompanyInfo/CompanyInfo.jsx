import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import CompanyMedia from "../../Components/EdietProfilesInfo/CompanyMedia";
import CompanyGeneralInfo from "../../Components/EdietProfilesInfo/CompanyGeneralInfo";
import { useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";
import { Link } from 'react-router-dom';

const CompanyInfo = () => {
  const defaultPage = useSelector(
    (state) => state.defaultEdiet.defaultEdietPage
  );
  const companyProfileData = useSelector((state) => state.profileInfo.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { name, industry, phone, email } = companyProfileData.Company || {};
  const {
    logo,
    coverPhoto,
    city,
    country,
    description,
    foundedYear,
    location,
    size,
    facebook,
    instagram,
    linkedin,
    twitter,
    youtube,
    website,
    behance,
    vimeo,
  } = companyProfileData || {};

  return (
    <>
      {companyProfileData ? (
        <Container>
          <Tabs
            defaultActiveKey={defaultPage}
            id="uncontrolled-tab-example"
            className="mb-5 mt-5"
            fill
          >
            <Tab eventKey="media" title="COMPANY MEDIA">
              <CompanyMedia logo={logo} cover={coverPhoto} />
            </Tab>
            <Tab eventKey="info" title="GENERAL INFORMATION">
              <CompanyGeneralInfo
                name={name}
                industry={industry}
                phone={phone}
                email={email}
                city={city}
                country={country}
                desc={description}
                founded={foundedYear}
                size={size}
                location={location}
              />
            </Tab>
            <Tab eventKey="contact" title="CONTACT LINKS">
              <Link
                facebook={facebook}
                instagram={instagram}
                linkedin={linkedin}
                twitter={twitter}
                youtube={youtube}
                website={website}
                behance={behance}
                vimeo={vimeo}
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
