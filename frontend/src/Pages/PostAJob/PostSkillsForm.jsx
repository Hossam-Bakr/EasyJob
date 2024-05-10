import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { convertSkillsIntoList } from "../../Components/logic/Logic";
import { useSelector } from "react-redux";
import styles from "./JobForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";

const animatedComponents = makeAnimated();

const skillExperienceOptions = [
  { value: "1", label: "Entry Level" },
  { value: "2", label: "Mid Level" },
  { value: "3", label: "Experienced" },
];

const minYearsOfExperience = [
  { value: "0-1", label: "0-1 years" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-8", label: "5-8 years" },
  { value: "10+", label: "10+ years" },
];

const PostSkillsForm = ({
  onHide,
  savePostSkillDataToModal,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse
}) => {
  const [mySkills, setMySkills] = useState([]);
  const [chosenSkill, setChosenSkill] = useState({});
  const [experienceLevel, setexperienceLevel] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSkillError, setIsSkillError] = useState(false);
  const [isExperienceError, setIsExperienceError] = useState(false);
  const [isYearsOfExperenceError, setIsYearsOfExperenceError] = useState(false);
  const currentSkills = useSelector((state) => state.category.skills);

  useEffect(() => {
    convertSkillsIntoList(currentSkills, setMySkills);
  }, [currentSkills]);

  const checkSkill = (val) => {
    if (val) {
      if (val.__isNew__) {
        setChosenSkill({ newSkill: val.label });
      } else {
        setChosenSkill({ SkillId: val.value });
      }
    }
  };

  const saveExperienceLevel = (val) => {
    setexperienceLevel(val.value);
  };

  const saveYearsOfExperience = (val) => {
    setYearsOfExperience(val.value);
  };

  const submitSkillData = () => {
    setIsLoading(true);
    let updatedSkills = {};
    if (chosenSkill.SkillId || chosenSkill.newSkill) {
      setIsSkillError(false);
      updatedSkills = { ...chosenSkill };
      if (experienceLevel !== "") {
        setIsExperienceError(false);
        updatedSkills.minLevel = experienceLevel;
      } else {
        setIsExperienceError(true);
      }
      if (yearsOfExperience !== "") {
        setIsYearsOfExperenceError(false);
        updatedSkills.minYearsOfExperience = yearsOfExperience;
      } else {
        setIsYearsOfExperenceError(true);
      }
    } else {
      setIsSkillError(true);
    }


    if(!isExperienceError&&!isSkillError&&!isYearsOfExperenceError){
        savePostSkillDataToModal(updatedSkills)
        setResponseMessage({
            title: "Added Successfully",
            content: "your Skill Added successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          onHide();
     }

    setIsLoading(false);
  };

  return (
    <div>
      <div className={`${styles.field} w-100 ${styles.checks_group}`}>
        <label htmlFor="addPostSkill">ADD/Create Skill</label>
        <CreatableSelect
          isClearable={false}
          components={animatedComponents}
          options={mySkills}
          isMulti={false}
          id="addPostSkill"
          onChange={(skillId) => checkSkill(skillId)}
          placeholder="Select..."
        />
        {isSkillError && <InputErrorMessage text="select skills is required" />}
      </div>
      <div className={`${styles.field} w-100 ${styles.checks_group}`}>
        <h4 className="my-4">Skill Level</h4>
        <Select
          components={animatedComponents}
          options={skillExperienceOptions}
          onChange={(val) => saveExperienceLevel(val)}
          placeholder="Select"
        />
        {isExperienceError && (
          <InputErrorMessage text="skill level is required" />
        )}
      </div>
      <div className={`${styles.field} w-100 ${styles.checks_group}`}>
        <h4 className="my-4">Minimum Years Of Experience</h4>
        <Select
          components={animatedComponents}
          options={minYearsOfExperience}
          onChange={(val) => saveYearsOfExperience(val)}
          placeholder="Select"
        />
        {isYearsOfExperenceError && (
          <InputErrorMessage text="years of experience is required" />
        )}
      </div>

      <div className="d-flex justify-content-end align-items-center mt-3 px-2">
        {isLoading ? (
          <button type="button" className={styles.save_btn}>
            <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
          </button>
        ) : (
          <button
            onClick={submitSkillData}
            className={styles.save_btn}
            type="button"
          >
            Add Skill
          </button>
        )}
      </div>
    </div>
  );
};

export default PostSkillsForm;
