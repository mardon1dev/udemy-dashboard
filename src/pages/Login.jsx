import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.login || !data.password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    if (user.password != data.password) {
      toast.error("Invalid password");
      setLoading(false);
      return;
    }

    if (user.login != data.login) {
      toast.error("Invalid login");
      setLoading(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful");
      localStorage.setItem("token", JSON.stringify(data));
      window.location.reload()
    }, 500);
  };
  return (
    <div className="pt-[100px]">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-[#4F4F4F] text-4xl font-semibold text-center leading-[44px]">
        Welcome, Log into you account
      </h1>
      <form
        className="w-[512px] mx-auto mt-[53px] bg-[#fff] px-[132px] pt-[72px] pb-[40px]"
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <p className="text-center text-[#667085] text-base font-medium leading-6">
          It is our great pleasure to have you on board!{" "}
        </p>
        <div className="flex flex-col gap-[14px] mt-[24px]">
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
            title={loading ? "Processing.." : "Login"}
            addStyle={"w-full text-sm font-bold leading-4 hov"}
          />
          <Link className="block text-center mt-2" to={"/signup"}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
