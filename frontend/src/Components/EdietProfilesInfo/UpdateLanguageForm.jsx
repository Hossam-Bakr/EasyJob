import React,{useState,useEffect} from "react";
import styles from "./EdietInfoForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { languageHandler } from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchProfileData from "./../../Store/profileInfo-actions";

const UpdateLanguageForm = ({
  id,
  language,
  proficiency,
  onHide,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {

    const [currentLanguage, setCurrentLanguage] = useState("");
    const [currentlangProf, setCurrentlangProf] = useState("");
  
    const dispatch = useDispatch();
  
    const token = useSelector((state) => state.userInfo.token);
    const role = useSelector((state) => state.userInfo.role);
  
    useEffect(() => {
      if (language && proficiency) {
        setCurrentLanguage(language || "");
        setCurrentlangProf(proficiency||"");
      }
    }, [language, proficiency]);
  
    const { mutate, isPending } = useMutation({
      mutationFn: languageHandler,
      onSuccess: (data) => {
        if (data.data.status === "success") {
          console.log(data);
          if (role && token) {
            dispatch(fetchProfileData(token, role));
          }
          setResponseMessage({
            title: "Updated Successfully",
            content: "your language updated successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          onHide();
        } else {
          setResponseMessage({
            title: "Request Faild",
            content: "your language faild to be updated please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      },
      onError: (error) => {
        console.log(error);
        setResponseMessage({
          title: "Request Faild",
          content: "your language faild to be updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      },
    });
  
    const initialValues = {
        language: currentLanguage,
        proficiency: currentlangProf,
    };
  
    const onSubmit = (values) => {
      const updatedValues = {
        newName: values.newName !== "" ? values.newName : currentLanguage,
        newProficiency:values.proficiency !== "" ? values.proficiency : currentlangProf,
      };
      mutate({
        formData: updatedValues,
        token: token,
        method: "patch",
        id:id
      });
    };
  
    const validationSchema = object({
      language: string().required("language Name is required"),
      proficiency: string().required("proficiency is required"),
    });

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
            <label htmlFor="lang">Language</label>
            <Field
              type="text"
              id="lang"
              name="language"
              placeholder="ex: English"
            />
            <ErrorMessage name="language" component={InputErrorMessage} />
          </div>
          <div className={styles.field}>
            <h4 className="my-4">Choose language Level</h4>
            <Field
              type="text"
              id="proficiency"
              name="proficiency"
              placeholder="ex: beginner"
            />
            <ErrorMessage name="proficiency" component={InputErrorMessage} />
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3 px-2">
            {isPending ? (
              <button type="submit" className={styles.save_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.save_btn} type="submit">
                Update Now
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateLanguageForm;
