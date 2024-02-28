import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, ref, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import styles from "./AccountSettingForm.module.css";
import { accountSettingHanlder } from "../../util/Http";
import { useSelector } from "react-redux";

const AccountSettingForm = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [currentPasswordError,setCurrentPasswordError]=useState(false);
  const [currentPasswordErrorMsg,setCurrentPasswordErrorMsg]=useState("");

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  const { mutate, isPending } = useMutation({
    mutationFn: accountSettingHanlder,
    onSuccess: (response) => {
      console.log(response)
      let res = response.data;
      if (res.status === "success") {
        setResponseMessage({
          title: "Saved Successfully",
          content: "your Password updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your changes did not save please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      if(error.status===400){
        setResponseMessage({
          title: "Request Faild",
          content:error.data.message,
        });
        
        setSuccessResponse(false);
        setShowResponse(true);
        setCurrentPasswordError(true)
        setCurrentPasswordErrorMsg("the current password is incorrect")
      }
      else{
        setResponseMessage({
          title: "Request Faild",
          content: "your changes did not save please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }

    },
  });
  
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const myRole=role==="company"?"companies":"users";
  const onSubmit = (values) => {
    mutate({
      type: "changePassword",
      formData: values,
      role: myRole,
      token: token,
    });
    console.log(values);
  };
  const validationSchema = object({
    currentPassword: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
    newPassword: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
    confirmNewPassword: string()
      .oneOf([ref("newPassword"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.setting_form_container}>
          <h3 className={styles.title}>Change Current Password</h3>
          <div className={styles.input_faild}>
            <label htmlFor="currentPassword">Current Password</label>
            <Field
              type="password"
              id="currentPassword"
              name="currentPassword"
            />
            <ErrorMessage
              name="currentPassword"
              component={InputErrorMessage}
            />
           {currentPasswordError&&<InputErrorMessage text={currentPasswordErrorMsg}/>}      
          </div>
    <div className={styles.collection}>
    <div className={styles.input_faild}>
            <label htmlFor="newPassword">New Password</label>
            <Field type="password" id="newPassword" name="newPassword" />
            <ErrorMessage name="newPassword" component={InputErrorMessage} />
          </div>

          <div className={styles.input_faild}>
            <label htmlFor="confirmNewPassword">Confirm Password</label>
            <Field
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
            />
            <ErrorMessage
              name="confirmNewPassword"
              component={InputErrorMessage}
            />
          </div>
    </div>

          <div className="text-end">
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button type="submit" className={styles.save_btn}>
                Update Passowrd
              </button>
            )}
          </div>
        </Form>
      </Formik>

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default AccountSettingForm;
