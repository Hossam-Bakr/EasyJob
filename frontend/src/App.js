import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoleState,
  getToken,
  getUserInfoFromLocalStorage,
  getisLoginState,
} from "./Store/userInfo-actions";
import Home from "./Pages/Home/Home";
import Root from "./Pages/Root";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Categories from "./Pages/Categories/Categories";
import About from "./Pages/About/About";
import CompanyRegister from "./Pages/CompanyRegister/CompanyRegister";
import CompanyPricing from "./Pages/Pricing/CompanyPricing";
import Candidates from "./Pages/Candidates/Candidates";
import UserProfile from "./Pages/Profiles/UserProfile";
import Posts from "./Pages/Posts/Posts";
import CompanyHome from "./Pages/Home/CompanyHome";
import Saved from "./Pages/Saved/Saved";
import Applications from "./Pages/Applications/Applications";
import ContactUs from "./Pages/ContactUs/ContactUs";
import NotFound from "./Pages/Error/NotFound";
import Companies from "./Pages/Companies/Companies";
import "./App.css";
import CompanyProfile from "./Pages/Profiles/CompanyProfile";
import CompanyInfo from "./Pages/CompanyInfo/CompanyInfo";
import CompanyDashboard from "./Pages/Dashboards/CompanyDashboard";
import MyTest from "./Components/Test/MyTest";
import MainError from "./Pages/Error/MainError";
import fetchProfileData from "./Store/profileInfo-actions";
import SuperAdminDashboard from "./Pages/Dashboards/SuperAdmin/SuperAdminDashboard";
import CompanyAccountSetting from "./Pages/AccountSetting/CompanyAccountSetting";
import UserAccountSetting from "./Pages/AccountSetting/UserAccountSetting";
import UserInfo from "./Pages/UserInfo/UserInfo";
import getAllCategories, { getAllIndustries, getAllSkills } from "./Store/category-actions";
import { getSavedJobsHandler } from "./Store/savedJobs-actions";
import JobDetails from "./Pages/JobDetails/JobDetails";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import PostAJob from "./Pages/PostAJob/PostAJob";
import JobStagesBoard from "./Pages/JobStages/JobStagesBoard";
import VisitCompanyProfile from "./Pages/Profiles/VisitCompanyProfile";
import VisiteEmployeeProfile from "./Pages/Profiles/VisiteEmployeeProfile";
import JobApplicationFormModal from "./Components/Ui/JobApplicationFormModal";
import PreviewMyJob from "./Pages/JobDetails/PreviewMyJob";
import AddJobQuestions from "./Pages/PostAJob/AddJobQuestions";
import PaymentSuccessful from "./Components/Ui/PaymentSuccessful";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <MainError />,
    children: [
      { index: true, element: <Home /> },
      { path: "company-home", element: <CompanyHome /> },
      { path: "job-post", element: <PostAJob /> },
      { path: "jobs", element: <Posts /> },
      { path: "job-details/:jobId", element: <JobDetails /> },
      { path: "job-questions/:jobId", element: <AddJobQuestions /> },
      { path: "candidates", element: <Candidates /> },
      { path: "about", element: <About /> },
      { path: "categories", element: <Categories /> },
      { path: "contact", element: <ContactUs /> },
      { path: "companies", element: <Companies /> },
      { path: "saved", element: <Saved /> },
      { path: "applications", element: <Applications /> },
      { path: "packages", element: <CompanyPricing /> },
      { path: "job-application-form/:jobId", element: <JobApplicationFormModal /> },
      { path: "user-profile/:userId", element: <UserProfile /> },
      { path: "userProfile/:userId", element: <VisiteEmployeeProfile /> },
      { path: "user-info", element: <UserInfo /> },
      { path: "user-account-setting", element: <UserAccountSetting /> },
      { path: "company-profile/:companyId", element: <CompanyProfile /> },
      { path: "companyProfile/:companyId", element: < VisitCompanyProfile/> },
      { path: "company-info", element: <CompanyInfo /> },
      { path: "company-dashboard/:companyId", element: <CompanyDashboard /> },
      { path: "stages/:jobId", element: <JobStagesBoard /> },
      { path: "preview-job/:jobId", element: <PreviewMyJob /> },
      { path: "company-account-setting", element: <CompanyAccountSetting /> },
      { path: "login", element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "user-register", element: <Register /> },
      { path: "company-register", element: <CompanyRegister /> },
      { path: "test", element: <MyTest /> },
      { path: "super", element: <SuperAdminDashboard /> },
      { path: "PaymentSuccessful", element: <PaymentSuccessful /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);
  
  
  // get profile data from database
  useEffect(() => {
    if (role && token) {
      if(role!=="admin"){
        dispatch(fetchProfileData(token, role));
      }
    }
  }, [dispatch, token, role]);

  // get all categories from database
  useEffect(() => {
      dispatch(getAllCategories());
  }, [dispatch]);

  // get all industries from database
  useEffect(() => {
      dispatch(getAllIndustries());
  }, [dispatch]);

  // get all skills from database
  useEffect(() => {
      dispatch(getAllSkills());
  }, [dispatch]);

  // get saved jobs data from database
  useEffect(() => {
    if(token&&role==="user"){
      dispatch(getSavedJobsHandler(token));
    }
  
  }, [dispatch,token,role]);


  // recieve user data from localStorage with login and role states
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      dispatch(getUserInfoFromLocalStorage());
    }
    if (JSON.parse(localStorage.getItem("token"))) {
      dispatch(getRoleState());
      dispatch(getToken());
    }
    dispatch(getisLoginState());
  }, [dispatch]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
