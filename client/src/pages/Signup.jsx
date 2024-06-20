import React, { useState } from "react";
import useSignup from "../../Hooks/useSignup";
import { Link } from "react-router-dom";
const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    setForm({
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className=" flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" p-5 shadow-xl max-sm:w-[80vw] flex flex-col justify-center my-[10%] items-center rounded-lg gap-5 bg-gray-100 w-1/2"
      >
        <h1 className=" text-lg font-bold">Signup for Employal.com</h1>
        <input
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className=" p-5 w-full h-10"
          type="text"
          placeholder="Username"
        />
        <input
          required
          value={form.fullname}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          className=" p-5 w-full h-10"
          type="text"
          placeholder="Full Name"
        />
        <input
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-5 w-full h-10"
          type="password"
          placeholder="Password"
        />
        <input
          required
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="p-5 w-full h-10"
          type="password"
          placeholder="Confirm Password"
        />
        <div className=" text-md font-normal">
          <Link to={"/login"}>Already have account?</Link>
        </div>
        <button
          className=" bg-gray-300 h-10 w-60 rounded-lg shadow-xl"
          type="submit"
        >
          <span className=" text-lg font-semibold text-black">
            {loading ? "Signing up" : "Sign Up"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Signup;
