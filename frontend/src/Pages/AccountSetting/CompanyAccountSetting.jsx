import React from 'react'
import SectionMainTitle from './../../Components/Ui/SectionMainTitle';
import CompanyAccountSettingForm from './CompanyAccountSettingForm';
import CompanyAccountSettingFormTwo from './CompanyAccountSettingFormTwo';


const CompanyAccountSetting = () => {
  return (
    <div className="position-relative pt-5">
      <SectionMainTitle title="Account Setting"/>
      <div className='p-3 my-3 d-flex align-items-center justify-content-center flex-column'>
        <CompanyAccountSettingForm/>
        <CompanyAccountSettingFormTwo/>
      </div>
    </div>
  )
}

export default CompanyAccountSetting
