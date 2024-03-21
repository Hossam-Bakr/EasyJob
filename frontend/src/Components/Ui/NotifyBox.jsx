import React from 'react';
import styles from "./NotifiyOffCanvas.module.css";
import huwawei from "../../images/logo/huwawei.webp";
import etoile from "../../images/logo/etoile.png";
import etisalat from "../../images/logo/etisalat2.png";
import we from "../../images/logo/we.png";
import johaina from "../../images/logo/johaina.png";
import raya from "../../images/logo/raya.webp";
import elAbd from "../../images/logo/elabd.png";
import lg from "../../images/logo/lg.png";
import noLogo from "../../images/noLogo.jpg";

const NotifyBox = ({noty}) => {
    let notifyLogo=noLogo;
    switch (noty.logo) {
        case "c1":
            notifyLogo=huwawei
            break;
        case "c2":
            notifyLogo=etoile
            break;
        case "c3":
            notifyLogo=etisalat
            break;
        case "c4":
            notifyLogo=we
            break;
        case "c5":
            notifyLogo=johaina
            break;
        case "c6":
            notifyLogo=raya
            break;
        case "c7":
            notifyLogo=elAbd
            break;
        case "c8":
            notifyLogo=lg
            break;
    
        default:
            notifyLogo=noLogo
            break;
    }

  return (
    <div className={styles.noti_box}>
      <div className={styles.notify_photo}>
        <img src={notifyLogo} alt="notify_photo" />
      </div>
      <div className={styles.notify_caption}>
        <h5>{noty.title}</h5>
        <p className='mini_word'>{noty.description}</p>
        <h6 className={styles.time}>{noty.time}</h6>
      </div>
    </div>
  )
}

export default NotifyBox
