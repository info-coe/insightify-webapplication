import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (
      values.email === "john@indochinese.com" &&
      values.password === "password"
    ) {
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="loginmaindiv">
        <div className="loginform">
          <h1 id="head">Insightify</h1>

          <h2 id="subhead" style={{ color: "#00000099" }}>
            Welcome to{" "}
            <span style={{ color: "#000000" }}>Indochinese Restaurant</span>
          </h2>
          <form id="formdiv" onSubmit={formSubmit}>
            <div className="input-field">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={handleInput}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button id="loginBtn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
