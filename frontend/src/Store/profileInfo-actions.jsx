import axios from "axios";
import { profileActions } from "./profileInfo-slice";
import { showProfileActions } from "./showprofile-slice";

const fetchProfileData = (token, role, isMyProfile, companyId) => {
  return async (dispatch) => {
    try {
      if (token) {
        if (role === "company") {
          let res = null;

          dispatch(showProfileActions.setIsMyProfile(true));
            res = await axios.get(
            "http://127.0.0.1:3000/api/v1/companies/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const companyData = res.data.data.companyProfile;
          dispatch(profileActions.setProfileInfo(companyData));
          return res.data;
        } else {
          const res = await axios.get(
            "http://127.0.0.1:3000/api/v1/users/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = res.data.data;
          dispatch(profileActions.setProfileInfo(userData.userProfile));
          dispatch(profileActions.setProfileMainInfo(userData.user));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export default fetchProfileData;
