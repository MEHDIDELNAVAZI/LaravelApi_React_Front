import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Views/login";
import Register from "./Views/Register";
import Users from "./Views/users";
import GuestLout from "./Components/guestlayout";
import Defualtlayout from "./Components/Defultlayout";
import Dashboard from "./Views/dashboard";
import Edit from "./Views/edit";
import Notfound from "./Views/notfound";
import Add from "./Views/add";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<Defualtlayout />}>
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:userId" element={<Edit />} />
        <Route path="/adduser" element={<Add />} />
        <Route index element={<Users />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Router;
