import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../components/GoogleAuth";

function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  //console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data)
      if (data.success === false) {
        dispatch(loginFailure(data));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase 
        hover:opacity-95 disabled:opacity-80 rounded-lg"
        >
          {loading ? "Loading.." : "Login"}
        </button>
        <GoogleAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>New User?</p>
        <Link to={"/register"}>
          <span className="text-blue-500">Register</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something Went Wrong" : ""}
      </p>
    </div>
  );
}

export default Login;
