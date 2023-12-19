import { userActions } from "./userInfo-slice";

const saveUserInfoIntoLocalStorag=(userInfo)=>{
    return(dispatch)=>{
        localStorage.setItem('userData',JSON.stringify({
            data:userInfo.data,
            token:userInfo.token,
        }))
        localStorage.setItem('isLogin',JSON.stringify(userInfo.isLogin))
    }
}

export const getUserInfoFromLocalStorage=()=>{
   return(dispatch)=>{
    const userData=JSON.parse(localStorage.getItem('userData'));
        dispatch(userActions.setUserInfo({
            data:userData.data,
            token:userData.token,
        }))
   }
}

export default saveUserInfoIntoLocalStorag;