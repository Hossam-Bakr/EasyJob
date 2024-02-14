import axios from "axios";
import { profileActions } from "./profileInfo-slice";

const fetchProfileData = (token, type) => {
    return async(dispatch)=>{
        try {
            if (token) {
              const res = await axios.get(
                "http://127.0.0.1:3000/api/v1/companies/profile",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (type === "company") {
                const companyData= res.data.data.companyProfile;
                dispatch(profileActions.setProfileInfo(companyData))
              } else {
                const userData= res.data.data.userProfile;
                dispatch(profileActions.setProfileInfo(userData))
              }
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }

};

export default fetchProfileData;
