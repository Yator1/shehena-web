import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import LoadingSpinner from "../ui/LoadingSpinner";

const LoginForm = ({ onSwitch }) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input block w-full pl-10 pr-3 py-2"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input block w-full pl-10 pr-10 py-2"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 bg-dark-600 border-dark-500 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-300"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="font-medium text-primary-400 hover:text-primary-300"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark-900 bg-accent-500 hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 focus:ring-offset-dark-700"
          >
            {loading ? <LoadingSpinner size="sm" /> : "Sign in"}
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="font-medium text-primary-400 hover:text-primary-300"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.form>

      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-700 p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => {
                setShowResetModal(false);
                setResetStep(1);
                setIdentifier("");
                setVerificationCode("");
                setNewPassword("");
                setResetMessage("");
              }}
              className="absolute top-2 right-2 text-white"
            >
              ✕
            </button>

            {resetStep === 1 && (
              <>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Reset Password
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Enter your email or phone number to receive a verification code.
                </p>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or phone"
                  className="input w-full mb-4"
                />
                <button
                  className="btn btn-accent w-full"
                  disabled={resetLoading || !identifier}
                  onClick={async () => {
                    setResetLoading(true);
                    setResetMessage("");
                    try {
                      const res = await fetch(
                        `${API_BASE_URL}/api_reset_password.php`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ user_email: identifier }),
                        }
                      );
                      const data = await res.json();
                      setResetMessage(data.message);
                      if (data.success) setResetStep(2);
                    } catch {
                      setResetMessage("Failed to send code.");
                    } finally {
                      setResetLoading(false);
                    }
                  }}
                >
                  {resetLoading ? "Sending..." : "Send Verification Code"}
                </button>
              </>
            )}

            {resetStep === 2 && (
              <>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Enter Verification Code
                </h2>
                <input
                  type="text"
                  maxLength={4}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="4-digit code"
                  className="input w-full mb-4"
                />
                <button
                  className="btn btn-accent w-full"
                  disabled={resetLoading || verificationCode.length !== 4}
                  onClick={async () => {
                    setResetLoading(true);
                    setResetMessage("");
                    try {
                      const res = await fetch(
                        `${API_BASE_URL}/api_verify_code.php`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            phone: identifier,
                            verification_code: verificationCode,
                            reset_password: true,
                          }),
                        }
                      );
                      const data = await res.json();
                      setResetMessage(data.message);
                      if (data.success) setResetStep(3);
                    } catch {
                      setResetMessage("Verification failed.");
                    } finally {
                      setResetLoading(false);
                    }
                  }}
                >
                  {resetLoading ? "Verifying..." : "Verify Code"}
                </button>
              </>
            )}

            {resetStep === 3 && (
              <>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Set New Password
                </h2>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="input w-full mb-4"
                />
                <button
                  className="btn btn-accent w-full"
                  disabled={resetLoading || newPassword.length < 4}
                  onClick={async () => {
                    setResetLoading(true);
                    setResetMessage("");
                    try {
                      const res = await fetch(
                        `${API_BASE_URL}/api_update_password.php`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            user_email: identifier,
                            user_password: newPassword,
                          }),
                        }
                      );
                      const data = await res.json();
                      setResetMessage(data.message);
                      if (data.success) {
                        setTimeout(() => {
                          setShowResetModal(false);
                          setResetStep(1);
                        }, 2000);
                      }
                    } catch {
                      setResetMessage("Password update failed.");
                    } finally {
                      setResetLoading(false);
                    }
                  }}
                >
                  {resetLoading ? "Updating..." : "Update Password"}
                </button>
              </>
            )}

            {resetMessage && (
              <p className="text-sm text-accent-400 mt-4">{resetMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
