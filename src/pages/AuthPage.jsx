import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState("login");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 bg-accent-500/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -z-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 py-8 bg-dark-700 rounded-xl shadow-xl glass-card mx-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Shehena
          </h1>
          <p className="text-gray-300">Premium Spirits & Liquor</p>
        </div>

        {activeForm === "login" ? (
          <LoginForm onSwitch={() => setActiveForm("register")} />
        ) : (
          <RegisterForm onSwitch={() => setActiveForm("login")} />
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>By continuing, you agree to Shehena's</p>
          <p>
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Terms of Service
            </a>
            {" & "}
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
