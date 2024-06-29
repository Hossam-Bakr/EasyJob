import React from "react";
import styles from "./CategoryForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import getAllCategories, { getAllIndustries } from "../../../Store/category-actions";
import { getIndustries } from "../../../util/Http";

const CreateIndustry = ({
    setShowResponse,
    setResponseMessage,
    setSuccessResponse,
  }) => {

    const token = useSelector((state) => state.userInfo.token);
    const dispatch=useDispatch();
  
    const { mutate, isPending } = useMutation({
      mutationFn: getIndustries,
      onSuccess: (data) => {
        console.log(data);
        if(data.data.status==="success"){
          setResponseMessage({
            title: "Created Successfully",
            content: "New Industry has been Created Successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          dispatch(getAllIndustries());
          dispatch(getAllCategories());
        }else{
          setResponseMessage({
            title: "Request Faild",
            content: "New Industry faild to be Created please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      },
      onError: (error) => {
        console.log("my error", error);
        setResponseMessage({
          title: "Request Faild",
          content: "New Industry  faild to be Created please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      },
    });
  
    const createInitialValues = {
      name: "",
    };
  
    const createValidationSchema = object({
        name: string()
        .required("name of Industry is required")
        .min(3, "Industry should be at least 3 characters")
        .matches(/^[A-Za-z\s]+$/, "Industry name should not include numbers"),
    });
  
    const onCreate = (values) => {
      console.log(values)
      mutate({ type: "/", formData: values, method: "post", token: token });
    };
  

  return (
    <>
      <Formik
        onSubmit={onCreate}
        validationSchema={createValidationSchema}
        initialValues={createInitialValues}
      >
        <Form>
          <div className={`${styles.input_faild} position-relative`}>
            <label htmlFor="createIndustry">Industry Name</label>
            <Field
              type="text"
              id="createIndustry"
              name="name"
            />
            <ErrorMessage name="name" component={InputErrorMessage} />
          </div>
          <div className="text-end px-2">
            {isPending ? (
              <button className={styles.submit_btn} type="submit">
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={`${styles.submit_btn} mb-5`} type="submit">
                Create Industry
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default CreateIndustry
