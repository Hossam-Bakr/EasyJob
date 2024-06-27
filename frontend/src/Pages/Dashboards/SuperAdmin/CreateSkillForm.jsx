import React, { useEffect, useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { skillsManagement } from "../../../util/Http";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllSkills } from "../../../Store/category-actions";

const CreateSkillForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [isSkillExist, setIsSkillExist] = useState(false);

  const token = useSelector((state) => state.userInfo.token);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate } = useMutation({
    mutationFn: skillsManagement,
    onSuccess: (data) => {
      console.log(data);
      if (data === "name must be unique") {
        setIsSkillExist(true);
        return;
      }
      if (data.status === "success") {
        console.log(data);

        setResponseMessage({
          title: "Created Successfully",
          content: "Skill has been Created Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        dispatch(getAllSkills());
        setIsSkillExist(false);
      } else {
        console.log("myelse", data);
        setResponseMessage({
          title: "Request Faild",
          content: "Skill faild to be Added please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
        setIsSkillExist(false);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      setResponseMessage({
        title: "Request Faild",
        content: "Skill faild to be Added please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      setIsSkillExist(false);
    },
  });

  const createInitialValues = {
    name: "",
  };

  const validationSchema = object({
    name: string().required("skill name is required"),
  });

  const createOnSubmit = (values) => {
    console.log(values);

    mutate({
      type: "",
      method: "post",
      formData: values,
      token: token,
    });
  };

  return (
    <Formik
      initialValues={createInitialValues}
      onSubmit={createOnSubmit}
      validationSchema={validationSchema}
    >
      <Form className={styles.emp_form}>
        <div className={`${styles.name_faild} mb-5`}>
          <div className="my-5 position-relative">
            <Field
              type="text"
              id="super_skill_name"
              name="name"
              placeholder=" create skill"
              className="form-control"
            />
            <ErrorMessage name="name" component={InputErrorMessage} />
            {isSkillExist && <InputErrorMessage text="skill already exist!" />}
          </div>
        </div>

        <div className="text-end">
          <button
            type="submit"
            className={`${styles.emp_btn} ${styles.skill_btn}`}
          >
            Create Skill
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateSkillForm;
