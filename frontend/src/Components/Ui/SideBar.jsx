import React from "react";
import styles from "./SideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../images/logo.png";
import ContactsIcon from "./ContactsIcon";
import EmailField from "./EmailField";

const SideBar = ({onClose,show}) => {
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
        <h2 className={styles.title}>
          BEST SELLER OF MONTH IDEAS FOR <span className="special_main_color">EASY JOB</span>
        </h2>
        <h6 className={styles.contact}>CONTACT US</h6>
        <ol className={styles.ordered_list}>
          <li>+9 333 222 5557</li>
          <li>info@webmail.com</li>
          <li>New Central Park W7 Street,New York</li>
        </ol>
        <h6 className={`special_main_color mt-5 ${styles.contact}`}>
          SUBSCRIBE
        </h6>
        <EmailField/>
        <p className={styles.subscribe_text}>
          Subscribe dolor sitamet, consectetur adiping eli. Duis esollici tudin
          augue.
        </p>
        <hr />
        <ContactsIcon type='one'/>

        <p className={`${styles.slide_footer} mt-5 text-center`}>
          COPYRIGHT © 2023 - BY <span className="special_main_color">Easy job</span>
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
