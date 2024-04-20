import React from "react";
import styles from "./Board.module.css";
import { Droppable } from "react-beautiful-dnd";
import EmployeeCard from "./EmployeeCard";
import Col from "react-bootstrap/Col";

const StageColumn = ({ title, id, employees }) => {
  return (
    <>
      <Col md={4} >
        <div className={styles.stage_board}>
          <h3>{title}</h3>
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                className={styles.content}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {employees.map((emp, index) => (
                  <EmployeeCard key={index} index={index} emp={emp} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </Col>
    </>
  );
};

export default StageColumn;
