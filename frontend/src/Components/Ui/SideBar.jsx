import React from "react";
import styles from "./SideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContactsIcon from "./ContactsIcon";
import profile from "../../images/people4.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBookmark, faFileContract, faGears, faMoon } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ onClose, show }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className={styles.side_bar}
    >
      <Offcanvas.Header className={styles.header} closeButton>
        <Offcanvas.Title>
          <div className="d-flex align-items-center">
            <img src={profile} className={styles.profile} alt="profile img" />
            <h5 className={styles.profile_name}>Bassam Hafez</h5>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className={styles.contact_list}>
          <li className={styles.contact_list_item}>Saved <FontAwesomeIcon className={styles.list_icons} icon={faBookmark}/></li>
          <li className={styles.contact_list_item}>Applications <FontAwesomeIcon className={styles.list_icons} icon={faFileContract} /></li>
          <li className={styles.contact_list_item}>Dark Mood <FontAwesomeIcon className={styles.list_icons} icon={faMoon}/></li>
          <li className={styles.contact_list_item}>Setting <FontAwesomeIcon  className={styles.list_icons} icon={faGears} /></li>
          <li className={styles.contact_list_item}>Log Out <FontAwesomeIcon className={styles.list_icons} icon={faArrowRightFromBracket} /></li>
        </ul>
        <ContactsIcon type="two" />

        <p className={`${styles.slide_footer} mt-5 text-center`}>
          COPYRIGHT © 2023 - BY{" "}
          <span className="special_main_color">Easy Job</span>
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
