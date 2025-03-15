import React from "react";

const SpinPage = () => {
  return (
    <div className="flex justify-center items-center bg-blue-500 p-10 min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white border-t-transparent"></div>
    </div>
  );
};

export default SpinPage;
