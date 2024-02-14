import React, { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.css";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import CompanyProfileSections from "../../Components/Ui/CompanyProfileSections";
import { useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";



const CompanyProfile = () => {


  const companyProfileData = useSelector((state) => state.profileInfo.data);
  const [profileCover, setProfileCover] = useState(null);
  const [profileLogo, setProfileLogo] = useState(null);

  useEffect(() => {
    if (companyProfileData?.coverPhoto) {
      const coverPhotoURL = require(`../../../../backend/uploads/companies/${companyProfileData.coverPhoto}`).default;
      setProfileCover(coverPhotoURL);
    }

    if (companyProfileData?.logo) {
      const logoURL = require(`../../../../backend/uploads/companies/${companyProfileData.logo}`).default;
      setProfileLogo(logoURL);
    }
  }, [companyProfileData]);
  return (
    
    <>
      {companyProfileData ? (
        <>
          <div className={styles.profile_layer}></div>
          <Container fluid="xl" className={styles.profile_body}>
            <div className={styles.profile_header}>
              <ProfileHeader
                cover={profileCover}
                pic={profileLogo}
                name={companyProfileData.Company.name}
                city={companyProfileData.city}
                country={companyProfileData.country}
                industry={companyProfileData.Companyindustry}
                facebook={companyProfileData.facebook}
                instagram={companyProfileData.instagram}
                website={companyProfileData.website}
                twitter={companyProfileData.twitter}
                linkedin={companyProfileData.linkedin}
                behance={companyProfileData.behance}
                type="company"
              />

              <div className="position-relative px-2">
                <CompanyProfileSections
                  city={companyProfileData.city}
                  country={companyProfileData.country}
                  industry={companyProfileData.industry}
                  phone={companyProfileData.Company.phone}
                  desc={companyProfileData.description}
                  founded={companyProfileData.foundedYear}
                  size={companyProfileData.size}
                  facebook={companyProfileData.facebook}
                  instagram={companyProfileData.instagram}
                  website={companyProfileData.website}
                  twitter={companyProfileData.twitter}
                  linkedin={companyProfileData.linkedin}
                  youtube={companyProfileData.youtube}
                  behance={companyProfileData.behance}
                  vimeo={companyProfileData.vimeo}
                />
              </div>
            </div>
          </Container>{" "}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CompanyProfile;
