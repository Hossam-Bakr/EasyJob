import React, { useState } from "react";
import styles from "./WorkExperienceBox.module.css";
import organizationLogo from "../../images/noLogo.jpg";
import EdietPenIcon from "./EdietPenIcon";
import UpdateWorkExperienceModal from "./UpdateWorkExperienceModal";

const WorkExperienceBox = ({
  title,
  type,
  description,
  startDate,
  endDate,
  organization,
  expId,
  category,
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

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <>
      <div className={`${styles.exp_box} my-5`}>
       {isMyProfile&& <EdietPenIcon onClick={() => setModalShow(true)} color="blue" />}
        <div className={`${styles.box_container} d-flex`}>
          <div className={styles.organization_logo}>
            <img src={organizationLogo} alt="organization Logo" />
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
              <span className={styles.type}>{type}</span>
              <span className="mini_word">
                {formattedStartDate} - {formattedEndDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <UpdateWorkExperienceModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        expId={expId}
        title={title}
        type={type}
        description={description}
        startDate={startDate}
        endDate={endDate}
        organization={organization}
        category={category}
        setSecResponseMsg={setSecResponseMsg}
        setSecSuccess={setSecSuccess}
        setSecShowResponse={setSecShowResponse}
      />
    </>
  );
};

export default WorkExperienceBox;
