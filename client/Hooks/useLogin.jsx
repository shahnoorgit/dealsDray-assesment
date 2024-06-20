import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthProvider } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setAuth } = useContext(AuthProvider);
  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://dealsdray-assesment.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }
      localStorage.setItem("localUser", JSON.stringify(data));
      setAuth(data);
      nav("/");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw new Error(error);
    }
  };
  return { loading, login };
};

export default useLogin;
