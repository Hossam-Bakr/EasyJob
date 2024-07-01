import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StageColumn from "./StageColumn";
import styles from "./Board.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getJobApplications } from "../../util/Http";
import Loading from "../../Components/Ui/Loading";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import MainBtnThree from "../../Components/Ui/MainBtnThree";
import axios from "axios";

const JobStagesBoard = () => {
  const [screeningStage, setScreeningStage] = useState([]);
  const [assessmentStage, setAssessmentStage] = useState([]);
  const [reviewedStage, setReviewedStage] = useState([]);
  const [columns, setColumns] = useState({});
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const token = JSON.parse(localStorage.getItem("token"));
  const { jobId } = useParams();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["jobApplications"],
    queryFn: () => getJobApplications({ jobId: jobId, token: token }),
  });

  useEffect(() => {
    if (data) {
      const filteredEmployee = data?.data?.applications?.filter(
        (emp) => emp.status === "Pending"
      );
      const screening = [];
      const assessment = [];
      const reviewed = [];

      filteredEmployee.forEach((app) => {
        const userIdString = app.UserId.toString();
        const appIdString = app.id.toString();
        const jobIdString = app.JobId.toString();

        const employee = {
          userId: userIdString,
          appId: appIdString,
          jobId: jobIdString,
        };

        if (app.stage === "Submitted") {
          screening.push(employee);
        } else if (app.stage === "Reviewed") {
          assessment.push(employee);
        } else if (app.stage === "Marked") {
          reviewed.push(employee);
        }
      });

      setScreeningStage(screening);
      setAssessmentStage(assessment);
      setReviewedStage(reviewed);
    }
  }, [data]);

  useEffect(() => {
    setColumns({
      "1": screeningStage,
      "2": assessmentStage,
      "3": reviewedStage,
    });
  }, [screeningStage, assessmentStage, reviewedStage]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];
    const [draggedItem] = sourceColumn.filter(
      (item) => item.userId === draggableId
    );

    const updatedColumns = { ...columns };
    updatedColumns[sourceColumnId] = sourceColumn.filter(
      (item) => item.userId !== draggableId
    );
    updatedColumns[destinationColumnId] = [...destinationColumn, draggedItem];

    setColumns(updatedColumns);

    // Update the stages
    setScreeningStage(updatedColumns["1"]);
    setAssessmentStage(updatedColumns["2"]);
    setReviewedStage(updatedColumns["3"]);
  };

  const clearStages = () => {
    setScreeningStage([]);
    setAssessmentStage([]);
    setReviewedStage([]);
  };

  const saveStageData = async () => {
    const stages = [
      { stage: "Submitted", employees: screeningStage },
      { stage: "Reviewed", employees: assessmentStage },
      { stage: "Marked", employees: reviewedStage },
    ];

    for (const { stage, employees } of stages) {
      for (const employee of employees) {
        try {
          const response = await axios.patch(
            `${process.env.REACT_APP_Base_API_URl}jobs/${employee.jobId}/applications/${employee.appId}/stage`,
            { stage: stage },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.status === "success") {
            setResponseMessage({
              title: `Saved Successfully`,
              content: `Employee has been Saved Successfully`,
            });
            setSuccessResponse(true);
          } else {
            setResponseMessage({
              title: "Request Failed",
              content: `Employee failed to be Saved, please try again`,
            });
            setSuccessResponse(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setResponseMessage({
            title: "Request Failed",
            content: `Employee failed to be Saved, please try again`,
          });
          setSuccessResponse(false);
        }
        setShowResponse(true);
        clearStages();
        refetch();
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {isPending ? (
          <Loading />
        ) : (
          <Container fluid>
            <Row className={styles.board_container}>
              <StageColumn
                title={"Screening"}
                employees={columns["1"]}
                token={token}
                id={"1"}
                setShowResponse={setShowResponse}
                setResponseMessage={setResponseMessage}
                setSuccessResponse={setSuccessResponse}
                refetch={refetch}
                clearStages={clearStages}
              />
              <StageColumn
                title={"Assessment"}
                employees={columns["2"]}
                token={token}
                id={"2"}
                setShowResponse={setShowResponse}
                setResponseMessage={setResponseMessage}
                setSuccessResponse={setSuccessResponse}
                refetch={refetch}
                clearStages={clearStages}
              />
              <StageColumn
                title={"Reviewed"}
                employees={columns["3"]}
                id={"3"}
                token={token}
                setShowResponse={setShowResponse}
                setResponseMessage={setResponseMessage}
                setSuccessResponse={setSuccessResponse}
                refetch={refetch}
                clearStages={clearStages}
              />
            </Row>
            <div className="text-end  mt-2 mb-3">
              <MainBtnThree onClick={saveStageData} text="Save Changes" />
            </div>
          </Container>
        )}
      </DragDropContext>
      {showResponse && (
        <FloatingPopup
          showResponse={showResponse}
          setShowResponse={setShowResponse}
          message={responseMessage}
          success={successResponse}
        />
      )}
    </>
  );
};

export default JobStagesBoard;
