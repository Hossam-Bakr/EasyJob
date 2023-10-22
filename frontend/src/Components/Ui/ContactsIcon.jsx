import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,faTwitter,faLinkedin,faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './ContactsIcon.module.css';
const ContactsIcon = ({type}) => {
  const classes = type==='one'?styles.social_icon_type_one:styles.social_icon_type_two;
  const container_class = type==='one'?styles.icons_div_one:styles.icons_div_two;
  return (
    <div className={`${container_class} d-flex`}>
        <FontAwesomeIcon className={`${classes} ${type==='two'&&styles.fa_face} me-3`} icon={faFacebookF} />
        <FontAwesomeIcon className={`${classes} mx-3`} icon={faTwitter} />
        <FontAwesomeIcon className={`${classes} mx-3`} icon={faLinkedin} />
        <FontAwesomeIcon className={`${classes} mx-3`} icon={faYoutube} />
    </div>
  )
}

export default ContactsIcon
