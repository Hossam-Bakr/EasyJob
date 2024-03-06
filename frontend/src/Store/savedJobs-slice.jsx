import { createSlice } from "@reduxjs/toolkit";

const savedJobsSLice=createSlice({
  name:"savedJobs",
  initialState:{
    jobData:[],
    totalQuantity:0
  },
  reducers:{
    setJobData(state,action){
        const newJob=action.payload
        if(newJob.length===0){
          state.jobData=[...state.jobData]
          return;
        }
        const exisitJob=state.jobData.find((job)=>job.id===newJob.id)
        if(exisitJob){
          state.jobData=[...state.jobData]
          return;
        }
        state.totalQuantity++
        state.jobData=[...state.jobData,newJob]
    },
    deleteJob(state,action){
      state.totalQuantity--
      const id=action.payload.id
      console.log(id)
      const exisitJob=state.jobData.filter((job)=>job.id!==id)
      state.jobData=[...exisitJob]
    }
  }
})


export default savedJobsSLice;
export const savedJobActions=savedJobsSLice.actions