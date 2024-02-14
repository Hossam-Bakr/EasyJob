import React, { useEffect, useState } from "react";
import styles from "./CompanyInfo.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Container from "react-bootstrap/Container";

import CompanyMedia from "../../Components/EdietProfilesInfo/CompanyMedia";
import CompanyGeneralInfo from "../../Components/EdietProfilesInfo/CompanyGeneralInfo";
import { useSelector } from "react-redux";
import axios from "axios";
import CompanyLinks from "../../Components/EdietProfilesInfo/CompanyLinks";

const CompanyInfo = () => {
  //used in info and profile so i will create custome hook
  const [companyProfileData, setCompanyProfileData] = useState({});
  const companyToken = useSelector((state) => state.userInfo.token);
  const defaultPage = useSelector((state) => state.defaultEdiet.defaultEdietPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (companyToken) {
          const res = await axios.get(
            "http://127.0.0.1:3000/api/v1/companies/profile",
            {
              headers: {
                Authorization: `Bearer ${companyToken}`,
              },
            }
          );
          setCompanyProfileData(res.data.data.companyProfile);
        } else {
          console.log("there is no token");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [companyToken]);
  
  
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
    vimeo
  } = companyProfileData || {};

  return (
    <Container className={styles.company_info_container}>
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
          <CompanyLinks
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
  );
};

export default CompanyInfo;
