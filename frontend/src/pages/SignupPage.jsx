import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/errorMessage.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const nav = useNavigate();
  const { signUp, error, loading } = useAuthStore();

  const handelSubmission = async (data) => {
    const { password, confirmPassword } = data;

    if (confirmPassword !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      try {
        const { name, email, password } = data;
        await signUp(email, password, name);
        nav("/verify_email", { state: { email } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center p-10 w-1/3 bg-white rounded-3xl shadow-2xl overflow-hidden ">
      <div className="flex flex-row justify-center font-bold text-3xl -mt-2 gap-2 items-center font-serif">
        <div>Sign-up</div>
        <img src="/signup.png" className="size-8" />
      </div>
      <div className=" flex flex-row gap-2 justify-between items-center font-serif font-bold">
        <span className=" bg-[#D6DDEB]  h-[1px] w-1/3"></span>
        <div className="text-[#abaeb3]">WELCOME</div>
        <span className=" bg-[#D6DDEB]  h-[1px] w-1/3"></span>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handelSubmission)}
      >
        <div className="relative w-full">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-5"
            src="/user.png"
          />

          <input
            id="name"
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Full Name is required",
              },
            })}
            placeholder="Enter your full name"
            name="name"
            onChange={() => form.clearErrors("name")}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>
        <ErrorMessage message={errors.name?.message} />
        <div className="relative w-full">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-5"
            src="/mail.png"
          />
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid Email",
              },
            })}
            placeholder="Enter email address"
            name="email"
            onChange={() => form.clearErrors("email")}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>

        <ErrorMessage message={errors.email?.message} />
        <div className="relative w-full">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-5"
            src="/lock.png"
          />
          <input
            type="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter password"
            onChange={() => {
              setPasswordMismatch(false);
              form.clearErrors("password");
            }}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>
        <ErrorMessage message={errors.password?.message} />
        <div className="relative w-full">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-5"
            src="/lock.png"
          />
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Confirm password"
            onChange={() => {
              form.clearErrors("confirmPassword");
              setPasswordMismatch(false);
            }}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>

        {(error || errors) && (
          <ErrorMessage message={errors.confirmPassword?.message || error} />
        )}
        {passwordMismatch && <ErrorMessage message="Password does not match" />}

        <button
          className="bg-[#4640DE] justify-center p-1.5 mt-1 rounded-full text-white cursor-pointer"
          type="submit"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            "Continue"
          )}
        </button>
        <div className="flex flex-row items-center  gap-4">
          <span className=" bg-[#D6DDEB]  h-0.5  w-1/2"></span>
          <div className="text-[#202430] ">Or</div>
          <span className=" bg-[#D6DDEB]  h-0.5  w-1/2"></span>
        </div>
        <div
          // href="/api/auth/signin"
          className="border rounded-full flex flex-row justify-center items-center
               gap-2 p-2 bg-[#F5F6F8] text-sm"
        >
          <img src="/IcongoogleIcon.svg" />
          <div className="text-[#4640DE] cursor-pointer">Sign Up with Google</div>
        </div>
      </form>

      <div className="flex flex-col justify-center items-center text-sm gap-2">
        <div className="flex flex-row justify-center items-center gap-1 text-sm">
          <p>Already have an account?</p>
          <a href="/login" className="text-[#4640DE] font-bold">
            Login
          </a>
        </div>
        <div className="items-center text-xs">
          By clicking 'Continue', you acknowledge that you have read and
          accepted our{" "}
          <a href="" className="text-[#4640DE] underline">
            Terms of Service and Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
