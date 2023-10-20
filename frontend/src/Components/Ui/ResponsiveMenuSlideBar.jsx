import React from "react";
import styles from "./ResponsiveMenuSlideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ContactsIcon from "./ContactsIcon";
import { Link } from "react-router-dom";

const ResponsiveMenuSlideBar = ({ onClose, show }) => {
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
          <img src={logo} className={styles.logo} alt="mykid logo" />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
          <div className={`${styles.subscribe_container} form-control`}>
            <input type="text" placeholder="Search here.." />
            <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
          </div>
          <ul className={styles.contact_list}>
            <li className={styles.contact_list_item}>
              <Link onClick={handleClose} to={"/"} end="true">
                HOME
              </Link>
            </li>
            <li className={styles.contact_list_item}>
              <Link onClick={handleClose} to={"about"}>ABOUT</Link>
            </li>
            <li className={styles.contact_list_item}>
              <Link onClick={handleClose} to={"explore"}>EXPLORE</Link>
            </li>
            <li className={styles.contact_list_item}>
              <Link onClick={handleClose} to={"categories"}>CATEGORIES</Link>
            </li>
          </ul>
          <ContactsIcon type='two' />

          <p className={`${styles.slide_footer} mt-5 text-center`}>
            COPYRIGHT © 2023 - BY <span className="special_main_color">Easy Job</span>
          </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ResponsiveMenuSlideBar;
