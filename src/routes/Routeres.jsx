import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Billing,
  Dashboard,
  Exams,
  NotFound,
  Setting,
  Students,
  Teachers,
  AddEdit,
  SinglePagePerson,
} from "../pages";
import PageHeader from "../components/PageHeader/PageHeader";

const Routeres = () => {
  return (
    <div className="w-[100%] h-full p-[30px] bg-[#ffffff]">
      <PageHeader />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddEdit />} />
        <Route path="/students/:id" element={<SinglePagePerson />} />
        <Route path="/students/:id/update" element={<AddEdit />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/add" element={<AddEdit />} />
        <Route path="/teachers/:id" element={<SinglePagePerson />} />
        <Route path="/teachers/:id/update" element={<AddEdit />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routeres;
