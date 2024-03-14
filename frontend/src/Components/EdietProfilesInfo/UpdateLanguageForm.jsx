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
import MultiSelect from "../logic/SelectField";
import { languageLevel } from "../logic/Logic";

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
          onHide();

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
        onHide();

      },
    });
  
    const initialValues = {
        language: currentLanguage,
        proficiency: currentlangProf,
    };
  
    const onSubmit = (values) => {
      const updatedValues = {
        language: values.language !== "" ? values.language : currentLanguage,
        proficiency:values.proficiency !== "" ? values.proficiency : currentlangProf,
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


    const handleDeleteFormData = async() => {
      const res = await languageHandler({
        token: token,
        id:id,
        method: "delete",
      });
  
      if (res.status === 204||res.data.status === "success") {
        console.log(res)
        setResponseMessage({
          title: "Deleted Successfully",
          content: "your language Deleted successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        
      } else {
        console.log(res)
        setResponseMessage({
          title: "Request Faild",
          content: "your language faild to be Deleted please try again",
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
            <Field
              type="text"
              id="proficiency"
              name="proficiency"
              component={MultiSelect}
              options={languageLevel}
            />
            <ErrorMessage name="proficiency" component={InputErrorMessage} />
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
