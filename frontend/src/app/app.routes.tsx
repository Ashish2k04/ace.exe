import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/pages/Login";
import LandingPage from "../features/landing/pages/LandingPage";
import ProjectDetailsPage from "../features/projects/pages/ProjectDetailsPage";

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/projects/:slug",
        element: <ProjectDetailsPage />
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