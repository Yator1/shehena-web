// API Configuration
const API_BASE_URL = "http://localhost/shehena.co.ke/www/endpoints";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API Endpoints
const ENDPOINTS = {
  AUTH: {
    REGISTER: "/api_register.php",
    LOGIN: "/api_login.php",
    VERIFY: "/api_verify.php",
  },
};

// Request headers
const getHeaders = () => ({
  "Content-Type": "application/json",
});

// API Service
const apiService = {
  // Registration
  register: async (userData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      return data; // contains { success, message, data: {...user} }
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },
};

export default apiService;

export { API_BASE_URL, ENDPOINTS, getHeaders };
