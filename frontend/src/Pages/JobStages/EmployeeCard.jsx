// EmployeeCard.jsx
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./Board.module.css";
import p1 from "../../images/p1.jpeg";
import p2 from "../../images/p2.jpeg";
import p3 from "../../images/p3.jpeg";
import p4 from "../../images/p4.jpg";
import p5 from "../../images/p5.jpeg";
import p6 from "../../images/p7.jpeg";
import noAvatar from "../../images/noAvatarMale.jpg";
import p8 from "../../images/people3.jpeg";
import p9 from "../../images/people4.jpeg";
import p10 from "../../images/people1.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";




const EmployeeCard = ({ emp, index }) => {

let avatar=noAvatar;

switch (emp.avatar) {
  case "p1":
    avatar=p1;
    break;
  case "p2":
    avatar=p2;
    break;
  case "p3":
    avatar=p3;
    break;
  case "p4":
    avatar=p4;
    break;
  case "p5":
    avatar=p5;
    break;
  case "p6":
    avatar=p6;
    break;
  case "p8":
    avatar=p8;
    break;
  case "p9":
    avatar=p9;
    break;
  case "p10":
    avatar=p10;
    break;

  default:
  avatar=noAvatar
    break;
}
  return (
    <Draggable draggableId={emp.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.card_container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.card_content}>
            {/* <span className={styles.emp_id}>{emp.id}</span> */}
            <div className={styles.emp_pic}>
              <img src={avatar} alt="p1" />
            </div>
            <div className={styles.caption}>
              <h5>{emp.name}</h5>
              <span className="mini_word">{emp.title}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center ms-auto">
              <FontAwesomeIcon className={styles.refuse_icon} title="refuse employee" icon={faUserXmark} />
              <FontAwesomeIcon className={styles.accept_icon} title="move to interview" icon={faPersonCircleCheck} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default EmployeeCard;
