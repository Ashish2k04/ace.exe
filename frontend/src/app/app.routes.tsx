import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import SpaceLoader from "../components/ui/SpaceLoader";

const Login = lazy(() => import("../features/auth/pages/Login"));
const LandingPage = lazy(() => import("../features/landing/pages/LandingPage"));
const ProjectDetailsPage = lazy(
  () => import("../features/projects/pages/ProjectDetailsPage")
);
const PageLoader = () => <SpaceLoader />;;

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>
    {element}
  </Suspense>
);

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<LandingPage />),
  },
  {
    path: "/projects/:slug",
    element: withSuspense(<ProjectDetailsPage />),
  },
  {
    path: "/admin/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/login" replace />,
  },
]);
