import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import HomeMainBody from "./HomeMainBody";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../Store/companyNav-slice";
import Posts from "../Posts/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfo.isLogin);

  useEffect(() => {
    dispatch(companyActions.changeNavState(false));
  });

  return (
    <>
      {isLogin ? (
        <Posts />
      ) : (
        <>
          <Header />
          <HomeMainBody />
        </>
      )}
    </>
  );
};

export default Home;
