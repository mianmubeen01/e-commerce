import { createContext, useContext, useEffect, useState } from "react";
import APIInstance from "../api/api"; // your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", is_staff: false });

  // Fetch user info from backend
  const fetchUser = async () => {
    try {
      const res = await APIInstance.get("/me/");
      setUser(res.data);
    } catch (err) {
      setUser({ username: "", is_staff: false }); // Reset on error/logout
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
