import React, { useState } from 'react';
import styles from './ProfileSections.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import EdietPenIcon from './EdietPenIcon';


const ProfileSections = () => {

    const [showContactInfo,setShowContactInfo]=useState(false);

    const toggleShowContactInfoDiv=()=>{
        setShowContactInfo(showContactInfo=> !showContactInfo);
    }

  return (
    <>
      <section className={`${styles.main_style} ${styles.contact_info_section} ${showContactInfo?styles.main_style_spread:''}`}>
        <EdietPenIcon/>
        <h3 className={styles.sec_title}>Contact Info</h3> 
        <div className={styles.contact_info_body}>
            <div className={styles.contact_info_body_header}>
                <ul>
                    <li className={styles.info_header_li}><FontAwesomeIcon icon={faPhone} className={styles.list_icon}/> 0114360092/01550922214</li>
                    <li className={styles.info_header_li}><FontAwesomeIcon icon={faEnvelope} className={styles.list_icon}/> Bassam@gmail.com</li>
                </ul>
            </div>
            <button onClick={toggleShowContactInfoDiv} className={styles.show_more_btn}>show more {" "} <FontAwesomeIcon icon={faCaretDown}/></button>
            <div className={`${styles.contact_info_body_tail} ${showContactInfo?styles.showContactInfo:''}`}>
                <ul>
                    <li className={styles.info_tail_li}>
                         <span className={styles.info_tail_li_title}>Profile url:</span>
                         <span>easy-job/profile/Bassam-Hafez-5134</span>
                    </li>                    
                    <li className={styles.info_tail_li}>
                         <span className={styles.info_tail_li_title}>Birthday:</span>
                         <span>3/1/2001</span>
                    </li>                    
                    <li className={styles.info_tail_li}>
                         <span className={styles.info_tail_li_title}>Nationality:</span>
                         <span>Egypt</span>
                    </li>                    
                    <li className={styles.info_tail_li}>
                         <span className={styles.info_tail_li_title}>Gender:</span>
                         <span>Male</span>
                    </li>                    
                    <li className={styles.info_tail_li}>
                         <span className={styles.info_tail_li_title}>Minimum Salary:</span>
                         <span>confidential</span>
                    </li>                    
                </ul>
            </div>
        </div>
      </section>
    </>
  )
}

export default ProfileSections
