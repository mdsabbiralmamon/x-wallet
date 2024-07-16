import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to check if user is already authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/api/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error("Failed to verify token", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Function to handle user sign-in
  const signIn = async (identifier, pin) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { identifier, pin });
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Set the user state
      setUser(user);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Login failed");
    }
  };

  // Function to handle user sign-out
  const signOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const authInfo = { user, loading, signIn, signOut };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
