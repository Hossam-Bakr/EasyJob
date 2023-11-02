import React from "react";
import styles from "./TestimonalsModal.module.css";
import Modal from "react-bootstrap/Modal";
import profile from '../../images/people1.jpeg';
import MainButtonTwo from "./MainButtonTwo";

const TestimonalsModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    className={styles.modal_layer}
    >
      <Modal.Body className={styles.modal_body}>
          <div
            className={`${styles.review} d-flex align-items-center`}
          >
            <div>
                <form className="d-flex justify-content-start align-items-center">
                  <img src={profile} alt="profile" className={styles.profile_pic} />
                  <textarea
                    className={`${styles.suggetions_textarea} mb-2`}
                    name="suggetions"
                    id="suggetions"
                    cols="50"
                    rows="1"
                    placeholder="leave comment here"
                  ></textarea>
                </form>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modal_footer}>
        <MainButtonTwo type='arrow' text="Send Message" />
      </Modal.Footer>
    </Modal>
  );
};

export default TestimonalsModal;
