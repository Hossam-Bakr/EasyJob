import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Root from "./Pages/Root";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Explore from "./Pages/Explore/Explore";
import About from "./Pages/About/About";
import CompanyLogin from "./Pages/CompanyLogin/CompanyLogin";
import CompanyRegister from "./Pages/CompanyRegister/CompanyRegister";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "explore", element: <Explore /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "company-login", element: <CompanyLogin /> },
      { path: "company-register", element: <CompanyRegister />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
