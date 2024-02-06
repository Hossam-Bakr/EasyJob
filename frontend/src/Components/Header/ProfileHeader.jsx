import React from "react";
import styles from "./ProfileHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBook,
  faBookmark,
  faCamera,
  faEye,
  faFileContract,
  faLocationDot,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import c1 from "../../images/userCover.jpg";
import c2 from "../../images/companyCover.jpg";

import p1 from "../../images/p1.jpeg";
import p2 from "../../images/logo/huwawei.webp";

import {
  faBehance,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import EdietPenIcon from "../Ui/EdietPenIcon";
import { Link } from "react-router-dom";

const ProfileHeader = ({ cover, pic, type, name, field, city, country }) => {
  let profile_cover = c1;
  let profile_pic = p1;

  if (cover === "c1") {
    profile_cover = c1;
  } else {
    profile_cover = c2;
  }

  if (pic === "p1") {
    profile_pic = p1;
  } else {
    profile_pic = p2;
  }

  let profilePictureClasses =
    type === "company" ? styles.profile_pic_company : styles.profile_pic;
  let companyContactInfoClass = type === "company" ? styles.company_info : "";

  return (
    <>
      <header className={styles.header_container}>
        <img src={profile_cover} alt="cover pic" />
        <div className={styles.ediet_cover_btn} title="change cover photo">
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className={profilePictureClasses}>
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

        {type === "company" ? (
          ""
        ) : (
          <>
            <div className={styles.header_links}>
              <ul className="d-flex align-items-center">
                <Link to={"/saved"}>
                  <li>
                    <FontAwesomeIcon icon={faBookmark} />
                    saved
                  </li>
                </Link>
                <Link to={"/applications"}>
                  <li>
                    <FontAwesomeIcon icon={faFileContract} />
                    Applications
                  </li>
                </Link>
                <Link>
                  <li>
                    <FontAwesomeIcon icon={faBook} />
                    Activity
                  </li>
                </Link>
                <Link>
                  <li>
                    <FontAwesomeIcon icon={faAdd} />
                    New Section
                  </li>
                </Link>
              </ul>
            </div>
          </>
        )}
      </header>
      <div className={styles.sub_header}>
        <EdietPenIcon />
        <div className={`${styles.contact_info} ${companyContactInfoClass}`}>
          <div className=" d-flex flex-column">
            <h3>{name}</h3>
            <span>{field}</span>
            <span>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="special_main_color"
              />{" "}
              {city}, {country}
            </span>
          </div>

          <div
            className={`${styles.links_and_cv} d-flex justify-content-between align-items-center mt-3`}
          >
            {type === "company" ? (
              <div className={`${styles.contact_icons} ms-auto`}>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className={styles.contact_icon}
                />
                <FontAwesomeIcon
                  icon={faGithub}
                  className={styles.contact_icon}
                />
                <FontAwesomeIcon
                  icon={faBehance}
                  className={styles.contact_icon}
                />
              </div>
            ) : (
              <>
                <div className={styles.resume_div}>
                  <span>
                    Bassam Hafez Resume{" "}
                    <span className="mini_word">(last update 2 days ago)</span>
                  </span>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <span className={`${styles.view_cv} me-4`}>
                      <FontAwesomeIcon
                        className="special_main_color me-2"
                        icon={faEye}
                      />{" "}
                      view
                    </span>
                    <span className={`${styles.delete_cv} ms-4`}>
                      <FontAwesomeIcon
                        className="me-2 color-danger"
                        icon={faTrash}
                      />{" "}
                      delete
                    </span>
                  </div>
                </div>
                <div className={styles.contact_icons}>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className={styles.contact_icon}
                  />
                  <FontAwesomeIcon
                    icon={faGithub}
                    className={styles.contact_icon}
                  />
                  <FontAwesomeIcon
                    icon={faBehance}
                    className={styles.contact_icon}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
