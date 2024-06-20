import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthProvider } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setAuth } = useContext(AuthProvider);
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://dealsdray-assesment.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }
      localStorage.removeItem("localUser");
      setAuth(null);
      nav("/login");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw new Error(error);
    }
  };
  return { loading, logout };
};

export default useLogout;
