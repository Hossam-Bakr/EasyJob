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

const DeleteIndustry = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [myIndustry, setMyIndustry] = useState(null);
  const currentIndustries = useSelector((state) => state.category.industries);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.token);

  const { mutate, isPending } = useMutation({
    mutationFn: getCategories,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 204) {
        setResponseMessage({
          title: "Deleted Successfully",
          content: "Industry has been Deleted Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        dispatch(getAllIndustries());
        dispatch(getAllCategories());
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Industry faild to be Deleted please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "Industry  faild to be Deleted please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const dleleteInitialValues = {
    industryId: "",
  };

  const dleleteValidationSchema = object({
    industryId: number().required("industryId is required"),
  });

  const onDlelete = (values) => {
    mutate({ type:`/${values.industryId}`, method: "delete", token: token });
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
      onSubmit={onDlelete}
      validationSchema={dleleteValidationSchema}
      initialValues={dleleteInitialValues}
    >
      <Form>
        <div className={`${styles.select_industry} mb-3 position-relative`}>
          <label htmlFor="deleteIndustryID">Current Industry</label>
          <Field
            id="deleteIndustryID"
            name="IndustryId"
            isMulti={false}
            component={MultiSelect}
            options={myIndustry}
          />
          <ErrorMessage name="IndustryId" component={InputErrorMessage} />
        </div>

        <div className="text-end px-2">
          {isPending ? (
            <button className={styles.submit_btn} type="submit">
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button className={`${styles.submit_btn} bg-danger`} type="submit">
              Delete Industry
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default DeleteIndustry;
