import React, { useEffect, useState } from "react";
import styles from "./EducationBox.module.css";
import azhar_logo from "../../images/logo/azharlogo.jpeg";
import helwan_logo from "../../images/logo/HelwanLogo.jpeg";
import alex_logo from "../../images/logo/AlexLogo.png";
import ainShams_logo from "../../images/logo/AinShamsLogo.jpeg";
import cairo_logo from "../../images/logo/cairoLogo.png";
import no_logo from "../../images/logo/noUniversityLogo.svg";
import EdietPenIcon from "./EdietPenIcon";
import UpdateWorkExperienceModal from "./UpdateWorkExperienceModal";

const EducationBox = ({
  itemId,
  grade,
  school,
  degree,
  displayName,
  startDate,
  endDate,
  fieldsOfStudy,
  description,
  setSecResponseMsg,
  setSecSuccess,
  setSecShowResponse,
  isMyProfile
}) => {

  const [modalShow, setModalShow] = useState(false);
  const [universityLogo, setUniversityLogo] = useState(no_logo);
  const [formatedSchoolName, setFormatedSchoolName] = useState("");
  const [formatedField, setFormatedField] = useState("");
  const [formatedGradeName, setFormatedGradeName] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const convertWordToCapital=(word)=>{
    let capitalizedWord= word.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    return capitalizedWord;
  }

  useEffect(() => {
    if (school) {
      let capitalizedSchoolName =
        school.charAt(0).toUpperCase() + school.slice(1);
      setFormatedSchoolName(capitalizedSchoolName);

      switch (school) {
        case "al-Azhar University":
           setUniversityLogo(azhar_logo);
          break;
        case "alexandria University":
          setUniversityLogo(alex_logo);
          break;
        case "cairo University":
          setUniversityLogo(cairo_logo);
          break;
        case "ain shams University":
          setUniversityLogo(ainShams_logo);
          break;
        case "helwan University":
          setUniversityLogo(helwan_logo);
          break;

        default:
          setUniversityLogo(no_logo);
          break;
      }
    }
  }, [school]);

  useEffect(() => {
    if (fieldsOfStudy) {
     let formatedFieldName= convertWordToCapital(fieldsOfStudy[0])
     setFormatedField(formatedFieldName)
    }
  }, [fieldsOfStudy]);

  useEffect(() => {
    if (grade) {
      switch (grade) {
        case "A / 100-85":
          setFormatedGradeName("A / 85-100");
          break;
        case "B / 84-75":
          setFormatedGradeName("B / 75-84");
          break;
        case "C / 74-65":
          setFormatedGradeName("C / 65-74");
          break;
        case "D / 64-50":
          setFormatedGradeName("D / 50-64");
          break;
        default:
          setFormatedGradeName("A / 85-100");
          break;
      }
    }
  }, [grade]);

  return (
    <>
      <li className={styles.edu_item}>
        {isMyProfile&&<EdietPenIcon onClick={() => setModalShow(true)} color="blue" />}
        <div className={styles.education_logo}>
          <img src={universityLogo} alt="school logo" className="w-100" />
        </div>
        <div className={styles.education_caption}>
          <h3>{formatedSchoolName}</h3>
          <span className="mini_word">
            {displayName}, At Field of {formatedField}
          </span>
          <span className="mini_word">
            {formattedStartDate} - {formattedEndDate}
          </span>
          <span className={styles.education_grade}>
            Grade: {formatedGradeName}
          </span>
          {description && <span className="mini_word">{description}</span>}
        </div>
      </li>
      <UpdateWorkExperienceModal
        key={itemId}
        show={modalShow}
        onHide={() => setModalShow(false)}
        itemId={itemId}
        grade={grade}
        school={school}
        degree={degree}
        displayName={displayName}
        fieldsOfStudy={fieldsOfStudy}
        startDate={startDate}
        endDate={endDate}
        description={description}
        setSecResponseMsg={setSecResponseMsg}
        setSecSuccess={setSecSuccess}
        setSecShowResponse={setSecShowResponse}
      />
    </>
  );
};

export default EducationBox;
