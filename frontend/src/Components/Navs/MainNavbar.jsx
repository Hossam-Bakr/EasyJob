import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../images/mainLogo.png";
import darkLogo from "../../images/mainLogoDark.png";
import { Link, NavLink } from "react-router-dom";
import MainButton from "../Ui/MainButton";
import styles from "./MainNavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import SideBar from "../Ui/SideBar";
import ResponsiveMenuSlideBar from "../Ui/ResponsiveMenuSlideBar";
import Notifications from "../Notifications/Notifications";

const MainNavbar = () => {
  const [show, setShow] = useState(false);
  const [openResMenu, setOpenResMenu] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isScrollZero, setIsScrollZero] = useState(true);

  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);
  const isCompanyHome = useSelector((state) => state.companyNav.isCompanyHome);
  const changeContent = useSelector(
    (state) => state.companyNav.changeNavContent
  );
  const profileData = useSelector((state) => state.profileInfo.data);

  const onClose = () => setShow(false);
  const onShow = () => setShow(true);


  const nav_type = isCompanyHome ? "fixed-top" : "sticky-top";
  const nav_logo = isScrollZero && isCompanyHome ? darkLogo : logo;
  const nav_color = isScrollZero && isCompanyHome && styles.nav_white;
  const burger_list_color =
    isScrollZero && isCompanyHome && styles.burger_list_white;

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
              ? {
                  y: 0,
                  backgroundColor: "rgba(255, 255, 255)",
                  opacity: 1,
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
                  borderBottom: "1px solid rgb(246, 242, 255)",
                }
              : {
                  y: -200,
                  opacity: 0,
                  backgroundColor: "rgb(255, 255, 255)",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
                  borderBottom: "1px solid rgb(246, 242, 255)",
                }
            : {
                y: 0,
                opacity: 1,
                borderBottom: "0px solid rgba(255,255,255,0)",
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
              }
        }
        className={`${styles.main_nav} ${nav_type} static-top d-flex align-items-center px-3 py-1`}
      >
        <ul
          className={`${styles.nav_list} ${nav_color} d-flex align-items-center mt-3`}
        >
          <div className={`${styles.brand} me-5`}>
            <img src={nav_logo} alt="logo" className="w-100" />
          </div>
          {isLogin ? (
            <>
              {role === "user" ? (
                <>
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"jobs"}
                      end
                    >
                      EXPLORE
                    </NavLink>
                  </li>
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"companies"}
                    >
                      COMPANIES
                    </NavLink>
                  </li>
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"contact"}
                    >
                      CONTACT US
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* logged and company */}
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={`company-dashboard/${profileData?.CompanyId}`}
                      end
                    >
                      DASHBOARD
                    </NavLink>
                  </li>
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"candidates"}
                      end
                    >
                      CANDIDATES
                    </NavLink>
                  </li>
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"job-post"}
                      end
                    >
                      POSTS
                    </NavLink>
                  </li>
                  <li className={`${styles.special_hidden} mx-4`}>
                  <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to={"contact"}
              >
                CONTACT US
              </NavLink>
            </li>
                </>
              )}
            </>
          ) : (
            <>
              {changeContent ? (
                <>
                  {/* not logged and company */}
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"company-home"}
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
                      to={"packages"}
                    >
                      PACKAGES
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
                </>
              ) : (
                <>
                  {/* not logged isLogin and user */}
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
                      to={"jobs"}
                    >
                      EXPLORE
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
                      to={"categories"}
                    >
                      CATEGORIES
                    </NavLink>
                  </li>
                  <li className={`${styles.special_hidden} mx-4`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : undefined
                      }
                      to={"contact"}
                    >
                      CONTACT US
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        <div className="d-flex align-items-center ms-auto me-5">
          {isLogin ? (
            <>
              {role === "user" && (
                <div className="me-4">
                  <Notifications />
                </div>
              )}
            </>
          ) : (
            <>
              <Link to={"login"} className={styles.sign_btn}>
                <MainButton text="Login" />
              </Link>
              {changeContent ? (
                <Link to={"/"} className={styles.sign_btn}>
                  <MainButton type="white" text="Employee" />
                </Link>
              ) : (
                <Link to={"company-home"} className={styles.sign_btn}>
                  <MainButton type="white" text="Company" />
                </Link>
              )}
            </>
          )}

          <div
            onClick={onShow}
            className={`${styles.burger_list} ${burger_list_color} d-flex justify-content-between flex-column mx-3`}
          >
            <span className={styles.half_line}></span>
            <span className={styles.full_line}></span>
            <span className={`${styles.half_line} ms-auto`}></span>
          </div>
          <div onClick={() => setOpenResMenu(true)} className={styles.list}>
            <FontAwesomeIcon className={styles.bars_icon} icon={faBars} />
          </div>
        </div>
      </motion.nav>
      <SideBar onClose={onClose} show={show} />
      <ResponsiveMenuSlideBar onClose={() => setOpenResMenu(false)} show={openResMenu} />
    </>
  );
};

export default MainNavbar;
