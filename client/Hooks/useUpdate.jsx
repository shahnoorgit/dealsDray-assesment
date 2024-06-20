import React, { useState } from "react";
import toast from "react-hot-toast";

const useUpdate = () => {
  const [loading, setloading] = useState(false);
  const updateEmployee = async ({
    offUpdate,
    employee_id,
    name,
    designation,
    image,
    course,
    mobileNumber,
    email,
    gender,
  }) => {
    setloading(true);
    try {
      const res = await fetch(
        `https://dealsdray-assesment.onrender.com/api/update-employee/${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            designation,
            image,
            course,
            mobileNumber,
            email,
            gender,
          }),
        }
      );

      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }
      console.log(data);
      toast.success("employe edited successfully");
      offUpdate();
      return data;
    } catch (error) {
      console.log(error);
      setloading(false);
      throw new Error(error);
    }
  };
  return { loading, updateEmployee };
};

export default useUpdate;
