import React from "react";
import styles from "./Board.module.css";
import { Droppable } from "react-beautiful-dnd";
import EmployeeCard from "./EmployeeCard";
import Col from "react-bootstrap/Col";

const StageColumn = ({
  title,
  id,
  employees,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  clearStages,
  refetch,
}) => {
  // console.log(title, employees);
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <Col md={12} xl={6} xxl={4}>
      <div className={styles.stage_board}>
          <h3>{title}</h3>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              className={`${styles.content} ${
                snapshot.isDraggingOver ? styles.draggingOver : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {employees.map((emp, index) => (
                <EmployeeCard
                  key={`${emp.userId}_${index}`}
                  emp={emp}
                  index={index}
                  setShowResponse={setShowResponse}
                  setResponseMessage={setResponseMessage}
                  setSuccessResponse={setSuccessResponse}
                  refetch={refetch}
                  token={token}
                  clearStages={clearStages}
                />
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
