import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StageColumn from "./StageColumn";
import styles from "./Board.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const employees1 = [
  {
    name: "John Doe",
    id: "1",
    title: "Software Engineer",
  },
  {
    name: "Mary Williams",
    id: "2",
    title: "UI Designer",
  },
  {
    name: "Mark Thomas",
    id: "3",
    title: "Project Manager",
  },
  {
    name: "Lisa Jackson",
    id: "4",
    title: " Marketing Manager",
  },
  {
    name: "George Fernandez",
    id: "5",
    title: "Accountant",
  },
  {
    name: "Laura Kim",
    id: "6",
    title: "Sales Representative",
  },
  {
    name: "Michael Brown",
    id: "7",
    title: "HR Manager",
  },
];
const employees2 = [
  {
    name: "James Lee",
    id: "8",
    title: "Frontend Developer",
  },
  {
    name: "Emma Wilson",
    id: "9",
    title: "UX Designer",
  },
  {
    name: "Ethan Walker",
    id: "10",
    title: "Project Lead",
  },
  {
    name: "Samantha Cruz",
    id: "11",
    title: "Marketing Head",
  },
  {
    name: "David Cook",
    id: "12",
    title: "Accounts Manager",
  },
  {
    name: "Maria Garcia",
    id: "13",
    title: "Sales Manager",
  },
  {
    name: "Susan Martinez",
    id: "14",
    title: "HR Head",
  },
];

const JobStagesBoard = () => {
  const [incomplete, setIncomplete] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [inReview, setInReview] = useState([]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inReview,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setInReview(removeItemById(taskId, inReview));
        break;
      default:
    }
  }
  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2": // DONE
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;
      case "3": // IN REVIEW
        updatedTask = { ...task, completed: false };
        setInReview([updatedTask, ...inReview]);
        break;
      default:
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <DragDropContext>
      <Container fluid>
        <Row className={styles.board_container}>
          <StageColumn title={"Screening"} employees={employees1} id={"1"} />
          <StageColumn title={"Assessment"} employees={employees2} id={"2"} />
          <StageColumn title={"Reviewed"} employees={inReview} id={"3"} />
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default JobStagesBoard;
//Assessment
//Reviewed
