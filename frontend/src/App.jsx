import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import VerifyEmail from "./pages/VerifyEmailPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SpinPage from "./pages/SpinPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (user && !user.is_verified) {
        navigate("/verify_email");
      }
    }
  }, [isCheckingAuth, isAuthenticated, user, navigate]);

  if (isCheckingAuth || loading) {
    return <SpinPage />;
  }

  return children;
};

const Redirect = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user?.is_verified) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (isCheckingAuth) {
    return <spinPage />;
  }

  return children;
};

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="">
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-50 to-purple-50 p-10 min-h-screen">
      {!isCheckingAuth ? (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Redirect>
                <LoginPage />
              </Redirect>
            }
          />
          <Route
            path="/signup"
            element={
              <Redirect>
                <SignupPage />
              </Redirect>
            }
          />
          <Route
            path="/forgot_password"
            element={
              <Redirect>
                <ForgotPassPage />
              </Redirect>
            }
          />
          <Route path="/verify_email" element={<VerifyEmail />} />
          <Route
            path="/reset_password/:token"
            element={
              <Redirect>
                <ResetPasswordPage />
              </Redirect>
            }
          />
        </Routes>
      ) : (
        <SpinPage />
      )}
    </div>
  );
};

export default App;
