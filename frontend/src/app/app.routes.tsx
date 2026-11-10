import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import {Navigate} from 'react-router'
import LandingPage from "../features/landing/pages/LandingPage";

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/admin/login",
        element: <Login />
    },
    {
        path: "/admin",
        element: <Navigate to="/admin/login" replace />
    },
])