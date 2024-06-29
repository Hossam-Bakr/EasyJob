import React, { useEffect, useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import {getIndustries } from "../../../util/Http";
import { object, number, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "../../../Components/logic/SelectField";
import getAllCategories, { getAllIndustries } from "../../../Store/category-actions";

const UpdateIndustry = ({
    setShowResponse,
    setResponseMessage,
    setSuccessResponse,
  }) => {

    const [myIndustry, setMyIndustry] = useState(null);
    const currentIndustries = useSelector((state) => state.category.industries);
    const token = useSelector((state) => state.userInfo.token);
    const dispatch=useDispatch();
  
    const { mutate, isPending } = useMutation({
      mutationFn: getIndustries,
      onSuccess: (data) => {
        console.log(data);
        if (data.data.status === "success") {
          setResponseMessage({
            title: "Updated Successfully",
            content: "Industry has been Updated Successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          dispatch(getAllIndustries());
          dispatch(getAllCategories());
        } else {
          setResponseMessage({
            title: "Request Faild",
            content: "Industry faild to be Updated please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      },
      onError: (error) => {
        console.log("my error", error);
        setResponseMessage({
          title: "Request Faild",
          content: "Industry  faild to be Updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      },
    });
  
  
    const updateInitialValues = {
      name: "",
      IndustryId: "",
    };
    const updateValidationSchema = object({
        name: string()
        .required("name of Industry is required")
        .min(3, "Industry should be at least 3 characters")
        .matches(/^[A-Za-z\s]+$/, "Industry name should not include numbers"),
        IndustryId: number().required("IndustryId is required"),
    });
  
    const onUpdate = (values) => {
      console.log(values)
      let data = { name: values.name};
      mutate({
        type: `/${values.IndustryId}`,
        formData: data,
        method: "put",
        token: token,
      });
    };
  
    useEffect(() => {
      if (currentIndustries) {
        let industryOptions = currentIndustries.map((indust) => ({
          value: indust.id,
          label: indust.name,
        }));
        setMyIndustry(industryOptions);
      }
    }, [currentIndustries]);
  

  return (
    <Formik
    onSubmit={onUpdate}
    validationSchema={updateValidationSchema}
    initialValues={updateInitialValues}
  >
    <Form>
      <div className={`${styles.select_industry} mb-5 position-relative`}>
        <label htmlFor="updateIndustryID">Current Industry</label>
        <Field
          id="updateIndustryID"
          name="IndustryId"
          isMulti={false}
          component={MultiSelect}
          options={myIndustry}
        />
        <ErrorMessage name="IndustryId" component={InputErrorMessage} />
      </div>

      <div className={`${styles.input_faild} position-relative`}>
        <label htmlFor="newIndustry">New Industry</label>
        <Field type="text" id="newIndustry" name="name" />
        <ErrorMessage name="name" component={InputErrorMessage} />
      </div>

      <div className="text-end px-2">
        {isPending ? (
          <button className={styles.submit_btn} type="submit">
            <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
          </button>
        ) : (
          <button
            className={`${styles.submit_btn} mb-5`}
            type="submit"
          >
            Update Industry
          </button>
        )}
      </div>
    </Form>
  </Formik>
  )
}

export default UpdateIndustry
