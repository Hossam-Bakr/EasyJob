import React, { useState } from "react";
import styles from "./WorkExperienceBox.module.css";
import EdietPenIcon from "./EdietPenIcon";
import UpdateUserSkillsModal from "./UpdateUserSkillsModal";
import certLogo from "../../images/certLogo.svg";
import { Link } from 'react-router-dom';

const CertificateBox = ({
  id,
  title,
  organization,
  description,
  issueDate,
  credentialID,
  credentialURL,
  setSecResponseMsg,
  setSecSuccess,
  setSecShowResponse,
  isMyProfile
}) => {
  const [modalShow, setModalShow] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedIssueDate = formatDate(issueDate);

  return (
    <>
  <div className={`${styles.exp_box} my-5`}>
        {isMyProfile&&<EdietPenIcon onClick={() => setModalShow(true)} color="blue" />}
        <div className={`${styles.box_container} d-flex`}>
          <div className={styles.organization_logo_certificate}>
            <img src={certLogo} alt="organization Logo" />
          </div>
          <div
            className={`${styles.caption} d-flex justify-content-between  align-items-center`}
          >
            <div className={styles.exp_content}>
              <h4>{title}</h4>
              <h5>{organization}</h5>
              {description && <p>{description}</p>}
            </div>
            <div
              className={`${styles.type_container} d-flex flex-column justify-content-center text-center`}
            >
              <Link to={credentialURL} target="_blank" className={styles.type}>Preview</Link>
              <span className="mini_word">
                {formattedIssueDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      <UpdateUserSkillsModal
        certificate={{
          id,
          title,
          organization,
          description,
          credentialID,
          issueDate,
          credentialURL,
        }}
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShowResponse={setSecShowResponse}
        setResponseMessage={setSecResponseMsg}
        setSuccessResponse={setSecSuccess}
        type="certificate"
      />
    </>
  );
};

export default CertificateBox;
