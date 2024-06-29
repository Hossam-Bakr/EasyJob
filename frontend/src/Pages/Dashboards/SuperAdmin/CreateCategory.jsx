import React, { useEffect, useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { getCategories } from "../../../util/Http";
import { object, string, number } from "yup";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "../../../Components/logic/SelectField";
import getAllCategories, { getAllIndustries } from "../../../Store/category-actions";

const CreateCategory = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [myIndustry, setMyIndustry] = useState(null);
  const currentIndustries = useSelector((state) => state.category.industries);
  const token = useSelector((state) => state.userInfo.token);
  const dispatch=useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: getCategories,
    onSuccess: (data) => {
      console.log(data);
      if(data.data.status==="success"){
        setResponseMessage({
          title: "Created Successfully",
          content: "New Category has been Created Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        dispatch(getAllIndustries());
        dispatch(getAllCategories());
      }else{
        setResponseMessage({
          title: "Request Faild",
          content: "New Category faild to be Created please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "New Category  faild to be Created please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const createInitialValues = {
    name: "",
    IndustryId: 1,
  };

  const createValidationSchema = object({
    name: string()
      .required("name of Category is required")
      .min(3, "Category Should be at least 3 characters"),
    IndustryId: number().required("IndustryId is required"),
  });

  const onCreate = (values) => {
    console.log(values)
    mutate({ type: "/", formData: values, method: "post", token: token });
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
    <>
      <Formik
        onSubmit={onCreate}
        validationSchema={createValidationSchema}
        initialValues={createInitialValues}
      >
        <Form>
          <div className={`${styles.input_faild} mb-5 position-relative`}>
            <label htmlFor="createCategory">Category Name</label>
            <Field
              type="text"
              id="createCategory"
              name="name"
            />
            <ErrorMessage name="name" component={InputErrorMessage} />
          </div>
          <div className={`${styles.select_industry} mb-4 position-relative`}>
          <label htmlFor="industryId">Industry Name</label>
            <Field
              id="industryId"
              name="industryId"
              isMulti={false}
              component={MultiSelect}
              options={myIndustry}
            />
            <ErrorMessage name="industryId" component={InputErrorMessage} />
          </div>
          <div className="text-end px-2 mb-5">
            {isPending ? (
              <button className={styles.submit_btn} type="submit">
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={styles.submit_btn} type="submit">
                Create Category
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CreateCategory;
