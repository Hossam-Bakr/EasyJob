import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import styles from "./LoginForm.module.css";
import SignWithGoogle from "../../Components/Ui/SignWithGoogle";
import signFormsHandler from "../../util/Http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser, faYinYang } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/userInfo-slice";
import saveUserInfoIntoLocalStorag, {
  saveIsLoginState,
  saveRoleState,
  saveTokenState,
} from "../../Store/userInfo-actions";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const LoginForm = () => {
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isUser, setIsUser] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mutate, isPending } = useMutation({
      mutationFn: signFormsHandler,
      onSuccess: (response) => {
        let res = response.data;
        if (res.status === "success") {
          console.log("res",res)
          if (res.data.user) {
            if (res.data.user.role === "user") {
              setIsEmailError(false);
              setIsPasswordError(false);
              dispatch(userActions.setUserInfo(res.data.user));
              dispatch(userActions.setIsLogin(true));
              dispatch(userActions.setRole("user"));
              dispatch(userActions.setToken(res.token));
              dispatch(saveUserInfoIntoLocalStorag(res.data.user));
              dispatch(saveIsLoginState(true));
              dispatch(saveRoleState("user"));
              dispatch(saveTokenState(res.token));
              navigate("/jobs");
            } else if(res.data.user.role==="admin"){
              setIsEmailError(false);
              setIsPasswordError(false);
              dispatch(userActions.setUserInfo(res.data.user));
              dispatch(userActions.setIsLogin(true));
              dispatch(userActions.setRole("admin"));
              dispatch(userActions.setToken(res.token));
              dispatch(saveUserInfoIntoLocalStorag(res.data.user));
              dispatch(saveIsLoginState(true));
              dispatch(saveRoleState("admin"));
              dispatch(saveTokenState(res.token));
              navigate("/super");
            }
          }else if (res.data.company) {
            if (res.data.company) {
              if (res.data.company.role === "company") {
                setIsEmailError(false);
                setIsPasswordError(false);
                dispatch(userActions.setUserInfo(res.data.company));
                dispatch(userActions.setIsLogin(true));
                dispatch(userActions.setRole("company"));
                dispatch(userActions.setToken(res.token));
                dispatch(saveUserInfoIntoLocalStorag(res.data.company));
                dispatch(saveIsLoginState(true));
                dispatch(saveRoleState("company"));
                dispatch(saveTokenState(res.token));
                navigate("/candidates");
              }
            }
          }
        } else {
          console.log(res);
          alert("sorry something went wrong please try again later!");
        }
      },
      onError: (error) => {
        console.log(error);
        if (error.status === 404) {
          setIsEmailError(true);
          setIsPasswordError(false);
        } else if (error.status === 401) {
          setIsEmailError(false);
          setIsPasswordError(true);
        } else {
          console.log(error);
          alert("sorry something went wrong please try again later!");
        }
      },
    });

    const initialValues = {
      email: "",
      password: "",
    };
    const onSubmit = (values) => {
      mutate({ type: "login", formData: values });
    };
    const validationSchema = object({
      email: string().email("Email not valid").required("Email is required"),
      password: string()
        .min(5, "Min 5 characters")
        .required("Password is required")
        .matches(/[A-Z]+/, "Must contain at least one uppercase character")
        .matches(/[a-z]+/, "Must contain at least one lowercase character")
        .matches(/[0-9]+/, "Must contain at least one number"),
    });

    const toggleShowPassword = () => {
      setShowPassword((showPassword) => !showPassword);
    };


    const eyeShape = showPassword ? faEye : faEyeSlash;
    const passwordType = showPassword ? "text" : "password";

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.login_form}>
          <div className={styles.user_input_faild}>
            <label htmlFor="emailInput">Email</label>
            <Field
              type="email"
              id="emailInput"
              name="email"
              placeholder="example@gmail.com"
            />
            <ErrorMessage name="email" component={InputErrorMessage} />
            {isEmailError && <InputErrorMessage text="email not found!" />}
          </div>
          <div className={styles.user_input_faild}>
            <label htmlFor="passwordInput">Password</label>
            <Field
              type={passwordType}
              id="passwordInput"
              name="password"
              placeholder="********"
            />
            <ErrorMessage name="password" component={InputErrorMessage} />
            {isPasswordError && (
              <InputErrorMessage text="Incorrect Password!" />
            )}
            <FontAwesomeIcon
              onClick={toggleShowPassword}
              className={styles.show_password_field}
              icon={eyeShape}
            />
          </div>

          {isPending ? (
            <button type="submit" className={styles.login_btn}>
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button type="submit" className={styles.login_btn}>
              Login
            </button>
          )}

          <div className={styles.form_options}>
            <span>
              <Link to={"/forget-password"}>Forgot Password?</Link>
            </span>
            <span>
              create account? <Link to={"/user-register"}>signup</Link>
            </span>
          </div>
          <div className="my-3 w-100 d-flex align-items-center">
          <span className="mini_word me-2">Jois as User or Company</span>
            <div className="d-flex justify-content-center align-items-center">
              <div className={`${styles.select_type} ${isUser?styles.active_type:''}`} title="employee" onClick={()=> setIsUser(true)}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={`${styles.select_type} ${!isUser?styles.active_type:''}`} title="employer" onClick={()=> setIsUser(false)}>
                <FontAwesomeIcon icon={faBuilding} />
              </div>
            </div>
          </div>
            <div className={`${styles.login_google} ${isUser?'':styles.hidden_google_login}`}>
              <span className="or_span">or</span>
              <a
                href="http://localhost:3000/api/v1/auth/google"
                rel="noreferrer"
                // target="_blank"
              >
                <SignWithGoogle text="Sign in with google" />
              </a>
            </div>
          
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
