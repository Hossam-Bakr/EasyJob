import React from "react";
import styles from "./CustomDropDownItem.module.css";

const CustomDropDownItem = React.forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={styles.dropDownBtn}
  >
    {children}
    &#x25bc;
  </button>
));
export default CustomDropDownItem;
