import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./Board.module.css";
import p1 from "../../images/p1.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPersonCircleCheck, faUserXmark} from "@fortawesome/free-solid-svg-icons"
function bgColorChange(props) {
    return props.isDragging
        ? styles.green
        : props.isDraggable
            ? props.isBacklog
                ? styles.black
                : styles.yellow
            : props.isBacklog
                ? styles.black
                : styles.red;
}

const bgColor=(props)=>bgColorChange(props);


const EmployeeCard = ({ emp, index }) => {
  return (
    <Draggable draggableId={`${emp.id}`} key={emp.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${styles.card_container} ${bgColor}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
            <div className={styles.card_content}>
                <span className={styles.emp_id}>{emp.id}</span>
                <div className={styles.emp_pic}>
                    <img src={p1} alt="p1" />
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
          
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default EmployeeCard;
