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
export const saveRoleState=(role)=>{
    return(dispatch)=>{
        localStorage.setItem('role',JSON.stringify(role))
    }
}
export const saveTokenState=(token)=>{
    return(dispatch)=>{
        localStorage.setItem('token',JSON.stringify(token))
    }
}


//get functions
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
export const getRoleState=()=>{
   return(dispatch)=>{
    const role=JSON.parse(localStorage.getItem('role'));
        dispatch(userActions.setRole(role))
   }
}
export const getToken=()=>{
   return(dispatch)=>{
    const token=JSON.parse(localStorage.getItem('token'));
        dispatch(userActions.setToken(token))
   }
}

export default saveUserInfoIntoLocalStorag;