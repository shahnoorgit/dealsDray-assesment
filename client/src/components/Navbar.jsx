import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { CiHome, CiLogout, CiViewList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import { AuthProvider } from "../../context/AuthContext";

const Navbar = () => {
  const { loading, logout } = useLogout();
  const { Auth } = useContext(AuthProvider);
  return (
    <header className=" flex justify-evenly items-center w-screen h-16 shadow-xl bg-gray-100">
      <div className=" w-full flex justify-evenly items-center">
        <Link
          to={"/"}
          className="flex cursor-pointer gap-3 hover:border-2 rounded-xl transition-all ease-in hover:border-gray-900 p-2 justify-center items-center"
        >
          <CiHome className=" text-xl" /> Home
        </Link>
        <Link
          to={"/employee-list"}
          className="flex cursor-pointer gap-3 hover:border-2 rounded-xl transition-all ease-in hover:border-gray-900 p-2 justify-center items-center"
        >
          <CiViewList className=" text-xl" />
          Employee list
        </Link>
      </div>
      <div className=" w-full flex justify-center gap-5 items-center">
        <div className="flex cursor-pointer gap-3 hover:border-2 rounded-xl transition-all ease-in hover:border-gray-900 p-2 justify-center items-center">
          <CiUser className=" text-xl" />
          {Auth?.username}
        </div>
        <div
          onClick={() => logout()}
          className="flex cursor-pointer gap-3 hover:border-2 rounded-xl transition-all ease-in hover:border-gray-900 p-2 justify-center items-center"
        >
          <CiLogout className=" text-xl" />
          Logout
        </div>
      </div>
    </header>
  );
};

export default Navbar;
