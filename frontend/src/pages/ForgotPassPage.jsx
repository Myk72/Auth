import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

const ForgotPassPage = () => {
  const { forgotPassword, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [message_is_sent, setMessage_is_sent] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const navigate = useNavigate();
  const handlesubmit = async (e, email) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if (!emailRegex.test(email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
        await forgotPassword(email);
        alert("Password reset link sent");
        setMessage_is_sent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-6  justify-center items-center bg-white rounded-3xl shadow-2xl overflow-hidden w-2/5 font-serif ">
      <img src="/forgot.png" className="size-14 " />
      <div className=" flex flex-row gap-2 justify-between items-center font-bold w-full">
        <span className=" bg-[#D6DDEB]  h-[1px] w-1/4"></span>
        <div className="text-[#abaeb3]">FORGOT PASSWORD ?</div>
        <span className=" bg-[#D6DDEB]  h-[1px] w-1/4"></span>
      </div>
      {!message_is_sent ? (
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="flex text-[#7C8493] justify-center ">
            Enter your email address below to receive password reset link
          </div>
          <form
            className="flex flex-col gap-3 justify-center items-center"
            onSubmit={(e) => handlesubmit(e, email)}
          >
            <div className="flex flex-row justify-center items-center gap-2 p-2 border-b border-gray-200 focus-within:border-b-2 focus-within:border-gray-800 transition-all">
              <img className="size-6" src="/email.png" alt="Email Icon" />

              <input
                type="text"
                id="email"
                placeholder="sample@test.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="flex-1 p-1 text-sm focus:outline-none placeholder-gray-400"
              />
            </div>
            {(validEmail || error) && (
              <ErrorMessage message={validEmail ? "Invalid Email" : error} />
            )}
            <button
              className="rounded-full bg-gray-600 text-white p-1 w-full cursor-pointer"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Send Reset"
              )}
            </button>
            <div className="flex flex-row text-sm items-center text-gray-500 gap-1 ">
              <p>Go back to</p>
              <a href="/login" className="text-blue-500 font-bold ">
                Login
              </a>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex text-[#7C8493] justify-center ">
            Email rest link sent to your email address successfully !
          </div>
          <button
            className="rounded-full bg-gray-600 text-white p-1 w-3/4"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassPage;
