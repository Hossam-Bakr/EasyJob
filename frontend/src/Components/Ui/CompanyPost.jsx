import React, { useEffect, useState } from "react";
import styles from "./CompanyPost.module.css";
import Col from "react-bootstrap/esm/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import noLogo from "../../images/noLogo.jpg";
import ApplyBtn from "./ApplyBtn";
import { useSelector } from "react-redux";

const CompanyPost = ({ logo, name, industryId, desc, country, city, grid }) => {

  const [industryName,setIndustryName]=useState("");
  const [jobCompanyLogo, setJobCompanyLogo] = useState(null);
  const industries =useSelector((state)=>state.category.industries);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(()=>{
    if(industryId){
      const industName =industries.find((industry) => industry.id === industryId)
      console.log("industryName", industName);
      setIndustryName(industName.name)
    }
  },[industryId,industries])

  useEffect(() => {
    setJobCompanyLogo(null);
    if (logo) {
      const compLogo = `http://127.0.0.1:3000/companies/${logo}`;
      setJobCompanyLogo(compLogo);
    }
  }, [logo]);

  let xlSize = grid ? 4 : 12;
  let lgSize = grid ? 6 : 12;
  let companyHeightClass = grid ? styles.grid_height : "";

  return (
    <>
      <Col lg={lgSize} xl={xlSize}>
        <div data-aos="zoom-in-up" data-aos-duration="1000">
          <div className={styles.job}>
            <div className={styles.job_icons}>
              <FontAwesomeIcon
                icon={faArrowRight}
                title="view"
                className={`${styles.eye_icon} mx-2`}
              />
            </div>

            <div className={styles.header_container}>
              <div className={styles.logo_div}>
                <img
                  src={jobCompanyLogo?jobCompanyLogo:noLogo}
                  alt="company logo"
                  className={styles.company_logo}
                />
              </div>

              <div className="d-flex flex-column ms-3 mt-1">
                <span className={styles.job_name}>{name}</span>
                <span className="mini_word">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.location_icon}
                  />
                  {city}, {country}
                </span>
              </div>
            </div>
            <div className={companyHeightClass}>
              <h4>{industryName}</h4>
              <p>{desc?desc:"lore"}Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, sint.</p>
            </div>
            <div className="text-center">
              <ApplyBtn text="Related Jobs" />
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CompanyPost;
