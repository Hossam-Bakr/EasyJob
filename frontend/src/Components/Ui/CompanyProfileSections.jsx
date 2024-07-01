import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EdietPenIcon from "./EdietPenIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faVimeo,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CompanyProfileSections.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edietActions } from "../../Store/defaultEdietPage-slice";
import NoDataBox from "./NoDataBox";
import CompanyRelatedJobs from "./CompanyRelatedJobs";

const CompanyProfileSections = ({
  id,
  city,
  country,
  founded,
  industry,
  size,
  desc,
  phone,
  facebook,
  instagram,
  website,
  twitter,
  linkedin,
  youtube,
  behance,
  vimeo,
  isMyProfile
}) => {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultPage=useSelector((state=>state.defaultEdiet.defaultCompanyProfilePage))

  const navigateToEdietProfile = (type) => {
    dispatch(edietActions.setDefaultEdietPage(type));
    navigate("/company-info");
  };

  return (
    <Tabs defaultActiveKey={defaultPage} id="uncontrolled-tab-example" fill>
      <Tab eventKey="overview" title="Overview">
        {!city && !country && !size && !desc && !founded ? (
          <NoDataBox
            text="Complete your Profile Information"
            path="/company-info"
          />
        ) : (
          <>
            <div className={styles.main_style}>
              {isMyProfile&&<EdietPenIcon onClick={() => navigateToEdietProfile("info")} />}
              <h3 className={styles.sec_title}>Company Overview</h3>
              <Row className={styles.general_info}>
                <Col md={7}>
                  <ul className={styles.general_info_list}>
                    {city && country && (
                      <li>
                        <span className={styles.info_title}>Location:</span>
                        <span>
                          {city ? city : ""} {country ? ", " + country : ""}
                        </span>
                      </li>
                    )}
                    {founded && (
                      <li>
                        <span className={styles.info_title}>Founded:</span>
                        <span>{founded}</span>
                      </li>
                    )}
                    <li>
                      <span className={styles.info_title}>Industry:</span>
                      <span>{industry}</span>
                    </li>
                    {size && (
                      <li>
                        <span className={styles.info_title}>Company size:</span>
                        <span>{size} employee</span>
                      </li>
                    )}
                    {phone && (
                      <li>
                        <span className={styles.info_title}>Phone Number:</span>
                        <span>{phone}</span>
                      </li>
                    )}
                  </ul>
                </Col>
                <Col md={5} className={styles.desc_container}>
                  <div className={styles.desc}>
                    <h6 className={styles.desc_title}>Company Desc:</h6>
                    <span>{desc ? desc : "Add You Description here"}</span>
                  </div>
                </Col>
              </Row>
            </div>

              <div className={styles.contact_links}>
                {(linkedin ||
                  facebook ||
                  youtube ||
                  website ||
                  twitter ||
                  behance ||
                  instagram) && (
                  <div className={`${styles.contact_icons}`}>
                    {linkedin && (
                      <Link to={linkedin} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {facebook && (
                      <Link to={facebook} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {youtube && (
                      <Link to={youtube} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faYoutube}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {website && (
                      <Link to={website} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {twitter && (
                      <Link to={twitter} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {instagram && (
                      <Link to={instagram} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {behance && (
                      <Link to={behance} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faBehance}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                    {vimeo && (
                      <Link to={vimeo} target={"_blank"}>
                        <FontAwesomeIcon
                          icon={faVimeo}
                          className={styles.contact_icon}
                        />
                      </Link>
                    )}
                  </div>
                )}
              </div>
          </>
        )}
      </Tab>

      <Tab eventKey="jobs" title="Jobs">
          <CompanyRelatedJobs id={id} isMyProfile={isMyProfile}/>
      </Tab>
    </Tabs>
  );
};

export default CompanyProfileSections;
