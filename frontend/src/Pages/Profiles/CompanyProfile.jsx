import React, { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.css";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import CompanyProfileSections from "../../Components/Ui/CompanyProfileSections";
import { useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";
import { useParams } from "react-router-dom";
import { getIndustryName } from "../../Components/logic/Logic";

const CompanyProfile = () => {
  const companyProfileData = useSelector((state) => state.profileInfo.data);
  const currentIndustries = useSelector((state) => state.category.industries);
  
  const [profileCover, setProfileCover] = useState(null);
  const [profileLogo, setProfileLogo] = useState(null);
  const [companyIndustryName, setCompanyIndustryName] = useState("");
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (companyProfileData?.coverPhoto) {
      const coverPhotoURL = `http://127.0.0.1:3000/companies/${companyProfileData.coverPhoto}`;
      setProfileCover(coverPhotoURL);
    }

    if (companyProfileData?.logo) {
      const logoURL = `http://127.0.0.1:3000/companies/${companyProfileData.logo}`;
      setProfileLogo(logoURL);
    }
  }, [companyProfileData]);

  useEffect(() => {
    if (currentIndustries && companyProfileData) {
      let industryId = companyProfileData.Company?.industryId;
      getIndustryName(currentIndustries, industryId, setCompanyIndustryName);
    }
  }, [companyProfileData, currentIndustries]);

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
                url={params.companyId}
                name={companyProfileData.Company?.name}
                city={companyProfileData.city}
                country={companyProfileData.country}
                industry={companyIndustryName}
                facebook={companyProfileData.facebook}
                website={companyProfileData.website}
                twitter={companyProfileData.twitter}
                linkedin={companyProfileData.linkedin}
                behance={companyProfileData.behance}
                type="company"
                isMyProfile={true}
              />

              <div className="position-relative px-2">
                <CompanyProfileSections
                  id={params.companyId}
                  city={companyProfileData.city}
                  country={companyProfileData.country}
                  industry={companyIndustryName}
                  phone={companyProfileData.Company?.phone}
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
                  isMyProfile={true}
                />
              </div>
            </div>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CompanyProfile;
