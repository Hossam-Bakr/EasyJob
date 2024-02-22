import React from 'react'
import UserAccountSettingForm from './UserAccountSettingForm'
import UserAccountSettingFormTwo from './UserAccountSettingFormTwo';
import SectionMainTitle from './../../Components/Ui/SectionMainTitle';

const UserAccountSetting = () => {
  return (
    <div className="position-relative pt-5">
    <SectionMainTitle title="Account Setting"/>
    <div className='p-3 my-3 d-flex align-items-center justify-content-center flex-column'>
      <UserAccountSettingForm/>
      <UserAccountSettingFormTwo/>
    </div>
  </div>
  )
}

export default UserAccountSetting
