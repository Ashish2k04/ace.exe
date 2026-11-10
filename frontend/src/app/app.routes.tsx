import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello Welcome to ACE.EXE!</h1>
    },
    {
        path: "/login",
        element: <Login />
    }
])