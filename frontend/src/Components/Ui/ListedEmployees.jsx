import React, { useEffect, useState } from "react";
import styles from "./ListedEmployees.module.css";
import noAvatar from "../../images/noAvatarMale.jpg";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../util/Http";
import { Link } from "react-router-dom";
import InterviewModal from "./InterviewModal";
import FloatingPopup from "./FloatingPopup";

const ListedEmployees = ({ UserId, id, type, interview }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [profilePic, setProfilePic] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const { data } = useQuery({
    queryKey: ["getSpeceficJobApplicatonDashboard", UserId],
    queryFn: () => getUserProfile({ userId: UserId, token }),
  });

  console.log(data);

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
      <td className={`${styles.info_table} ${styles.table_cell}`}>
        {type === "interview" ? (
          <>
          <div className={styles.photo_container_table}>
              <img
                src={profilePic ? profilePic : noAvatar}
                alt="employee Pic"
              />
            </div>
            {interview.User?.firstName} {interview.User?.lastName}
          </>
        ) : (
          <>
            {" "}
            <div className={styles.photo_container_table}>
              <img
                src={profilePic ? profilePic : noAvatar}
                alt="employee Pic"
              />
            </div>
            {data?.data?.user?.firstName} {data?.data?.user?.lastName}
          </>
        )}
      </td>
      <td className={` ${styles.table_cell}`}>
        {type === "interview" ? (
          <span>
            {interview.interviewDate} <span className="mini_word">({interview.interviewTime})</span>
          </span>
        ) : data?.data?.userProfile?.tagline ? (
          data?.data?.userProfile?.tagline
        ) : (
          <span>No Title</span>
        )}
      </td>
      <td>
        {type === "interview" ? (
          interview.Job.title
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link
              to={`/userProfile/${UserId}`}
              className={styles.accepted_employee_controllers}
              target="_blank"
            >
              <button className="btn btn-outline-secondary px-4">view</button>
            </Link>
            <button
              onClick={() => setModalShow(true)}
              className="btn btn-primary"
            >
              Interview
            </button>
          </div>
        )}
      </td>
      <td>
        {modalShow && (
          <InterviewModal
            appId={id}
            show={modalShow}
            onHide={() => setModalShow(false)}
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
          />
        )}
        <FloatingPopup
          showResponse={showResponse}
          setShowResponse={setShowResponse}
          message={responseMessage}
          success={successResponse}
        />
      </td>
    </>
  );
};

export default ListedEmployees;
