import "./App.css";
import React from "react";
import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";
// import store from "./store";

import LayoutComponent from "./components/Layout";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import NotAuthen from "./components/NotAuthen";
import AdminLayout from "./admin/components/AdminLayout";
import TableUsers from "./admin/components/Users";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import Dashboard from "./admin/components/Dashboard";
import UploadFile from "./admin/components/UploadFile";
import Profile from "./components/Profile";

function App() {
  const curUser = useSelector((state) => state.auth.login.currentUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          {!curUser || !curUser.admin ? (
            <Route path="*" element={<NotAuthen />} />
          ) : (
            <Route path="admin" element={<AdminLayout />}>
              <Route path="users" element={<TableUsers />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="upload" element={<UploadFile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
