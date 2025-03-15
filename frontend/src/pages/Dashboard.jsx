import { useAuthStore } from "../store/authStore.js";
import SpinPage from "./SpinPage.jsx";

const Dashboard = () => {
  const { user, isCheckingAuth, error, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  if (isCheckingAuth || !user) {
    return <SpinPage />;
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden  font-serif">
      <div className="bg-gradient-to-r from-[#4640DE] to-[#6A5ACD] p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
        <p className="text-sm text-white/80 mt-2">Your Profile Details</p>
      </div>

      <div className="p-8">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-1/3 font-bold text-gray-600">Name:</div>
            <div className="w-2/3 text-gray-800">{user.name}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold text-gray-600">Email:</div>
            <div className="w-2/3 text-gray-800">{user.email}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold text-gray-600">User since:</div>
            <div className="w-2/3 text-gray-800">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <button
          className="w-full bg-gradient-to-r from-[#4640DE] to-[#6A5ACD] text-white font-semibold py-3 rounded-lg hover:from-[#6A5ACD] hover:to-[#4640DE] transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 text-center border-t border-red-100">
          {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
