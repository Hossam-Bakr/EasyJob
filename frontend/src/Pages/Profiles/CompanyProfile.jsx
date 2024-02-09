import React, { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.css";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import CompanyProfileSections from "../../Components/Ui/CompanyProfileSections";
import { useSelector } from "react-redux";
import axios from "axios";

const CompanyProfile = () => {
  const [companyProfileData, setCompanyProfileData] = useState({});
  const companyToken = useSelector((state) => state.userInfo.token);

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

  console.log(companyProfileData);
  console.log(companyProfileData.Company);
  const { name, industry, phone } = companyProfileData.Company || {};
  const {
    logo,
    coverPhoto,
    city,
    country,
    description,
    foundedYear,
    size,
    facebook,
    instagram,
    linkedin,
    twitter,
    youtube,
    website,
    behance,
  } = companyProfileData || {};

  return (
    <>
      <div className={styles.profile_layer}></div>
      <Container fluid="xl" className={styles.profile_body}>
        <div className={styles.profile_header}>
          <ProfileHeader
            cover={coverPhoto}
            pic={logo}
            name={name}
            city={city}
            country={country}
            industry={industry}
            type="company"
          />

          <div className="position-relative px-2">
            <CompanyProfileSections
              city={city}
              country={country}
              industry={industry}
              phone={phone}
              desc={description}
              founded={foundedYear}
              size={size}
              facebook={facebook}
              instagram={instagram}
              website={website}
              twitter={twitter}
              linkedin={linkedin}
              youtube={youtube}
              behance={behance}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompanyProfile;
