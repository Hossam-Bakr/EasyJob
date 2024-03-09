import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import HomeMainBody from "./HomeMainBody";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../Store/companyNav-slice";
import Posts from "../Posts/Posts";
import axios from "axios";
import { userActions } from "../../Store/userInfo-slice";
import saveUserInfoIntoLocalStorag, { saveIsLoginState, saveRoleState, saveTokenState } from "../../Store/userInfo-actions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(companyActions.changeNavState(false));
  });

  useEffect(()=>{
    const checkGoogleLogin=async()=>{
      try {
        const res=await axios(`http://127.0.0.1:3000/api/v1/auth/login/success`)
        console.log(res)
        if(res.data.status==="success"){
            dispatch(userActions.setUserInfo(res.data.data));
            dispatch(userActions.setIsLogin(true))
            dispatch(userActions.setRole("user"))
            dispatch(userActions.setToken(res.data.data.token))
            dispatch(saveUserInfoIntoLocalStorag(res.data.data)); 
            dispatch(saveIsLoginState(true))
            dispatch(saveRoleState("user"))
            dispatch(saveTokenState(res.data.data.token))
            navigate('/jobs')
        }
      } catch (error) {
        console.log(error)
      } 
    }
    // checkGoogleLogin()
  },[dispatch,navigate])

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
