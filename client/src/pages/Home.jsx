import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router";
import EmployeeList from "./EmployeeList";

const Dashboard = ({ user }) => {
  return (
    <main className=" flex justify-center h-screen w-screen items-center">
      <div className=" gap-5 justify-center items-center flex flex-col w-1/2 border-2 min-h-[20vh] rounded-3xl p-10 bg-gray-500">
        <span className=" text-xl text-white font-bold">
          Hi {user.username} Welcome! to the Dashboard{" "}
        </span>
        <span className=" text-sm text-gray-200 font-semi">
          Start managing your employees from Employees list at Menu bar
        </span>
      </div>
    </main>
  );
};

export default Dashboard;
