import axios from "axios";
import { profileActions } from "./profileInfo-slice";

const fetchProfileData = (token, role) => {
  return async (dispatch) => {
    try {
      if (token) {
        if (role === "company") {
          const res = await axios.get(
            "http://127.0.0.1:3000/api/v1/companies/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const companyData = res.data.data.companyProfile;
          dispatch(profileActions.setProfileInfo(companyData));
        } else {
          const res = await axios.get(
            "http://127.0.0.1:3000/api/v1/users/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res.data.data)
          const userData = res.data.data.userProfile;
          dispatch(profileActions.setProfileInfo(userData));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export default fetchProfileData;
