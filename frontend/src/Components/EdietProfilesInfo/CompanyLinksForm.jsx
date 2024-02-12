import React from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { updateFormHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyLinksForm = ({ data }) => {
  const currentFacebook = data.facebook || "";
  const currentInstagram = data.instagram || "";
  const currentLinkedIn = data.linkedin || "";
  const currentTwitter = data.twitter || "";
  const currentYoutube = data.youtube || "";
  const currentWebsite = data.website || "";
  const currentBehance = data.behance || "";
  const currentVimeo = data.vimeo || "";

  const companyToken = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: updateFormHandler,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        console.log(data);
        navigate("/company-profile");
      } else {
        alert("something went wronge please try again");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const initialValues = {
    facebook: currentFacebook,
    instagram: currentInstagram,
    linkedin: currentLinkedIn,
    twitter: currentTwitter,
    youtube: currentYoutube,
    website: currentWebsite,
    behance: currentBehance,
    vimeo: currentVimeo,
  };

  const onSubmit = (values) => {
    mutate({
      type: "online-presence",
      formData: values,
      companyToken: companyToken,
    });
  };


  const websiteRegex=/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
  const facebookRegex=/^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/
  const instagramRegex=/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/
  const twitterRegex=/^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/
  const linkedinRegex=/^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in\/|company\/)?([\w\-.]+)(?:\/)?$/
  const youtubeRegex=/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:channel\/|user\/)?([\w\-.]+)(?:\/)?$/
  const behanceRegex=/^(?:https?:\/\/)?(?:www\.)?behance\.net\/(?:gallery\/|([\w\-.]+))(?:\/)?$/
  const vimeoRegex=/^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:\w+\/)*([\w\-.]+)(?:\/)?$/
  
  const validationSchema = object({
    website:string().matches(websiteRegex,'Enter correct url!'),
    facebook:string().matches(facebookRegex,'Enter correct url!'),
    instagram:string().matches(instagramRegex,'Enter correct url!'),
    linkedin:string().matches(linkedinRegex,'Enter correct url!'),
    twitter:string().matches(twitterRegex,'Enter correct url!'),
    youtube:string().matches(youtubeRegex,'Enter correct url!'),
    behance:string().matches(behanceRegex,'Enter correct url!'),
    vimeo:string().matches(vimeoRegex,'Enter correct url!'),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.general_info_form}>
        <div className={styles.field}>
          <label htmlFor="website">Website</label>
          <Field
            type="text"
            placeholder={currentWebsite}
            id="website"
            name="website"
            className={data.website ? "" : styles.empty_field}
          />
          <ErrorMessage name="website" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="linkedin">linkedin</label>
          <Field
            type="text"
            placeholder={currentLinkedIn}
            id="linkedin"
            name="linkedin"
            className={data.linkedin ? "" : styles.empty_field}
          />
          <ErrorMessage name="linkedin" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="facebook">facebook</label>
          <Field
            type="text"
            placeholder={currentFacebook}
            id="facebook"
            name="facebook"
            className={data.facebook ? "" : styles.empty_field}
          />
          <ErrorMessage name="facebook" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="twitter">twitter</label>
          <Field
            type="text"
            placeholder={currentTwitter}
            id="twitter"
            name="twitter"
            className={data.twitter ? "" : styles.empty_field}
          />
          <ErrorMessage name="twitter" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="instagram">instagram</label>
          <Field
            type="text"
            placeholder={currentInstagram}
            id="instagram"
            name="instagram"
            className={data.instagram ? "" : styles.empty_field}
          />
          <ErrorMessage name="instagram" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="youtube">youtube</label>
          <Field
            type="text"
            placeholder={currentYoutube}
            id="youtube"
            name="youtube"
            className={data.youtube ? "" : styles.empty_field}
          />
          <ErrorMessage name="youtube" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="behance">behance</label>
          <Field
            type="text"
            placeholder={currentBehance}
            id="behance"
            name="behance"
            className={data.behance ? "" : styles.empty_field}
          />
          <ErrorMessage name="behance" component={InputErrorMessage} />
        </div>

        <div className={styles.field}>
          <label htmlFor="vimeo">vimeo</label>
          <Field
            type="text"
            placeholder={currentVimeo}
            id="vimeo"
            name="vimeo"
            className={data.vimeo ? "" : styles.empty_field}
          />
          <ErrorMessage name="vimeo" component={InputErrorMessage} />
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
  );
};

export default CompanyLinksForm;



//https://consumer.huawei.com/eg/
//https://www.linkedin.com/company/huawei/
//https://www.facebook.com/HuaweiCorporateEgypt
//https://twitter.com/Huawei