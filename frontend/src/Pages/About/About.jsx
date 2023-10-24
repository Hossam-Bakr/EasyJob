import React from 'react'

import SubNavbar from '../../Components/Navs/SubNavbar';
import AboutHeader from '../../Components/About-Header/About-Header';

const About = () => {
  return (
    <div>
      <SubNavbar firstTab={"HOME"} secondTab={"ABOUT US"} thirdTab={"CONTACT US"} fourthTab={"SEARCH FOR JOBS"} />
      <AboutHeader />
    </div>
  )
}

export default About
