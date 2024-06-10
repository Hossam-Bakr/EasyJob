import React, { useState, useEffect } from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack, faYinYang } from "@fortawesome/free-solid-svg-icons";
import Loading from "./../Ui/Loading";
import FloatingPopup from "./../Ui/FloatingPopup";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";

const LinkForm = ({ data }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const [currentFacebook, setCurrentFacebook] = useState("");
  const [currentTwitter, setCurrentTwitter] = useState("");
  const [currentLinkedIn, setCurrentLinkedIn] = useState("");
  const [currentYoutube, setCurrentYoutube] = useState("");
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [currentBehance, setCurrentBehance] = useState("");

  // for company
  const [currentInstagram, setCurrentInstagram] = useState("");
  const [currentVimeo, setCurrentVimeo] = useState("");

  //for user
  const [currentGithub, setCurrentGithub] = useState("");
  const [currentStackOverflow, setCurrentStackOverflow] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    if (data) {
      setCurrentFacebook(data.facebook || "");
      setCurrentTwitter(data.twitter || "");
      setCurrentLinkedIn(data.linkedIn || "");
      setCurrentYoutube(data.youtube || "");
      setCurrentWebsite(data.website || "");
      setCurrentBehance(data.behance || "");
      if (role === "company") {
        setCurrentInstagram(data.instagram || "");
        setCurrentVimeo(data.vimeo || "");
      } else {
        setCurrentGithub(data.github || "");
        setCurrentStackOverflow(data.stackOverflow || "");
      }
    }
  }, [data, role]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        if (role && token) {
          dispatch(fetchProfileData(token, role));
        }
        setResponseMessage({
          title: "Edieted Successfully",
          content: "your Links updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "your links faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "your links faild to be uploaded please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  let initialValues = {};
  role === "company"
    ? (initialValues = {
        facebook: currentFacebook,
        linkedIn: currentLinkedIn,
        twitter: currentTwitter,
        youtube: currentYoutube,
        website: currentWebsite,
        behance: currentBehance,
        instagram: currentInstagram,
        vimeo: currentVimeo,
      })
    : (initialValues = {
        facebook: currentFacebook,
        linkedIn: currentLinkedIn,
        twitter: currentTwitter,
        youtube: currentYoutube,
        website: currentWebsite,
        behance: currentBehance,
        github: currentGithub,
        stackOverflow: currentStackOverflow,
      });

  const onSubmit = (values) => {
    let updatedValues = {};
    role === "company"
      ? (updatedValues = {
          facebook: values.facebook !== "" ? values.facebook : currentFacebook,
          instagram:
            values.instagram !== "" ? values.instagram : currentInstagram,
          twitter: values.twitter !== "" ? values.twitter : currentTwitter,
          linkedIn: values.linkedIn !== "" ? values.linkedIn : currentLinkedIn,
          behance: values.behance !== "" ? values.behance : currentBehance,
          vimeo: values.vimeo !== "" ? values.vimeo : currentVimeo,
          website: values.website !== "" ? values.website : currentWebsite,
          youtube: values.youtube !== "" ? values.youtube : currentYoutube,
        })
      : (updatedValues = {
          facebook: values.facebook !== "" ? values.facebook : currentFacebook,

          twitter: values.twitter !== "" ? values.twitter : currentTwitter,
          linkedIn: values.linkedIn !== "" ? values.linkedIn : currentLinkedIn,
          behance: values.behance !== "" ? values.behance : currentBehance,
          website: values.website !== "" ? values.website : currentWebsite,
          youtube: values.youtube !== "" ? values.youtube : currentYoutube,
          github: values.github !== "" ? values.github : currentGithub,
          stackOverflow:
            values.stackOverflow !== ""
              ? values.stackOverflow
              : currentStackOverflow,
        });
    mutate({
      type: "online-presence",
      formData: updatedValues,
      token: token,
      role:role==="company"?"companies":"users"
    });
  };

  const websiteRegex =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  const facebookRegex =
    /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/;
  const instagramRegex =
    /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/;
  const twitterRegex =
    /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/;
  const linkedinRegex =
    /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in\/|company\/)?([\w\-.]+)(?:\/)?$/;
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:channel\/|user\/)?([\w\-.]+)(?:\/)?$/;
  const behanceRegex =
    /^(?:https?:\/\/)?(?:www\.)?behance\.net\/(?:gallery\/|([\w\-.]+))(?:\/)?$/;
  const vimeoRegex =
    /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/;
  const stackOverflowRegex =
    /^(https?:\/\/)?(www\.)?stackoverflow\.com\/users\/(\d+)\/([a-zA-Z0-9_-]+)$/;
  const githubRegex =/^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z0-9_-]+)$/

  const validationSchema = object({
    website: string().matches(websiteRegex, "Enter correct url!"),
    facebook: string().matches(facebookRegex, "Enter correct url!"),
    instagram: string().matches(instagramRegex, "Enter correct url!"),
    linkedIn: string().matches(linkedinRegex, "Enter correct url!"),
    twitter: string().matches(twitterRegex, "Enter correct url!"),
    youtube: string().matches(youtubeRegex, "Enter correct url!"),
    behance: string().matches(behanceRegex, "Enter correct url!"),
    vimeo: string().matches(vimeoRegex, "Enter correct url!"),
    github: string().matches(githubRegex, "Enter correct url!"),
    stackOverflow: string().matches(stackOverflowRegex, "Enter correct url!"),
  });

  const changedLinkone = role === "company" ? "instagram" : "github";
  const changedLinktwo = role === "company" ? "vimeo" : "stackOverflow";

  return (
    <>
      {data ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className={styles.general_info_form}>
            <div className={styles.field}>
              <label htmlFor="linkwebsite">Website</label>
              <Field
                type="text"
                placeholder={currentWebsite}
                id="linkwebsite"
                name="website"
              />
              {!data.website && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}
              <ErrorMessage name="website" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="linklinkedIn">linkedIn</label>
              <Field
                type="text"
                placeholder={currentLinkedIn}
                id="linklinkedIn"
                name="linkedIn"
              />
              {!data.linkedIn && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}

              <ErrorMessage name="linkedin" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="linkfacebook">facebook</label>
              <Field
                type="text"
                placeholder={currentFacebook}
                id="linkfacebook"
                name="facebook"
              />
              {!data.facebook && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}

              <ErrorMessage name="facebook" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="linktwitter">twitter</label>
              <Field
                type="text"
                placeholder={currentTwitter}
                id="linktwitter"
                name="twitter"
              />
              {!data.twitter && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}

              <ErrorMessage name="twitter" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="changedLink">{changedLinkone}</label>
              <Field
                type="text"
                placeholder={
                  role === "company" ? currentInstagram : currentGithub
                }
                id="changedLink"
                name={changedLinkone}
              />
              {(role === "company" ? !data.instagram : !data.github) && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}
              <ErrorMessage
                name={changedLinkone}
                component={InputErrorMessage}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="linkyoutube">youtube</label>
              <Field
                type="text"
                placeholder={currentYoutube}
                id="linkyoutube"
                name="youtube"
              />
              {!data.youtube && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}
              <ErrorMessage name="youtube" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="linkbehance">behance</label>
              <Field
                type="text"
                placeholder={currentBehance}
                id="linkbehance"
                name="behance"
              />
              {!data.behance && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}
              <ErrorMessage name="behance" component={InputErrorMessage} />
            </div>

            <div className={styles.field}>
              <label htmlFor="changedLinkTwo">{changedLinktwo}</label>
              <Field
                type="text"
                placeholder={
                  role === "company" ? currentVimeo : currentStackOverflow
                }
                id="changedLinkTwo"
                name={changedLinktwo}
              />
              {(role === "company" ? !data.vimeo : !data.stackOverflow) && (
                <FontAwesomeIcon
                  className={styles.thumb_icon}
                  icon={faThumbTack}
                />
              )}
              <ErrorMessage
                name={changedLinktwo}
                component={InputErrorMessage}
              />
            </div>

            <div className="d-flex justify-content-end align-items-center mt-3 px-2">
              {isPending ? (
                <button type="submit" className={styles.save_btn}>
                  <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                </button>
              ) : (
                <button className={styles.save_btn} type="submit">
                  Save Changes
                </button>
              )}
            </div>
          </Form>
        </Formik>
      ) : (
        <Loading />
      )}
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default LinkForm;
