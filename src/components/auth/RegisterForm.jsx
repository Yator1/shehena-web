import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import LoadingSpinner from "../ui/LoadingSpinner";

const RegisterForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
    confirmPassword: "",
    user_phone: "",
    county: "",
    sub_county: "",
    bar_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.user_password !== formData.confirmPassword) {
      return;
    }
    await register(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-2"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="user_first_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="user_first_name"
              name="user_first_name"
              type="text"
              required
              value={formData.user_first_name}
              onChange={handleChange}
              className="input block w-full pl-10 pr-3 py-2"
              placeholder="John"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="user_last_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="user_last_name"
              name="user_last_name"
              type="text"
              required
              value={formData.user_last_name}
              onChange={handleChange}
              className="input block w-full pl-10 pr-3 py-2"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="user_email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="user_email"
            name="user_email"
            type="email"
            autoComplete="email"
            required
            value={formData.user_email}
            onChange={handleChange}
            className="input block w-full pl-10 pr-3 py-2"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="user_phone"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="user_phone"
            name="user_phone"
            type="tel"
            required
            value={formData.user_phone}
            onChange={handleChange}
            className="input block w-full pl-10 pr-3 py-2"
            placeholder="0712345678"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="bar_name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Business Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiBriefcase className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="bar_name"
            name="bar_name"
            type="text"
            required
            value={formData.bar_name}
            onChange={handleChange}
            className="input block w-full pl-10 pr-3 py-2"
            placeholder="Bar or Business Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="county"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            County
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="county"
              name="county"
              type="text"
              required
              value={formData.county}
              onChange={handleChange}
              className="input block w-full pl-10 pr-3 py-2"
              placeholder="Nairobi"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="sub_county"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Sub County
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="sub_county"
              name="sub_county"
              type="text"
              required
              value={formData.sub_county}
              onChange={handleChange}
              className="input block w-full pl-10 pr-3 py-2"
              placeholder="Westlands"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="user_password"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="user_password"
            name="user_password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.user_password}
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

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input block w-full pl-10 pr-3 py-2"
            placeholder="••••••••"
          />
        </div>
        {formData.user_password &&
          formData.confirmPassword &&
          formData.user_password !== formData.confirmPassword && (
            <p className="mt-1 text-xs text-error">Passwords do not match</p>
          )}
      </div>

      <div>
        <button
          type="submit"
          disabled={
            loading || formData.user_password !== formData.confirmPassword
          }
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark-900 bg-accent-500 hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 focus:ring-offset-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <LoadingSpinner size="sm" /> : "Register"}
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="font-medium text-primary-400 hover:text-primary-300"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
