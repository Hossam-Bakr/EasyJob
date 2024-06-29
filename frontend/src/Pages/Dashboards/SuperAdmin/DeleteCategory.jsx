import React, { useEffect, useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { getCategories } from "../../../util/Http";
import { object, number } from "yup";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "../../../Components/logic/SelectField";
import getAllCategories, {
  getAllIndustries,
} from "../../../Store/category-actions";

const DeleteCategory = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const currentCategories = useSelector((state) => state.category.categories);
  const [myCategory, setMyCategory] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.token);

  const { mutate, isPending } = useMutation({
    mutationFn: getCategories,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 204) {
        setResponseMessage({
          title: "Deleted Successfully",
          content: "Category has been Deleted Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        dispatch(getAllIndustries());
        dispatch(getAllCategories());
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Category faild to be Deleted please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "Category  faild to be Deleted please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const dleleteInitialValues = {
    categoryId: "",
  };

  const dleleteValidationSchema = object({
    categoryId: number().required("categoryId is required"),
  });

  const onDlelete = (values) => {
    mutate({ type: `/${values.categoryId}`, method: "delete", token: token });
  };

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
      onSubmit={onDlelete}
      validationSchema={dleleteValidationSchema}
      initialValues={dleleteInitialValues}
    >
      <Form>
        <div className={`${styles.select_industry} mb-5 position-relative`}>
          <label htmlFor="deleteCatgory">Current Category</label>
          <Field
            id="deleteCatgory"
            name="categoryId"
            isMulti={false}
            component={MultiSelect}
            options={myCategory}
          />
          <ErrorMessage name="categoryId" component={InputErrorMessage} />
        </div>
        <div className="text-end px-2">
          {isPending ? (
            <button className={styles.submit_btn} type="submit">
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button className={`${styles.submit_btn} bg-danger`} type="submit">
              Delete Category
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default DeleteCategory;
