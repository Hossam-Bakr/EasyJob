import { userActions } from "./userInfo-slice";

const saveUserInfoIntoLocalStorag=(userInfo)=>{
    return(dispatch)=>{
        localStorage.setItem('userData',JSON.stringify(userInfo))
    }
}
export const saveIsLoginState=(isLoginState)=>{
    return(dispatch)=>{
        localStorage.setItem('isLogin',JSON.stringify(isLoginState))
    }
}

export const getUserInfoFromLocalStorage=()=>{
   return(dispatch)=>{
    const userData=JSON.parse(localStorage.getItem('userData'));
        dispatch(userActions.setUserInfo(userData))
   }
}

export const getisLoginState=()=>{
   return(dispatch)=>{
    const isLogin=JSON.parse(localStorage.getItem('isLogin'));
        dispatch(userActions.setIsLogin(isLogin))
   }
}

export default saveUserInfoIntoLocalStorag;