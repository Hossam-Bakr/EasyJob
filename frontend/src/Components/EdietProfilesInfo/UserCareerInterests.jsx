import React from "react";
import SectionMainTitle from "../Ui/SectionMainTitle";
import UserCareerInterestsForm from "./UserCareerInterestsForm";

const UserCareerInterests = ({
  currentCareerLevel,
  jobTitles,
  jobTypes,
  jobCategories,
}) => {
  return (
    <div className="py-5">
      <SectionMainTitle title="User Experiences" /> 
          <UserCareerInterestsForm
            currentCareerLevel={currentCareerLevel}
            jobTitles={jobTitles}
            jobTypes={jobTypes}
            jobCategories={jobCategories}
          />
    </div>
  );
};

export default UserCareerInterests;
