import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from "./Notifications.module.css"
import NotifyOffCanvas from '../Ui/NotifyOffCanvas';

const Notifications = () => {
    // fa-shake
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
       <FontAwesomeIcon className={`${styles.bell} `} icon={faBell} onClick={handleShow}/>
       <NotifyOffCanvas
        show={show}
        handleClose={handleClose}
       />
    </>
  )
}

export default Notifications
