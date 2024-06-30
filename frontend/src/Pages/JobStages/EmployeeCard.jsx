// EmployeeCard.jsx
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./Board.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPersonCircleCheck,
  faQuestion,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import noAvatarMale from "../../images/noAvatarMale.jpg";
import { Link } from "react-router-dom";
import ShowQuestionAnswersModal from "../../Components/Ui/ShowQuestionAnswersModal";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../util/Http";
import LoadingTwo from "../../Components/Ui/LoadingTwo";
import axios from "axios";

const EmployeeCard = ({
  emp,
  index,
  token,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  refetch,
  clearStages
}) => {

  const [profilePic, setProfilePic] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const { data } = useQuery({
    queryKey: ["getSpeceficJobApplicaton", emp.userId],
    queryFn: () => getUserProfile({ userId: emp.userId, token }),
  });

  useEffect(() => {
    if (data) {
      if (data?.data?.userProfile?.avatar) {
        const profileAvatar = `http://127.0.0.1:3000/users/${data?.data?.userProfile?.avatar}`;
        setProfilePic(profileAvatar);
      } else {
        setProfilePic(null);
      }
    }
  }, [data]);

  const updateApplicationState = async (state) => {
    if (state) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_Base_API_URl}jobs/${emp.jobId}/applications/${emp.appId}/status`,
          { status: state },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.status === "success") {
          console.log(response.data)
          setResponseMessage({
            title: `${state} Successfully`,
            content: `Employee has been ${state} Successfully`,
          });
          setSuccessResponse(true);
          setShowResponse(true);
          clearStages()
          refetch() 
        } else {
          setResponseMessage({
            title: "Request Faild",
            content: `Employee failed to be ${state} please try again`,
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } catch (error) {
        console.error(error);
        setResponseMessage({
          title: "Request Faild",
          content: `Employee failed to be ${state} please try again`,
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    }
  };

  return (
    <>
      {data ? (
        <Draggable draggableId={emp.userId} index={index}>
          {(provided, snapshot) => (
            <div
              className={styles.card_container}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className={styles.card_content}>
                <div className={styles.emp_pic}>
                  <img
                    src={profilePic ? profilePic : noAvatarMale}
                    alt="userAvatar"
                  />
                </div>
                <div className={styles.caption}>
                  <h5>
                    {data.data?.user?.firstName} {data.data?.user?.lastName}
                  </h5>
                  {data.data?.userProfile?.tagline ? (
                    <span className="mini_word">
                      {data.data?.userProfile?.tagline}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center ms-auto">
                  <Link to={`/userProfile/${emp.userId}`} target="_blank">
                    <FontAwesomeIcon
                      className={styles.eye_controllers}
                      title="show profile"
                      icon={faEye}
                    />
                  </Link>

                  <FontAwesomeIcon
                    className={styles.eye_controllers}
                    title="Question Answer"
                    icon={faQuestion}
                    onClick={() => setModalShow(true)}
                  />
                  <FontAwesomeIcon
                    className={styles.refuse_icon}
                    title="Cancel employee"
                    icon={faUserXmark}
                    onClick={() => updateApplicationState("Closed")}
                  />
                  <FontAwesomeIcon
                    className={styles.accept_icon}
                    title="move to interview"
                    icon={faPersonCircleCheck}
                    onClick={() => updateApplicationState("Accepted")}
                  />
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ) : (
        <LoadingTwo />
      )}
      {modalShow ? (
        <ShowQuestionAnswersModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          jobId={emp.jobId}
          appId={emp.appId}
          token={token}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EmployeeCard;
