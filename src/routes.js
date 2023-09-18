import React, { useEffect } from "react";
import { Navigate, useRoutes, useNavigate } from "react-router-dom";

// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ParenstRegister from "./pages/ParenstRegister";
import Page404 from "./pages/Page404";
import { useStateValue } from "./store/StateProvider";

// ----------------------------------------------------------------------

export default function Router() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  useEffect(() => {
    const getAllCategory = () => {
      if (!user) {
        navigate("/login", { replace: true });
      }
    };

    getAllCategory();
  }, []);

  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/all" />, index: true },
        {
          path: "dazzlers",
          element: <UserPage headtext={"Dazzlers"} />,
        },
        {
          path: "dreamers",
          element: <UserPage headtext={"Dreamers"} />,
        },
        {
          path: "dynamites",
          element: <UserPage headtext={"Dynamites"} />,
        },
        {
          path: "discoverers",
          element: <UserPage headtext={"Discoverers"} />,
        },
        { path: "doers", element: <UserPage headtext={"Doers"} /> },
        { path: "all", element: <UserPage headtext={"All"} /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <ParenstRegister />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/dazzlers" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
