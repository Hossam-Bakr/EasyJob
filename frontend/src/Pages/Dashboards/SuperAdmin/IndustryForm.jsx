import React from "react";
import SectionMainTitle from "./../../../Components/Ui/SectionMainTitle";
import CreateIndustry from "./CreateIndustry";
import UpdateIndustry from "./UpdateIndustry";
import DeleteIndustry from "./DeleteIndustry";
const IndustryForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  return (
    <>
      <SectionMainTitle title="Control All Industries" />
      <CreateIndustry
           setShowResponse={setShowResponse}
           setResponseMessage={setResponseMessage}
           setSuccessResponse={setSuccessResponse}
      />
      <UpdateIndustry
         setShowResponse={setShowResponse}
         setResponseMessage={setResponseMessage}
         setSuccessResponse={setSuccessResponse}
      />
      <DeleteIndustry
         setShowResponse={setShowResponse}
         setResponseMessage={setResponseMessage}
         setSuccessResponse={setSuccessResponse}
      />
    </>
  )
}

export default IndustryForm
