import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector} from "react-redux";
import { getUserInfoFromLocalStorage, getisLoginState } from "./Store/userInfo-actions";
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
import setThemeMood from "./Store/mood-actions";
import "./App.css";
import ContactUs from "./Pages/ContactUs/ContactUs";
import NotFound from "./Pages/Error/NotFound";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "company-home", element: <CompanyHome /> },
      {path:"jobs",element:<Posts/>},
      {path:"candidates",element:<Candidates/>},
      { path: "about", element: <About /> },
      { path: "categories", element: <Categories /> },
      { path: "contact", element: <ContactUs /> },
      { path: "companies", element: <Categories /> },
      { path: "saved", element: <Saved /> },
      { path: "applications", element: <Applications /> },
      { path: "packages", element: <CompanyPricing /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "login", element: <Login /> },
      { path: "user-register", element: <Register /> },
      { path: "company-register", element: <CompanyRegister />},
      {path: "*", element: <NotFound/>},
    ],
  },
]);



function App() {
  const dispatch=useDispatch();
  const darkMode=useSelector((state)=>state.mode.darkMode);

  // recieve user data from localStorage
  useEffect(()=>{
    if (JSON.parse(localStorage.getItem("userData"))){
      dispatch(getUserInfoFromLocalStorage());
    } 
    dispatch(getisLoginState())
  },[dispatch]);

 // set current theme mood
  useEffect(() => {
    dispatch(setThemeMood(darkMode));
  }, [dispatch,darkMode]);

    const queryClient= new QueryClient();
    return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
  }

export default App;
