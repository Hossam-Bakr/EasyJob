import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContactsIcon from "./ContactsIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBookmark,
  faBuilding,
  faCircleUser,
  faFileContract,
  faGears,
  faPencil,
  faSackDollar,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { userActions } from "../../Store/userInfo-slice";
import { saveIsLoginState } from "../../Store/userInfo-actions";
import { Link, useNavigate } from "react-router-dom";
import LoginAlertModal from "./LoginAlertModal";
import profile_pic from "../../images/p1.jpeg";

const SideBar = ({ onClose, show }) => {
  const [modalShow, setModalShow] = useState(false);

  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const isCompanyHome = useSelector((state) => state.companyNav.isCompanyHome);
  const userData = useSelector((state) => state.userInfo.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClose = () => {
    onClose();
  };

  const navigateToProfilePage = () => {
    handleClose();
    navigate("user-profile");
  };

  const signOutHandler = () => {
    localStorage.removeItem("userData");
    dispatch(userActions.setIsLogin(false));
    dispatch(saveIsLoginState(false));
    handleClose();
    navigate("/");
  };
  const showAlert =()=>{
    handleClose();
    setModalShow(true)
  }
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
              <div
                onClick={navigateToProfilePage}
                className={`${styles.profile_content} d-flex align-items-center`}
                title="view profile"
              >
                <img
                  src={profile_pic}
                  className={styles.profile_pic}
                  alt="profile_pic"
                />
                  <div className="ms-3 d-flex justify-content-center flex-column">
                    <span className={styles.profile_name}>{userData.firstName + " " + userData.lastName}</span>
                    <span className={styles.user_email}>{userData.email}</span>
                  </div>
               
              </div>
            ) : (
              <div
                onClick={() => setModalShow(true)}
                className={`${styles.profile_content} d-flex align-items-center`}
                title="Sign in to view your profile"
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={styles.profile_icon}
                />
                <h5 className={`${styles.profile_name} mt-2`}>User Guest</h5>
              </div>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className={styles.contact_list}>
            {!isCompanyHome?<>
              {isLogin ? (
              <>
                <li className={styles.contact_list_item}>
                  Ediet Profile
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faPencil}
                  />
                </li>
              <Link to={"saved"}>
                <li className={styles.contact_list_item} onClick={handleClose}>
                    Saved Jobs
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faBookmark}
                  />
                </li>
              </Link>
              <Link to={"applications"}>
              <li className={styles.contact_list_item} onClick={handleClose}>
                Applications
                <FontAwesomeIcon
                  className={styles.list_icons}
                  icon={faFileContract}
                />
              </li>
            </Link>
              </>
            ) : (
              <>
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
            </>
            )}
            
            </>:<>
            <li className={styles.contact_list_item} onClick={handleClose}>
                  Dashboard{" "}
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faSackDollar}
                  />
                </li>
                <li className={styles.contact_list_item} onClick={handleClose}>
                  Employees Management{" "}
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faUsers}
                  />
                </li>
            
            </>}
           
       
            {isCompanyHome ? (
              <Link to={"packages"}>
                <li className={styles.contact_list_item} onClick={handleClose}>
                  Show Packages{" "}
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faSackDollar}
                  />
                </li>
              </Link>
            ) : (
              <li className={styles.contact_list_item}>
                Go Premium{" "}
                <FontAwesomeIcon
                  className={styles.list_icons}
                  icon={faSackDollar}
                />
              </li>
            )}

            {isCompanyHome ? (
              <Link to={"/"}>
                <li className={styles.contact_list_item} onClick={handleClose}>
                  Join As Employee{" "}
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faUserTie}
                  />
                </li>
              </Link>
            ) : (
              <>
                {!isLogin ? (
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
                ):<li className={styles.contact_list_item}>
                Account Setting{" "}
                <FontAwesomeIcon className={styles.list_icons} icon={faGears} />
              </li>}
              </>
            )}

         
            {isLogin && (
              <li className={styles.contact_list_item} onClick={signOutHandler}>
                Log Out
                <FontAwesomeIcon
                  className={styles.list_icons}
                  icon={faArrowRightFromBracket}
                />
              </li>
            )}
          </ul>

          <ContactsIcon type="two" />

          <p className={`${styles.slide_footer} mt-5 text-center`}>
            COPYRIGHT © 2023 - BY{" "}
            <span className="special_main_color">Easy Job</span>
          </p>
        </Offcanvas.Body>
      </Offcanvas>
      <LoginAlertModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SideBar;
