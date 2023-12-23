import React from "react";
import { useDispatch,useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContactsIcon from "./ContactsIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBookmark, faCircleUser, faFileContract, faGears, faMoon, faSackDollar, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { modeAction } from "../../Store/mood-slice";
import { userActions } from "../../Store/userInfo-slice";
import { saveIsLoginState } from "../../Store/userInfo-actions";
import setThemeMood from "../../Store/mood-actions";

const SideBar = ({ onClose, show }) => {
  
  const darkMode=useSelector((state)=>state.mode.darkMode);
  const isLogin=useSelector((state)=>state.userInfo.isLogin);
  const userData=useSelector((state)=>state.userInfo.data);

  const dispatch=useDispatch();
  const modeContent=!darkMode?'Dark Mood':'Light Mood';
  const sideBarClasses=!darkMode?styles.side_bar:styles.side_bar_dark;
  const profileName=isLogin?userData.firstName+" "+ userData.lastName:'User Guest';

  const toggleModeHandler=()=>{
      dispatch(modeAction.toggleMood());
      setThemeMode()
  }
  const setThemeMode=()=>{
    dispatch(setThemeMood(darkMode))
  }
  
  const handleClose = () => {
    onClose();
  };

  const signOutHandler=()=>{
    localStorage.removeItem('userData');
    dispatch(userActions.setIsLogin(false))
    dispatch(saveIsLoginState(false))
  }

//#0F1118
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className={sideBarClasses}
    >
      <Offcanvas.Header className={styles.header} closeButton>
        <Offcanvas.Title>
          <div className={`${styles.profile_content} d-flex align-items-center`} title="view profile">
            <FontAwesomeIcon icon={faCircleUser} className={styles.profile_icon}/>
            <h5 className={styles.profile_name}>{profileName}</h5>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className={styles.contact_list}>
          <li className={styles.contact_list_item}>Saved <FontAwesomeIcon className={styles.list_icons} icon={faBookmark}/></li>
          <li className={styles.contact_list_item}>Applications <FontAwesomeIcon className={styles.list_icons} icon={faFileContract} /></li>
          <li onClick={toggleModeHandler} className={styles.contact_list_item}>{modeContent} {darkMode?<FontAwesomeIcon className={styles.list_icons} icon={faMoon}/>:<FontAwesomeIcon className={styles.list_icons} icon={faSun}/>}</li>
          <li className={styles.contact_list_item}>Premium <FontAwesomeIcon className={styles.list_icons} icon={faSackDollar}/></li>
          <li className={styles.contact_list_item}>Setting <FontAwesomeIcon  className={styles.list_icons} icon={faGears} /></li>
          {isLogin&&<li className={styles.contact_list_item} onClick={signOutHandler}>Log Out <FontAwesomeIcon className={styles.list_icons} icon={faArrowRightFromBracket} /></li>}
        </ul>

        <ContactsIcon type="two"/>

        <p className={`${styles.slide_footer} mt-5 text-center`}>
          COPYRIGHT © 2023 - BY{" "}
          <span className="special_main_color">Easy Job</span>
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
