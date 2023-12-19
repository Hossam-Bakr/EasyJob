import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContactsIcon from "./ContactsIcon";
import profile from "../../images/people4.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBookmark, faFileContract, faGears, faMoon, faSackDollar, faSun } from "@fortawesome/free-solid-svg-icons";
import { moodActions } from "../../Store/mood-slice";
import { userActions } from "../../Store/userInfo-slice";
const SideBar = ({ onClose, show }) => {

  
  const isLightMood=useSelector((state)=>state.mood.lightMood);
  const dispatch=useDispatch();
  const user = useSelector((state)=>state.userInfo)
  const moodContent=isLightMood?'Dark Mood':'Light Mood';
  const sideBarClasses=isLightMood?styles.side_bar:styles.side_bar_dark;

  const changeMoodHanndler=()=>{
      dispatch(moodActions.changeMood())
  }

  const handleClose = () => {
    onClose();
  };

  const signOutHandler=()=>{
    localStorage.removeItem('userInfo');
    dispatch(userActions.setIsLoginState(false))
  }

  useEffect(()=>{
    if(!isLightMood){
      document.documentElement.style.setProperty('--golden','#EFA51E')
      document.documentElement.style.setProperty('--font_color','white')
      document.documentElement.style.setProperty('--main_bg_color','#07090c')
      document.documentElement.style.setProperty('--dark_white','rgb(140, 140, 140)')
      document.documentElement.style.setProperty('--theme_color','rgb(8,8,8)')
      document.documentElement.style.setProperty('--off_white','rgb(3, 3, 3)')
      document.documentElement.style.setProperty('--circle_color','rgba(0, 110, 255,.55)')
    }
    else{
      document.documentElement.style.setProperty('--golden','#EFA51E')
      document.documentElement.style.setProperty('--font_color','black')
      document.documentElement.style.setProperty('--main_bg_color','white')
      document.documentElement.style.setProperty('--dark_white','rgb(129, 129, 129)')
      document.documentElement.style.setProperty('--theme_color','white')
      document.documentElement.style.setProperty('--off_white','rgb(246, 242, 255)')
      document.documentElement.style.setProperty('--circle_color','rgba(0, 110, 255, 0.863)')
    }
  },[isLightMood]);

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
          <div className="d-flex align-items-center">
            <img title="view profile" src={profile} className={styles.profile} alt="profile img" />
            <h5 className={styles.profile_name}>{user.isLogin?user.data.firstName+ " " + user.data.lastName:'Ramy'}</h5>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className={styles.contact_list}>
          <li className={styles.contact_list_item}>Saved <FontAwesomeIcon className={styles.list_icons} icon={faBookmark}/></li>
          <li className={styles.contact_list_item}>Applications <FontAwesomeIcon className={styles.list_icons} icon={faFileContract} /></li>
          <li onClick={changeMoodHanndler} className={styles.contact_list_item}>{moodContent} {isLightMood?<FontAwesomeIcon className={styles.list_icons} icon={faMoon}/>:<FontAwesomeIcon className={styles.list_icons} icon={faSun}/>}</li>
          <li className={styles.contact_list_item}>Premium <FontAwesomeIcon className={styles.list_icons} icon={faSackDollar}/></li>
          <li className={styles.contact_list_item}>Setting <FontAwesomeIcon  className={styles.list_icons} icon={faGears} /></li>
          <li className={styles.contact_list_item} onClick={signOutHandler}>Log Out <FontAwesomeIcon className={styles.list_icons} icon={faArrowRightFromBracket} /></li>
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
