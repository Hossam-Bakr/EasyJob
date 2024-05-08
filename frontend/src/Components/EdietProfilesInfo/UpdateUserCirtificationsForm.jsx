import React, { useState, useEffect } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { date, object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";
import { ErrorMessage, Form, Formik, Field } from "formik";

const UpdateUserCirtificationsForm = ({
  certificate,
  onHide,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentCredentialID, setCurrentCredentialID] = useState("");
  const [currentOrganization, setCurrentOrganization] = useState("");
  const [currentIssueDate, setCurrentIssueDate] = useState("");
  const [currentCredentialURL, setCurrentCredentialURL] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    if (certificate) {
      setCurrentTitle(certificate.title || "");
      setCurrentOrganization(certificate.organization || "");
      setCurrentIssueDate(certificate.issueDate || "");
      setCurrentCredentialURL(certificate.credentialURL || "");
      setCurrentCredentialID(certificate.credentialID || "");
      setCurrentDescription(certificate.description || "");
    }
  }, [certificate]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        if (role && token) {
          dispatch(fetchProfileData(token, role));
        }
        setResponseMessage({
          title: "Saved Successfully",
          content: "Your Certificate Updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        onHide();
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Your Certificate faild to be Updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
        onHide();
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Certificate faild to be Updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      onHide();
    },
  });

  const initialValues = {
    title: currentTitle,
    credentialID: currentCredentialID,
    organization: currentOrganization,
    issueDate: currentIssueDate,
    credentialURL: currentCredentialURL,
    description: currentDescription,
  };

  const onSubmit = (values) => {
    const updatedValues = {
      title: values.title ? values.title : currentTitle,
      credentialID: values.credentialID
        ? values.credentialID
        : currentCredentialID,
      organization: values.organization
        ? values.organization
        : currentOrganization,
      issueDate: values.issueDate ? values.issueDate : currentIssueDate,
      credentialURL: values.credentialURL
        ? values.credentialURL
        : currentCredentialURL,
      description: values.description ? values.description : currentDescription,
    };

    mutate({
      type: `certification/${certificate.id}`,
      formData: updatedValues,
      token: token,
      role: "users",
    });
  };
  const today = new Date();

  const validationSchema = object({
    title: string().required("title is required"),
    organization: string().required("organization name is required"),
    issueDate: date()
      .test("futureDate", "Future dates are not allowed", function (value) {
        const selectedDate = new Date(value);
        return selectedDate <= today;
      })
      .required("issueDate is required"),
    credentialID: string().required("credentialID is required"),
    credentialURL: string()
      .url("Please enter a valid URL")
      .required("credentialURL is required"),
    description: string(),
  });

  const handleDeleteFormData = async () => {
    const res = await updateFormHandler({
      type: `certification/${certificate.id}`,
      token: token,
      role: "users",
      method: "delete",
    });
    if (res.status === 204 || res.data.status === "success") {
      setResponseMessage({
        title: "Deleted Successfully",
        content: "Your Certificate Deleted successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
    } else {
      setResponseMessage({
        title: "Request Faild",
        content: "Your Certificate faild to be Deleted please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    }
    if (role && token) {
      dispatch(fetchProfileData(token, role));
    }
    onHide();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form className={styles.general_info_form}>
          <div className={styles.field}>
            <label htmlFor="UpdateCertificatetitle">title</label>
            <Field
              type="text"
              id="UpdateCertificatetitle"
              name="title"
              placeholder="ex: Accountant Certificate"
            />
            <ErrorMessage name="title" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="UpdateCertificateorganization">Organization</label>
            <Field
              type="text"
              id="UpdateCertificateorganization"
              name="organization"
              placeholder="ex: Microsoft"
            />
            <ErrorMessage name="organization" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="UpdateCertificateissueDate">issueDate</label>
            <Field type="date" id="UpdateCertificateissueDate" name="issueDate" />
            <ErrorMessage name="issueDate" component={InputErrorMessage} />
          </div>

          <div className={styles.field}>
            <label htmlFor="UpdateCertificatecredentialURL">credential URL</label>
            <Field
              type="text"
              id="UpdateCertificatecredentialURL"
              name="credentialURL"
              placeholder="ex: Accountant Certificate"
            />
            <ErrorMessage name="credentialURL" component={InputErrorMessage} />
          </div>
          <div className={styles.field}>
            <label htmlFor="UpdateCertificatecredentialID">credential ID</label>
            <Field
              type="text"
              id="UpdateCertificatecredentialID"
              name="credentialID"
              placeholder="ex: Accountant Certificate"
            />
            <ErrorMessage name="credentialID" component={InputErrorMessage} />
          </div>
          <div className={`${styles.field} ${styles.text_area_desc}`}>
            <Field
              as="textarea"
              placeholder="description"
              id="UpdateCertificateupdatedDescription"
              name="description"
              cols="30"
              rows="7"
            />
            <ErrorMessage name="description" component={InputErrorMessage} />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 px-2">
            <button
              type="button"
              className={styles.delete_btn}
              onClick={handleDeleteFormData}
            >
              Delete
            </button>
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Update Certificate
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserCirtificationsForm;
