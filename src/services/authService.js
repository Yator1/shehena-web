// Hardcoded credentials and tokens
const VALID_TOKENS = ["TOKEN123", "TOKEN456", "TOKEN789"];
const VALID_CREDENTIALS = [
  { email: "admin@shehena.com", password: "admin123" },
  { email: "user@shehena.com", password: "user123" },
];

export const authService = {
  // Validate token with hardcoded values
  validateToken: async (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (VALID_TOKENS.includes(token)) {
          resolve({
            id: 1,
            name: "Test User",
            email: "user@shehena.com",
          });
        } else {
          reject(new Error("Invalid token"));
        }
      }, 500);
    });
  },

  // Login with hardcoded credentials
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = VALID_CREDENTIALS.find(
          (cred) => cred.email === email && cred.password === password
        );

        if (user) {
          resolve({
            user: {
              id: 1,
              name: "Test User",
              email: user.email,
            },
            token: VALID_TOKENS[0],
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  },

  // Mock successful registration
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Math.floor(Math.random() * 1000) + 2, // Random ID (avoiding 1 which is used for test user)
            name: userData.name || "New User",
            email: userData.email,
          },
          token: VALID_TOKENS[2], // Using the last token for new registrations
        });
      }, 800);
    });
  },
};
