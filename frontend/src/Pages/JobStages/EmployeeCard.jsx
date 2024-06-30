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

const EmployeeCard = ({ emp, index, token }) => {
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
                  />
                  <FontAwesomeIcon
                    className={styles.accept_icon}
                    title="move to interview"
                    icon={faPersonCircleCheck}
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
