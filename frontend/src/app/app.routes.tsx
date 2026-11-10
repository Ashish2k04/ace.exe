import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import {Navigate} from 'react-router'

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello Welcome to ACE.EXE!</h1>
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