import React, { useEffect, useState } from "react";
import styles from "./SkillBox.module.css";
import EdietPenIcon from "./EdietPenIcon";
import UpdateUserSkillsModal from "./UpdateUserSkillsModal";
import Col from "react-bootstrap/Col";

const SkillBox = ({
  id,
  name,
  proficiency,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  shape,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [formatedProf, setFormatedProf] = useState("entry level");
  const [levelClass, setLevelClass] = useState("");

  useEffect(() => {
    if (proficiency) {
      switch (proficiency) {
        case 1:
          setFormatedProf("entry level");
          setLevelClass(styles.red);
          break;
        case 2:
          setFormatedProf("mid level");
          setLevelClass(styles.yellow);
          break;
        case 3:
          setFormatedProf("experienced");
          setLevelClass(styles.green);
          break;

        default:
          setFormatedProf("entry level");
          break;
      }
    }
  }, [proficiency]);

  return (
    <>
      {shape === "profile" ? (
        <Col sm={2} className={`${styles.skill} ${levelClass} mx-2`}>
          <span>{name}</span>
        </Col>
      ) : (
        <div className={`${styles.skill_box} ${levelClass}`}>
          <EdietPenIcon color="blue" onClick={() => setModalShow(true)} />
          <span>
            {name} <span className="mini_word">({formatedProf})</span>
          </span>
        </div>
      )}

      <UpdateUserSkillsModal
        id={id}
        name={name}
        proficiency={proficiency}
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        type="update"
      />
    </>
  );
};

export default SkillBox;
