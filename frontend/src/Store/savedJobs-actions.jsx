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
      // console.log("respone from get saved jobs",res.data);
      const jobData=res.data.data.jobs
      const totalQuantity=res.data.results
      dispatch(savedJobActions.replaceJobsData({jobData:jobData,totalQuantity:totalQuantity}));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSavedJobHandler=(id,token)=>{ 

    return async(dispatch)=>{
        try {   
            const  res=await axios.delete(`${baseServerUrl}jobs/saved/${id}`,{
               headers: {
                 Authorization: `Bearer ${token}`,
               }
             })
          //  console.log("response from delete saved jobs",res.data)
           dispatch (savedJobActions.deleteJob(id));
           return res.data

         } catch (error) {
         console.log(error)
       }
    }
  }


