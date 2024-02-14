import React, { useState } from "react";
import FloatingPopup from "../Ui/FloatingPopup";

const MyTest = () => {

  const [showResponse, setShowResponse] = useState(false);
  const og={title:"Request Faild",content:"your logo and cover faild to be uploaded please try again"}

  return (
    <div className="vh-100">
      <button onClick={() => setShowResponse(true)}>Upload Images</button>
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={og}
        success={true}
      />  
    </div>
  );
};

export default MyTest;
