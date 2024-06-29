import React, { useState } from 'react';
import { Outlet } from 'react-router';
import MainNavbar from '../Components/Navs/MainNavbar';
import Footer from '../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import MainButton from '../Components/Ui/MainButton';
import LogoutModal from '../Components/Ui/LogoutModal';

const Root = () => {

  const role = useSelector((state) => state.userInfo.role);
  const [logoutModalShow, setLogoutModalShow] = useState(false);
  

  return (
    <>
      {role&&role==="admin"&&<div className='mt-3 mb-4 me-4 text-end '>
          <MainButton onClick={(()=>setLogoutModalShow(true))} type="white" text="Logout"/>
        </div>}
      {role?role!=="admin"&&<MainNavbar/>:<MainNavbar/>}
      <Outlet/>
      {!role&&role!=="admin"&&<Footer/>}
      <LogoutModal show={logoutModalShow} onHide={() => setLogoutModalShow(false)}/>

    </>
  )
}

export default Root
