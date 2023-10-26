import React, { useEffect, useState } from "react";
import logo from "../../images/logoNav.png";
import { Link, NavLink } from "react-router-dom";
import MainButton from "../Ui/MainButton";
import styles from './MainNavbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import SideBar from "../Ui/SideBar";
import ResponsiveMenuSlideBar from "../Ui/ResponsiveMenuSlideBar";

const MainNavbar = () => {

  const [show, setShow] = useState(false);
  const [openResMenu,setOpenResMenu ] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isScrollZero, setIsScrollZero] = useState(true);

  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  const hideResponsiveMenu=()=>setOpenResMenu(false);
  const openResponsiveMenu=()=>setOpenResMenu(true);


  useEffect(() => {
    const isScrolled = () => {
      const currentScrollY = window.scrollY;
      setIsScrollDown(currentScrollY > prevScrollY ? true : false);
      if (window.scrollY > 0) {
        setIsScrollZero(false);
      } else {
        setIsScrollZero(true);
      }
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener("scroll", isScrolled);

    return () => window.removeEventListener("scroll", isScrolled);
  }, [prevScrollY]);


  return (
    <>
      <motion.nav
        animate={
          !isScrollZero
            ? !isScrollDown
              ? { y: 0, backgroundColor: "#EEEEEE", opacity: 1 }
              : { y: -100, opacity: 0 }
            : { y: 0, opacity: 1 }
        }
        className="d-flex align-items-center p-3 pt-4"
      >
        <ul className={`${styles.nav_list} d-flex align-items-center`}>
          <div className={`${styles.brand} me-5`}>
            <img src={logo} alt="logo" className="w-100" />
          </div>
          <li className={`${styles.special_hidden} mx-4`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to={"/"}
              end
            >
              HOME
            </NavLink>
          </li>
          <li className={`${styles.special_hidden} mx-4`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to={"about"}
            >
              ABOUT
            </NavLink>
          </li>
          <li className={`${styles.special_hidden} mx-4`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to={"explore"}
            >
              EXPLORE
            </NavLink>
          </li>
          <li className={`${styles.special_hidden} mx-4`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to={"categories"}
            >
              CATEGORIES
            </NavLink>
          </li>
        </ul>

        <div className="d-flex align-items-center ms-auto mb-3 me-5">
          <Link to={'login'} className={styles.sign_btn}>
            <MainButton text='Login'/>
          </Link>
          <Link to={'company-login'} className={styles.sign_btn}>
            <MainButton type='white' text='Company'/>
          </Link>
          <div
            onClick={onShow}
            className={`${styles.burger_list} d-flex justify-content-between flex-column mx-3`}
          >
            <span className={styles.half_line}></span>
            <span className={styles.full_line}></span>
            <span className={`${styles.half_line} ms-auto`}></span>
          </div>

          <div onClick={openResponsiveMenu} className={styles.list}>
            <FontAwesomeIcon className={styles.bars_icon} icon={faBars} />
          </div>

        </div>
      </motion.nav>
      <SideBar onClose={onClose} show={show} />
      <ResponsiveMenuSlideBar  onClose={hideResponsiveMenu} show={openResMenu}/>
    </>
  );
};

export default MainNavbar;
