import { createContext, useState } from "react";

export const AuthProvider = createContext();

import React from "react";

const AuthContext = ({ children }) => {
  const [Auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("localUser")) || null
  );
  const isAuth = localStorage.getItem("localUser") ? true : false;
  return (
    <AuthProvider.Provider value={{ Auth, setAuth, isAuth }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
