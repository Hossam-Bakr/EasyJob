import React from 'react';
import { Outlet } from 'react-router';
import MainNavbar from '../Components/Navs/MainNavbar';
import Footer from '../Components/Footer/Footer';

const Root = () => {
  return (
    <>
      <MainNavbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Root
