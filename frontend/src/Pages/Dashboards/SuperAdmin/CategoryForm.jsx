import React from "react";
import SectionMainTitle from "./../../../Components/Ui/SectionMainTitle";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {



  return (
    <>
      <SectionMainTitle title="Control All Categories" />
      <CreateCategory
           setShowResponse={setShowResponse}
           setResponseMessage={setResponseMessage}
           setSuccessResponse={setSuccessResponse}
      />
      <UpdateCategory
         setShowResponse={setShowResponse}
         setResponseMessage={setResponseMessage}
         setSuccessResponse={setSuccessResponse}
      />
      <DeleteCategory
         setShowResponse={setShowResponse}
         setResponseMessage={setResponseMessage}
         setSuccessResponse={setSuccessResponse}
      />
    </>
  );
};

export default CategoryForm;
