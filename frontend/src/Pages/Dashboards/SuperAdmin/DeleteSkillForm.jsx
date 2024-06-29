import React, { useEffect, useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { skillsManagement } from "../../../util/Http";
import { number, object } from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllSkills } from "../../../Store/category-actions";
//handle response from hossam
const DeleteSkillForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [isIdNotExist, setIsIdNotExist] = useState(false);
  const token = useSelector((state) => state.userInfo.token);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate } = useMutation({
    mutationFn: skillsManagement,
    onSuccess: (data) => {
      console.log(data);
      if (data === "No document found with that ID") {
        setIsIdNotExist(true);
        return;
      }
      if (data.status === "success") {
        console.log(data);

        setResponseMessage({
          title: "Deleted Successfully",
          content: "Skill has been Deleted Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        dispatch(getAllSkills());
        setIsIdNotExist(false);
      } else {
        console.log("myelse", data);
        setResponseMessage({
          title: "Request Faild",
          content: "Skill faild to be Deleted please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
        setIsIdNotExist(false);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "Skill faild to be Deleted please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      setIsIdNotExist(false);
    },
  });

  const initialValues = {
    skillId: "",
  };

  const validationSchema = object({
    skillId: number()
      .min(1, "User Id must be more than zero")
      .required("skill Id is required"),
  });

  const UpdateOnSubmit = (values) => {
    console.log(values);
    mutate({
      type: `${values.skillId}`,
      method: "delete",
      formData: "",
      token: token,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={UpdateOnSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.emp_form}>
        <div className={`${styles.name_faild} mb-5`}>
          <div className="my-5 position-relative">
            <Field
              type="number"
              id="super_skill_id_delete"
              name="skillId"
              placeholder="skill Id"
              className="form-control"
            />
            <ErrorMessage name="skillId" component={InputErrorMessage} />
            {isIdNotExist && <InputErrorMessage text="No skill with that ID" />}
          </div>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className={`${styles.emp_btn} ${styles.skill_btn} bg-danger`}
          >
            Delete Skill
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default DeleteSkillForm;
