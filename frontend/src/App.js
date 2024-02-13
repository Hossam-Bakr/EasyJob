import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch} from "react-redux";
import { getRoleState, getToken, getUserInfoFromLocalStorage, getisLoginState } from "./Store/userInfo-actions";
import Home from "./Pages/Home/Home";
import Root from "./Pages/Root";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Categories from './Pages/Categories/Categories';
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
import Companies from './Pages/Companies/Companies';
import "./App.css";
import CompanyProfile from "./Pages/Profiles/CompanyProfile";
import CompanyInfo from "./Pages/CompanyInfo/CompanyInfo";
import CompanyAdmins from "./Pages/CompanyAdmins/CompanyAdmins";
import CompanyDashboard from "./Pages/Dashboards/CompanyDashboard";
import UserDashboard from "./Pages/Dashboards/UserDashboard";
import MyTest from "./Components/Test/MyTest";
import MainError from "./Pages/Error/MainError";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<MainError/>,
    children: [
      { index: true, element: <Home /> },
      { path: "company-home", element: <CompanyHome /> },
      {path:"jobs",element:<Posts/>},
      {path:"candidates",element:<Candidates/>},
      { path: "about", element: <About /> },
      { path: "categories", element: <Categories /> },
      { path: "contact", element: <ContactUs /> },
      { path: "companies", element: <Companies /> },
      { path: "saved", element: <Saved /> },
      { path: "applications", element: <Applications /> },
      { path: "packages", element: <CompanyPricing /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "user-dashboard", element: <UserDashboard /> },
      { path: "company-profile", element: <CompanyProfile /> },
      { path: "company-info", element: <CompanyInfo /> },
      { path: "company-admins", element: <CompanyAdmins /> },
      { path: "company-dashboard", element: <CompanyDashboard /> },
      { path: "login", element: <Login /> },
      { path: "user-register", element: <Register /> },
      { path: "company-register", element: <CompanyRegister />},
      { path: "test", element: <MyTest />},
      {path: "*", element: <NotFound/>},
    ],
  },
]);



function App() {
  const dispatch=useDispatch();

  // recieve user data from localStorage with login and role states
  useEffect(()=>{
    if (JSON.parse(localStorage.getItem("userData"))){
      dispatch(getUserInfoFromLocalStorage());
    } 
    if(JSON.parse(localStorage.getItem("token"))){
      dispatch(getRoleState())
      dispatch(getToken())
    }
    dispatch(getisLoginState())
  },[dispatch]);


    const queryClient= new QueryClient();
    return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
  }

export default App;
