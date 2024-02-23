import React from 'react';
import styles from "./UserProfilePic.module.css";
import { useSelector } from 'react-redux';

const UserProfilePic = () => {

const userMainData=useSelector((state)=>state.profileInfo.mainData);

  return (
    <div className={styles.profile_pic}>
      <span>{userMainData.firstName.charAt(0)}</span>
    </div>
  )
}

export default UserProfilePic
