import React from 'react';
import styles from "./UserProfilePic.module.css";

const UserProfilePic = ({firstName}) => {
  return (
    <div className={styles.profile_pic}>
      <span>{firstName.charAt(0)}</span>
    </div>
  )
}

export default UserProfilePic
