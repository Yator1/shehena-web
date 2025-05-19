import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (token && storedUser) {
        try {
          setLoading(true);
          // Optional: You may add token validation API here if backend supports it.
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          setError(null);
        } catch (err) {
          console.error("Token validation failed:", err);
          setError("Session expired. Please log in again.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login({
        user_email: email,
        user_password: password,
      });

      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        setError(null);

        // Save in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.user_id); // Use token if available

        toast.success("Login successful!");
        return true;
      } else {
        throw new Error(response.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
      toast.error(err.message || "Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);

      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        setError(null);

        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.user_id);

        toast.success("Registration successful!");
        return true;
      } else {
        setError(response.message || "Registration failed");
        toast.error(response.message || "Registration failed");
        return false;
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed. Please try again.");
      toast.error(err.message || "Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    validateToken: () => {}, // No longer used but retained to avoid breaking other parts
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
