import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import styles from "./AccountSettingForm.module.css";
import { accountSettingHanlder } from "../../util/Http";
import { useSelector } from "react-redux";
import ConfirmModal from "../../Components/Ui/ConfirmModal";

const DeleteAccountSetting = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [modalShow, setModalShow] =useState(false);

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  const { mutate, isPending } = useMutation({
    mutationFn: accountSettingHanlder,
    onSuccess: (response) => {
      console.log(response);
      let res = response.data;
      if (res.status === "success") {
        setResponseMessage({
          title: "Deleted Successfully",
          content: "your Account Deleted successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your Account did not delete please try again later",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your Account did not delete please try again later",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const myRole = role === "company" ? "companies" : "users";
  const onSubmit = (values) => {
    mutate({
      type: "delete-account",
      role: myRole,
      token: token,
      method: "delete",
    });
    console.log(values);
  };
  return (
    <>
      <Formik>
        <Form className={styles.setting_form_container}>
          <h3 className={styles.title}>Delete Account</h3>
          <p>
            We're sorry to see you go! If there's anything we could have done
            better, please let us know. Your feedback is valuable to us. If you
            decide to return, we'll be here with open arms. Thank you for being
            part of our community
          </p>

          <div className="text-end">
            {isPending ? (
              <button type="button" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button onClick={() => setModalShow(true)} type="button" className={`${styles.save_btn} ${styles.delete_btn}`}>
                Delete
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
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        text="Are You Sure You Want to Delete that Account !!"
        btnText={"Delete"}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DeleteAccountSetting;
