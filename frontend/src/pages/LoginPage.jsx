import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore.js";
import ErrorMessage from "../components/errorMessage.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { login, error, isAuthenticated, user, loading } = useAuthStore();
  const handleLogin = async (data) => {
    try {
      const { email, password } = data;
      await login(email, password);
      navigate("/");
    } catch {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-8  justify-center  w-1/3 bg-white rounded-3xl shadow-2xl  font-serif overflow-hidden ">
      <div className="flex flex-col gap-2 justify-center ">
        <div className="flex justify-center items-center">
          <img src="/login.png" className="size-16" />
        </div>
        <div className=" flex flex-row gap-2 justify-between items-center font-bold">
          <span className=" bg-[#D6DDEB]  h-[1px] w-1/3"></span>
          <div className="text-[#abaeb3]">WELCOME</div>
          <span className=" bg-[#D6DDEB]  h-[1px] w-1/3"></span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(handleLogin)}
        >
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
                form.clearErrors("password");
              }}
              className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
            />
          </div>
          {(error || errors.password) && (
            <ErrorMessage message={errors.password?.message || error} />
          )}

          <div className="flex justify-center text-[#4640DE] text-sm">
            <Link className="font-semibold" to="/forgot_password">
              Forgot Password?
            </Link>
          </div>
          <button
            className="border rounded-full bg-[#4640DE] text-white justify-center p-2 cursor-pointer"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="flex flex-row items-center  gap-4">
          <span className=" bg-[#D6DDEB]  h-0.5  w-1/2"></span>
          <div className="text-[#202430] ">Or</div>
          <span className=" bg-[#D6DDEB]  h-0.5  w-1/2"></span>
        </div>

        <div
          className="border rounded-full flex flex-row justify-center items-center
               gap-2 p-2 bg-[#F5F6F8]"
        >
          <img src="/IcongoogleIcon.svg" />
          <div className="text-[#4640DE] cursor-pointer">Login with Google</div>
        </div>
        <div className="flex justify-center text-sm">
          Don't have account?{" "}
          <a href="/signup" className="text-[#4640DE] font-semibold ml-1">
            Sign-Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
