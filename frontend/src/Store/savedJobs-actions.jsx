import axios from "axios";
import { savedJobActions } from "./savedJobs-slice";
const baseServerUrl = "http://127.0.0.1:3000/api/v1/";

export const getSavedJobsHandler = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${baseServerUrl}jobs/saved/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("respone from get saved jobs",res.data.data.jobs);
      dispatch(savedJobActions.setJobData(res.data.data.jobs));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSavedJobHandler=async(id,token)=>{ 
    return async(dispatch)=>{
        try {   
            const  res=await axios.delete(`${baseServerUrl}jobs/saved/`,id,{
               headers: {
                 Authorization: `Bearer ${token}`,
               }
             })
           console.log("response from delete saved jobs",res)
           dispatch (savedJobActions.deleteJob(id));
         } catch (error) {
         console.error(error)
       }
    }
  }


