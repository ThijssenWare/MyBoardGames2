// src/utils/mockApi.js
import { users } from "../data/mockUsers";


const simulateDelay = (result, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(result), delay));

// General API wrapper
const api = {
  // Authentication methods
  auth: {
    login: async (email, password) => {
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        return simulateDelay({
          success: true,
          token: `mock-token-${user.id}`,
          user,
        });
      } else {
        return simulateDelay({
          success: false,
          error: "Invalid email or password.",
        });
      }
    },

    register: async (username, email, password) => {
      const emailExists = users.find((u) => u.email === email);
      if (emailExists) {
        return simulateDelay({
          success: false,
          error: "Email is already registered.",
        });
      }

      const newUser = {
        id: users.length + 1,
        username,
        email,
        password, // NEVER store plain text passwords in production!
      };

      users.push(newUser);
      return simulateDelay({
        success: true,
        user: newUser,
      });
    },
  },


};

export default api;
