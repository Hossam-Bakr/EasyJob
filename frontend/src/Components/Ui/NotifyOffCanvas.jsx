import React, { useState } from "react";
import styles from "./NotifiyOffCanvas.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import NotifyBox from "./NotifyBox";

const notifiApi = [
  {
    id: "n1",
    title: "Job Invitation",
    logo: "c1",
    description:
      "ElNasr Group Company Invited you to join their community and become a partner",
    time: "2m ago",
  },
  {
    id: "n2",
    title: "Job Acceptance",
    logo: "c2",
    description:
      "ABC Corporation has accepted your job application. Congratulations!",
    time: "10m ago",
  },
  {
    id: "n3",
    title: "Job Offer",
    logo: "c3",
    description:
      "XYZ Industries is pleased to offer you a position as a Senior Software Engineer.",
    time: "1h ago",
  },
  {
    id: "n4",
    title: "Job Invitation",
    logo: "c4",
    description:
      "123 Company has sent you a job invitation. Explore exciting opportunities!",
    time: "1d ago",
  },
  {
    id: "n5",
    title: "Job Post",
    logo: "c5",
    description: "Acme Corporation has posted a new job opening. Check it out!",
    time: "2d ago",
  },
  {
    id: "n6",
    title: "Job Offer",
    logo: "c6",
    description:
      "The Mega Corp wants to extend a job offer. Don't miss this chance!",
    time: "3d ago",
  },
  {
    id: "n7",
    title: "Job Invitation",
    logo: "c7",
    description:
      "Innovative Solutions Inc. invites you to apply for their Software Developer position.",
    time: "1w ago",
  },
  {
    id: "n8",
    title: "Job Post",
    logo: "c8",
    description:
      "Global Enterprises has posted multiple job openings. Start your career journey!",
    time: "2w ago",
  },
];

const NotifyOffCanvas = ({ show, handleClose }) => {
  const [activeController, setActiveController] = useState("all");

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className={styles.container}
    >
      <Offcanvas.Header>
        <Offcanvas.Title className={styles.title}>
          <h2>Notifications</h2>
          <div className={styles.controlers}>
            <button
              className={`${
                activeController === "all" ? styles.active_controller : ""
              } me-3`}
              onClick={() => setActiveController("all")}
            >
              All
            </button>
            <button
              className={`${
                activeController === "unseen" ? styles.active_controller : ""
              }`}
              onClick={() => setActiveController("unseen")}
            >
              UnSeen
            </button>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {notifiApi.map((noty) => (
          <NotifyBox key={noty.id} noty={noty} />
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotifyOffCanvas;
