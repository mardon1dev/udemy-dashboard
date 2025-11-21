import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "../hooks/useForm";
import authService from "../services/AuthService";

const SIgnUp = () => {
  const navigate = useNavigate();

  // Custom Hooks Pattern - Form management
  const { values, handleChange, handleSubmit, isSubmitting, errors } = useForm(
    {
      login: "",
      email: "",
      password: ""
    },
    async (formData) => {
      // Service Layer Pattern - Authentication logic
      try {
        authService.register({
          login: formData.login,
          password: formData.password
        });
        toast.success("Sign up successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        throw error; // Let useForm handle the error display
      }
    }
  );
  return (
    <div className="pt-[100px]">
      <Toaster position="top-center" reverseOrder={false} />
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
        {errors.general && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}
        <div className="flex flex-col gap-[14px] mt-[24px]">
          <div>
            <Input
              name={"email"}
              type={"email"}
              placeholder={"Enter your email"}
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              name={"login"}
              type={"text"}
              placeholder={"Enter your Login"}
              value={values.login}
              onChange={handleChange}
            />
            {errors.login && (
              <p className="text-red-500 text-sm mt-1">{errors.login}</p>
            )}
          </div>
          <div>
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Enter your Password"}
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="mt-[14px]">
          <Button
            type={"submit"}
            title={isSubmitting ? "Processing.." : "Sign up"}
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
