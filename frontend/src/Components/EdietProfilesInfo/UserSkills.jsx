import React, { useState } from "react";
import SectionMainTitle from "../Ui/SectionMainTitle";
import { Col, Row } from "react-bootstrap";
import styles from "./EdietInfo.module.css";
import skills from "../../images/Processing-pana.png";
import Loading from "../Ui/Loading";
import Alert from "react-bootstrap/Alert";
import FloatingPopup from "../Ui/FloatingPopup";
import UpdateUserSkillsModal from "./../Ui/UpdateUserSkillsModal";
import SkillBox from "../Ui/SkillBox";
import MainBtnThree from './../Ui/MainBtnThree';
import LanguageBox from "../Ui/LanguageBox";

const UserSkills = ({ Skills,languages }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("add");

  const fireModal=(type)=>{
    setModalType(type)
    setModalShow(true)
  }

  return (
    <>
      <div>
        <SectionMainTitle title="User Skills" />
        {Skills ? (
          <Row className="mb-5" id="general">
            <Col md={6}>
              <div className={styles.seperate_form}>
                <h4 className={styles.sep_title}>
                  What skills do you have?
                </h4>
                {Skills.length !== 0 ? (
                  <>
                    {Skills.map((skill) => (
                      <SkillBox 
                        key={skill.UserSkill.id}  
                        id={skill.UserSkill.id}
                        name={skill.name}
                        proficiency={skill.UserSkill.proficiency}
                        setShowResponse={setShowResponse}
                        setResponseMessage={setResponseMessage}
                        setSuccessResponse={setSuccessResponse}
                        isMyProfile={true}
                      />
                    ))}
                  </>


                ) : (
                  <Alert variant="warning">
                    You Didn't Add Any Skills yet !
                  </Alert>
                )}
                <MainBtnThree
                  text="Add New Skill"
                  onClick={()=>fireModal("add")}
                />
              </div>

              <div className={styles.seperate_form}>
                <h4 className={styles.sep_title}> 
                 What languages do you know?
                </h4>
                
                {languages.length !== 0 ? (
                  <>
                    {languages.map((lang) => (
                      <LanguageBox  
                        key={lang.id} 
                        id={lang.id} 
                        language={lang.language}
                        proficiency={lang.proficiency}
                        setShowResponse={setShowResponse}
                        setResponseMessage={setResponseMessage}
                        setSuccessResponse={setSuccessResponse}
                        isMyProfile={true}
                      />
                    ))}
                  </>


                ) : (
                  <Alert variant="warning">
                    You Didn't Add Any Language yet !
                  </Alert>
                )}
                <MainBtnThree
                  text="Add Language"
                  onClick={()=>fireModal("lang")}
                />
              </div>
              
            </Col>
            <Col md={6} className={styles.general_info_vector_container}>
              <div className={styles.general_info_vector}>
                <img src={skills} alt="update Info" />
              </div>
            </Col>
          </Row>
        ) : (
          <Loading />
        )}
      </div>

      <UpdateUserSkillsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        type={modalType}
      />
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default UserSkills;
