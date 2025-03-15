import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import ErrorMessage from "../components/errorMessage";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const [resendMessage, setResendMessage] = useState(false);

  const navigation = useNavigate();
  const { error, verifyToken, resendVerification, loading } = useAuthStore();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const verification_token = code.join("");
    try {
      await verifyToken(verification_token);
      navigation("/login");
    } catch {
      console.log(error);
      throw error;
    }
  };
  const handleChange = (value, index) => {
    const codes = [...code];
    if (value.length > 1) {
      const listOfCode = value.split("");
      const maxLength = Math.min(6 - index, listOfCode.length);

      for (let i = 0; i < maxLength; i++) {
        codes[index + i] = listOfCode[i];
      }

      for (let i = index; i < index + maxLength; i++) {
        if (inputRef.current[i + 1] && !codes[i + 1]) {
          inputRef.current[i + 1].focus();
          break;
        }
      }
    } else {
      codes[index] = value;
      if (index < 5 && value) {
        inputRef.current[index + 1].focus();
      }
    }
    setCode(codes);
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await resendVerification(email);
      setResendMessage(true);

      console.log("Resend verification code");
    } catch {
      console.log("Error in resending verification code", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8  justify-center items-center  bg-white rounded-3xl shadow-2xl w-1/3 overflow-hidden ">
      <img src="/verify.png" className="size-14 " />
      <div className=" flex flex-row gap-2 justify-between items-center font-serif font-bold w-full">
        <span className=" bg-[#D6DDEB]  h-[1px] w-1/3"></span>
        <div className="text-[#abaeb3]">VERIFICATION</div>
        <span className=" bg-[#D6DDEB]  h-[1px] w-1/3"></span>
      </div>
      <div className="flex text-[#7C8493] justify-center">
        We've sent a 6 digit verification code to the email address you
        provided. Please provide the code below.
      </div>
      <form className="flex flex-col gap-5 " onSubmit={handlesubmit}>
        <div className="flex flex-row gap-5 justify-center">
          {code.map((digit, index) => (
            <input
              type="text"
              ref={(el) => (inputRef.current[index] = el)}
              key={index}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="_"
              required={true}
              maxLength={6} // worst case => 6
              className="border-[#4640DE] bg-[#F8F8FD] border-opacity-40 text-4xl border-[2px] rounded-xl text-center w-1/6 p-1" // Need focus outlet on this
            />
          ))}
        </div>
        <button
          className="border rounded-full  bg-[#4640DE] text-white justify-center p-2 cursor-pointer"
          type="submit"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            "Verify"
          )}
        </button>
      </form>
      <div className="flex flex-col gap-1 justify-center -m-4">
        {resendMessage ? (
          <div className=" text-green-400 font-bold">
            New Verification code is sent !
          </div>
        ) : null}
        {error ? <ErrorMessage message={error} /> : null}
      </div>
      <div className="flex flex-col gap-2 text-[#7C8493] justify-center">
        <div className="flex justify-center text-[#7C8493]">
          Didn't receive the code?{" "}
          <a
            href=""
            className="text-[#4640DE] font-bold ml-1 mr-1"
            onClick={handleResend}
          >
            {" "}
            Resend{" "}
          </a>
        </div>
        <div className="flex flex-row text-sm justify-center text-gray-500 gap-1">
          <p>Go back to</p>
          <a href="/signup" className="text-[#4640DE] font-bold">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
