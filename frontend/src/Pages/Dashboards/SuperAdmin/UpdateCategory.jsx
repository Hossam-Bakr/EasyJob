import React, { useEffect, useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { getCategories } from "../../../util/Http";
import { object, number, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "../../../Components/logic/SelectField";
import getAllCategories, { getAllIndustries } from "../../../Store/category-actions";

const UpdateCategory = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [myIndustry, setMyIndustry] = useState(null);
  const [myCategory, setMyCategory] = useState(null);
  const currentIndustries = useSelector((state) => state.category.industries);
  const currentCategories = useSelector((state) => state.category.categories);
  const token = useSelector((state) => state.userInfo.token);
  const dispatch=useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: getCategories,
    onSuccess: (data) => {
      console.log(data);
      if (data.data.status === "success") {
        setResponseMessage({
          title: "Updated Successfully",
          content: "Category has been Updated Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        dispatch(getAllIndustries());
        dispatch(getAllCategories());
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Category faild to be Updated please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "Category  faild to be Updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });


  const updateInitialValues = {
    categoryId: "",
    name: "",
    IndustryId: "",
  };
  const updateValidationSchema = object({
    name: string().required("name of Category is required").min(3, "Category Should be at least 3 characters"),
    IndustryId: number().required("IndustryId is required"),
    categoryId: number().required("categoryId is required"),
  });

  const onUpdate = (values) => {
    console.log(values)
    let data = { name: values.name, IndustryId: values.IndustryId };
    mutate({
      type: `/${values.categoryId}`,
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

  useEffect(() => {
    if (currentCategories) {
      let categoryOptions = currentCategories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setMyCategory(categoryOptions);
    }
  }, [currentCategories]);

  return (
    <Formik
      onSubmit={onUpdate}
      validationSchema={updateValidationSchema}
      initialValues={updateInitialValues}
    >
      <Form>
        <div className={`${styles.select_industry} mb-5 position-relative`}>
          <label htmlFor="currentCategory">Current Category</label>
          <Field
            id="currentCategory"
            name="categoryId"
            isMulti={false}
            component={MultiSelect}
            options={myCategory}
          />
          <ErrorMessage name="categoryId" component={InputErrorMessage} />
        </div>
        <div className={`${styles.select_industry} mb-5 position-relative`}>
          <label htmlFor="updateIndustryId">Related Industry</label>
          <Field
            id="updateIndustryId"
            name="IndustryId"
            isMulti={false}
            component={MultiSelect}
            options={myIndustry}
          />
          <ErrorMessage name="IndustryId" component={InputErrorMessage} />
        </div>
        <div className={`${styles.input_faild} position-relative`}>
          <label htmlFor="newCategory">New Category</label>
          <Field type="text" id="newCategory" name="name" />
          <ErrorMessage name="name" component={InputErrorMessage} />
        </div>
        <div className="text-end px-2">
          {isPending ? (
            <button className={styles.submit_btn} type="submit">
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button
              className={`${styles.submit_btn}  mb-5`}
              type="submit"
            >
              Update Category
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default UpdateCategory;
