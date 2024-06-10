import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContactsIcon from "./ContactsIcon";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBookmark,
  faBuilding,
  faBuildingLock,
  faChartPie,
  faCircleUser,
  faEnvelope,
  faFileContract,
  faGears,
  faPencil,
  faSackDollar,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import LoginAlertModal from "./LoginAlertModal";
import noLogo from "../../images/noLogo.jpg";
import noAvatarMale from "../../images/noAvatarMale.jpg";
import LogoutModal from "./LogoutModal";

const SideBar = ({ onClose, show }) => {
  const [modalShow, setModalShow] = useState(false);
  const [logoutModalShow, setLogoutModalShow] = useState(false);
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);
  const userData = useSelector((state) => state.userInfo.data);
  const changeContent = useSelector(
    (state) => state.companyNav.changeNavContent
  );
  const profileData = useSelector((state) => state.profileInfo.data);
  const savedJobsQuantinty = useSelector(
    (state) => state.savedJobs.totalQuantity
  );

  const handleClose = () => {
    onClose();
  };

  const navigateToProfilePage = () => {
    handleClose();
    navigate(`user-profile/${profileData?.UserId}`);
  };

  const navigateTocompanyProfile = () => {
    handleClose();
    navigate(`company-profile/${profileData.CompanyId}`);
  };


  const showAlert = () => {
    handleClose();
    setModalShow(true);
  };


  useEffect(()=>{
    if(closeSideBar){
      setCloseSideBar(false)
      onClose();
    }
  },[closeSideBar,onClose])

  useEffect(() => {
    setProfilePic(null);
    if (role === "company") {
      if (profileData?.logo) {
        const profileLogoUrl = `http://127.0.0.1:3000/companies/${profileData.logo}`;
        setProfilePic(profileLogoUrl);
      }
    } else {
      if (profileData?.avatar) {
        const profileAvatar = `http://127.0.0.1:3000/users/${profileData.avatar}`;
        setProfilePic([profileAvatar]);
      }
    }
  }, [profileData, role]);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={styles.side_bar}
      >
        <Offcanvas.Header className={styles.header} closeButton>
          <Offcanvas.Title>
            {isLogin ? (
              <>
                {role === "user" ? (
                  <div
                    onClick={navigateToProfilePage}
                    className={`${styles.profile_content} d-flex align-items-center`}
                    title="view profile"
                  >
                    <img
                      src={profilePic ? profilePic : noAvatarMale}
                      className={styles.profile_pic}
                      alt="profile pic"
                    />
                    <div className="ms-3 d-flex justify-content-center flex-column">
                      <span className={styles.profile_name}>
                        {userData.firstName + " " + userData.lastName}
                      </span>
                      <span className={styles.user_email}>
                        {userData.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={navigateTocompanyProfile}
                    className={`${styles.profile_content} d-flex align-items-center`}
                    title="view profile"
                  >
                    <img
                      src={profilePic ? profilePic : noLogo}
                      className={styles.profile_pic}
                      alt="company logo"
                    />
                    <div className="ms-3 d-flex justify-content-center flex-column">
                      <span className={styles.profile_name}>
                        {userData.name}
                      </span>
                      <span className={styles.user_email}>
                        {userData.email}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {changeContent ? (
                  <>
                    <div
                      onClick={() => setModalShow(true)}
                      className={`${styles.profile_content} d-flex align-items-center`}
                      title="Sign in to view your profile"
                    >
                      <FontAwesomeIcon
                        icon={faBuildingLock}
                        className={`${styles.profile_icon} ${styles.profile_logo}`}
                      />
                      <h5 className={`${styles.profile_name} mt-2`}>
                        Company Guest
                      </h5>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => setModalShow(true)}
                      className={`${styles.profile_content} d-flex align-items-center`}
                      title="Sign in to view your profile"
                    >
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className={styles.profile_icon}
                      />
                      <h5 className={`${styles.profile_name} mt-2`}>
                        User Guest
                      </h5>
                    </div>
                  </>
                )}
              </>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className={styles.contact_list}>
            {isLogin ? (
              <>
                {/* logged in */}
                {role === "user" ? (
                  <>
                    {/* logged in and user */}
                    <Link to={"user-info"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Ediet Profile
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faPencil}
                        />
                      </li>
                    </Link>
                    <Link to={"saved"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        <span>
                          Saved Jobs{" "}
                          <Badge bg="primary">{savedJobsQuantinty}</Badge>
                        </span>
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faBookmark}
                        />
                      </li>
                    </Link>
                    <Link to={"applications"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Applications
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faFileContract}
                        />
                      </li>
                    </Link>
                    <li className={styles.contact_list_item}>
                      Go Premium{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faSackDollar}
                      />
                    </li>
                    <Link to={"contact"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Contact Us{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faEnvelope}
                        />
                      </li>
                    </Link>
                    <Link to={"user-account-setting"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Account Setting{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faGears}
                        />
                      </li>
                    </Link>
                    <li
                      className={styles.contact_list_item}
                      onClick={(()=>setLogoutModalShow(true))}
                    >
                      Log Out
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faArrowRightFromBracket}
                      />
                    </li>
                  </>
                ) : (
                  <>
                    {/* logged in and company */}
                    <Link to={"company-info"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Ediet Profile{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faPencil}
                        />
                      </li>
                    </Link>
                    <Link to={`company-dashboard/${profileData?.CompanyId}`}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Dashboard{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faChartPie}
                        />
                      </li>
                    </Link>
                    <Link to={"packages"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Packages{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faSackDollar}
                        />
                      </li>
                    </Link>
                    <Link to={"contact"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Contact Us{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faEnvelope}
                        />
                      </li>
                    </Link>
                    <Link to={"company-account-setting"} onClick={handleClose}>
                      <li className={styles.contact_list_item}>
                        Account Setting{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faGears}
                        />
                      </li>
                    </Link>
                    <li
                      className={styles.contact_list_item}
                      onClick={(()=>setLogoutModalShow(true))}
                    >
                      Log Out
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faArrowRightFromBracket}
                      />
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                {changeContent ? (
                  <>
                    {/* not logged in and company side */}
                    <Link to={"packages"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Packages{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faSackDollar}
                        />
                      </li>
                    </Link>
                    <Link to={"contact"}>
                      <li className={styles.contact_list_item}>
                        Contact Us{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faEnvelope}
                        />
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Join As Employee{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faUserTie}
                        />
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* not logged in and user side */}
                    <li
                      onClick={showAlert}
                      className={styles.contact_list_item}
                    >
                      Saved Jobs
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faBookmark}
                      />
                    </li>
                    <li
                      onClick={showAlert}
                      className={styles.contact_list_item}
                    >
                      Applications
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faFileContract}
                      />
                    </li>
                    <li className={styles.contact_list_item}>
                      Go Premium{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faSackDollar}
                      />
                    </li>
                    <Link to={"contact"}>
                      <li className={styles.contact_list_item}>
                        Contact Us{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faEnvelope}
                        />
                      </li>
                    </Link>
                    <Link to={"company-home"}>
                      <li
                        className={styles.contact_list_item}
                        onClick={handleClose}
                      >
                        Join As Company{" "}
                        <FontAwesomeIcon
                          className={styles.list_icons}
                          icon={faBuilding}
                        />
                      </li>
                    </Link>
                  </>
                )}
              </>
            )}
          </ul>

          <ContactsIcon type="two" />

          <p className={`${styles.slide_footer} mt-5 text-center`}>
            COPYRIGHT © 2023 - BY{" "}
            <span className="special_main_color">Easy Job</span>
          </p>
        </Offcanvas.Body>
      </Offcanvas>
      <LoginAlertModal show={modalShow} onHide={() => setModalShow(false)} />
      <LogoutModal show={logoutModalShow} onHide={() => setLogoutModalShow(false)} onClose={()=>setCloseSideBar(true)}/>
    </>
  );
};

export default SideBar;
