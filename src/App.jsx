// src/App.jsx

import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import SideNavigation from "./components/layout/SideNavigation";
import TopNavbar from "./components/layout/TopNavbar";
import FeaturedJobs from "./components/jobs/FeaturedJobs";
import SuggestedForYou from "./components/users/SuggestedForYou";
import HomePage from "./components/post/postUsage";
import ProfilePage from "./components/profile/profileUsage";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
