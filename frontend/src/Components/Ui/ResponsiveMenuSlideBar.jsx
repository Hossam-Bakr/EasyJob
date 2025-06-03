import React from "react";
import styles from "./ResponsiveMenuSlideBar.module.css";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import MainButton from "./MainButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCircleInfo,
  faCoins,
  faFire,
  faHome,
  faLayerGroup,
  faUserTie,
  faEnvelope,
  faBusinessTime,
} from "@fortawesome/free-solid-svg-icons";
import ContactsIcon from "./ContactsIcon";
import { Link } from "react-router-dom";
import logo from "../../images/mainLogo.png";
import SearchField from "./SearchField";

const ResponsiveMenuSlideBar = ({ onClose, show }) => {
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);
  const changeContent = useSelector(
    (state) => state.companyNav.changeNavContent
  );
  const profileData = useSelector((state) => state.profileInfo.data);


  
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      className={styles.side_bar}
    >
      <Offcanvas.Header className={styles.header} closeButton>
        <Offcanvas.Title>
          <img src={logo} className={styles.logo} alt="mykid logo" />
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <SearchField />
        <ul className={styles.contact_list}>
          {isLogin ? (
            <>
              {role === "user" ? (
                <>
                  {/* logged and user */}
                  <Link onClick={onClose} to={"jobs"} end="true">
                    <li className={styles.contact_list_item}>
                      Explore{" "}
                      <FontAwesomeIcon
                        icon={faFire}
                        className={styles.list_icons}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"companies"} end="true">
                    <li className={styles.contact_list_item}>
                      Companies{" "}
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className={styles.list_icons}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"contact"} end="true">
                    <li className={styles.contact_list_item}>
                      Contact Us
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.list_icons}
                      />
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  {/* logged and company */}
                  <Link
                    onClick={onClose}
                    to={`company-dashboard/${profileData?.CompanyId}`}
                    end="true"
                  >
                    <li className={styles.contact_list_item}>
                      Dashboard{" "}
                      <FontAwesomeIcon
                        icon={faFire}
                        className={styles.list_icons}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"candidates"}>
                    <li className={styles.contact_list_item}>
                      Candidates{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faUserTie}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"packages"}>
                    <li className={styles.contact_list_item}>
                      Packages{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faCoins}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"job-post"}>
                    <li className={styles.contact_list_item}>
                      Post Job{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faBusinessTime}
                      />
                    </li>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              {changeContent ? (
                <>
                  {/* not logged and company */}
                  <Link onClick={onClose} to={"company-home"} end="true">
                    <li className={styles.contact_list_item}>
                      Home{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faHome}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"about"}>
                    <li className={styles.contact_list_item}>
                      About{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faCircleInfo}
                      />
                    </li>
                  </Link>

                  <Link onClick={onClose} to={"candidates"}>
                    <li className={styles.contact_list_item}>
                      Candidates{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faUserTie}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"packages"}>
                    <li className={styles.contact_list_item}>
                      Packages{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faCoins}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"categories"}>
                    <li className={styles.contact_list_item}>
                      Categories{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faLayerGroup}
                      />
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  {/* not logged and user */}
                  <Link onClick={onClose} to={"/"} end="true">
                    <li className={styles.contact_list_item}>
                      Home{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faHome}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"about"}>
                    <li className={styles.contact_list_item}>
                      About{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faCircleInfo}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"jobs"}>
                    <li className={styles.contact_list_item}>
                      Explore{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faFire}
                      />
                    </li>
                  </Link>
                  <Link onClick={onClose} to={"categories"}>
                    <li className={styles.contact_list_item}>
                      Categories{" "}
                      <FontAwesomeIcon
                        className={styles.list_icons}
                        icon={faLayerGroup}
                      />
                    </li>
                  </Link>
                </>
              )}
            </>
          )}
        </ul>
        {isLogin ? (
          ""
        ) : (
          <div
            className={`${styles.side_bar_signing_btns} my-5 d-flex align-items-center justify-content-evenly`}
          >
            <Link to={"login"} onClick={onClose} className="mx-2">
              <MainButton text="Login" />
            </Link>
            {changeContent ? (
              <Link to={"/"} onClick={onClose} className="mx-2">
                <MainButton type="white" text="Employee" />
              </Link>
            ) : (
              <Link to={"company-home"} onClick={onClose} className="mx-2">
                <MainButton type="white" text="Company" />
              </Link>
            )}
          </div>
        )}

        <ContactsIcon type="two" />

        <p className={`${styles.slide_footer} mt-5 text-center`}>
          COPYRIGHT © 2023 - BY{" "}
          <span className="special_main_color">Easy Job</span>
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ResponsiveMenuSlideBar;
