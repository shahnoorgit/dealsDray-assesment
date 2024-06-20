import React, { useState } from "react";

const useFetchallemp = () => {
  const [loading, setloading] = useState(false);
  const fetchall = async (_id) => {
    setloading(true);
    const response = await fetch(
      `https://dealsdray-assesment.onrender.com/api/get-employess/${_id}`
    );
    const data = await response.json();
    setloading(false);
    return data;
  };
  return { loading, fetchall };
};

export default useFetchallemp;
