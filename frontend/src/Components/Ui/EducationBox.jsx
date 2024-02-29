import React, { useEffect, useState } from "react";
import styles from "./EducationBox.module.css";
import azhar_logo from "../../images/logo/azharlogo.jpeg";
import helwan_logo from "../../images/logo/HelwanLogo.jpeg";
import alex_logo from "../../images/logo/AlexLogo.png";
import ainShams_logo from "../../images/logo/AinShamsLogo.jpeg";
import cairo_logo from "../../images/logo/cairoLogo.png";
import no_logo from "../../images/logo/noUniversityLogo.svg";

const EducationBox = ({
  itemId,
  grade,
  school,
  degree,
  startDate,
  endDate,
  fieldsOfStudy,
  description,
  setSecResponseMsg,
  setSecSuccess,
  setSecShowResponse,
}) => {
  const [universityLogo, setUniversityLogo] = useState(no_logo);
  const [formatedSchoolName, setFormatedSchoolName] = useState("");
  const [formatedDegreeName, setFormatedDegreeName] = useState("");
  const [formatedGradeName, setFormatedGradeName] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  useEffect(() => {
    if (school) {
      let capitalizedSchoolName =
        school.charAt(0).toUpperCase() + school.slice(1);
      setFormatedSchoolName(capitalizedSchoolName);
      console.log(school);

      switch (school) {
        case "al-Azhar University":
          console.log("ss");
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
    if (degree) {
      let capitalizedDegree = degree
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setFormatedDegreeName(capitalizedDegree);
    }
  }, [degree]);

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
        <div className={styles.education_logo}>
          <img src={universityLogo} alt="university logo" className="w-100" />
        </div>
        <div className={styles.education_caption}>
          <h3>{formatedSchoolName}</h3>
          <span className="mini_word">
            {formatedDegreeName} in {fieldsOfStudy[0]}
          </span>
          <span className="mini_word">
            {formattedStartDate} - {formattedEndDate}
          </span>
          <span className={styles.education_grade}>Grade: {formatedGradeName}</span>
         {description&&<span className="mini_word">{description}</span>} 
        </div>
      </li>
    </>
  );
};

export default EducationBox;
