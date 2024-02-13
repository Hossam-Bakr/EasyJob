import React from "react";
import styles from "./Error.module.css";
import mainError from "../../images/mainError.png";
import { useNavigate } from "react-router-dom";
import MainButton from "../../Components/Ui/MainButton";

const MainError = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.main_error}>
      <img src={mainError} alt="404 not found img" />
      <span className="mini_word text-center">
        oops! seems that something went wrong{" "}
      </span>
      <div className=" mb-5 mt-3 text-center">
        <MainButton
            onClick={() => navigate(-1)}
            className="special_main_color"
                text={"Reload Page"}
            />
      </div>

    </div>
  );
};

export default MainError;
