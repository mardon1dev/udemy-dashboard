import React, { useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const SIgnUp = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.login || !data.email || !data.password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    const user = {
      login: data.login,
      password: data.password
    }
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(user))
    toast.success("Sign up successful!");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  }
  return (
    <div className="pt-[100px]">
      <Toaster  position="top-center" reverseOrder={false}  />
      <h1 className="text-[#4F4F4F] text-4xl font-semibold text-center leading-[44px]">
        Welcome, Sign Up
      </h1>
      <form
        className="w-[512px] mx-auto mt-[53px] bg-[#fff] px-[132px] pt-[72px] pb-[40px]"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-[#667085] text-base font-medium leading-6">
          It is our great pleasure to have you on board!{""}
        </p>
        <div className="flex flex-col gap-[14px] mt-[24px]">
          <Input
            name={"email"}
            type={"email"}
            placeholder={"Enter your email"}
          />
          <Input
            name={"login"}
            type={"text"}
            placeholder={"Enter your Login"}
          />
          <Input
            name={"password"}
            type={"password"}
            placeholder={"Enter your Password"}
          />
        </div>
        <div className="mt-[14px]">
          <Button
            type={"submit"}
            title={loading ? "Processing.." : "Sign up"}
            addStyle={"w-full text-sm font-bold leading-4 hov"}
          />
          <Link className="block text-center mt-2" to={"/"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SIgnUp;
