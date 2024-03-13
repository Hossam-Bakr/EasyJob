import React, {useState } from "react";
import styles from "./SkillBox.module.css";
import EdietPenIcon from "./EdietPenIcon";
import UpdateUserSkillsModal from "./UpdateUserSkillsModal";

const LanguageBox = ({  
    id,
    language,
    proficiency,
    setShowResponse,
    setResponseMessage,
    setSuccessResponse,}) => {

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
    <div className={styles.skill_box}>
      <EdietPenIcon color="blue" onClick={() => setModalShow(true)} />
      <h3>
        {language} <span className="mini_word">({proficiency})</span>
      </h3>
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
