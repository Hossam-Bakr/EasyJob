// StageColumn.jsx
import React from "react";
import styles from "./Board.module.css";
import { Droppable } from "react-beautiful-dnd";
import EmployeeCard from "./EmployeeCard";
import Col from "react-bootstrap/Col";

const StageColumn = ({ title, id, employees }) => {

  console.log("column title",title,employees)

  return (
    <Col md={6} lg={4}>
      <div className={styles.stage_board}>
        <h3>{title}</h3>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              className={`${styles.content} ${snapshot.isDraggingOver ? styles.draggingOver : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {employees.map((emp, index) => (
                <EmployeeCard key={emp.id} emp={emp} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Col>
  );
};

export default StageColumn;
