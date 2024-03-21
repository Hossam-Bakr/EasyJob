import React from "react";
import styles from "./ListedEmployees.module.css";

import p1 from "../../images/p1.jpeg";
import p2 from "../../images/p2.jpeg";
import p3 from "../../images/p3.jpeg";
import p4 from "../../images/p4.jpg";
import p5 from "../../images/p5.jpeg";
import p6 from "../../images/p6.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainBtnThree from "./MainBtnThree";
import noAvatar from "../../images/noAvatarMale.jpg";

const ListedEmployees = ({ pic, name, title, country, city, type,state,grid }) => {
  let employeePic = noAvatar;

  switch (pic) {
    case "p1":
      employeePic = p1;
      break;
    case "p2":
      employeePic = p2;
      break;
    case "p3":
      employeePic = p3;
      break;
    case "p4":
      employeePic = p4;
      break;
    case "p5":
      employeePic = p5;
      break;
    case "p6":
      employeePic = p6;
      break;
    default:
      employeePic=noAvatar
      break;
  }

  return (
    <>
      {grid === "table" ? (
        <>
          <td className={`${styles.info_table} ${styles.table_cell}`}>
            <div className={styles.photo_container_table}>
              <img src={employeePic} alt="employee Pic" />
            </div>
            {name}
          </td>
          <td className={` ${styles.table_cell}`}>{title}</td>
          <td className={` ${styles.table_cell} ${styles.type}`}><span>{type?type:state}</span></td>
          <td className={` ${styles.table_btn}`}>
            <button>show</button>
          </td>
        </>
      ) : (
        <Row className="w-100">
          <Col sm={8}>
            <div className={styles.employee}>
              <div className={styles.photo_container}>
                  <img src={employeePic} alt="employee Pic" />
              </div>
              <div className={styles.employee_content}>
                <h3>{name}</h3>
                <h4>{title}</h4>
                <span className="mini_word">
                  <FontAwesomeIcon
                    className="special_main_color"
                    icon={faLocationDot}
                  />{" "}
                  {city}, {country}
                </span>
              </div>
            </div>
          </Col>
          <Col
            sm={4}
            className="d-flex align-items-center justify-content-center"
          >
            <div className={styles.show_profile_btn}>
              <MainBtnThree text="Show" />
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ListedEmployees;
