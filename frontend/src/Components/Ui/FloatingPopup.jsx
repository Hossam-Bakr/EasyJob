import React from "react";
import styles from "./FloatingPopup.module.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const FloatingPopup = ({ showResponse, setShowResponse, message, success }) => {

  const toastHeaderClasses = success ? styles.popupHeaderSuccess : styles.popupHeaderFaild;

  return (
    <>
      <div
        aria-live="assertive"
        aria-atomic="true"
        className={styles.popup_container}
      >
        <ToastContainer style={{ zIndex: 1 }}>
          <Toast
            onClose={() => setShowResponse(false)}
            show={showResponse}
            delay={3000}
            autohide
            className={styles.floating_popup}
          >
            <Toast.Header className={toastHeaderClasses} closeButton={false}>
              <strong className="me-auto">
                {success ? (
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className={styles.success_icon}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className={styles.faild_icon}
                  />
                )}
                {message?.title}
              </strong>
              <small>Now</small>
            </Toast.Header>
            <Toast.Body >
              {message?.content}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

export default FloatingPopup;
