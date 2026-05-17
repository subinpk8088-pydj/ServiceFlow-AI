import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  const loginUser = async (email, password) => {

    try {

      const response = await axiosInstance.post(
        "accounts/login/",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      await fetchUserProfile();

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        error: error.response?.data,
      };
    }
  };


  const fetchUserProfile = async () => {

    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const response = await axiosInstance.get(
        "accounts/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);

    } catch (error) {

      console.log(error);

      logoutUser();
    }

    setLoading(false);
  };


  const logoutUser = () => {

    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    setUser(null);
  };


  useEffect(() => {

    fetchUserProfile();

  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}