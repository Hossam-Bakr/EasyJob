import React, { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.css";
import ProfileHeader from "../../Components/Header/ProfileHeader";
import Container from "react-bootstrap/Container";
import CompanyProfileSections from "../../Components/Ui/CompanyProfileSections";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Ui/Loading";
import { useParams } from "react-router-dom";
import { getIndustryName } from "../../Components/logic/Logic";
import fetchVisitProfileData from "../../Store/visitProfile-actions";

const VisitCompanyProfile = () => {
    const currentIndustries = useSelector((state) => state.category.industries);
    const visitProfileData=useSelector((state)=>state.visitProfile.data);
    const token = useSelector((state) => state.userInfo.token);
    const [profileCover, setProfileCover] = useState(null);
    const [profileLogo, setProfileLogo] = useState(null);
    const [companyIndustryName, setCompanyIndustryName] = useState("");
    const params = useParams();
    const role="company";
    const dispatch = useDispatch();


    useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(fetchVisitProfileData(token,role,params.companyId))
    }, [dispatch,token,role,params.companyId]);
  
    useEffect(() => {
      if (visitProfileData?.coverPhoto) {
        const coverPhotoURL = `http://127.0.0.1:3000/companies/${visitProfileData.coverPhoto}`;
        setProfileCover(coverPhotoURL);
      }
  
      if (visitProfileData?.logo) {
        const logoURL = `http://127.0.0.1:3000/companies/${visitProfileData.logo}`;
        setProfileLogo(logoURL);
      }
    }, [visitProfileData]);
  
    useEffect(() => {
      if (currentIndustries && visitProfileData) {
        let industryId = visitProfileData.Company?.industryId;
        getIndustryName(currentIndustries, industryId, setCompanyIndustryName);
      }
    }, [visitProfileData, currentIndustries]);


  return (
    <>
    {visitProfileData ? (
      <>
        <div className={styles.profile_layer}></div>
        <Container fluid="xl" className={styles.profile_body}>
          <div className={styles.profile_header}>
            <ProfileHeader
              cover={profileCover}
              pic={profileLogo}
              url={params.companyId}
              name={visitProfileData.Company?.name}
              city={visitProfileData.city}
              country={visitProfileData.country}
              industry={companyIndustryName}
              facebook={visitProfileData.facebook}
              website={visitProfileData.website}
              twitter={visitProfileData.twitter}
              linkedin={visitProfileData.linkedin}
              behance={visitProfileData.behance}
              type="company"
              isMyProfile={false}
            />

            <div className="position-relative px-2">
              <CompanyProfileSections
                id={params.companyId}
                city={visitProfileData.city}
                country={visitProfileData.country}
                industry={companyIndustryName}
                phone={visitProfileData.Company?.phone}
                desc={visitProfileData.description}
                founded={visitProfileData.foundedYear}
                size={visitProfileData.size}
                facebook={visitProfileData.facebook}
                instagram={visitProfileData.instagram}
                website={visitProfileData.website}
                twitter={visitProfileData.twitter}
                linkedin={visitProfileData.linkedin}
                youtube={visitProfileData.youtube}
                behance={visitProfileData.behance}
                vimeo={visitProfileData.vimeo}
                isMyProfile={false}
              />
            </div>
          </div>
        </Container>
      </>
    ) : (
      <Loading />
    )}
  </>
  )
}

export default VisitCompanyProfile
