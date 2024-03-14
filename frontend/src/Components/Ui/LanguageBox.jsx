import React, {useState } from "react";
import styles from "./SkillBox.module.css";
import EdietPenIcon from "./EdietPenIcon";
import UpdateUserSkillsModal from "./UpdateUserSkillsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as noColorStar } from "@fortawesome/free-regular-svg-icons";

const LanguageBox = ({  
    id,
    language,
    proficiency,
    setShowResponse,
    setResponseMessage,
    setSuccessResponse,}) => {

  const [modalShow, setModalShow] = useState(false);
  
  let level;

switch (proficiency) {
  case "beginner":
     level=<div className="ms-3">
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={noColorStar} className={styles.star}/>
    <FontAwesomeIcon icon={noColorStar} className={styles.star}/>
    <FontAwesomeIcon icon={noColorStar} className={styles.star}/>
  </div>
    break;
  case "intermediate":
     level=<div className="ms-3">
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={noColorStar} className={styles.star}/>
    <FontAwesomeIcon icon={noColorStar} className={styles.star}/>
  </div>
    break;
  case "fluent":
     level=<div className="ms-3">
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={noColorStar} className={styles.star}/>
  </div>
    break;
  case "native":
     level=<div className="ms-3">
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
    <FontAwesomeIcon icon={faStar} className={styles.star}/>
  </div>
    break;

  default:
    break;
}

  return (
    <>
    <div className={styles.skill_box}>
      <EdietPenIcon color="blue" onClick={() => setModalShow(true)} />
      <span className="d-flex align-items-center">
        {language} <span className="mini_word">
          {level}
        </span>
      </span>
    </div>

    <UpdateUserSkillsModal
      id={id}
      language={language}
      proficiency={proficiency}
      show={modalShow}
      onHide={() => setModalShow(false)}
      setShowResponse={setShowResponse}
      setResponseMessage={setResponseMessage}
      setSuccessResponse={setSuccessResponse}
      type="updateLang"
    />
  </>
  )
}

export default LanguageBox
