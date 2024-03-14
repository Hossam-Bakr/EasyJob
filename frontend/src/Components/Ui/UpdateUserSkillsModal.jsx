import React from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import UserSkillsForm from "../EdietProfilesInfo/UserSkillsForm";
import UpdateUserSkillsForm from "../EdietProfilesInfo/UpdateUserSkillsForm";
import LanguagesForm from "../EdietProfilesInfo/LanguagesForm";
import UpdateLanguageForm from "../EdietProfilesInfo/UpdateLanguageForm";
import UpdateUserCirtificationsForm from "./../EdietProfilesInfo/UpdateUserCirtificationsForm";

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
  certificate,
}) => {
  return (
    <>
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
            {type === "certificate" ? (
              "Update Skill"
            ) : (
              <>
                {type === "add"
                  ? "Add Skill"
                  : type === "update"
                  ? "Update Skill"
                  : type === "lang"
                  ? "Add Language"
                  : "update Language"}
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          {type === "certificate" ? (
            <UpdateUserCirtificationsForm
            certificate={certificate}
            onHide={onHide}
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            />
          ) : (
            <>
              {type === "add" ? (
                <UserSkillsForm />
              ) : (
                <>
                  {type === "update" ? (
                    <UpdateUserSkillsForm
                      skillData={{ id, name, proficiency }}
                      onHide={onHide}
                      setShowResponse={setShowResponse}
                      setResponseMessage={setResponseMessage}
                      setSuccessResponse={setSuccessResponse}
                    />
                  ) : (
                    <>
                      {type === "lang" ? (
                        <LanguagesForm />
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
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateUserSkillsModal;
