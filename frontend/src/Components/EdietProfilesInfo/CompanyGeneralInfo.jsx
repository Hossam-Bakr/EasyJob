import React from "react";
import SectionMainTitle from "./../../Components/Ui/SectionMainTitle";
import Loading from "../Ui/Loading";
import GeneralInfoForm from "./GeneralInfoForm";

const CompanyGeneralInfo = (props) => {

  return (
    <div className="my-5">
      <SectionMainTitle title="Company General Info" />
      {props? (
          <div>
            <GeneralInfoForm data={props}/>
          </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CompanyGeneralInfo;
