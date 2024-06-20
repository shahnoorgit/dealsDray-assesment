import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { AuthProvider } from "../context/AuthContext";

const useSignup = () => {
  const nav = useNavigate();
  const { setAuth } = useContext(AuthProvider);
  const [loading, setloading] = useState(false);
  const signup = async ({ fullname, username, password, confirmPassword }) => {
    setloading(true);
    try {
      const res = await fetch(
        "https://dealsdray-assesment.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            username,
            password,
            confirmPassword,
          }),
        }
      );
      const data = await res.json();

      if (data.error) {
        return toast.error(data.error);
      }

      localStorage.setItem("localUser", JSON.stringify(data));
      toast.success("logined success");
      setAuth(JSON.stringify(data));
      nav("/");
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setloading(false);
      throw new Error(error);
    }
  };
  return { loading, signup };
};

export default useSignup;
