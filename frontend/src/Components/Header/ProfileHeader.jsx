import React from "react";
import styles from "./ProfileHeader.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLocationDot, faPencil } from "@fortawesome/free-solid-svg-icons";

import c1 from "../../images/userCover.jpg";
import p1 from "../../images/p1.jpeg";
import { faBehance, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ProfileHeader = ({ cover, pic }) => {
  let profile_cover = c1;
  let profile_pic = p1;

  if (cover === "c1") {
    profile_cover = c1;
  } else {
    // profile_cover=c2;
  }

  if (pic === "p1") {
    profile_pic = p1;
  } else {
    // profile_pic=p2
  }

  return (
    <>
        <header className={styles.header_container}>
      <img src={profile_cover} alt="cover pic" />
      <div className={styles.ediet_cover_btn} title="change cover photo">
        <FontAwesomeIcon icon={faPencil} />
      </div>
      <div className={styles.profile_pic}>
        <div className={styles.cartoona}>
          <img src={profile_pic} alt="profile pic" />
          <div
            className={styles.ediet_profile_pic_btn}
            title="change profile photo"
          >
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </div>
      </div>
    </header>
    <div  className={styles.sub_header}>
      <div className={`${styles.ediet_cover_btn} ${styles.ediet_section_btn}`} title="ediet info">
        <FontAwesomeIcon icon={faPencil}/>
      </div>
      <div className={`${styles.contact_info} ms-3 ps-5 d-flex flex-column`}>
        <h3>Bassam Hafez</h3>
        <span>Frontend Developer | React JS</span>
        <span><FontAwesomeIcon icon={faLocationDot} className="special_main_color"/> Cairo, Egypt</span>
        <div className={styles.contact_icons}>
        <FontAwesomeIcon icon={faLinkedin} className={styles.contact_icon}/>
        <FontAwesomeIcon icon={faGithub} className={styles.contact_icon}/>
        <FontAwesomeIcon icon={faBehance} className={styles.contact_icon}/>
      </div>
    </div>
    </div>
    </>

  );
};

export default ProfileHeader;
