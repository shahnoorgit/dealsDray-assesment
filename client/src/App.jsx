import { useContext, useState } from "react";
import Login from "./pages/Login";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";

function App() {
  const { Auth, isAuth } = useContext(AuthProvider);
  const location = useLocation();
  const showNavbar = !["/login", "/sign-up"].includes(location.pathname);
  console.log(Auth);
  return (
    <main className="h-full w-full">
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={Auth ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={isAuth ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/"
          element={
            Auth ? <Dashboard user={Auth} /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/employee-list" element={<EmployeeList user={Auth} />} />
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
