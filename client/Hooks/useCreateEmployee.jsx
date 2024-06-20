import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const useCreateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const createmploye = async ({
    off,
    employeer,
    name,
    email,
    gender,
    designation,
    course,
    image,
    mobileNumber,
  }) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://dealsdray-assesment.onrender.com/api/create-employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeer,
            name,
            email,
            gender,
            designation,
            course,
            image,
            mobileNumber,
          }),
        }
      );
      const data = await res.json();

      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      setLoading(false);
      toast.success(" Employee created successfully");
      off();
      return true;
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw new Error(error);
    }
  };
  return { loading, createmploye };
};

export default useCreateEmployee;
