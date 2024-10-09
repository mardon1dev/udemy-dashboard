import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, SIgnUp } from "../pages";

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SIgnUp />} />
    </Routes>
  );
};

export default Auth;
