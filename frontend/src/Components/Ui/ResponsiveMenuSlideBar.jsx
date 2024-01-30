import React from "react";
import styles from "./ResponsiveMenuSlideBar.module.css";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import MainButton from "./MainButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCoins,
  faFire,
  faHome,
  faLayerGroup,
  faSearch,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import ContactsIcon from "./ContactsIcon";
import { Link } from "react-router-dom";
import logo from "../../images/mainLogo.png";

const ResponsiveMenuSlideBar = ({ onClose, show }) => {
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const isCompanyHome = useSelector((state) => state.companyNav.isCompanyHome);

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
          {isLogin ? (
            <Link onClick={handleClose} to={"jobs"} end="true">
              <li className={styles.contact_list_item}>JOBS</li>
            </Link>
          ) : (
            <>
              {isCompanyHome ? (
                <Link onClick={handleClose} to={"company-home"} end="true">
                  <li className={styles.contact_list_item}>
                    Home{" "}
                    <FontAwesomeIcon
                      className={styles.list_icons}
                      icon={faHome}
                    />
                  </li>
                </Link>
              ) : (
                <Link onClick={handleClose} to={"/"} end="true">
                  <li className={styles.contact_list_item}>
                    Home{" "}
                    <FontAwesomeIcon
                      className={styles.list_icons}
                      icon={faHome}
                    />
                  </li>
                </Link>
              )}
            </>
          )}
          {isCompanyHome && (
            <Link onClick={handleClose} to={"candidates"}>
              <li className={styles.contact_list_item}>
                Candidates{" "}
                <FontAwesomeIcon
                  className={styles.list_icons}
                  icon={faUserTie}
                />
              </li>
            </Link>
          )}
          <Link onClick={handleClose} to={"about"}>
            <li className={styles.contact_list_item}>
              About{" "}
              <FontAwesomeIcon
                className={styles.list_icons}
                icon={faCircleInfo}
              />
            </li>
          </Link>
          {isCompanyHome ? (
            <Link onClick={handleClose} to={"packages"}>
              <li className={styles.contact_list_item}>
                Packages{" "}
                <FontAwesomeIcon className={styles.list_icons} icon={faCoins} />
              </li>
            </Link>
          ) : (
            <>
              {" "}
              <Link onClick={handleClose} to={"explore"}>
                <li className={styles.contact_list_item}>
                  Explore{" "}
                  <FontAwesomeIcon
                    className={styles.list_icons}
                    icon={faFire}
                  />
                </li>
              </Link>
              <Link onClick={handleClose} to={"categories"}>
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
        </ul>
        {isLogin ? (
          ""
        ) : (
          <div
            className={`${styles.side_bar_signing_btns} my-5 d-flex align-items-center justify-content-evenly`}
          >
            <Link to={"login"} onClick={handleClose} className="mx-2">
              <MainButton text="Login" />
            </Link>
            {isCompanyHome ? (
              <Link to={"/"} onClick={handleClose} className="mx-2">
                <MainButton type="white" text="Employee" />
              </Link>
            ) : (
              <Link to={"company-home"} onClick={handleClose} className="mx-2">
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
