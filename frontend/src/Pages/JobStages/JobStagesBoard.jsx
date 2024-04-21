import React, {useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StageColumn from "./StageColumn";
import styles from "./Board.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const employees1 = [
  {
    name: "Sami Galal",
    id: "1",
    title: "Software Engineer",
    avatar: "p1",
  },
  {
    name: "Yousef Tarek",
    id: "2",
    title: "UI Designer",
    avatar: "p2",
  },
  {
    name: "Ahmed Sabry",
    id: "3",
    title: "Project Manager",
    avatar: "p3",
  },

  {
    name: "Mina Fawzy",
    id: "5",
    title: "Accountant",
    avatar: "p5",
  },
  {
    name: "Kareem Said",
    id: "6",
    title: "Sales Representative",
    avatar: "p6",
  },
  {
    name: "Mostafa Wael",
    id: "7",
    title: "HR Manager",
    avatar: "p4",
  },
  {
    name: "Wael Ali",
    id: "4",
    title: " Marketing Manager",
    avatar: "noAvatar",
  },
];
const employees2 = [
  {
    name: "Mido Gaber",
    id: "8",
    title: "Frontend Developer",
    avatar:"p8"
  },
  {
    name: "Nasr Eldin",
    id: "9",
    title: "UX Designer",
    avatar:"p9"
  },
  {
    name: "Menna Abdo",
    id: "10",
    title: "Project Lead",
    avatar:"noAvatar"
  },
  {
    name: "Nadia Taha",
    id: "11",
    title: "Marketing Head",
    avatar:"p10"
  },
  {
    name: "Hassan Ibrahim",
    id: "12",
    title: "Accounts Manager",
    avatar:"noAvatar"
  },
  {
    name: "Susan Khaled",
    id: "14",
    title: "HR Head",
    avatar:"noAvatar"
  },
];

const JobStagesBoard = () => {
  const [columns, setColumns] = useState({
    1: employees1,
    2: employees2,
    3: [],
  });

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const [draggedItem] = sourceColumn.filter(
      (item) => item.id === draggableId
    );

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      updatedColumns[source.droppableId] = sourceColumn.filter(
        (item) => item.id !== draggableId
      );
      updatedColumns[destination.droppableId] = [
        ...destinationColumn,
        draggedItem,
      ];
      return updatedColumns;
    });
  };
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container fluid>
        <Row className={styles.board_container}>
          <StageColumn title={"Screening"} employees={columns["1"]} id={"1"} />
          <StageColumn title={"Assessment"} employees={columns["2"]} id={"2"} />
          <StageColumn title={"Reviewed"} employees={columns["3"]} id={"3"} />
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default JobStagesBoard;
