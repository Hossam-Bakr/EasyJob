import React, { useEffect } from "react";
import styles from "./EmployeeManagment.module.css";
import SectionMainTitle from "./../../../Components/Ui/SectionMainTitle";
import { Col, Container, Row } from "react-bootstrap";
import skillsImg from "../../../images/skills_super.jpg";
import NoDataBox from "../../../Components/Ui/NoDataBox";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import CreateSkillForm from "./CreateSkillForm";
import UpdateSkillForm from "./UpdateSkillForm";
import DeleteSkillForm from "./DeleteSkillForm";

const SkillsForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const currentSkills = useSelector((state) => state.category.skills);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={styles.emp_management}>
      <div className={`${styles.search_field} ${styles.skill_field}`}>
        <SectionMainTitle title="All Easy Job Skills" />
        <div className="position-relative">
          {currentSkills ? (
            currentSkills.length > 0 ? (
              <>
                <Table striped hover className={styles.search_table}>
                  <thead>
                    <tr>
                      <th>Skill ID</th>
                      <th>Skill Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSkills.map((skill) => (
                      <tr key={skill.id} className={styles.search_tr}>
                        <td>{skill.id}</td>
                        <td>{skill.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <NoDataBox
                text="No skills Added right now if there is any problems call support"
                path="/contact"
              />
            )
          ) : (
            <div className={styles.searching_img}>
              <h4 className="alert alert-warning">
                {" "}
                there is no skills right now
              </h4>
            </div>
          )}
        </div>
      </div>

      <SectionMainTitle title="Skill Operations" />
      <Row>
        <Col
          md={7}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="w-100 mb-5">
            <CreateSkillForm
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}
            />
          </div>
          <div className="w-100 mb-5">
            <UpdateSkillForm
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}
            />
          </div>
          <div className="w-100">
            <DeleteSkillForm
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          <div className={styles.img_side}>
            <img className="w-100" src={skillsImg} alt="skillsImg" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsForm;
