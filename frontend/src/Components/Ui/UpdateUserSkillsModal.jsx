import React from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import UserSkillsForm from "../EdietProfilesInfo/UserSkillsForm";
import UpdateUserSkillsForm from "../EdietProfilesInfo/UpdateUserSkillsForm";
import LanguagesForm from "../EdietProfilesInfo/LanguagesForm";
import UpdateLanguageForm from "../EdietProfilesInfo/UpdateLanguageForm";

const UpdateUserSkillsModal = ({
  onHide,
  show,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  type,
  id,
  name,
  proficiency,
  language,
}) => {

  
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal_container}
    >
      <Modal.Header closeButton className={styles.modal_header}>
        <Modal.Title id="contained-modal-title-vcenter">
          {type === "add" ? "Add Skill" : type==="update"? "Update Skill":type==="lang"?"Add Language":"update Language"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        {type === "add" ? (
          <UserSkillsForm
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
          />
        ) : (
          <>
            {type === "update" ? (
              <UpdateUserSkillsForm
                id={id}
                name={name}
                proficiency={proficiency}
                onHide={onHide}
                setShowResponse={setShowResponse}
                setResponseMessage={setResponseMessage}
                setSuccessResponse={setSuccessResponse}
              />
            ) : (
              <>
                {type === "lang" ? (
                  <LanguagesForm
                    setShowResponse={setShowResponse}
                    setResponseMessage={setResponseMessage}
                    setSuccessResponse={setSuccessResponse}
                  />
                ) : (
                  <UpdateLanguageForm
                    id={id}
                    language={language}
                    proficiency={proficiency}
                    onHide={onHide}
                    setShowResponse={setShowResponse}
                    setResponseMessage={setResponseMessage}
                    setSuccessResponse={setSuccessResponse}
                  />
                )}
              </>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUserSkillsModal;
