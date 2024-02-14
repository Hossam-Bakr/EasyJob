import React from "react";
import styles from "./CategoryForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { getCategories } from "../../../util/Http";
import SectionMainTitle from "./../../../Components/Ui/SectionMainTitle";
import { object, string, number } from "yup";

const CategoryForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: getCategories,
    onSuccess: (response) => {
      console.log(response);
    },
  });

  //create operation
  const createInitialValues = {
    name: "",
  };
  const createValidationSchema = object({
    name: string()
      .required("name of Category is required")
      .min(3, "Category Should be at least 3 characters"),
  });
  const onCreate = (values) => {
    mutate({ type: "/", formData: values, method: "post" });
  };

  //delete operation
  const dleleteInitialValues = {
    delete: "",
  };
  const dleleteValidationSchema = object({
    delete: number()
      .typeError("Please enter number value only")
      .required("number of Category is required"),
  });
  const onDlelete = (values) => {
    mutate({ type: "/", formData: values, method: "delete" });
  };

  //update operation
  const updateInitialValues = {
    update: "",
  };
  const updateValidationSchema = object({
    update: number()
      .typeError("Please enter number value only")
      .required("number of Category is required"),
  });
  const onUpdate = (values) => {
    mutate({ type: "/", formData: values, method: "put" });
  };

  return (
    <>
      <SectionMainTitle title="Control All Categories" />
      <Formik
        onSubmit={onCreate}
        validationSchema={createValidationSchema}
        initialValues={createInitialValues}
      >
        <Form>
          <div className={styles.input_faild}>
            <label htmlFor="createCategory">create New Category</label>
            <Field
              type="text"
              id="createCategory"
              name="name"
              placeholder="Information Technology"
            />
            <ErrorMessage name="name" component={InputErrorMessage} />
          </div>
          <div className="text-end px-2">
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
      <Formik
        onSubmit={onDlelete}
        validationSchema={dleleteValidationSchema}
        initialValues={dleleteInitialValues}
      >
        <Form>
          <div className={styles.input_faild}>
            <label htmlFor="dleteCategory">Delete Category By Number</label>
            <Field
              type="text"
              id="dleteCategory"
              name="delete"
              placeholder="4"
            />
            <ErrorMessage name="delete" component={InputErrorMessage} />
          </div>
          <div className="text-end px-2">
            {isPending ? (
              <button className={styles.submit_btn} type="submit">
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={`${styles.submit_btn} ${styles.delete_btn}`} type="submit">
                Delete Category
              </button>
            )}
          </div>
        </Form>
      </Formik>
      <Formik
        onSubmit={onUpdate}
        validationSchema={updateValidationSchema}
        initialValues={updateInitialValues}
      >
        <Form>
          <div className={styles.input_faild}>
            <label htmlFor="updateCategory">update Current Category</label>
            <Field
              type="text"
              id="updateCategory"
              name="update"
              placeholder="7"
            />
            <ErrorMessage name="update" component={InputErrorMessage} />
          </div>
          <div className="text-end px-2">
            {isPending ? (
              <button className={styles.submit_btn} type="submit">
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button className={`${styles.submit_btn} ${styles.update_btn}`} type="submit">
                Update Category
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CategoryForm;
