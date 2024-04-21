import axios from "axios";
import { showProfileActions } from "./showprofile-slice";
import { visitProfileActions } from "./visitProfile-slice";

const fetchVisitProfileData = (token, role, id) => {
  return async (dispatch) => {
    try {
      if (token) {
        if (role === "company") {
          let res = null;

            res = await axios.get(
              `http://127.0.0.1:3000/api/v1/companies/profile/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
        
        
          dispatch(showProfileActions.setIsMyProfile(false));  
          const companyData = res.data.data.companyProfile;
          dispatch(visitProfileActions.setProfileInfo(companyData));
          return res.data
        } else {
          const res = await axios.get(
            `http://127.0.0.1:3000/api/v1/users/profile/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res.data.data)
          const userData = res.data.data;
          dispatch(showProfileActions.setIsMyProfile(false));  
          dispatch(visitProfileActions.setProfileInfo(userData));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export default fetchVisitProfileData;
