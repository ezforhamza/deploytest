// src/routes/index.jsx

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SignupPage from "../pages/SignupPage";
import ComingSoon from "../components/ui/ComingSoon";
import Dashboard from "../components/dashboard/Dashboard";
import ExamplesPage from "../pages/ExamplesPage";

// Dashboard wrapper components for different user roles
const AlumniDashboard = () => <Dashboard userRole="alumni" />;

const CompanyDashboard = () => <Dashboard userRole="company" />;

const SchoolDashboard = () => <Dashboard userRole="school" />;

const GeneralDashboard = () => <Dashboard userRole="alumni" />;

// Generic Coming Soon for any unimplemented routes
const NotImplemented = () => (
  <ComingSoon
    title="Page Not Found"
    message="This page hasn't been implemented yet. We're working hard to bring you new features!"
    backPath="/login"
  />
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  // Dashboard routes
  {
    path: "/dashboard",
    element: <GeneralDashboard />,
  },
  {
    path: "/dashboard/alumni",
    element: <AlumniDashboard />,
  },
  {
    path: "/dashboard/company",
    element: <CompanyDashboard />,
  },
  {
    path: "/dashboard/school",
    element: <SchoolDashboard />,
  },
  // Examples page
  {
    path: "/examples",
    element: <ExamplesPage />,
  },
  // Catch-all route for any unimplemented pages
  {
    path: "*",
    element: <NotImplemented />,
  },
]);
