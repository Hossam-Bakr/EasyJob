import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
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

  const isLightMood=useSelector((state)=>state.mood.lightMood);

  const navColor=isLightMood?"rgb(255, 255, 255)":"#0E1117";
  const navBorder=isLightMood?"1px solid rgb(246, 242, 255)":"1px solid rgb(8,8,8)";

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
              ? { y: 0, backgroundColor: navColor, opacity: 1,boxShadow:"0px 1px 2px rgba(0, 0, 0, 0.3)",borderBottom: navBorder }
              : { y: -400, opacity: 0 }
            : { y: 0, opacity: 1,borderBottom:'0px solid rgba(255,255,255,0'}
        }
        className={`${styles.main_nav} sticky-top static-top d-flex align-items-center px-3 py-1`}
      >
        <ul className={`${styles.nav_list} d-flex align-items-center mt-3`}>
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

        <div className="d-flex align-items-center ms-auto me-5">
          <Link to={'login'} className={styles.sign_btn}>
            <MainButton text='Login'/>
          </Link>
          <Link to={'company-register'} className={styles.sign_btn}>
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
