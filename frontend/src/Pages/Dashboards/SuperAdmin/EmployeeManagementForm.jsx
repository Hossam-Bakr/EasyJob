import React, { useEffect, useState } from "react";
import styles from "./EmployeeManagment.module.css";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import InputErrorMessage from "./../../../Components/Ui/InputErrorMessage";
import { usersManageMent } from "../../../util/Http";
import SectionMainTitle from "./../../../Components/Ui/SectionMainTitle";
import { object, string } from "yup";
import { Col, Container, Row } from "react-bootstrap";
import users from "../../../images/users.jpg";
import OperationOnUsersForm from "./OperationOnUsersForm";
import OperationOnUsersImg from "../../../images/opOnUsers.jpg";
import changeEmailImg from "../../../images/changeEmail.jpg";
import ChangeUserEmailAddress from "./ChangeUserEmailAddress";
import SearchEmployees from "./SearchEmployees";
import startSearching from "../../../images/startSearching.jpg";
import NoDataBox from "../../../Components/Ui/NoDataBox";
import Loading from "../../../Components/Ui/Loading";
import Table from "react-bootstrap/Table";
import SendMessageToEmployee from "./SendMessageToEmployee";

const EmployeeManagementForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [isEmailError, setIsEmailError] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: usersManageMent,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        if (data === "email is already exist") {
          setIsEmailError(true);
          return;
        }
        if (data.status === "success") {
          setIsEmailError(false);
          console.log(data);
          setResponseMessage({
            title: "Added Successfully",
            content: "New user has been Added Successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
        } else {
          console.log("myelse", data);
          setResponseMessage({
            title: "Request Faild",
            content: "New user faild to be added please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "New user  faild to be added please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log("my error", error);
      if (error.response.data.errors.message === "email must be unique") {
        setIsEmailError(true);
      } else {
        setIsEmailError(false);
      }
      setResponseMessage({
        title: "Request Faild",
        content: "New user  faild to be added please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  };

  const validationSchema = object({
    firstName: string()
      .min(3, "first name should be at min 3 char")
      .max(20, "first name should be at max 20 char")
      .required("first name is required"),
    lastName: string()
      .min(3, "last name should be at min 3 char")
      .max(20, "last name should be at max 20 char")
      .required("first name is required"),
    email: string().email("email not valid").required("email is required"),
    password: string()
      .min(5, "Min 5 characters")
      .required("Password is required")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[0-9]+/, "Must contain at least one number"),
  });

  const onSubmit = (values) => {
    if (isEmailError) {
      return;
    }
    mutate({
      type: "addUser",
      method: "post",
      formData: values,
      //   token: companyToken,
    });
  };

  const getSearchData = (data) => {
    if (data) {
      setIsSearchStarted(true);
      setSearchData(data);
      setIsSearching(false);
    } else {
      setIsSearchStarted(false);
    }
    console.log("from emol", data);
  };

  return (
    <Container className={styles.emp_management}>
      <div className={styles.search_field}>
        <div className="ms-auto mb-5">
          <SearchEmployees
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            getSearchData={getSearchData}
            setIsSearching={setIsSearching}
          />
        </div>
        <div className="position-relative">
          {isSearching && <Loading />}
          {isSearchStarted ? (
            searchData.length > 0 ? (
              <>
                <Table striped hover className={styles.search_table}>
                  <thead>
                    <tr>
                      <th>userId</th>
                      <th>Name</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchData.map((user) => (
                      <tr key={user.id} className={styles.search_tr}>
                        <td>{user.id}</td>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <NoDataBox
                text="no users found with that name if there is any problems call support"
                path="/contact"
              />
            )
          ) : (
            <div className={styles.searching_img}>
              <img
                className="w-100"
                src={startSearching}
                alt="startSearching"
              />
            </div>
          )}
        </div>
      </div>

      <SectionMainTitle title="ADD New User" />
      <Row>
        <Col
          md={7}
          className="d-flex justify-content-center align-items-center"
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className={styles.emp_form}>
              <div
                className={`${styles.name_faild} d-flex justify-content-between align-items-center mb-5`}
              >
                <div
                  className={`${styles.fname} d-flex flex-column me-2 position-relative`}
                >
                  <Field
                    type="text"
                    id="super_firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"

                  />
                  <ErrorMessage
                    name="firstName"
                    component={InputErrorMessage}
                  />
                </div>
                <div
                  className={`${styles.lname} d-flex flex-column ms-2 position-relative `}
                >
                  <Field
                    type="text"
                    id="super_lastName"
                    name="lastName"
                    placeholder="last Name"
                    className="form-control"

                  />
                  <ErrorMessage name="lastName" component={InputErrorMessage} />
                </div>
              </div>
              <div className="d-flex flex-column mb-5 position-relative">
                <Field
                  type="email"
                  id="super_email_Input"
                  name="email"
                  placeholder="Email"
                  className="form-control"

                />
                <ErrorMessage name="email" component={InputErrorMessage} />
                {isEmailError && (
                  <InputErrorMessage text="email already exist!" />
                )}
              </div>
              <div className="d-flex flex-column mb-5 position-relative">
                <Field
                  type="password"
                  id="super_Password_Input"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="Password"
                  />
                <ErrorMessage name="password" component={InputErrorMessage} />
              </div>
              <div className="d-flex flex-column mb-5 position-relative">
                <Field
                  type="text"
                  disabled
                  id="super_role"
                  name="role"
                  placeholder="role"
                  value="user"
                  className="form-control"

                />
                <ErrorMessage name="role" component={InputErrorMessage} />
              </div>
              {isPending ? (
                <button type="button" className={styles.emp_btn}>
                  <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                </button>
              ) : (
                <button type="submit" className={styles.emp_btn}>
                  Add User
                </button>
              )}
            </Form>
          </Formik>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          <div className={styles.img_side}>
            <img className="w-100" src={users} alt="users" />
          </div>
        </Col>
      </Row>
      <hr />
      <SectionMainTitle title="Operations On Users" />
      <Row>
        <Col
          md={7}
          className="d-flex justify-content-center align-items-center"
        >
          <OperationOnUsersForm
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
          />
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          <div className={styles.img_side}>
            <img className="w-100" src={OperationOnUsersImg} alt="opOnUsers" />
          </div>
        </Col>
      </Row>
      <hr />
      <div>
        <SectionMainTitle title="Change users's email Address" />

        <Row>
          <Col
            md={7}
            className="d-flex justify-content-center align-items-center"
          >
            <ChangeUserEmailAddress
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}
            />
          </Col>
          <Col
            md={5}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={styles.img_side}>
              <img
                className="w-100"
                src={changeEmailImg}
                alt="changeEmailImg"
              />
            </div>
          </Col>
        </Row>
      </div>

      <hr />
      <div className="mt-4">
        <SectionMainTitle title="Message User" />
        <SendMessageToEmployee
          setShowResponse={setShowResponse}
          setResponseMessage={setResponseMessage}
          setSuccessResponse={setSuccessResponse}
        />
      </div>
    </Container>
  );
};

export default EmployeeManagementForm;
