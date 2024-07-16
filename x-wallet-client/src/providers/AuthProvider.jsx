import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setUser({ email: "", password: "" });
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // signIn user
  const signIn =(identifier, pin) => {
    return axios.post("http://localhost:5000/api/auth/login", { identifier, pin })
  }

  const authInfo = { user, loading, signIn };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
