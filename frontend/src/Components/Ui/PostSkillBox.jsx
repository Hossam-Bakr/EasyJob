import React, { useEffect, useState } from "react";
import styles from "./SkillBox.module.css";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PostSkillBox = ({ skillDetails, deleteSelectedSkill, type }) => {
  const [formatedLevel, setFormatedLevel] = useState("");
  const [formatedSkillName, setFormatedSkillName] = useState("");
  const currentSkills = useSelector((state) => state.category.skills);

  useEffect(() => {
    if (skillDetails?.minLevel) {
      switch (skillDetails.minLevel) {
        case "1":
          setFormatedLevel("entry level");
          break;
        case "2":
          setFormatedLevel("mid level");
          break;
        case "3":
          setFormatedLevel("experienced");
          break;

        default:
          setFormatedLevel("entry level");
          break;
      }
    }
  }, [skillDetails.minLevel]);

  useEffect(() => {
    if (skillDetails.hasOwnProperty("SkillId")) {
      if (currentSkills) {
        let existSkill = currentSkills.find(
          (skill) => skill.id === skillDetails.SkillId
        );
        if (existSkill) {
          setFormatedSkillName(existSkill.name);
        }
      }
    } else if (skillDetails.hasOwnProperty("newSkill")) {
      setFormatedSkillName(skillDetails.newSkill);
    } else {
      setFormatedSkillName(skillDetails.name);
    }
  }, [skillDetails, currentSkills, type]);

  const deleteSkill = () => {
    deleteSelectedSkill(skillDetails);
  };

  return (
    <Col
      title={`skill level is (${formatedLevel}) & min years of experience is (${skillDetails?.minYearsOfExperience})`}
      sm={2}
      md={3}
      className={`${styles.post_skill} mx-2`}
    >
      <FontAwesomeIcon
        onClick={deleteSkill}
        title="Delete skill"
        className={styles.trash}
        icon={faTrash}
      />
      <span>
        {formatedSkillName}
        <Badge
          className={`${
            formatedLevel === "entry level"
              ? "bg-danger"
              : formatedLevel === "mid level"
              ? "bg-warning"
              : "bg-success"
          } position-absolute top-0 start-100 translate-middle badge rounded-pill`}
        >
          {skillDetails?.minYearsOfExperience}
        </Badge>
      </span>
    </Col>
  );
};

export default PostSkillBox;
