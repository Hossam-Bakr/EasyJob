import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import HomeMainBody from "./HomeMainBody";
import { useDispatch } from "react-redux";
import { companyActions } from "../../Store/companyNav-slice";

const Home = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(companyActions.changeNavState(false))
  });
  
  return (
    <>
      <Header />
      <HomeMainBody/>
    </>
  );
};

export default Home;
